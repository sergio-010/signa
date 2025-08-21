# 🚀 Scripts de Inicio Rápido

Este directorio contiene scripts para facilitar la ejecución del monorepo.

## 📄 Archivos Disponibles

### `setup.bat` (Windows)

Script de inicio automático para Windows que:

- ✅ Verifica dependencias (Node.js y Python)
- 📦 Instala dependencias del frontend y backend
- 🚀 Inicia ambos servicios en ventanas separadas

**Uso:**

```cmd
setup.bat
```

### `setup.sh` (macOS/Linux)

Script de inicio automático para sistemas Unix que:

- ✅ Verifica dependencias (Node.js y Python)
- 📦 Instala dependencias del frontend y backend
- 🚀 Inicia ambos servicios en un mismo terminal

**Uso:**

```bash
chmod +x setup.sh
./setup.sh
```

## 📋 Requisitos Previos

- **Node.js** 18 o superior
- **Python** 3.8 o superior
- **Git** (para clonar el repositorio)

## 🔧 Configuración Manual

Si prefieres configurar manualmente:

### Frontend (Next.js)

```bash
npm install
npm run dev
```

### Backend (Flask)

```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # Windows
source venv/bin/activate       # macOS/Linux
pip install -r requirements.txt
python main.py
```

## 🌐 URLs de los Servicios

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **Backend Health Check**: http://localhost:5000/health

## 🛑 Detener los Servicios

- **Windows**: Presiona `Ctrl+C` en cada ventana de terminal
- **macOS/Linux**: Presiona `Ctrl+C` en el terminal principal

## 🐛 Solución de Problemas

### Error de puertos ocupados

```bash
# Verificar qué proceso está usando el puerto
netstat -ano | findstr :3000  # Windows
lsof -i :3000                 # macOS/Linux

# Matar el proceso si es necesario
taskkill /PID <PID> /F        # Windows
kill -9 <PID>                 # macOS/Linux
```

### Error de dependencias de Python

```bash
# Actualizar pip
python -m pip install --upgrade pip

# Reinstalar dependencias
pip install -r requirements.txt --force-reinstall
```

### Error de dependencias de Node.js

```bash
# Limpiar cache de npm
npm cache clean --force

# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```
