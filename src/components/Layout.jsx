import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import "../styles/Layout.css";
import { Canvas } from "@react-three/fiber";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Zoetrope from "./Zoetrope";

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

const Layout = ({ layout, items }) => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const canvasKey = isMobile ? "mobile" : "desktop";

  const containerRef = useRef(null);
  const borderRef = useRef([]);
  const imageRefs = useRef([]);
  imageRefs.current = [];

  const [zoetropePhase, setZoetropePhase] = useState("idle");
  const [showZoetrope, setShowZoetrope] = useState(layout === "zoetrope");
  const [isZoetropeFullyGone, setIsZoetropeFullyGone] = useState(layout !== "zoetrope");

  useEffect(() => {
    if (layout === "zoetrope") {
      setIsZoetropeFullyGone(false);
      setShowZoetrope(true);
      setZoetropePhase("entering");
    } else if (showZoetrope) {
      setZoetropePhase("exiting");
      const timeout = setTimeout(() => {
        setShowZoetrope(false);
        setIsZoetropeFullyGone(true);
      }, 1000); 
      return () => clearTimeout(timeout);
    }
  }, [layout]);

  useLayoutEffect(() => {
    if (layout !== "list" || !isZoetropeFullyGone) return;

    gsap.registerPlugin(ScrollTrigger);
    borderRef.current.forEach((el) => {
      if (!el) return;
      gsap.set(el, { width: "0%" });
      gsap.to(el, {
        width: "100%",
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
      });
    });
  }, [layout, isZoetropeFullyGone]);

  useLayoutEffect(() => {
    if (layout === "zoetrope" || !isZoetropeFullyGone) return;

    const direction = layout === "grid" ? 500 : -100;

    gsap.fromTo(
      imageRefs.current.filter(Boolean),
      {
        x: direction,
        opacity: 0,
        scale: 0.95,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.05,
      }
    );
  }, [layout, isZoetropeFullyGone]);

  return (
    <div className="layout">
      {showZoetrope ? (
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 70, 400], fov: 25 }} key={canvasKey}>
            <Zoetrope items={items} isMobile={isMobile} phase={zoetropePhase} />
          </Canvas>
        </div>
      ) : (
        <div ref={containerRef} className={`container ${layout}`}>
          {layout === "grid" ? (
            <div className="grid">
              {items.map((item, idx) => (
                <div key={idx} className="layout__grid">
                  <div className="grid__details">
                    <p className="grid__name">{item.name}</p>
                    <p className="grid__year">{item.year}</p>
                  </div>
                  <div className="grid__subitems">
                    {item.subItems.map((item, i) => (
                      <p key={i} className="grid__subitem">{item}</p>
                    ))}
                  </div>
                  <div className="grid__img_wrapper">
                    <img
                      src={item.Img}
                      alt={item.name}
                      className="grid__image"
                      ref={(el) => (imageRefs.current[idx] = el)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="list">
              {items.map((item, idx) => (
                <div className="layout__list" key={idx}>
                  <div
                    className="animated__border"
                    ref={(el) => (borderRef.current[idx] = el)}
                  />
                  <div className="list__left">
                    <div className="list__img_wrapper">
                      <img
                        src={item.Img}
                        alt={item.name}
                        data-flip-id={`img-${idx}`}
                        ref={(el) => (imageRefs.current[idx] = el)}
                      />
                    </div>
                    <p className="list__name">{item.name}</p>
                  </div>
                  <div className="list__subitems">
                    {item.subItems.map((item, i) => (
                      <p key={i} className="list__subitem">{item}</p>
                    ))}
                  </div>
                  <div className="list__year_wrapper">
                    <p className="list__year">{item.year}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Layout;
