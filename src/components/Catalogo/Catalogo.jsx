import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Helmet } from "react-helmet-async";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Catalogo.css";

export default function Catalogo() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);

  // Datos de proyectos
  const projects = [
    {
      id: 1,
      title: "Proyecto Residencial 1",
      category: "residencial",
      images: [
        "/img/Catalogo/Altamira1.jpg",
        "/img/proyecto1-2.jpg",
        "/img/proyecto1-3.jpg",
      ],
    },
    {
      id: 2,
      title: "Proyecto Comercial 1",
      category: "comercial",
      images: [
        "/img/proyecto2-1.jpg",
        "/img/proyecto2-2.jpg",
        "/img/proyecto2-3.jpg",
      ],
    },
    {
      id: 3,
      title: "Proyecto Industrial 1",
      category: "industrial",
      images: [
        "/img/proyecto3-1.jpg",
        "/img/proyecto3-2.jpg",
        "/img/proyecto3-3.jpg",
      ],
    },
  ];

  const openModal = (images) => {
    setModalImages(images);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImages([]);
  };

  return (
    <section className="catalogo-section">
      <Helmet>
        <title>Catálogo | Gerencia y Proyectos 77</title>
        <meta name="description" content="Explora nuestro portafolio de proyectos residenciales, comerciales e industriales." />
      </Helmet>

      <h1>CATÁLOGO DE PROYECTOS</h1>

      {/* Botones de filtro */}
      <div className="filter-buttons">
        <button
          className={activeCategory === "all" ? "active" : ""}
          onClick={() => setActiveCategory("all")}
        >
          Todos
        </button>
        <button
          className={activeCategory === "residencial" ? "active" : ""}
          onClick={() => setActiveCategory("residencial")}
        >
          Residenciales
        </button>
        <button
          className={activeCategory === "comercial" ? "active" : ""}
          onClick={() => setActiveCategory("comercial")}
        >
          Comerciales
        </button>
        <button
          className={activeCategory === "industrial" ? "active" : ""}
          onClick={() => setActiveCategory("industrial")}
        >
          Industriales
        </button>
      </div>

      {/* Grid de proyectos */}
      <div className="projects-grid">
        {projects
          .filter(
            (p) => activeCategory === "all" || p.category === activeCategory
          )
          .map((project) => (
            <div
              key={project.id}
              className={`project-card ${project.category}`}
              onClick={() => openModal(project.images)}
            >
              <img src={project.images[0]} alt={project.title} />
              <h3>{project.title}</h3>
            </div>
          ))}
      </div>

      {/* Modal con Swiper */}
      {modalOpen && (
        <div className="modal">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <Swiper
            modules={[Navigation, Pagination]}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            className="modal-swiper"
          >
            {modalImages.map((src, i) => (
              <SwiperSlide key={i}>
                <img src={src} alt={`slide-${i}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
}
