# Déploiement DigiLab sur cPanel

## Prérequis cPanel
- **Node.js** ≥ 18.18 (cPanel > "Setup Node.js App")
- **MySQL** 5.7+ ou MariaDB 10.3+
- Accès **Terminal** SSH (recommandé) ou File Manager
- Domaine pointé sur l'hébergement

## 1. Préparer la base MySQL
Dans **cPanel > MySQL Databases** :
1. Créer une base : `digilab` → nom complet : `cpaneluser_digilab`
2. Créer un utilisateur + mot de passe fort
3. Ajouter l'utilisateur à la base avec **ALL PRIVILEGES**
4. Noter l'URL : `mysql://cpaneluser_dbuser:PASSWORD@localhost:3306/cpaneluser_digilab`

## 2. Créer l'app Node.js
**cPanel > Setup Node.js App > CREATE APPLICATION** :
- Node.js version : 20.x
- Application mode : `Production`
- Application root : `digilab` (= `/home/cpaneluser/digilab`)
- Application URL : `tondomaine.fr` (ou sous-domaine)
- Application startup file : `server.js`
- Passenger log file : laisser par défaut

Cliquer **CREATE**. cPanel attribue un port (ex. `30123`) — le noter.

## 3. Variables d'environnement
Dans la même page, section **Environment variables**, ajouter :
```
DATABASE_URL              mysql://cpaneluser_dbuser:PASS@localhost:3306/cpaneluser_digilab
NEXTAUTH_SECRET           <openssl rand -base64 32>
NEXTAUTH_URL              https://tondomaine.fr
NEXT_PUBLIC_SITE_URL      https://tondomaine.fr
RESEND_API_KEY            re_xxx
RESEND_FROM_EMAIL         noreply@tondomaine.fr
RESEND_TO_EMAIL           contact@tondomaine.fr
ADMIN_EMAIL               admin@tondomaine.fr
ADMIN_PASSWORD            <fort>
NODE_ENV                  production
```

## 4. Build local + upload
Sur ta machine :
```bash
npm run cpanel:package
```
Cela produit `digilab-cpanel.tar.gz`.

Upload via **cPanel > File Manager** dans `/home/cpaneluser/digilab/`, puis Extract.

OU en SSH :
```bash
scp digilab-cpanel.tar.gz user@host:~/digilab/
ssh user@host
cd ~/digilab && tar -xzf digilab-cpanel.tar.gz && rm digilab-cpanel.tar.gz
```

## 5. Installer + migrer la base
Dans **cPanel > Setup Node.js App > Run NPM Install** (ou en SSH après `source` du venv Node) :
```bash
cd ~/digilab
npm install --production --omit=dev
npx prisma migrate deploy
npx prisma db seed   # crée l'admin initial
```

## 6. .htaccess (proxy)
Le script génère un `.htaccess` à placer à la **racine du domaine** (`public_html/` ou `public_html/sousdomaine/`).
**Remplacer `PORT`** par le port attribué par cPanel à l'étape 2 :
```apache
RewriteEngine On
RewriteRule ^_next/static/(.*)$ /_next/static/$1 [L]
RewriteRule ^uploads/(.*)$ /uploads/$1 [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:30123/$1 [P,L]
```

## 7. Démarrer l'app
**cPanel > Setup Node.js App > Restart**.
Tester : `https://tondomaine.fr` puis login admin sur `/admin/login`.

## 8. Permissions uploads
```bash
chmod 755 ~/digilab/public/uploads
```

## 9. Mises à jour ultérieures
Workflow recommandé :
```bash
# Local
npm run cpanel:package
scp digilab-cpanel.tar.gz user@host:~/

# Serveur
cd ~ && tar -xzf digilab-cpanel.tar.gz -C digilab/
cd digilab && npm install --production --omit=dev
npx prisma migrate deploy
# Puis : cPanel > Setup Node.js App > Restart
```

## Dépannage
| Symptôme | Cause | Fix |
|---|---|---|
| 502 Bad Gateway | App Node arrêtée | Restart depuis cPanel |
| `PrismaClientInitializationError` | DATABASE_URL invalide | Vérifier user/host/port MySQL |
| Upload images perdus après deploy | `public/uploads` écrasé | Le script préserve `public/` côté serveur, mais vérifier que `tar -xzf` ne supprime pas les fichiers existants — utiliser `rsync --exclude=public/uploads` en alternative |
| Sentry erreurs build | `SENTRY_AUTH_TOKEN` absent | Vide → laisser, Sentry est optionnel |
| `.next/static` 404 | `.htaccess` mal configuré | Vérifier les `RewriteRule` static |

## Sauvegarde
- **Base** : `cPanel > phpMyAdmin > Export` (hebdo)
- **Uploads** : `cPanel > Backup > Home Directory` ou cron `tar` sur `~/digilab/public/uploads`
