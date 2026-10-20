import React, { useState } from 'react';
import { auth } from '../api/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { Assets } from './generalStyle/StylesConfig';

const Header = () => {
    const { user: globalUser } = useAuth();
    const [showMenu, setShowMenu] = useState(false);

    const displayName = globalUser
        ? (globalUser.displayName || globalUser.email.split('@')[0])
        : 'Invitado';

    const photoURL = globalUser?.photoURL || Assets.avatarDefault;

    const handleAIClick = () => {
        window.dispatchEvent(new CustomEvent('extraer-ia-global'));
    };

    const handleDownloadClick = () => {
        window.dispatchEvent(new CustomEvent('descargar-pdf-global'));
    };

    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <header className="site-header" style={{ position: 'relative', width: '100%', zIndex: 1000 }}>
            <img
                src={Assets.header}
                alt="Fondo Institucional"
                style={{ width: '100%', display: 'block' }}
            />

            <div
                className="site-header-actions"
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '20px',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    gap: '15px',
                    alignItems: 'center',
                    zIndex: 1005
                }}
            >
                <div
                    title="Asistente IA"
                    onClick={handleAIClick}
                    style={buttonStyle('linear-gradient(135deg, #1c3170 0%, #2d88ff 100%)')}
                >
                    IA
                </div>

                <div
                    title="Descargar Formatos"
                    onClick={handleDownloadClick}
                    style={buttonStyle('#1c3170')}
                >
                    ↓
                </div>

                <div
                    onClick={() => setShowMenu(!showMenu)}
                    style={{
                        position: 'relative',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}
                >
                    <div
                        style={{
                            textAlign: 'right',
                            color: 'white',
                            lineHeight: '1'
                        }}
                    >
                        <span
                            style={{
                                fontSize: '12px',
                                fontWeight: 'bold',
                                display: 'block'
                            }}
                        >
                            {globalUser ? `Hola, ${displayName}` : displayName}
                        </span>

                        <span
                            style={{
                                fontSize: '10px',
                                opacity: '0.8'
                            }}
                        >
                            {globalUser ? 'En línea' : 'Desconectado'}
                        </span>
                    </div>

                    <img
                        src={photoURL}
                        alt="Avatar"
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            border: '2px solid white',
                            objectFit: 'cover'
                        }}
                    />

                    {showMenu && (
                        <div style={menuStyle}>
                            <div
                                style={{
                                    padding: '10px',
                                    borderBottom: '1px solid #eee',
                                    fontWeight: 'bold',
                                    color: '#1c3170'
                                }}
                            >
                                {displayName}
                            </div>

                            <div style={menuItemStyle}>
                                ⚙️ Configuración
                            </div>

                            {globalUser && (
                                <div
                                    onClick={handleLogout}
                                    style={{
                                        ...menuItemStyle,
                                        color: 'red'
                                    }}
                                >
                                    🚪 Cerrar Sesión
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

const buttonStyle = (bg) => ({
    width: '38px',
    height: '38px',
    background: bg,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '2px solid white',
    boxShadow: '0px 2px 6px rgba(0,0,0,0.3)',
    pointerEvents: 'auto',
    color: 'white',
    fontWeight: 'bold'
});

const menuStyle = {
    position: 'absolute',
    top: '50px',
    right: '0',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
    width: '180px',
    overflow: 'hidden',
    zIndex: 1010
};

const menuItemStyle = {
    padding: '10px',
    fontSize: '14px',
    color: '#333',
    cursor: 'pointer',
    transition: 'background 0.2s'
};

export default Header;