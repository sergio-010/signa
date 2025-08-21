#!/bin/bash

echo "🚀 Iniciando Sistema de Gestión de Marcas - Signa"
echo ""

echo "📦 Verificando dependencias..."
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js 18+ desde https://nodejs.org"
    exit 1
fi

# Verificar si Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "❌ Python no está instalado. Por favor instala Python 3.8+ desde https://python.org"
    exit 1
fi

echo "✅ Dependencias verificadas"
echo ""

# Instalar dependencias del frontend si no existen
if [ ! -d "node_modules" ]; then
    echo "📥 Instalando dependencias del frontend..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Error instalando dependencias del frontend"
        exit 1
    fi
fi

# Configurar backend
echo "🐍 Configurando backend..."
cd backend

# Crear entorno virtual si no existe
if [ ! -d "venv" ]; then
    echo "📦 Creando entorno virtual de Python..."
    python3 -m venv venv
fi

# Activar entorno virtual e instalar dependencias
source venv/bin/activate
pip install -r requirements.txt > /dev/null 2>&1

cd ..

echo ""
echo "✅ Configuración completada"
echo ""
echo "🌐 Iniciando servicios..."
echo ""
echo "📱 Frontend (Next.js): http://localhost:3000"
echo "🔌 Backend (Flask): http://localhost:5000"
echo ""
echo "⚠️  Presiona Ctrl+C para detener los servicios"
echo ""

# Función para manejar la señal de interrupción
cleanup() {
    echo ""
    echo "🛑 Deteniendo servicios..."
    kill $FRONTEND_PID $BACKEND_PID 2>/dev/null
    echo "✅ Servicios detenidos"
    exit 0
}

# Configurar trap para manejar Ctrl+C
trap cleanup SIGINT

# Iniciar frontend en segundo plano
echo "🚀 Iniciando frontend..."
npm run dev &
FRONTEND_PID=$!

# Esperar un poco para que el frontend se inicie
sleep 3

# Iniciar backend en segundo plano
echo "🚀 Iniciando backend..."
cd backend
source venv/bin/activate
python3 main.py &
BACKEND_PID=$!
cd ..

echo ""
echo "🎉 ¡Ambos servicios están ejecutándose!"
echo "📖 Revisa el README.md para más información sobre los endpoints disponibles"
echo ""
echo "💡 Presiona Ctrl+C para detener ambos servicios"

# Esperar a que los procesos terminen
wait $FRONTEND_PID $BACKEND_PID
