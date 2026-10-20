// /SIGEST/frontend/src/pages/LoginPage.jsx

import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    return (
        
        // Contenedor principal con el fondo del encabezado
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // Usamos la imagen de fondo:
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/header-bg.png)`,
            backgroundSize: 'cover', // Cubre todo el fondo
            backgroundPosition: 'center top', // Centra la imagen y la alinea arriba
            padding: '20px'
        }}>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
