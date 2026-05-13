import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';

// Initialiser Resend avec la clé API
const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Rate Limiting (in-memory, IP-based) ─────────────────────────────────────
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5; // 5 requêtes max par fenêtre
// Nettoyage toutes les 30 min pour éviter la fuite mémoire sur instances long-lived
const CLEANUP_INTERVAL_MS = 30 * 60 * 1000;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

setInterval(() => {
  const now = Date.now();
  rateLimitStore.forEach((entry, ip) => {
    if (now > entry.resetAt) rateLimitStore.delete(ip);
  });
}, CLEANUP_INTERVAL_MS);

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count };
}

// ─── Échappement HTML (protection XSS dans les emails) ───────────────────────
function escHtml(str: string): string {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#x27;');
}

// Types pour la validation
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  secteur: string;
  taille?: string;
  besoin?: string;
  message: string;
  website?: string;
  service?: string;
}

const secteurLabels: Record<string, string> = {
  'zones-industrielles': 'Zones industrielles',
  'banques-assurances': 'Banques & assurances',
  'hotellerie-restauration': 'Hôtellerie & restauration',
  'grande-distribution': 'Grande distribution',
  'institutions-universites': 'Institutions & universités',
  autre: 'Autre',
};

const tailleLabels: Record<string, string> = {
  '1-10': '1 - 10 personnes',
  '11-50': '11 - 50 personnes',
  '51-200': '51 - 200 personnes',
  '201-500': '201 - 500 personnes',
  '500+': '500 personnes et plus',
};

const besoinLabels: Record<string, string> = {
  demo: 'Demande de démo',
  devis: 'Demande de devis',
  info: 'Informations générales',
  pilote: 'Pilote / POC',
  support: 'Support technique',
  partenariat: 'Partenariat',
};

function normalizeFormData(data: any): ContactFormData {
  return {
    name: String(data?.name ?? '').trim(),
    email: String(data?.email ?? '').trim(),
    phone: String(data?.phone ?? '').trim(),
    company: String(data?.company ?? '').trim(),
    secteur: String(data?.secteur ?? data?.service ?? '').trim(),
    taille: String(data?.taille ?? '').trim(),
    besoin: String(data?.besoin ?? '').trim(),
    message: String(data?.message ?? '').trim(),
    website: String(data?.website ?? '').trim(),
    service: String(data?.service ?? '').trim(),
  };
}

function formatEnumValue(value: string | undefined, labels: Record<string, string>): string {
  if (!value) {
    return 'Non précisé';
  }

  return labels[value] || value;
}

// Validation des données
function validateFormData(data: any): { isValid: boolean; errors: string[]; data: ContactFormData } {
  const errors: string[] = [];
  const normalizedData = normalizeFormData(data);

  if (!normalizedData.name || normalizedData.name.length < 2) {
    errors.push('Le nom doit contenir au moins 2 caractères');
  }

  if (!normalizedData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedData.email)) {
    errors.push('Email invalide');
  }

  if (normalizedData.phone && !/^[\d\s+\-()]+$/.test(normalizedData.phone)) {
    errors.push('Numéro de téléphone invalide');
  }

  if (!normalizedData.secteur) {
    errors.push('Veuillez sélectionner un secteur');
  }

  if (!normalizedData.message || normalizedData.message.length < 10) {
    errors.push('Le message doit contenir au moins 10 caractères');
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: normalizedData,
  };
}

// Protection anti-spam simple (honeypot + time check)
function isSpam(data: any, submittedAt: number): boolean {
  // Honeypot field (champ caché que les bots remplissent)
  if (data.website && data.website !== '') {
    return true;
  }

  // Time check : soumission trop rapide (< 3 secondes)
  const timeToSubmit = Date.now() - submittedAt;
  if (timeToSubmit < 3000) {
    return true;
  }

  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = getClientIp(request);
    const { allowed } = checkRateLimit(clientIp);
    if (!allowed) {
      return NextResponse.json(
        { success: false, message: 'Trop de requêtes. Veuillez réessayer dans 10 minutes.' },
        { status: 429 }
      );
    }

    // Parser le corps de la requête
    const body = await request.json();
    const { formData, submittedAt } = body;

    // Vérification anti-spam
    if (isSpam(formData, submittedAt)) {
      return NextResponse.json(
        { success: false, message: 'Requête invalide' },
        { status: 400 }
      );
    }

    // Validation des données
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Données invalides',
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const typedData = validation.data;
    const secteur = formatEnumValue(typedData.secteur, secteurLabels);
    const taille = formatEnumValue(typedData.taille, tailleLabels);
    const besoin = formatEnumValue(typedData.besoin, besoinLabels);

    // Persister le lead en base
    try {
      await prisma.lead.create({
        data: {
          name: typedData.name,
          email: typedData.email,
          phone: typedData.phone || null,
          company: typedData.company || null,
          secteur: typedData.secteur || null,
          taille: typedData.taille || null,
          besoin: typedData.besoin || null,
          message: typedData.message,
          source: 'formulaire-contact',
          status: 'nouveau',
        },
      });
    } catch (dbError) {
      console.error('Erreur DB lead:', dbError);
      // On continue — l'email doit quand même partir
    }

    // Préparer le contenu de l'email (toutes les valeurs utilisateur sont échappées)
    const eName    = escHtml(typedData.name);
    const eEmail   = escHtml(typedData.email);
    const ePhone   = typedData.phone   ? escHtml(typedData.phone)   : '';
    const eCompany = typedData.company ? escHtml(typedData.company) : '';
    const eMessage = escHtml(typedData.message);
    const eSecteur = escHtml(secteur);
    const eBesoin  = escHtml(besoin);
    const eTaille  = escHtml(taille);

    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 20px; }
    .label { font-weight: 600; color: #374151; margin-bottom: 5px; }
    .value { background: white; padding: 12px; border-radius: 6px; border-left: 3px solid #3b82f6; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">📬 Nouveau Message de Contact</h1>
      <p style="margin: 10px 0 0; opacity: 0.9;">Reçu depuis le site web ESDLAB</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">👤 Nom</div>
        <div class="value">${eName}</div>
      </div>

      <div class="field">
        <div class="label">✉️ Email</div>
        <div class="value"><a href="mailto:${eEmail}" style="color: #3b82f6; text-decoration: none;">${eEmail}</a></div>
      </div>

      ${ePhone ? `
      <div class="field">
        <div class="label">📞 Téléphone</div>
        <div class="value">${ePhone}</div>
      </div>
      ` : ''}

      ${eCompany ? `
      <div class="field">
        <div class="label">🏢 Entreprise</div>
        <div class="value">${eCompany}</div>
      </div>
      ` : ''}

      <div class="field">
        <div class="label">🏷️ Secteur</div>
        <div class="value">${eSecteur}</div>
      </div>

      <div class="field">
        <div class="label">🎯 Type de besoin</div>
        <div class="value">${eBesoin}</div>
      </div>

      <div class="field">
        <div class="label">🏢 Taille de l'organisation</div>
        <div class="value">${eTaille}</div>
      </div>

      <div class="field">
        <div class="label">💬 Message</div>
        <div class="value" style="white-space: pre-wrap;">${eMessage}</div>
      </div>

      <div class="footer">
        <p>Ce message a été envoyé depuis le formulaire de contact du site ESDLab Technologies</p>
        <p>Date : ${new Date().toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'short' })}</p>
      </div>
    </div>
  </div>
</body>
</html>
    `.trim();

    // Envoyer l'email interne via Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.RESEND_TO_EMAIL || 'contact@esdlab.com',
      subject: `[ESDLAB] ${besoin} - ${typedData.name}`,
      html: emailContent,
      replyTo: typedData.email,
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return NextResponse.json(
        {
          success: false,
          message: "Erreur lors de l'envoi de l'email",
          error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        },
        { status: 500 }
      );
    }

    // Email accusé de réception au prospect
    const confirmationHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1e293b; background: #f8fafc; margin: 0; padding: 0; }
    .wrapper { background: #f8fafc; padding: 40px 20px; }
    .card { max-width: 560px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
    .header { background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%); padding: 40px 36px; color: white; }
    .header h1 { margin: 0 0 8px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; }
    .header p { margin: 0; opacity: 0.85; font-size: 15px; }
    .body { padding: 36px; }
    .body p { margin: 0 0 16px; font-size: 15px; color: #334155; }
    .recap { background: #f1f5f9; border-radius: 8px; padding: 20px 24px; margin: 24px 0; }
    .recap-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
    .recap-row:last-child { border-bottom: none; }
    .recap-label { color: #64748b; font-weight: 500; }
    .recap-value { color: #0f172a; font-weight: 600; }
    .cta { display: inline-block; background: #2563eb; color: white !important; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 15px; margin: 8px 0 24px; }
    .whatsapp { display: inline-block; background: #25D366; color: white !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; margin-left: 12px; }
    .footer { background: #f8fafc; padding: 24px 36px; font-size: 13px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer a { color: #2563eb; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <h1>Votre demande est bien reçue ✓</h1>
        <p>Nous vous répondrons dans les 4 heures ouvrées.</p>
      </div>
      <div class="body">
        <p>Bonjour <strong>${eName}</strong>,</p>
        <p>Merci pour l'intérêt que vous portez à <strong>DigiLab Corporate</strong>. Votre message a bien été transmis à notre équipe commerciale.</p>
        <div class="recap">
          <div class="recap-row">
            <span class="recap-label">Type de demande</span>
            <span class="recap-value">${eBesoin}</span>
          </div>
          <div class="recap-row">
            <span class="recap-label">Secteur</span>
            <span class="recap-value">${eSecteur}</span>
          </div>
          ${eCompany ? `<div class="recap-row">
            <span class="recap-label">Entreprise</span>
            <span class="recap-value">${eCompany}</span>
          </div>` : ''}
          <div class="recap-row">
            <span class="recap-label">Date</span>
            <span class="recap-value">${new Date().toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' })}</span>
          </div>
        </div>
        <p>En attendant, vous pouvez nous contacter directement :</p>
        <a href="https://wa.me/2250779565226" class="whatsapp">💬 WhatsApp</a>
        <br><br>
        <p style="font-size: 14px; color: #64748b;">Si vous n'avez pas soumis cette demande, ignorez cet email.</p>
      </div>
      <div class="footer">
        <p><strong>ESDLab Technologies</strong> · Treichville, Abidjan, Côte d'Ivoire</p>
        <p><a href="tel:+2250779565226">+225 07 79 56 52 26</a> · <a href="mailto:contact@esdlab.pro">contact@esdlab.pro</a></p>
      </div>
    </div>
  </div>
</body>
</html>`.trim();

    // Envoi non bloquant — on log l'erreur mais on ne fait pas échouer la requête
    resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: typedData.email,
      subject: `Votre demande ESDLab a bien été reçue`,
      html: confirmationHtml,
    }).catch((err) => console.error('Erreur email confirmation prospect:', err));

    // Succès
    return NextResponse.json(
      {
        success: true,
        message: 'Message envoyé avec succès',
        data: { emailId: data?.id },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Erreur serveur',
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
      },
      { status: 500 }
    );
  }
}

// OPTIONS pour CORS (si besoin)
export async function OPTIONS(_request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
