@echo off
echo 🚀 Iniciando Sistema de Gestión de Marcas - Signa
echo.

echo 📦 Verificando dependencias...
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no está instalado. Por favor instala Node.js 18+ desde https://nodejs.org
    pause
    exit /b 1
)

REM Verificar si Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python no está instalado. Por favor instala Python 3.8+ desde https://python.org
    pause
    exit /b 1
)

echo ✅ Dependencias verificadas
echo.

REM Instalar dependencias del frontend si no existen
if not exist "node_modules" (
    echo 📥 Instalando dependencias del frontend...
    npm install
    if errorlevel 1 (
        echo ❌ Error instalando dependencias del frontend
        pause
        exit /b 1
    )
)

REM Configurar backend
echo 🐍 Configurando backend...
cd backend

REM Crear entorno virtual si no existe
if not exist "venv" (
    echo 📦 Creando entorno virtual de Python...
    python -m venv venv
)

REM Activar entorno virtual e instalar dependencias
call venv\Scripts\activate.bat
pip install -r requirements.txt >nul 2>&1

cd ..

echo.
echo ✅ Configuración completada
echo.
echo 🌐 Iniciando servicios...
echo.
echo 📱 Frontend (Next.js): http://localhost:3000
echo 🔌 Backend (Flask): http://localhost:5000
echo.
echo ⚠️  Presiona Ctrl+C en ambas ventanas para detener los servicios
echo.

REM Abrir dos terminales: una para frontend y otra para backend
start "Frontend - Next.js" cmd /k "npm run dev"
timeout /t 3 >nul

start "Backend - Flask" cmd /k "cd backend && venv\Scripts\activate.bat && python main.py"

echo 🎉 ¡Ambos servicios están iniciándose!
echo 👀 Revisa las ventanas que se abrieron para ver el estado de cada servicio
echo.
pause
