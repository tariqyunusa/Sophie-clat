import React, {
  useRef,
  useState,
  useLayoutEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import "../styles/Layout.css";
import { useFrame, useLoader, useThree, Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Zoetrope from "./Zoetrope";



const Layout = ({ layout, items }) => {
  const containerRef = useRef(null);
  const borderRef = useRef([]);
  const imageRefs = useRef([]);
    imageRefs.current = [];

  useLayoutEffect(() => {
     if (layout !== "list") return;
    gsap.registerPlugin(ScrollTrigger)
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
  },[layout])


 useLayoutEffect(() => {
  if(layout !== 'zoetrope') return;
    const direction = layout === "grid" ? 500 : -100; 

    gsap.fromTo(
      imageRefs.current,
      {
        x: direction,
        opacity: 0,
        scale: 0.95,
        delay: layout === 'list' ? 1 : 0
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.05
      }
    );
  }, [layout]);


  return (
    <div className="layout">
      {layout === "zoetrope" ? (
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 0, 15], fov: 75}}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <OrbitControls />
            <Zoetrope items={items}  />
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
                      <p key={i} className="grid__subitem">
                        {item}
                      </p>
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
                      <img src={item.Img} alt={item.name} data-flip-id={`img-${idx}`} ref={(el) => (imageRefs.current[idx] = el)}/>
                    </div>
                    <p className="list__name">{item.name}</p>
                  </div>
                  <div className="list__subitems">
                    {item.subItems.map((item, i) => (
                      <p key={i} className="list__subitem">
                        {item}
                      </p>
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




