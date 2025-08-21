# 🔧 CONFIGURACIÓN DE VARIABLES DE ENTORNO EN VERCEL

## 📊 Estado Actual

✅ **Backend (Railway)**: ✅ FUNCIONANDO  
- URL: `https://heartfelt-insight-production-3a55.up.railway.app`  
- Estado: ✅ Healthy  
- CORS: ✅ Configurado para `https://signa-jhk5.vercel.app`  
- Datos: ✅ 3 marcas de prueba disponibles  

❌ **Frontend (Vercel)**: ❌ FALTA CONFIGURAR  
- URL: `https://signa-jhk5.vercel.app`  
- Problema: `NEXT_PUBLIC_API_URL` no configurada  
- Estado: ❌ Fetch failed (intenta usar localhost)  

---

## 🎯 SOLUCIÓN: Configurar Variable de Entorno

### **Método 1: Via Dashboard de Vercel (RECOMENDADO)**

#### Paso 1: Acceder a Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta
3. Busca el proyecto `signa-jhk5`

#### Paso 2: Configurar Variable de Entorno
1. Haz clic en **Settings** (pestaña)
2. En el menú lateral, busca **Environment Variables**
3. Haz clic en **Add New**
4. Completa:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://heartfelt-insight-production-3a55.up.railway.app`
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development
5. Haz clic en **Save**

#### Paso 3: Redeployar
1. Ve a **Deployments** (pestaña)
2. Encuentra el deployment más reciente
3. Haz clic en el menú **...** (tres puntos)
4. Selecciona **Redeploy**
5. Confirma el redeploy

---

### **Método 2: Via Git (ALTERNATIVO)**

Si prefieres usar Git para triggear el redeploy:

```bash
# Ejecuta esto DESPUÉS de configurar la variable en Vercel
git add .
git commit --allow-empty -m "Configure NEXT_PUBLIC_API_URL for production"
git push origin main
```

---

## ⏱️ Tiempo Estimado

- **Configuración**: 2-3 minutos
- **Redeploy**: 2-3 minutos
- **Total**: ~5 minutos

---

## ✅ Verificación Final

Una vez completado el redeploy:

1. **Ir a**: `https://signa-jhk5.vercel.app`
2. **Probar**:
   - ✅ Crear nueva marca
   - ✅ Editar marca existente  
   - ✅ Eliminar marca
   - ✅ Ver lista actualizada

---

## 🐛 Troubleshooting

**Si aún hay problemas después del redeploy:**

1. **Verificar variable**: Ve a Vercel Settings > Environment Variables
2. **Verificar sintaxis**: Debe ser exactamente `NEXT_PUBLIC_API_URL`
3. **Verificar valor**: Debe ser `https://heartfelt-insight-production-3a55.up.railway.app`
4. **Verificar environments**: Debe estar marcado Production

**Para verificar que la variable se aplicó:**
- Abre DevTools en el browser (F12)
- Ve a Console y busca errores de fetch
- Si aún dice "localhost:5000", el redeploy no cargó la variable

---

## 📞 URLs Importantes

- **Frontend**: https://signa-jhk5.vercel.app
- **Backend**: https://heartfelt-insight-production-3a55.up.railway.app  
- **Health Check**: https://heartfelt-insight-production-3a55.up.railway.app/health
- **Vercel Dashboard**: https://vercel.com/dashboard

---

## 🎉 Resultado Esperado

Después de la configuración, deberías poder:

✅ Ver las 3 marcas de prueba (Nike, Apple, Coca Cola)  
✅ Crear nuevas marcas sin errores  
✅ Editar marcas existentes  
✅ Eliminar marcas  
✅ Ver actualizaciones en tiempo real  
✅ Sin errores de "fetch failed" en console  
