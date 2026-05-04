import React, { useState } from 'react';
// import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CloseRounded } from '@mui/icons-material';
import './Proyectos.css';

// IMÁGENES DE PROYECTOS
// Para agregar tus propias imágenes:
// 1. Guarda tus fotos en la carpeta src/assets/img/Proyectos
// 2. Importalas aquí arriba (ej: import casaLomas from '../assets/img/Proyectos/casaLomas.jpg')
// 3. Usa la variable importada en projectsData

// Cocuizas
import cocuizas1 from '../assets/img/Proyectos/Cocuizas/1.jpg';
import cocuizas2 from '../assets/img/Proyectos/Cocuizas/2.jpg';
import cocuizas3 from '../assets/img/Proyectos/Cocuizas/3.jpg';
import cocuizas4 from '../assets/img/Proyectos/Cocuizas/4.jpg';
import cocuizas5 from '../assets/img/Proyectos/Cocuizas/5.jpg';
import cocuizas6 from '../assets/img/Proyectos/Cocuizas/6.jpg';
import cocuizas7 from '../assets/img/Proyectos/Cocuizas/7.jpg';

// Cocina Sebucan
import sebucan1 from '../assets/img/Proyectos/Cocina Sebucan/1.jpg';
import sebucan2 from '../assets/img/Proyectos/Cocina Sebucan/2.jpg';
import sebucan3 from '../assets/img/Proyectos/Cocina Sebucan/3.jpg';
import sebucan4 from '../assets/img/Proyectos/Cocina Sebucan/4.jpg';
import sebucan5 from '../assets/img/Proyectos/Cocina Sebucan/5.jpg';
import sebucan6 from '../assets/img/Proyectos/Cocina Sebucan/6.jpg';
import sebucan7 from '../assets/img/Proyectos/Cocina Sebucan/7.jpg';


// Parrillera Sebucan
import parrillera1 from '../assets/img/Proyectos/Parrilera Sebucan/1.jpg';
import parrillera2 from '../assets/img/Proyectos/Parrilera Sebucan/2.jpg';
import parrillera3 from '../assets/img/Proyectos/Parrilera Sebucan/3.jpg';
import parrillera4 from '../assets/img/Proyectos/Parrilera Sebucan/4.jpg';

// Oficina CCCT
import ccct1 from '../assets/img/Proyectos/Oficina CCCT/1.jpg';
import ccct2 from '../assets/img/Proyectos/Oficina CCCT/2.jpg';
import ccct3 from '../assets/img/Proyectos/Oficina CCCT/3.jpg';
import ccct4 from '../assets/img/Proyectos/Oficina CCCT/4.jpg';
import ccct5 from '../assets/img/Proyectos/Oficina CCCT/5.jpg';
import ccct6 from '../assets/img/Proyectos/Oficina CCCT/6.jpg';
import ccct7 from '../assets/img/Proyectos/Oficina CCCT/7.jpg';
import ccct8 from '../assets/img/Proyectos/Oficina CCCT/8.jpg';
import ccct9 from '../assets/img/Proyectos/Oficina CCCT/9.jpg';
import ccct10 from '../assets/img/Proyectos/Oficina CCCT/10.jpg';
import ccct11 from '../assets/img/Proyectos/Oficina CCCT/11.jpg';


// Terraza Altolar
import altolar1 from '../assets/img/Proyectos/Terraza Altolar/1.jpg';
import altolar2 from '../assets/img/Proyectos/Terraza Altolar/2.jpg';
import altolar3 from '../assets/img/Proyectos/Terraza Altolar/3.jpg';
import altolar4 from '../assets/img/Proyectos/Terraza Altolar/4.jpg';
import altolar5 from '../assets/img/Proyectos/Terraza Altolar/5.jpg';
import altolar6 from '../assets/img/Proyectos/Terraza Altolar/6.jpg';
import altolar7 from '../assets/img/Proyectos/Terraza Altolar/7.jpg';

// Terrazas del Avila
import terrazas1 from '../assets/img/Proyectos/Terrazas del Ávila/1.jpg';
import terrazas2 from '../assets/img/Proyectos/Terrazas del Ávila/2.jpg';
import terrazas3 from '../assets/img/Proyectos/Terrazas del Ávila/3.jpeg';
import terrazas4 from '../assets/img/Proyectos/Terrazas del Ávila/4.jpg';
import terrazas5 from '../assets/img/Proyectos/Terrazas del Ávila/5.jpeg';
import terrazas6 from '../assets/img/Proyectos/Terrazas del Ávila/6.jpg';
import terrazas7 from '../assets/img/Proyectos/Terrazas del Ávila/7.jpg';
import terrazas8 from '../assets/img/Proyectos/Terrazas del Ávila/8.jpg';
import terrazas9 from '../assets/img/Proyectos/Terrazas del Ávila/9.jpeg';
import terrazas10 from '../assets/img/Proyectos/Terrazas del Ávila/10.jpg';
import terrazas11 from '../assets/img/Proyectos/Terrazas del Ávila/11.jpg';
import terrazas12 from '../assets/img/Proyectos/Terrazas del Ávila/12.jpg';
import terrazas13 from '../assets/img/Proyectos/Terrazas del Ávila/13.jpg';
import terrazas14 from '../assets/img/Proyectos/Terrazas del Ávila/14.PNG';

// Quinta La Chara
import chara1 from '../assets/img/Proyectos/La Chara/1.jpg';
import chara2 from '../assets/img/Proyectos/La Chara/2.JPEG';
import chara3 from '../assets/img/Proyectos/La Chara/3.JPEG';
import chara4 from '../assets/img/Proyectos/La Chara/4.jpg';
import chara5 from '../assets/img/Proyectos/La Chara/5.jpg';
import chara6 from '../assets/img/Proyectos/La Chara/6.jpg';

// Cocina Los Caobos
import caobos1 from '../assets/img/Proyectos/Cocina Los Caobos/1.png';
import caobos2 from '../assets/img/Proyectos/Cocina Los Caobos/2.png';
import caobos3 from '../assets/img/Proyectos/Cocina Los Caobos/3.png';
import caobos4 from '../assets/img/Proyectos/Cocina Los Caobos/4.png';

// Datos de ejemplo para proyectos (Placeholder)
const projectsData = [
    {
        id: 1,
        title: "Área Social Las Cocuizas",
        location: "Caracas, Venezuela",
        year: "Noviembre 2024",
        description: "Diseño y construcción de área social para vivienda unifamiliar.",
        cover: cocuizas1,
        images: [
            cocuizas2,
            cocuizas3,
            cocuizas4,
            cocuizas5,
            cocuizas6,
            cocuizas7
        ]
    },
    {
        id: 2,
        title: "Proyecto Cocina Sebucán",
        location: "Caracas, Venezuela",
        year: "Julio 2025",
        description: "Proyecto de Diseño cocina integrada para vivienda.",
        cover: sebucan1,
        images: [
            sebucan2,
            sebucan3,
            sebucan4,
            sebucan5,
            sebucan6,
            sebucan7
        ]
    },
    {
        id: 3,
        title: "Proyecto Parrillera Sebucán",
        location: "Caracas, Venezuela",
        year: "Julio 2025",
        description: "Proyecto de Diseño terraza-parrillera para vivienda.",
        cover: parrillera1,
        images: [
            parrillera2,
            parrillera3,
            parrillera4
        ]
    },
    {
        id: 4,
        title: "Proyecto Oficina CCCT",
        location: "Caracas, Venezuela",
        year: "Septiembre 2025",
        description: "Proyecto de Arquitectura despacho de abogados.",
        cover: ccct1,
        images: [
            ccct2,
            ccct3,
            ccct4,
            ccct5,
            ccct6,
            ccct7,
            ccct8,
            ccct9,
            ccct10,
            ccct11
        ]
    },
    {
        id: 5,
        title: "Proyecto Terraza Altolar",
        location: "Caracas, Venezuela",
        year: "Marzo 2025",
        description: "Proyecto de Diseño hall de entrada y terraza para vivienda.",
        cover: altolar2,
        images: [
            altolar1,
            altolar3,
            altolar4,
            altolar5,
            altolar6,
            altolar7
        ]
    },
    {
        id: 6,
        title: "Apartamento Terrazas del Ávila",
        location: "Caracas, Venezuela",
        year: "Febrero 2024",
        description: "Proyecto de Diseño, Gerencia de Obra y Remodelación total de apartamento.",
        cover: terrazas2,
        images: [
            terrazas3,
            terrazas4,
            terrazas5,
            terrazas6,
            terrazas7,
            terrazas8,
            terrazas9,
            terrazas10,
            terrazas11,
            terrazas12,
            terrazas13,
            terrazas14
        ]
    },
    {
        id: 7,
        title: "Quinta La Chara",
        location: "Caracas, Venezuela",
        year: "Enero 2024",
        description: "Proyecto de Arquitectura y Remodelación de baño.",
        cover: chara1,
        images: [
            chara2,
            chara3,
            chara4,
            chara5,
            chara6
        ]
    },
    {
        id: 8,
        title: "Cocina Los Caobos",
        location: "Caracas, Venezuela",
        year: "Marzo2023",
        description: "Proyecto de Diseño y Remodelación de Cocina.",
        cover: caobos1,
        images: [
            caobos2,
            caobos3,
            caobos4
        ]
    }
];

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};



export default function Proyectos() {
    const [selectedProject, setSelectedProject] = useState(null);
    const modalRef = React.useRef(null); // Ref for the modal container

    const openProject = (project) => {
        setSelectedProject(project);
        document.body.style.overflow = 'hidden';
        if (window.lenis) window.lenis.stop();
    };

    const closeProject = () => {
        setSelectedProject(null);
        document.body.style.overflow = 'auto';
        if (window.lenis) window.lenis.start();
    };

    // Lenis integration removed in favor of native scroll for stability
    // The global Lenis is paused in openProject and resumed in closeProject


    return (
        <>
            <Helmet>
                <title>Nuestros Proyectos | GP77 Arquitectura</title>
                <meta name="description" content="Explora nuestro portafolio de proyectos de arquitectura y construcción." />
            </Helmet>

            <div className="projects-page">
                {/* ... existing hero and grid ... */}
                <motion.div
                    className="projects-hero"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                >
                    <div className="projects-hero__content">
                        <h1>Nuestros Proyectos</h1>
                        <p>Explora nuestra colección de proyectos.</p>
                    </div>
                </motion.div>

                <motion.div
                    className="projects-grid"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    {projectsData.map((project) => (
                        <motion.div
                            key={project.id}
                            className="project-card"
                            variants={fadeInUp}
                            onClick={() => openProject(project)}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <img src={project.cover} alt={project.title} className="project-card__image" loading="lazy" />
                            <div className="project-card__overlay">
                                <h3 className="project-card__title">{project.title}</h3>
                                <p className="project-card__location">{project.location}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            className="project-modal-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeProject}
                        >
                            <motion.div
                                className="project-modal"
                                ref={modalRef} // Attach ref here
                                onClick={(e) => e.stopPropagation()}
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                data-lenis-prevent // Prevent global Lenis from hijacking scroll here
                            >
                                <button className="modal-close-btn" onClick={closeProject}>
                                    <CloseRounded sx={{ fontSize: 28 }} />
                                </button>

                                <div className="modal-header">
                                    <h2>{selectedProject.title}</h2>
                                    <p className="modal-subtitle">
                                        {selectedProject.location} <span style={{ margin: "0 8px", opacity: 0.5 }}>|</span> {selectedProject.year}
                                    </p>
                                    <p className="modal-description">{selectedProject.description}</p>
                                </div>

                                <div className="modal-gallery">
                                    <img src={selectedProject.cover} alt={`${selectedProject.title} Main`} className="modal-image" />
                                    {selectedProject.images.map((img, index) => (
                                        <img key={index} src={img} alt={`${selectedProject.title} Detail ${index + 1}`} className="modal-image" loading="lazy" />
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
