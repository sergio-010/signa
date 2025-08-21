#!/bin/bash

echo "🔍 Verificando estado del sistema completo..."
echo ""

# URLs
BACKEND_URL="https://signa-production.up.railway.app"
FRONTEND_URL="https://signa-prueba-tecnica-4fslcglx3-sergio-andres-picons-projects.vercel.app"

echo "🔧 Verificando Backend (Railway)..."
echo "   URL: $BACKEND_URL"

# Verificar health check
echo "   ⚕️  Health check..."
HEALTH_RESPONSE=$(curl -s "$BACKEND_URL/health" || echo "ERROR")
if [[ $HEALTH_RESPONSE == *"status"* ]]; then
    echo "   ✅ Backend funcionando"
else
    echo "   ❌ Backend no responde: $HEALTH_RESPONSE"
fi

# Verificar API
echo "   📋 API de marcas..."
API_RESPONSE=$(curl -s "$BACKEND_URL/api/brands/" || echo "ERROR")
if [[ $API_RESPONSE == *"brands"* ]] || [[ $API_RESPONSE == *"[]"* ]]; then
    echo "   ✅ API funcionando"
else
    echo "   ❌ API no responde correctamente: $API_RESPONSE"
fi

echo ""
echo "🌐 Verificando Frontend (Vercel)..."
echo "   URL: $FRONTEND_URL"

FRONTEND_RESPONSE=$(curl -s -I "$FRONTEND_URL" | head -n 1)
if [[ $FRONTEND_RESPONSE == *"200"* ]]; then
    echo "   ✅ Frontend funcionando"
else
    echo "   ❌ Frontend no responde: $FRONTEND_RESPONSE"
fi

echo ""
echo "📊 Resumen:"
echo "   Backend:  $BACKEND_URL"
echo "   Frontend: $FRONTEND_URL"
echo ""
echo "⚠️  Si el backend no funciona, revisa la configuración en Railway"
