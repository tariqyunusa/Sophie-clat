import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import "../styles/Layout.css";
import { Canvas } from "@react-three/fiber";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Zoetrope from "./Zoetrope";
import { Link } from "react-router-dom";


const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
};

const Layout = ({ layout, items, images }) => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const canvasKey = isMobile ? "mobile" : "desktop";

  const containerRef = useRef(null);
  const borderRef = useRef([]);
  const imageRefs = useRef([]);
  const detailsRefs = useRef([]);
  detailsRefs.current = [];
  imageRefs.current = [];

  const prevLayoutRef = useRef(layout);
  const [currentLayout, setCurrentLayout] = useState(layout);

  const [zoetropePhase, setZoetropePhase] = useState("idle");
  const [showZoetrope, setShowZoetrope] = useState(layout === "zoetrope");
  const [isZoetropeFullyGone, setIsZoetropeFullyGone] = useState(layout !== "zoetrope");


  useEffect(() => {
    if (layout === currentLayout) return;
  
    const isExitingList = currentLayout === "list";
    const isExitingGrid = currentLayout === "grid";
  
    const animateExit = () => {
      if (isExitingList && containerRef.current) {
        const tl = gsap.timeline({
          onComplete: () => setCurrentLayout(layout),
        });
  
        const nameEls = containerRef.current.querySelectorAll(".list__name span");
        const subItemEls = containerRef.current.querySelectorAll(".list__subitem span");
        const yearEls = containerRef.current.querySelectorAll(".list__year span");
        const images = imageRefs.current.filter(Boolean);
        const borders = borderRef.current.filter(Boolean);
  
        tl.to(
          [nameEls, subItemEls, yearEls],
          {
            x: -30,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            stagger: 0.01,
          },
          0
        );
  
        tl.to(
          images,
          {
            x: -50,
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
            ease: "power2.inOut",
            stagger: 0.05,
          },
          "-=1.5"
        );
  
        tl.to(
          borders,
          {
            width: "0%",
            duration: 0.4,
            ease: "power2.inOut",
          },
          "-=1.4"
        );
      }
  
      else if (isExitingGrid && containerRef.current) {
        const tl = gsap.timeline({
          onComplete: () => setCurrentLayout(layout),
        });
  
        const images = imageRefs.current.filter(Boolean);
        const details = containerRef.current.querySelectorAll(".grid__details");
        const subitems = containerRef.current.querySelectorAll(".grid__subitems");
  
        tl.to(
          [...details, ...subitems],
          {
            x: -50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            stagger: 0.05,
          },
          0
        );
  
        tl.to(
          images,
          {
            x: -100,
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            ease: "power3.in",
            stagger: 0.04,
          },
          "-=0.4"
        );
      }
  
      else {
      
        setCurrentLayout(layout);
      }
    };
  
    animateExit();
  }, [layout, currentLayout]);
  

  useEffect(() => {
    if (currentLayout === "zoetrope") {
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
  }, [currentLayout]);

  useLayoutEffect(() => {
    if (currentLayout !== "list" || !isZoetropeFullyGone) return;
    gsap.registerPlugin(ScrollTrigger);

    const nameEls = containerRef.current.querySelectorAll(".list__name");
    const subListWrappers = containerRef.current.querySelectorAll(".list__subitems");
    const yearEls = containerRef.current.querySelectorAll(".list__year");

    borderRef.current.forEach((el, i) => {
      const image = imageRefs.current[i];
      const nameEl = nameEls[i];
      const subItemEls = subListWrappers[i]?.querySelectorAll(".list__subitem");
      const yearEl = yearEls[i];

      if (!el || !image || !nameEl || !subItemEls || !yearEl) return;

      const tl = gsap.timeline();

      tl.fromTo(
        el,
        { width: "0%" },
        { width: "100%", duration: 1, ease: "power2.inOut" }
      );

   
      tl.fromTo(
        image,
        { x: -50, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        "<"
      );

      const nameChars = nameEl.textContent.split("");
      nameEl.innerHTML = "";
      nameChars.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        span.style.transform = "translateX(30px)";
        span.style.opacity = "0";
        nameEl.appendChild(span);
      });
      const nameSpans = nameEl.querySelectorAll("span");

      tl.to(
        nameSpans,
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.03,
        },
        "-=0.6"
      );

      // Subitems
      const subCharSpans = [];
      subItemEls.forEach((subEl) => {
        const subChars = subEl.textContent.split("");
        subEl.innerHTML = "";
        subChars.forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.display = "inline-block";
          span.style.transform = "translateX(30px)";
          span.style.opacity = "0";
          subEl.appendChild(span);
          subCharSpans.push(span);
        });
      });

      tl.to(
        subCharSpans,
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.01,
        },
        "-=0.6"
      );

      // Year
      const yearChars = yearEl.textContent.split("");
      yearEl.innerHTML = "";
      yearChars.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.classList.add("char");
        span.style.display = "inline-block";
        span.style.transform = "translateX(30px)";
        span.style.opacity = "0";
        yearEl.appendChild(span);
      });

      const yearSpans = yearEl.querySelectorAll(".char");
      tl.to(
        yearSpans,
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.05,
        },
        "-=0.4"
      );
    });
  }, [currentLayout, isZoetropeFullyGone]);

  useLayoutEffect(() => {
    if (currentLayout !== "grid" || !isZoetropeFullyGone) return;

    const direction = window.innerWidth;
    const tl = gsap.timeline();

    tl.fromTo(
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

    tl.fromTo(
      containerRef.current.querySelectorAll(".grid__details, .grid__subitems"),
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      },
      "-=1"
    );
  }, [currentLayout, isZoetropeFullyGone]);

  return (
    <div className="layout">
      {showZoetrope ? (
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 70, isMobile? 210: 400], fov: 25 }} key={canvasKey}>
            <ambientLight />
            <Zoetrope items={items} isMobile={isMobile} phase={zoetropePhase} images={images} />
          </Canvas>
        </div>
      ) : (
        <div ref={containerRef} className={`container `}>
          {currentLayout === "grid" ? (
            <div className="grid">
              {items.map((item, idx) => (
                <div key={idx} className="layout__grid">
                  <div className="grid__details" ref={(el) => (detailsRefs.current[idx] = el)}>
                    <p className="grid__name">{item.name}</p>
                    <p className="grid__year">{item.year}</p>
                  </div>
                  <div className="grid__subitems" ref={(el) => (detailsRefs.current[idx + items.length] = el)}>
                    {item.subItems.map((item, i) => (
                      <p key={i} className="grid__subitem">{item}</p>
                    ))}
                  </div>
                  <div className="grid__img_wrapper">
                    <Link to="/gallery">
                      <img
                        src={item.Img}
                        alt={item.name}
                        className="grid__image"
                        ref={(el) => (imageRefs.current[idx] = el)}
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="list">
              {items.map((item, idx) => (
                <Link key={idx} to="/gallery">
                  <div className="layout__list" key={idx}>
                    <div className="animated__border" ref={(el) => (borderRef.current[idx] = el)} />
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
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Layout;
