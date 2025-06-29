// src/animations/aboutAnimation.js
import gsap from "gsap";

export const aboutExit = () => {
  return new Promise((resolve) => {
    const tl = gsap.timeline({ defaults: { ease: "power4.inOut", duration: 1.2 }, onComplete: resolve });

    const firstPara = document.querySelector(".about__personal_text .about__paragraph");
    const lines = firstPara?.querySelectorAll(".lineChild") || [];

    tl.to(".about_collection", { y: 30, opacity: 0 }, 0)

      .to(".about__second_section .about", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
      }, "-=0.8")

      .to(lines, {
        yPercent: 100,
        opacity: 0,
        stagger: -0.05,
      }, "-=0.9")

      .to(".image__wrapper__sophie", {
        y: 370,
        scale: 0.8
      }, "-=1")

      .to([".about__header", ".about__italics"], {
        y: 200,
        stagger: 0.05
      }, "-=1.1");
  });
};
