import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArchitectureRounded, EngineeringRounded, FoundationRounded } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "./Nosotros.css";

// Assets
import heroBg from "../../assets/img/YayiDulceCla_Nosotros.jpeg";
import historyImg from "../../assets/img/YayiCla_Nosotros.jpeg";
import teamImg from "../../assets/img/EquipoGP_Nosotros.jpeg";
import slide3 from "../../assets/img/PlanosClaYayi_Nosotros.jpg";
import slide4 from "../../assets/img/EquipoGP2_Nosotros.jpeg";
import MisionVision from "../../assets/img/MisionVision_Nosotros.jpeg";
import DesignPillar from "../../assets/img/DesignPillar.png";
import Construccion from "../../assets/img/ConstruccionPilar_Nosotros.jpeg";
import Gerencia from "../../assets/img/GerenciaPilar_Nosotros.jpeg";

// Vars for animations
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Nosotros() {

    // State for Pillars Auto-Play
    const [activePillarIndex, setActivePillarIndex] = React.useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Auto-play effect: Resets whenever activePillarIndex changes (manual or auto)
    useEffect(() => {
        const interval = setInterval(() => {
            setActivePillarIndex((prev) => (prev + 1) % 3);
        }, 8000); // Change every 8 seconds

        return () => clearInterval(interval);
    }, [activePillarIndex]); // Dependency on index ensures timer resets on manual interaction

    return (
        <div className="nosotros-page">
            <Helmet>
                <title>Gerencia y Proyectos 77 | Nosotros</title>
                <meta name="description" content="Conoce a GP77, excelencia en diseño, gerencia y construcción de espacios soñados." />
            </Helmet>

            {/* ... sections ... */}

            {/* ... omitted sections (Hero, History, Team, Intro, Mission) ... */}

            {/* Note: I need to recreate the sections I'm skipping if I use replace_file_content heavily or just target the Philosophy section. 
               The instruction says EndLine 265. I should be careful to target correctly. 
               It seems safe to just replace the Philosophy Section logic and the storage logic at top.
            */}


            {/* === HERO SECTION (Services Style) === */}
            <section className="nosotros-hero">
                <div className="nosotros-hero-content">
                    <motion.h1
                        className="nosotros-hero-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Quiénes Somos
                    </motion.h1>
                    <motion.div
                        className="nosotros-hero-subtitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Pasión por el diseño, rigor en la construcción. Transformando ideas en realidades tangibles.
                    </motion.div>
                </div>
            </section>


            {/* === HISTORY (50/50 Split) === */}
            <section className="split-section">
                {/* Left: Content */}
                <div className="split-content-container">
                    <div className="split-decorative-number">01</div>
                    <motion.div
                        className="split-content"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h3>Nuestra Historia</h3>
                        <p>
                            Claudia y Adriana llevan más de <b>21 años trabajando juntas.</b> Una trayectoria que les ha permitido consolidar una metodología basada en la confianza, el rigor técnico y la coherencia absoluta entre lo que se dibuja y lo que se construye.
                        </p>
                        <p>
                            Hace 15 años fundaron <b>GP77</b>, integrando su experiencia arquitectónica con formación en Gerencia de Empresas, para ofrecer un servicio completo que va más allá del diseño: ofrecemos certeza.
                        </p>
                    </motion.div>
                </div>
                {/* Right: Carousel */}
                <div className="split-image-container">
                    <Swiper
                        modules={[EffectFade, Autoplay, Pagination]}
                        effect="fade"
                        speed={2000}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        loop={true}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        className="creative-carousel"
                    >
                        <SwiperSlide>
                            <img src={historyImg} alt="Historia GP77 1" className="creative-slide-img" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={slide3} alt="Historia GP77 2" className="creative-slide-img" />
                        </SwiperSlide>

                    </Swiper>
                </div>
            </section>


            {/* === TEAM (50/50 Split Reverse, Dark Bg) === */}
            <section className="split-section reverse dark-bg">
                {/* Left: Content (Actually right due to reverse) */}
                <div className="split-content-container">
                    <div className="split-decorative-number">02</div>
                    <motion.div
                        className="split-content"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h3>El Equipo GP77</h3>
                        <p>
                            Liderado por las arquitectos <b>Claudia y Adriana</b>, egresadas de la UD9 – UCV.
                        </p>
                        <p>
                            Su trabajo conjunto se basa en una visión compartida de la arquitectura como un proceso continuo. Participando activamente desde el primer boceto hasta la entrega de la obra, asegurando que cada detalle técnico, estético y funcional se cumpla.
                        </p>
                    </motion.div>
                </div>
                {/* Right: Carousel */}
                <div className="split-image-container">
                    <Swiper
                        modules={[EffectFade, Autoplay, Pagination]}
                        effect="fade"
                        speed={2000}
                        autoplay={{ delay: 6000, disableOnInteraction: false }}
                        loop={true}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        className="creative-carousel"
                    >
                        <SwiperSlide>
                            <img src={teamImg} alt="Equipo GP77 1" className="creative-slide-img" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={heroBg} alt="Equipo GP77 2" className="creative-slide-img" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={slide4} alt="Historia GP77 3" className="creative-slide-img" />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>

            {/* === INTRO SECTION (Side-by-Side) === */}
            <section className="nosotros-intro-section">
                <div className="intro-split-layout">
                    <motion.div
                        className="intro-manifesto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2>Arquitectura<br /><span className="intro-manifesto-highlight">con Propósito.</span></h2>
                    </motion.div>

                    <motion.div
                        className="intro-text-block"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={fadeInUp}
                    >
                        <p className="nosotros-intro-text">
                            En <span className="strong-accent">GP77</span> creemos que un gran diseño solo alcanza su máximo potencial cuando se construye con la misma pasión con la que fue concebido. Somos una firma donde el <b>diseño, la gestión y la construcción</b> trabajan como un ecosistema unificado para garantizar resultados fieles a la visión original.
                        </p>
                    </motion.div>
                </div>
            </section>


            {/* === MISSION & VISION (Banner) === */}
            <section className="mission-vision-banner" style={{ backgroundImage: `url(${MisionVision})` }}>
                <div className="mission-vision-overlay"></div>
                <div className="mission-vision-container">
                    <motion.div
                        className="mv-item"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3>Misión</h3>
                        <h4>Nuestro Norte</h4>
                        <p>
                            Transformar el diseño arquitectónico en realidad, brindando tranquilidad, seguridad y excelencia técnica. Gestionamos y construimos espacios donde la obra final es el reflejo fiel del proyecto concebido.
                        </p>
                    </motion.div>

                    <motion.div
                        className="mv-item"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3>Visión</h3>
                        <h4>El Futuro</h4>
                        <p>
                            Ser el referente donde el diseño y la construcción se complementan perfectamente. Demostrar que una obra excepcional es siempre resultado de un diseño sólido y la participación activa del arquitecto.
                        </p>
                    </motion.div>
                </div>
            </section>


            {/* === PHILOSOPHY (Interactive Pillars) === */}
            <section className="philosophy-section">
                <div className="section-head-bento">
                    <h2>Nuestra <u>Filosofía</u></h2>
                </div>

                <div className="philosophy-pillars-container">
                    {/* PILLAR 1: DISEÑO */}
                    <motion.div
                        className={`pillar-item ${activePillarIndex === 0 ? 'active' : ''}`}
                        onMouseEnter={() => setActivePillarIndex(0)}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="pillar-background" style={{ backgroundImage: `url(${DesignPillar})` }}></div>
                        {/* Progress Bar (Visible on active) */}
                        {activePillarIndex === 0 && (
                            <div className="pillar-progress-bar">
                                <div className="progress-fill"></div>
                            </div>
                        )}
                        <div className="pillar-content">
                            <div className="pillar-icon">
                                <ArchitectureRounded sx={{ fontSize: 40 }} />
                            </div>
                            <h3>Diseño</h3>
                            <p className="pillar-text">Donde nace la identidad y el alma del proyecto.</p>
                        </div>
                    </motion.div>

                    {/* PILLAR 2: GERENCIA */}
                    <motion.div
                        className={`pillar-item ${activePillarIndex === 1 ? 'active' : ''}`}
                        onMouseEnter={() => setActivePillarIndex(1)}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="pillar-background" style={{ backgroundImage: `url(${Gerencia})` }}></div>
                        {activePillarIndex === 1 && (
                            <div className="pillar-progress-bar">
                                <div className="progress-fill"></div>
                            </div>
                        )}
                        <div className="pillar-content">
                            <div className="pillar-icon">
                                <EngineeringRounded sx={{ fontSize: 40 }} />
                            </div>
                            <h3>Gerencia</h3>
                            <p className="pillar-text">Donde optimizamos tiempos, costos y recursos.</p>
                        </div>
                    </motion.div>

                    {/* PILLAR 3: CONSTRUCCIÓN */}
                    <motion.div
                        className={`pillar-item ${activePillarIndex === 2 ? 'active' : ''}`}
                        onMouseEnter={() => setActivePillarIndex(2)}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="pillar-background" style={{ backgroundImage: `url(${Construccion})` }}></div>
                        {activePillarIndex === 2 && (
                            <div className="pillar-progress-bar">
                                <div className="progress-fill"></div>
                            </div>
                        )}
                        <div className="pillar-content">
                            <div className="pillar-icon">
                                <FoundationRounded sx={{ fontSize: 40 }} />
                            </div>
                            <h3>Construcción</h3>
                            <p className="pillar-text">Donde garantizamos la fidelidad del proyecto y cuidamos cada detalle.</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* === CTA SECTION (Call to Action) === */}
            <section className="cta-block">
                <h2>¿List@ para construir tu visión?</h2>
                <p>Estamos comprometidos en convertir tus ideas en espacios extraordinarios.</p>
                <Link to="/contacto" className="cta-btn">
                    Contáctanos
                </Link>
            </section>

        </div>
    );
}
