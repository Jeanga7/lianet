#!/bin/bash

# Script pour connecter votre dépôt local à GitHub
# Instructions :
# 1. Allez sur https://github.com/new
# 2. Créez un nouveau dépôt (ne cochez PAS "Initialize with README")
# 3. Notez l'URL du dépôt (ex: https://github.com/votre-username/lianet.git)
# 4. Exécutez ce script avec l'URL en paramètre :
#    bash setup-github.sh https://github.com/votre-username/lianet.git

if [ -z "$1" ]; then
    echo "❌ Erreur: Veuillez fournir l'URL du dépôt GitHub"
    echo "Usage: bash setup-github.sh https://github.com/Jeanga7/lianet.git"
    exit 1
fi

REPO_URL=$1

echo "🔗 Ajout du remote GitHub..."
git remote add origin "$REPO_URL"

echo "📤 Push du code vers GitHub..."
git branch -M main
git push -u origin main

echo "✅ Votre dépôt est maintenant connecté à GitHub !"
echo "🌐 Vous pouvez voir votre code sur: $REPO_URL"
