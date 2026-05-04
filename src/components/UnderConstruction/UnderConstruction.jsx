import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './UnderConstruction.css';

export default function UnderConstruction() {
    return (
        <div className="under-construction">
            <Helmet>
                <title>En Construcción | Gerencia y Proyectos 77</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            <div className="tape-container">
                <div className="tape top"></div>
                <div className="tape bottom"></div>
            </div>

            <div className="content-box">
                <h1>¡OBRA EN CURSO!</h1>
                <p>
                    Esta sección está actualmente bajo construcción. <br />
                    Estamos preparando algo increíble para ti. <br />
                    ¡Vuelve pronto!
                </p>
                <Link to="/" className="home-btn">
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
}
