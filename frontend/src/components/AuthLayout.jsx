// frontend/src/components/AuthLayout.jsx   
// aplica herencia para el encabezado, imgen de enmedio, pie-pag.

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Assets } from './generalStyle/StylesConfig';

const AuthLayout = () => {
  return (
    <div className="app-container">
      {/* --- ENCABEZADO --- */}
      <header className="top-bar">
        <img src={Assets.header} alt="Encabezado TESJO" className="encabezado-img" />
      </header>

      {/* --- CONTENIDO CENTRAL (Donde se renderiza LoginForm o RegisterForm) --- */}
      <main className="main-content-area auth-panel-wrapper">
        <div className="auth-box-container">
            {/* Panel de Bienvenida (el panel azul) */}
            <div className="welcome-panel">
                <h1 className="welcome-title">BIENVENIDO</h1>
                <p className="description-text">
                    Programa para la Sistematización y Consolidación de la Estadística Institucional (**PSICE**)
                </p>
                <p className="sicei-text">
                    Sistema de Consulta de Estadísticas Institucionales
                </p>
                <img src={`${process.env.PUBLIC_URL}/assets/TESJo_ Blanco.png`} alt="Logo TESJO" className="logo-img" />
            </div>

            {/* Renderiza el Formulario (Login o Registro) */}
            <div className="login-form-panel">
                <Outlet /> 
            </div>
        </div>
      </main>

      {/* --- PIE DE PÁGINA --- */}
      <footer className="footer">
        <div className="copyright-text">
            © Copyright 2025 TecNM - Todos los Derechos Reservados
        </div>
        <img src={Assets.footer} alt="Pie de Página TESJO" className="footer-img" />
      </footer>
    </div>
  );
};

export default AuthLayout;