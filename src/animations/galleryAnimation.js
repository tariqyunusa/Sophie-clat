import gsap from "gsap";

export const galleryExit = () => {
  return new Promise((resolve) => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut", duration: 0.8 },
      onComplete: resolve,
    });

    const section = document.querySelector(".gallery__section");
    const main = document.querySelector(".gallery__section_main");

    if (section && main) {
      tl.to(main, { opacity: 0, y: 60 }, 0);
    } else {
      tl.to(".slider", { opacity: 0, y: 40 });
    }
  });
};
