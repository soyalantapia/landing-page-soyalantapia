#!/usr/bin/env bash
set -euo pipefail

# Deploy script Landing Page SoyAlanTapia
# Usage: ./scripts/deploy.sh "descripción del cambio"
# Crítico: siempre usa GITHUB_ACTIONS=true para que el base path quede correcto

if [ $# -eq 0 ]; then
  echo "Usage: ./scripts/deploy.sh \"descripción del cambio\""
  exit 1
fi

MSG="$1"
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

echo "Building con GITHUB_ACTIONS=true..."
GITHUB_ACTIONS=true npx vite build

echo "Verificando paths de assets..."
if grep -q 'src="/assets/' dist/index.html; then
  echo "ERROR: assets apuntan a /assets/ en vez de /landing-page-soyalantapia/assets/"
  echo "Probable causa: GITHUB_ACTIONS no se exportó. Abortando deploy."
  exit 1
fi
if ! grep -q '/landing-page-soyalantapia/assets/' dist/index.html; then
  echo "ERROR: dist/index.html no contiene el base path esperado. Abortando."
  exit 1
fi
echo "OK paths correctos."

echo "Preparando dist para push a gh-pages..."
cd dist
touch .nojekyll
rm -rf .git
git init -q -b gh-pages
git add -A
git \
  -c user.email=alan@soyalantapia.com \
  -c user.name="Alan Tapia" \
  commit -q -m "deploy: $MSG"
git remote add origin https://github.com/soyalantapia/landing-page-soyalantapia.git
git push -f origin gh-pages
cd ..
rm -rf dist/.git

echo "Deploy completado: https://soyalantapia.github.io/landing-page-soyalantapia/"
echo "Mensaje: $MSG"
