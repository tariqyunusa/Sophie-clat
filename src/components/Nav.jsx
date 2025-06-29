import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import gsap from "gsap";
import AnimatedLink from "./AnimatedLink";
import "../styles/Nav.css";

const Nav = () => {
  const location = useLocation();

  // Refs for nav links and icon
  const navRefs = useRef([]);
  const iconRef = useRef(null);

  // Reset refs on render
  navRefs.current = [];
  const addToRefs = (el) => {
    if (el && !navRefs.current.includes(el)) {
      navRefs.current.push(el);
    }
  };

  useEffect(() => {
    gsap.fromTo(
      [...navRefs.current, iconRef.current],
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 1,
        ease: "power2.out",
      }
    );
  }, [location.pathname]); 

  const links = [
    { to: "/", label: "Sophie’s Éclat" },
    { to: "/about", label: "About" },
    { to: "/collection", label: "Collections" },
    { to: "/gallery", label: "Gallery" },
  ];

  return (
    <nav className="nav__section">
      {links.map((link, i) => (
        <div className="nav__wrapper" key={i}>
          <AnimatedLink
            to={link.to}
            ref={addToRefs}
            className={`nav ${
              location.pathname === link.to && link.to !== "/" ? "nav--active" : ""
            }`}
          >
            {link.label}
          </AnimatedLink>
        </div>
      ))}
    <div ref={iconRef} className="nav nav_icon_wrapper">
  <GoPlus className="nav_icon" />
</div>


    </nav>
  );
};

export default Nav;
