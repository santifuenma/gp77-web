import React, { useEffect } from "react";
import "./InstagramFeed.css";

export default function InstagramFeed() {
  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://cdn.lightwidget.com/widgets/lightwidget.js"]'
    );
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://cdn.lightwidget.com/widgets/lightwidget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="ig-section">
      <h2 className="ig-title"><u>SÍGUENOS</u> DE CERCA</h2>

      <p>
        ¡Qué mejor forma de <b>conocer nuestro trabajo</b> que viendo de cerca
        el proceso desde el inicio hasta el final!
      </p>

      <div className="ig-frame-wrap">
        <iframe
          // 👇 Usa SIEMPRE https + cdn
          src="https://cdn.lightwidget.com/widgets/d08d9591f79d574187b9de700d3cff27.html?v=1"
          className="lightwidget-widget"
          style={{ width: "100%", border: 0, overflow: "hidden" }}
          scrolling="no"
          loading="lazy"
          title="Instagram Feed"
        />
      </div>
    </section>
  );
}
