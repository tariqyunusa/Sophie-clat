import reactLogo from "./assets/react.svg";
import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import image4 from '/image-4.webp'
import { useEffect } from "react";
import gsap from "gsap";
function App() {
useEffect(() => {
  const tl = gsap.timeline({ defaults: { ease: "power4.inOut", duration: 1.3 } });
  gsap.set([
    ".header__first",
    ".header__second",
    ".header__third",
    ".header__fourth",
  ], { y: 250 });
   
  gsap.set(gsap.utils.toArray(".hero__list"), { y: 100, opacity:0})

  gsap.set(".main__image img", { y: 300, scale: 0.5 });
  tl.to([".header__first", ".header__second", ".header__fourth" ], {
    y: 0,
    stagger: 0,
  })
  .to(gsap.utils.toArray(".hero__list"), {
    y: 0,
    stagger: 0.1,
    opacity: 1,
    ease: "power2.out"
  }, "-=1")

  .to(".main__image img", { y: 0, scale: 1 }, "-=1.4")
  .to(".header__third", { y: 0 }, "-=1.4");

}, []);


  return (
    <section className="hero__section">
      <Nav />
      <main className="hero__main">
        <ul >
          <li>
            <a href="/" className="hero__list">Bags</a>
          </li>
          <li>
            <a href="" className="hero__list">Shoes</a>
          </li>
          <li>
            <a href="" className="hero__list">Jackets</a>
          </li>
          <li>
            <a href="" className="hero__list">Stilleto Heels</a>
          </li>
          <li>
            <a href="" className="hero__list">+More</a>
          </li>
        </ul>
        <div className="headline__main">
          <div className="text__wrapper header-1">
            <h1 className="header__first">La</h1>
          </div>
          <div className="header_2__spacer">
            <div className="header-2">
              <div className="text__wrapper header__2">
              <h1 className="header__second">Vie de </h1>
            </div>
            <div className="text__wrapper header_2__time">
              <h1 className="header__third">From <br/>(20-24)</h1>
            </div>
            </div>
          </div>
          <div className="header_3__spacer">
            <div className="main__image"><img src={image4} alt="image" className="image" /></div>
            <div className="header__3_ text__wrapper"><h1 className="header__fourth">Sophie</h1></div>
          </div>
        </div>
        <div></div>
      </main>
      <Footer />
    </section>
  );
}

export default App;
