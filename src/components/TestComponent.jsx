import React, { useState, useEffect } from 'react';

const TestComponent = () => {
    const [status, setStatus] = useState('Probando...');
    const [error, setError] = useState(null);

    useEffect(() => {
        const testConnection = async () => {
            try {
                const response = await fetch('http://localhost:3000/');
                if (response.ok) {
                    setStatus('✅ Backend conectado correctamente');
                } else {
                    setStatus('❌ Backend respondió con error');
                }
            } catch (err) {
                setStatus('❌ Error de conexión al backend');
                setError(err.message);
            }
        };

        testConnection();
    }, []);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
            <h3>Prueba de Conexión</h3>
            <p><strong>Estado:</strong> {status}</p>
            {error && <p><strong>Error:</strong> {error}</p>}
            <p><strong>URL del Backend:</strong> http://localhost:3000</p>
            <p><strong>URL del Frontend:</strong> http://localhost:5173</p>
        </div>
    );
};

export default TestComponent;
