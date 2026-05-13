#!/usr/bin/env bash
# Package Next.js standalone build pour upload cPanel
# Usage : npm run cpanel:package
set -euo pipefail

OUT_DIR="dist-cpanel"
ARCHIVE="digilab-cpanel.tar.gz"

echo "▶ Build Next.js (standalone)…"
npm run build

echo "▶ Préparation $OUT_DIR…"
rm -rf "$OUT_DIR" "$ARCHIVE"
mkdir -p "$OUT_DIR"

# Copie du serveur standalone
cp -R .next/standalone/. "$OUT_DIR/"
# Static assets (Next ne les inclut pas dans standalone)
mkdir -p "$OUT_DIR/.next/static"
cp -R .next/static/. "$OUT_DIR/.next/static/"
# Public (images, uploads, robots…)
cp -R public "$OUT_DIR/public"
# Prisma (schema + migrations pour migrate deploy sur le serveur)
mkdir -p "$OUT_DIR/prisma"
cp -R prisma/schema.prisma "$OUT_DIR/prisma/"
[ -d prisma/migrations ] && cp -R prisma/migrations "$OUT_DIR/prisma/migrations" || true
[ -f prisma/seed.ts ] && cp prisma/seed.ts "$OUT_DIR/prisma/" || true

# .htaccess proxy Apache → Node
cat > "$OUT_DIR/.htaccess" <<'HTACCESS'
# Proxy vers l'app Node.js cPanel
# Remplace PORT par le port attribué par cPanel (Setup Node.js App)
RewriteEngine On
RewriteRule ^_next/static/(.*)$ /_next/static/$1 [L]
RewriteRule ^uploads/(.*)$ /uploads/$1 [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:PORT/$1 [P,L]
HTACCESS

echo "▶ Création de l'archive $ARCHIVE…"
tar -czf "$ARCHIVE" -C "$OUT_DIR" .

echo "✅ Prêt : $ARCHIVE  ($(du -h "$ARCHIVE" | cut -f1))"
echo "   Upload sur cPanel > File Manager, puis suivre docs/DEPLOY_CPANEL.md"
