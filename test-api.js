// Test de configuración de API
console.log('🔧 Configuración de API:');
console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Simulación de brandService
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
console.log('URL Final del API:', API_BASE_URL);

// Test de conectividad
async function testConnection() {
  try {
    console.log('🔍 Probando conexión...');
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    console.log('✅ Conexión exitosa:', data);
  } catch (error) {
    console.error('❌ Error de conexión:', error);
  }
}

testConnection();
