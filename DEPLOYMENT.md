# 🚀 Guía de Despliegue - Sistema de Gestión de Marcas

## 📋 **Resumen de Despliegue**

Este documento proporciona instrucciones paso a paso para desplegar el sistema completo en producción.

### 🌐 **URLs de Producción Esperadas:**
- **Frontend**: `https://signa-prueba-tecnica.vercel.app`
- **Backend**: `https://signa-backend.up.railway.app`

---

## 1️⃣ **Despliegue del Backend (Railway)**

### **Paso 1: Configurar Railway**
1. Ve a [Railway.app](https://railway.app)
2. Haz clic en "Login" y conecta tu cuenta GitHub
3. Haz clic en "New Project" → "Deploy from GitHub repo"
4. Selecciona el repositorio `sergio-010/signa`
5. En "Configure Build", selecciona el directorio `backend/`

### **Paso 2: Configurar Variables de Entorno**
En el dashboard de Railway, ve a "Variables" y agrega:

```env
DATABASE_URL=postgresql://neondb_owner:npg_TvSknfYmOX45@ep-withered-rain-admo5nv7-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
FLASK_ENV=production
FLASK_DEBUG=False
PORT=5000
```

### **Paso 3: Deploy**
1. Railway detectará automáticamente el `Procfile`
2. El build se iniciará automáticamente
3. Una vez completado, obtendrás una URL como: `https://signa-backend.up.railway.app`

---

## 2️⃣ **Despliegue del Frontend (Vercel)**

### **Paso 1: Instalar Vercel CLI**
```bash
npm install -g vercel
```

### **Paso 2: Login en Vercel**
```bash
vercel login
```

### **Paso 3: Configurar y Desplegar**
```bash
# Desde la raíz del proyecto
cd signa
vercel --prod

# Responder las preguntas:
# - Project name: signa-prueba-tecnica
# - Directory: ./
# - Link to existing project: No
```

### **Paso 4: Configurar Variables de Entorno**
1. Ve al dashboard de Vercel
2. Selecciona tu proyecto
3. Ve a "Settings" → "Environment Variables"
4. Agrega:
   ```
   NEXT_PUBLIC_API_URL = https://TU_URL_DE_RAILWAY
   ```

### **Paso 5: Redeploy**
```bash
vercel --prod
```

---

## 3️⃣ **Configuración Post-Despliegue**

### **Actualizar CORS en Backend**
1. Edita `backend/main.py`:
   ```python
   CORS(app, origins=[
       "http://localhost:3000", 
       "http://127.0.0.1:3000",
       "https://signa-prueba-tecnica.vercel.app",  # Tu URL de Vercel
       "https://*.vercel.app"  # Dominios de preview de Vercel
   ])
   ```

2. Commit y push los cambios:
   ```bash
   git add .
   git commit -m "update: Configurar CORS para producción"
   git push origin main
   ```

3. Railway hará redeploy automáticamente

---

## 4️⃣ **Verificación del Despliegue**

### **Probar Backend:**
```bash
curl https://TU_URL_DE_RAILWAY/health
curl https://TU_URL_DE_RAILWAY/api/brands
```

### **Probar Frontend:**
1. Ve a tu URL de Vercel
2. Verifica que la interfaz carga correctamente
3. Prueba crear, editar y eliminar marcas

---

## 🔧 **Solución de Problemas**

### **Error de Build en Vercel:**
```bash
# Limpiar cache local
rm -rf .next
npm run build
```

### **Error CORS:**
- Verificar que la URL del backend esté correcta en las variables de entorno
- Asegurar que CORS está configurado para la URL de Vercel

### **Error de Base de Datos:**
- Verificar que `DATABASE_URL` sea accesible desde Railway
- Comprobar que la IP de Railway esté permitida en Neon

---

## 📝 **Checklist Final**

- [ ] Backend desplegado en Railway
- [ ] Frontend desplegado en Vercel
- [ ] Variables de entorno configuradas
- [ ] CORS actualizado
- [ ] Base de datos PostgreSQL funcionando
- [ ] Pruebas de API exitosas
- [ ] Interfaz web funcionando
- [ ] URLs actualizadas en README

---

## 🌐 **URLs Finales para Documentación**

Una vez completado el despliegue, actualizar el README principal con:

```markdown
### 🌐 a) Link de Acceso Público

**🚀 Producción:**
- **Frontend**: https://signa-prueba-tecnica.vercel.app
- **Backend**: https://signa-backend.up.railway.app
```

---

**¡Despliegue Completado!** 🎉
