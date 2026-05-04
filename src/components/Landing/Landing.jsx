import React, { useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion"; // Import motion
import "./Landing.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import ServicesPreview from "../../components/ServicesPreview/ServicesPreview";
import InstagramFeed from "../../components/InstagramFeed/InstagramFeed";
import Calculadora from "../../components/Calculadora/Calculadora";

import slide1 from "../../assets/img/LandingFinal.jpg";
import slide1Mobile from "../../assets/img/LandingHook_Mobile3.png";

import slide2 from "../../assets/img/Landing_Hook_Slide2.jpg";
import slide2Mobile from "../../assets/img/Landing_HookMobile_Slide2.jpg";

import slide3 from "../../assets/img/Landing_Hook_Slide3.jpg";
import slide3Mobile from "../../assets/img/Landing_HookMobile_Slide3.jpg";

import conoceImg from "../../assets/img/ConoceGP_img.jpg";

// Animation Variant
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function LandingPage() {
  const location = useLocation();

  // Scroll a la sección si hay hash en la URL
  useEffect(() => {
    if (location.hash) {
      const scrollToElement = () => {
        const element = document.getElementById(location.hash.substring(1));
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

      // Intentar scroll inmediato y luego reintentar para móviles (carga de imágenes)
      setTimeout(scrollToElement, 100);
      setTimeout(scrollToElement, 500);
      setTimeout(scrollToElement, 1000);
    }
  }, [location]);

  // Efecto: el CONTENEDOR hace zoom y sigue el mouse suavemente
  const handleMouseMove = useCallback((e) => {
    const el = e.currentTarget;                // el contenedor
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5..0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    el.style.transform = `scale(1.004) translate(${x * 4}px, ${y * 4}px)`; // ±10px
  }, []);

  const handleMouseLeave = useCallback((e) => {
    const el = e.currentTarget;
    el.style.transform = "scale(1) translate(0, 0)";
  }, []);

  return (
    <section className="landing">
      <Helmet>
        <title>Gerencia y Proyectos 77 | Inicio</title>
        <meta name="description" content="Empresa de arquitectura especializada en diseño, gerencia y construcción de espacios soñados." />
      </Helmet>

      <motion.div
        className="landing-hook"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="landing-title">
          <h1>
            TRANSFORMAMOS TUS IDEAS <br /> EN ESPACIOS SOÑADOS
          </h1>

          <Link to="/contacto" className="boton-contacto">
            Contrata un proyecto
          </Link>

        </div>

        <Swiper
          modules={[EffectFade, Navigation, Pagination, Autoplay]}
          effect="fade"
          navigation
          pagination={{ clickable: true }}
          loop
          speed={800}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="landing-swiper"
        >
          <SwiperSlide>
            <img className="Slide1" src={slide1} alt="Slide 1" />
            <img className="Slide1Mobile" src={slide1Mobile} alt="Slide 1 mobile" />
          </SwiperSlide>

          <SwiperSlide>
            <img className="Slide2" src={slide2} alt="Slide 2" />
            <img className="Slide2Mobile" src={slide2Mobile} alt="Slide 2 mobile" />
          </SwiperSlide>

          <SwiperSlide>
            <img className="Slide3" src={slide3} alt="Slide 3" />
            <img className="Slide3Mobile" src={slide3Mobile} alt="Slide 3 mobile" />
          </SwiperSlide>
        </Swiper>

      </motion.div>

      <motion.div
        className="landing-SomosGP"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div className="landing-conoceGP">
          {/* Columna texto */}
          <div className="landing-conocenos">
            <h2>SOMOS <u>GP77</u></h2>

            <p className="landing-conocenosP1">
              Gerencia y Proyectos 77, una <b>empresa de arquitectura y construcción</b> con más de 20 años de experiencia en el diseño
              de proyectos, gerencia, y construcción de obras.
            </p>

            <p className="landing-conocenosP2">
              Nos especializamos en la <b>creación</b> y la <b>transformación</b> de espacios, cubriendo las
              necesidades de nuestros clientes.
            </p>

            <Link to="/nosotros" className="boton-conocemas">
              Conoce más
            </Link>

            {/* Contenedor con efecto (zoom + follow) */}
            <div
              className="Landing-ConocenosImg-mobile"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img src={conoceImg} alt="Conócenos GP" />
            </div>
          </div>

          {/* Columna imagen desktop */}
          <div className="Landing-ConocenosImg">
            <img src={conoceImg} alt="Conócenos GP" />
          </div>
        </div>
      </motion.div>

      {/* Preview de Paquetes de Servicios */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <ServicesPreview />
      </motion.div>

      {/* Calculadora de Proyectos */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <Calculadora />
      </motion.div>

      {/* Feed de Instagram */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <InstagramFeed />
      </motion.div>

    </section>
  );
}
