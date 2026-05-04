import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { packages } from '../data/packages'; // Ensure this matches your project structure
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { motion } from 'framer-motion';
import './Services.css';

// Animation Variant
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Services() {
    const [expandedId, setExpandedId] = useState(null);
    const location = useLocation();

    // Check for ID in URL query params on mount
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('id');
        if (id) {
            const numericId = parseInt(id, 10);
            setExpandedId(numericId);

            // Función de scroll con offset y retry para móviles
            const scrollToService = () => {
                const element = document.getElementById(`service-${numericId}`);
                if (element) {
                    const headerOffset = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            };

            // Intentos múltiples para asegurar que funcione en móvil tras renderizado
            setTimeout(scrollToService, 100);
            setTimeout(scrollToService, 500);
            setTimeout(scrollToService, 1000);
        }
    }, [location]);

    const toggleService = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="services-page">
            <motion.div
                className="services-hero"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
            >
                <div className="services-hero__content">
                    <h1>Nuestros Servicios</h1>
                    <p>Soluciones integrales de arquitectura y construcción diseñadas para cada etapa de tu inversión.</p>
                </div>
            </motion.div>

            <div className="services-list">
                {packages.map((pkg, index) => (
                    <motion.div
                        key={pkg.id}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={fadeInUp}
                    >
                        <div
                            id={`service-${pkg.id}`}
                            className={`service-card-item ${expandedId === pkg.id ? 'expanded' : ''}`}
                            onClick={() => toggleService(pkg.id)}
                        >
                            <div className="service-card-header">
                                <div className="service-icon-wrapper">
                                    {pkg.icon}
                                </div>
                                <div className="service-info-preview">
                                    <span className="service-package-label">Servicio #{index + 1}</span>
                                    <h2>{pkg.title}</h2>
                                    <p className="service-target-preview">
                                        <strong>Dirigido a:</strong> {pkg.target}
                                    </p>
                                </div>
                                <div className="service-toggle-icon">
                                    {expandedId === pkg.id ? '−' : '+'}
                                </div>
                            </div>

                            <div className="service-card-body">
                                <div className="service-body-content">
                                    {pkg.offer && (
                                        <div className="detail-section">
                                            <h3>Ofrecemos</h3>
                                            <p>{pkg.offer}</p>
                                        </div>
                                    )}

                                    {pkg.scope && (
                                        <div className="detail-section">
                                            <h3>Alcance de la asesoría</h3>
                                            <ul className="service-list-items">
                                                {pkg.scope.map((item, index) => (
                                                    <li key={index} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {pkg.exclusions && (
                                        <div className="detail-section">
                                            <h3>Exclusiones del servicio</h3>
                                            <ul className="service-list-items">
                                                {pkg.exclusions.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="detail-section">
                                        <h3>Detalle de la entrega</h3>
                                        {Array.isArray(pkg.deliverables) ? (
                                            <ul className="service-list-items">
                                                {pkg.deliverables.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>{pkg.deliverables}</p>
                                        )}
                                    </div>

                                    {pkg.priceDetails && (
                                        <div className="detail-section price-section">
                                            <h3>Honorarios profesionales</h3>
                                            <ul className="price-details-list">
                                                {pkg.priceDetails.map((detail, index) => (
                                                    <li key={index}>{detail}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {(pkg.note || pkg.disclaimer) && (
                                        <div className="service-notes">
                                            {pkg.note && <p className="note-item"><strong>Nota:</strong> {pkg.note}</p>}
                                            {pkg.disclaimer && <p className="disclaimer-item"><strong>Importante:</strong> {pkg.disclaimer}</p>}
                                        </div>
                                    )}

                                    <div className="service-actions">
                                        <a href={pkg.id === 5 ? "/#calculadora" : "/contacto"} className="cta-button">{pkg.id === 5 ? "Calcula tu proyecto" : "Cotizar este servicio"}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="services-cta"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <h2>¿Tienes dudas sobre qué servicio necesitas?</h2>
                <p>Contáctanos y te asesoramos gratuitamente para definir el mejor camino.</p>
                <a href="/contacto" className="cta-button boton-contacto">Hablemos</a>
            </motion.div>
        </div>
    );
}
