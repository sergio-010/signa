// Script para verificar la configuración del frontend en producción
console.log('=== VERIFICACIÓN DE CONFIGURACIÓN DEL FRONTEND ===');
console.log('');
console.log('1. URL de la API que está usando el frontend:');
console.log('   NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL || 'No configurada - usando localhost:5000');
console.log('');
console.log('2. URL de Railway (backend):');
console.log('   https://heartfelt-insight-production-3a55.up.railway.app');
console.log('');
console.log('3. URL de Vercel (frontend):');
console.log('   https://signa-jhk5.vercel.app');
console.log('');

// Simulación de la configuración que debería tener
const EXPECTED_API_URL = 'https://heartfelt-insight-production-3a55.up.railway.app';
const CURRENT_API_URL = process.env.NEXT_PUBLIC_API_URL;

if (CURRENT_API_URL === EXPECTED_API_URL) {
  console.log('✅ CONFIGURACIÓN CORRECTA: La variable de entorno apunta al backend de Railway');
} else {
  console.log('❌ CONFIGURACIÓN INCORRECTA:');
  console.log(`   Esperado: ${EXPECTED_API_URL}`);
  console.log(`   Actual: ${CURRENT_API_URL || 'undefined'}`);
  console.log('');
  console.log('📝 ACCIÓN REQUERIDA:');
  console.log('   Configurar NEXT_PUBLIC_API_URL en Vercel con el valor correcto');
}
