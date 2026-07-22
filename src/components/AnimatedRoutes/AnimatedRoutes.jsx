import React, { lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../PageTransition/PageTransition";
import PublicLayout from "../../layouts/PublicLayout";

// AdminLayout y ProtectedRoute se cargan perezosamente porque arrastran
// @supabase/supabase-js (Auth) — así el bundle del sitio público no crece
// para nadie que nunca visite /admin.
const AdminLayout = lazy(() => import("../../layouts/AdminLayout"));
const ProtectedRoute = lazy(() => import("../ProtectedRoute/ProtectedRoute"));

// Import Pages (Lazy Loading moved here)
const LandingPage = lazy(() => import("../Landing/Landing"));
const Contacto = lazy(() => import("../../pages/Contacto"));
const UnderConstruction = lazy(() => import("../UnderConstruction/UnderConstruction"));
const Services = lazy(() => import("../../pages/Services"));
const Nosotros = lazy(() => import("../../pages/Nosotros/Nosotros"));
const Proyectos = lazy(() => import("../../pages/Proyectos"));

// Admin pages (solo se descargan si alguien navega a /admin/*)
const AdminLogin = lazy(() => import("../../pages/admin/Login"));
const AdminHub = lazy(() => import("../../pages/admin/AdminHub"));
const Propuestas = lazy(() => import("../../pages/admin/Propuestas/Propuestas"));
const NuevaPropuesta = lazy(() => import("../../pages/admin/Propuestas/NuevaPropuesta"));
const EditarPropuesta = lazy(() => import("../../pages/admin/Propuestas/EditarPropuesta"));

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route element={<PublicLayout />}>
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
                </Route>

                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="login" element={<AdminLogin />} />

                    <Route element={<ProtectedRoute />}>
                        <Route index element={<AdminHub />} />
                        <Route path="propuestas" element={<Propuestas />} />
                        <Route path="propuestas/nueva" element={<NuevaPropuesta />} />
                        <Route path="propuestas/:id/editar" element={<EditarPropuesta />} />
                    </Route>
                </Route>
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
