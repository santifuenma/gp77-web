import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/img/LogoGP.png";
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Cierra el menú cuando la ruta cambia
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header className="navbar">
      <div className="nav-left">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      <div className={`nav-center ${menuOpen ? 'open' : ''}`}>
        <Link to="/proyectos">PROYECTOS</Link>
        <Link to="/servicios">SERVICIOS</Link>
        <Link to="/nosotros">NOSOTROS</Link>
      </div>

      <div className={`nav-right ${menuOpen ? 'open' : ''}`}>
        <Link to="/contacto">CONTÁCTANOS</Link>
      </div>
    </header>
  );
}
