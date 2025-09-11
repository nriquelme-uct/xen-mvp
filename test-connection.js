// Script para probar la conexión al backend
const fetch = require('node-fetch');

const testConnection = async () => {
    try {
        console.log('🔍 Probando conexión al backend...');
        
        // Probar endpoint básico
        const response = await fetch('http://localhost:3000/');
        const data = await response.text();
        
        if (response.ok) {
            console.log('✅ Backend funcionando correctamente');
            console.log('📝 Respuesta:', data);
        } else {
            console.log('❌ Error en el backend:', response.status, response.statusText);
        }
        
        // Probar endpoint de registro
        console.log('\n🔍 Probando endpoint de registro...');
        const registerResponse = await fetch('http://localhost:3000/api/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'testuser',
                password: 'testpass123'
            })
        });
        
        const registerData = await registerResponse.json();
        console.log('📝 Respuesta del registro:', registerData);
        
    } catch (error) {
        console.log('❌ Error de conexión:', error.message);
        console.log('\n💡 Posibles soluciones:');
        console.log('1. Verifica que el backend esté ejecutándose en el puerto 3000');
        console.log('2. Verifica que MongoDB esté instalado y ejecutándose');
        console.log('3. Verifica que el archivo .env esté configurado correctamente');
    }
};

testConnection();
