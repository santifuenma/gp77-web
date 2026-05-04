import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import SmoothScroll from "./components/SmoothScroll";
import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes/AnimatedRoutes";
import "./styles/main.css";

// Componente de carga
const LoadingFallback = () => (
  <div style={{
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2"
  }}>
    <img
      src="/logo.png"
      alt="Cargando..."
      className="loading-logo"
      style={{ width: "80px", opacity: 0.8 }}
    />
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <SmoothScroll />
        <Navbar />
        <Suspense fallback={<LoadingFallback />}>
          <AnimatedRoutes />
        </Suspense>
        <Footer />
      </Router>
    </HelmetProvider>
  );
}

export default App;
