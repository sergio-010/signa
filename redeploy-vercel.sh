#!/bin/bash

echo "🚀 SCRIPT ALTERNATIVO PARA REDEPLOYAR VIA GIT"
echo "=============================================="
echo ""
echo "Si prefieres redeployar usando Git después de configurar"
echo "la variable de entorno en Vercel, ejecuta estos comandos:"
echo ""
echo "git add ."
echo "git commit --allow-empty -m \"Configure NEXT_PUBLIC_API_URL for production\""
echo "git push origin main"
echo ""
echo "⚠️ IMPORTANTE: Primero configura la variable NEXT_PUBLIC_API_URL"
echo "   en Vercel como se indica en la guía anterior."
echo ""
echo "💡 Este método triggerea un redeploy automático"
echo "   cuando Vercel detecta el nuevo commit."
echo ""

read -p "¿Quieres ejecutar el redeploy via Git ahora? (y/N): " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo ""
    echo "📝 Ejecutando redeploy via Git..."
    git add .
    git commit --allow-empty -m "Configure NEXT_PUBLIC_API_URL for production - trigger redeploy"
    git push origin main
    echo ""
    echo "✅ Redeploy iniciado via Git"
    echo "🔍 Verifica el progreso en: https://vercel.com/dashboard"
else
    echo ""
    echo "ℹ️ Redeploy cancelado. Puedes ejecutarlo manualmente más tarde."
fi
