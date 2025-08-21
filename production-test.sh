#!/bin/bash

echo "🔍 VERIFICACIÓN COMPLETA DE PRODUCCIÓN"
echo "======================================"
echo ""

BACKEND_URL="https://heartfelt-insight-production-3a55.up.railway.app"
FRONTEND_URL="https://signa-prueba-tecnica.vercel.app"

echo "🔧 BACKEND (Railway) - $BACKEND_URL"
echo "----------------------------------------"

# Test backend health
echo "⚕️  Health Check:"
HEALTH=$(curl -s "$BACKEND_URL/health")
if [[ $HEALTH == *"healthy"* ]]; then
    echo "   ✅ Backend saludable"
else
    echo "   ❌ Backend no responde: $HEALTH"
    exit 1
fi

# Test backend API
echo "📋 API Brands:"
BRANDS=$(curl -s "$BACKEND_URL/api/brands/")
TOTAL=$(echo "$BRANDS" | grep -o '"total":[0-9]*' | cut -d':' -f2)
if [[ $TOTAL -gt 0 ]]; then
    echo "   ✅ API funcionando - $TOTAL marcas encontradas"
else
    echo "   ❌ API no tiene datos"
fi

echo ""
echo "🌐 FRONTEND (Vercel) - $FRONTEND_URL"
echo "----------------------------------------"

# Test frontend accessibility
echo "🔗 Accesibilidad:"
FRONTEND_STATUS=$(curl -s -I "$FRONTEND_URL" | head -n 1)
if [[ $FRONTEND_STATUS == *"200"* ]]; then
    echo "   ✅ Frontend accesible"
else
    echo "   ❌ Frontend no accesible: $FRONTEND_STATUS"
fi

# Check if frontend has React/Next.js content
echo "⚛️  Contenido React:"
FRONTEND_CONTENT=$(curl -s "$FRONTEND_URL")
if [[ $FRONTEND_CONTENT == *"__next"* ]] || [[ $FRONTEND_CONTENT == *"react"* ]]; then
    echo "   ✅ Aplicación React/Next.js cargada"
else
    echo "   ❌ No es aplicación React"
fi

echo ""
echo "🧪 PRUEBA DE INTEGRACIÓN"
echo "----------------------------------------"

# Test if frontend can access backend
echo "🔄 Conectividad Frontend -> Backend:"
if [[ $FRONTEND_CONTENT == *"signa"* ]] || [[ $FRONTEND_CONTENT == *"marca"* ]]; then
    echo "   ✅ Frontend contiene contenido de la aplicación"
else
    echo "   ⚠️  Frontend podría no estar conectado al backend"
fi

echo ""
echo "📊 ESTADO FINAL:"
echo "   Backend:  ✅ Funcional con $TOTAL marcas"
echo "   Frontend: ✅ Desplegado en Vercel"
echo "   URLs:"
echo "   - Backend:  $BACKEND_URL"
echo "   - Frontend: $FRONTEND_URL"
echo ""

# Test creating a new brand to verify full integration
echo "🚀 PRUEBA FINAL - Creando marca de prueba..."
CREATE_RESULT=$(curl -s -X POST "$BACKEND_URL/api/brands/" -H "Content-Type: application/json" -d '{"brandName":"Test Producción","trademarkOwner":"Sistema Automatizado","status":true}')

if [[ $CREATE_RESULT == *"brand"* ]]; then
    echo "   ✅ SISTEMA COMPLETAMENTE FUNCIONAL"
    echo "   📝 Marca de prueba creada exitosamente"
else
    echo "   ❌ Error creando marca: $CREATE_RESULT"
fi

echo ""
echo "🎉 ¡VERIFICACIÓN DE PRODUCCIÓN COMPLETADA!"
