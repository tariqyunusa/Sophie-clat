import "../styles/Gallery.css";
import Nav from "../components/Nav";
import { getImages } from "../utils";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitType from "split-type";

const Gallery = () => {
  const titleRef = useRef();
  const yearRef = useRef();
const prevZone = useRef(null);

  const [scrollValue, setScrollValue] = useState(0);
  const [titleText, setTitleText] = useState("Allure Grace");

  const images = getImages();


  useEffect(() => {
    const splitYear = new SplitType(yearRef.current, { types: "chars" });

    gsap.from(splitYear.chars, {
      x: 50,
      opacity: 0,
      stagger: 0.04,
      duration: 0.6,
      ease: "power4.out",
    });

    return () => {
      splitYear.revert();
    };
  }, []);

 useEffect(() => {
  if (!titleRef.current) return;

  const el = titleRef.current;

  el.innerHTML = titleText;

  el.style.opacity = 0;

  const split = new SplitType(el, { types: "chars" });

  split.chars.forEach((char) => {
    char.style.opacity = 0;
  });

  gsap.to(split.chars, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.04,
    ease: "power4.out",
    onStart: () => {
      el.style.opacity = 1;
    },
    onComplete: () => {
      split.revert(); 
    },
  });
}, [titleText]);


const prevTitle = useRef(titleText);

useEffect(() => {
  const scroll = scrollValue;

  let newTitle = titleText;

  if (scroll >= 15) {
    newTitle = "Allure Essence";
  } else if (scroll >= 10) {
    newTitle = "Allure Mirage";
  } else if (scroll >= 5) {
    newTitle = "Allure Serene";
  } else {
    newTitle = "Allure Grace";
  }

  if (newTitle !== prevTitle.current) {
    prevTitle.current = newTitle;
    setTitleText(newTitle);
  }
}, [scrollValue]);





  return (
    <section className="gallery__section">
      <Nav />
      <main className="gallery__section_main">
        <Link className="gallery__link" to="/collection">
          Back to Collections
        </Link>
        <div className="gallery">
          <div className="gallery__title">
            <div className="gallery__mask">
              <h1 ref={titleRef}>{titleText}</h1>
            </div>
            <div className="gallery__mask">
              <p ref={yearRef}>(2024)</p>
            </div>
          </div>
          <Slider images={images} setScrollValue={setScrollValue} />
        </div>
      </main>
    </section>
  );
};

export default Gallery;
