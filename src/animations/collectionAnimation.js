import gsap from "gsap";

export const collectionExit = () => {
  return new Promise((resolve) => {
    const container = document.querySelector(".container");
    const layoutType = container?.classList.contains("grid")
      ? "grid"
      : container?.classList.contains("list")
      ? "list"
      : null;

    const tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 0.8 }, onComplete: resolve });

    if (layoutType === "grid") {
      const images = container.querySelectorAll(".grid__image");
      const details = container.querySelectorAll(".grid__details, .grid__subitems");

      tl.to([...details], { x: -40, opacity: 0, stagger: 0.05 }, 0);
      tl.to(images, { y: 40, opacity: 0, scale: 0.95, stagger: 0.05 }, "-=0.6");
    }

    if (layoutType === "list") {
      const nameEls = container.querySelectorAll(".list__name span");
      const subItemEls = container.querySelectorAll(".list__subitem span");
      const yearEls = container.querySelectorAll(".list__year span");
      const images = container.querySelectorAll(".list__img_wrapper img");
      const borders = container.querySelectorAll(".animated__border");

      tl.to([...nameEls, ...subItemEls, ...yearEls], { x: -30, opacity: 0, stagger: 0.01 }, 0);
      tl.to(images, { x: -50, opacity: 0, scale: 0.95, stagger: 0.04 }, "-=0.5");
      tl.to(borders, { width: "0%", duration: 0.3 }, "-=0.4");
    }

    if (!layoutType) {
      tl.to(".collections__section", { opacity: 0, duration: 0.5 });
    }
  });
};
