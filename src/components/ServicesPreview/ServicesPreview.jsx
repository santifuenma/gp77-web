import React from 'react';
import { Link } from 'react-router-dom';
import { packages } from '../../data/packages';
import './ServicesPreview.css';

export default function ServicesPreview() {
    return (
        <section className="services-preview" id="servicios-preview">
            <div className="services-preview__header">
                <h2>NUESTROS <u>SERVICIOS</u></h2>
                <p>Soluciones a medida para cada etapa de tu proyecto</p>
            </div>

            <div className="services-preview__grid">
                {packages.map((pkg, index) => (
                    <div key={pkg.id} className="service-card">
                        <div className="service-card__icon">{pkg.icon}</div>
                        <span className="service-package-label">Servicio #{index + 1}</span>
                        <h3 className="service-card__title">{pkg.title}</h3>
                        <p className="service-card__target">
                            <strong>Dirigido a:</strong> {pkg.target.split('.')[0]}.
                        </p>
                        <div className="service-card__footer">
                            <Link to={`/servicios?id=${pkg.id}`} className="service-card__link">Ver detalles →</Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="services-preview__action">
                <Link to="/servicios" className="boton-conocemas">
                    Ver todos los servicios
                </Link>
            </div>
        </section>
    );
}
