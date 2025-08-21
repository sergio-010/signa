#!/bin/bash

echo "🔍 Verificando backend de Railway..."
echo ""

# URLs a verificar
RAILWAY_URL="https://signa-backend.up.railway.app"
HEALTH_URL="$RAILWAY_URL/health"
API_URL="$RAILWAY_URL/api/brands/"

echo "📡 Verificando conectividad..."
if curl -s --connect-timeout 10 "$HEALTH_URL" > /dev/null; then
    echo "✅ Conexión establecida"
else
    echo "❌ No se pudo conectar al backend"
    echo "   URL: $HEALTH_URL"
    exit 1
fi

echo ""
echo "🏥 Verificando endpoint de salud..."
HEALTH_RESPONSE=$(curl -s "$HEALTH_URL")
if [[ $HEALTH_RESPONSE == *"status"* ]]; then
    echo "✅ Backend funcionando correctamente"
    echo "   Respuesta: $HEALTH_RESPONSE"
else
    echo "❌ El backend no responde correctamente"
    echo "   Respuesta: $HEALTH_RESPONSE"
fi

echo ""
echo "📋 Verificando API de marcas..."
API_RESPONSE=$(curl -s "$API_URL")
if [[ $API_RESPONSE == *"brands"* ]] || [[ $API_RESPONSE == *"error"* ]]; then
    echo "✅ API de marcas accesible"
    echo "   Primera línea: $(echo "$API_RESPONSE" | head -n 1)"
else
    echo "❌ API de marcas no accesible"
    echo "   Respuesta: $API_RESPONSE"
fi

echo ""
echo "🎯 URLs del sistema:"
echo "   Backend: $RAILWAY_URL"
echo "   Health: $HEALTH_URL"
echo "   API: $API_URL"
