import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname, hash, search } = useLocation();

    useEffect(() => {
        // Si no hay hash ni query params (como ?id= para servicios), sube al inicio
        if (!hash && !search) {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash, search]);

    return null;
}
