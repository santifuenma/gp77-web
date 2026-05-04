import React, { lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../PageTransition/PageTransition";

// Import Pages (Lazy Loading moved here)
const LandingPage = lazy(() => import("../Landing/Landing"));
const Contacto = lazy(() => import("../../pages/Contacto"));
const UnderConstruction = lazy(() => import("../UnderConstruction/UnderConstruction"));
const Services = lazy(() => import("../../pages/Services"));
const Nosotros = lazy(() => import("../../pages/Nosotros/Nosotros"));
const Proyectos = lazy(() => import("../../pages/Proyectos"));

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <PageTransition>
                            <LandingPage />
                        </PageTransition>
                    }
                />
                <Route
                    path="/contacto"
                    element={
                        <PageTransition>
                            <Contacto />
                        </PageTransition>
                    }
                />
                <Route
                    path="/proyectos"
                    element={
                        <PageTransition>
                            <Proyectos />
                        </PageTransition>
                    }
                />
                <Route
                    path="/servicios"
                    element={
                        <PageTransition>
                            <Services />
                        </PageTransition>
                    }
                />
                <Route
                    path="/nosotros"
                    element={
                        <PageTransition>
                            <Nosotros />
                        </PageTransition>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
