import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "../styles/About.css";
import sophie from "/sophie.webp";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);


const About = () => {

useEffect(() => {
  const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 } });
  const firstPara = document.querySelector(".about__personal_text .about__paragraph");
  const splitFirst = new SplitText(firstPara, {
    type: "lines",
    linesClass: "lineChild"
  });
  new SplitText(firstPara, {
    type: "lines",
    linesClass: "lineParent"
  });
  tl.set([".about__italics",".about__header"], {y: 200})
  tl.set(".image__wrapper__sophie", {y: 370, })
  tl.to(".about__italics", {
    y: 0,
  })
  tl.to(".about__header", {
    y: 0
  }, "-=1.3")
  const firstLine = splitFirst.lines[0];
  tl.from(firstLine, {
    x: -32,
    opacity: 0,
    yPercent: 100,
  }, "-=1.3");

  tl.set(firstLine, {
    x: 0,
    paddingLeft: "1.2rem" 
  }, "<");
  tl.to(".image__wrapper__sophie", {
    y: 0
  }, "-=1.4")


  tl.from(splitFirst.lines.slice(1), {
    yPercent: 100,
    opacity: 0,
    stagger: 0.1,
  }, "-=1.3");
  const aboutBlocks = document.querySelectorAll(".about__second_section .about");
  tl.from(aboutBlocks, {
    opacity: 0,
    y: 50,
    stagger: 0.3,
  }, "-=1.3");

  const exploreLink = document.querySelector(".about_collection");
  tl.from(exploreLink, {
    opacity: 0,
    y: 30,
    duration: 0.8,
  }, "-=1.2");
}, []);


  return (
    <section className="about__section">
      <Nav />
      <main className="about__main_section">
        <div className="about__headline">
          <div className="about__headline_first">
            <div className="about__mask">
              <h1 className="about__italics ">Curating</h1>
            </div>
            <div className="about__mask">
              <h1 className="about__header">Luxury</h1>
            </div>
          </div>
          <div className="about__headline_second">
            <div className="about__mask">
              <h1 className="about__header">Treasures from</h1>
            </div>
          </div>
          <div className="about__headline_third">
            <div className="about__mask">
              <h1 className="about__italics">(Doha, Qatar)</h1>
            </div>
          </div>
        </div>
        <div className="about__personal">
          <div className="about__image_container">
            <div className="image__wrapper__sophie">
              <img src={sophie} alt="sophie" className="image__sophie"  />
              <div className="color__overlay"></div>
            </div>
          </div>
          <div className="about__personal_info">
            <div className="about__personal_text">
              <p className="about__paragraph">
                I have always been enchanted by the beauty and artistry of
                luxury items. My journey began with a single designer bag and
                has grown into a carefully curated collection of the finest&nbsp;
                bags, shoes, jewelry, and fashion treasures from around the
                world.
              </p>
            </div>
            <div className="about__second_section">
              <div className="about__story about">
                <h6>My Story</h6>
                <p  >
                  From a young age, I was drawn to the world of high fashion. My
                  keen eye for detail and impeccable taste have guided me in
                  building a collection that embodies elegance and luxury. Each
                  piece in my collection is chosen not only for its aesthetic
                  appeal but also for the story it tells and the craftsmanship
                  it represents.
                </p>
              </div>
              <div className="about about__philosophy">
                <h6>My Philosophy</h6>
                <p >
                  I believe that fashion is an art form and a way of life. My
                  mission is to share the beauty and sophistication of my
                  collection with those who appreciate the finer things in life.
                  Each item is a testament to the timeless allure of luxury and
                  the joy of owning something truly exquisite.
                </p>
              </div>
              <div className="about_collection">
                <Link>Explore Collection</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </section>
  );
};

export default About;
