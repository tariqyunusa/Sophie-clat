import gsap from "gsap";

export const heroEnter = () => {
  const tl = gsap.timeline({ defaults: { ease: "power4.inOut", duration: 1.3 } });

  gsap.set([
    ".header__first",
    ".header__second",
    ".header__third",
    ".header__fourth",
  ], { y: 250 });

  gsap.set(".hero__list", { y: 100, opacity: 0 });
  gsap.set(".main__image img", { y: 300, scale: 0.5 });

  tl.to([".header__first", ".header__second", ".header__fourth"], { y: 0, stagger: 0 })
    .to(".hero__list", {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=1")
    .to(".main__image img", { y: 0, scale: 1 }, "-=1.4")
    .to(".header__third", { y: 0 }, "-=1.4");
};

export const heroExit = () => {
  return new Promise((resolve) => {
    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut", duration: 1 },
      onComplete: resolve,
    });

    tl.to(".header__third", { y: 250 }, 0) 
      .to(".main__image img", { y: 300, scale: 0.5 }, 0)
      .to(".hero__list", {
        y: 100,
        opacity: 0,
        stagger: 0.05,
        ease: "power2.in"
      }, 0.1)
      .to(
        [".header__fourth", ".header__second", ".header__first"],
        { y: 250, stagger: 0.05 },
        "-=0.6"
      );
  });
};

