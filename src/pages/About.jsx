import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "../styles/About.css";
import sophie from "/sophie.webp";
import { Link } from "react-router-dom";

const About = () => {
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
            <div className="image__wrapper">
              <img src={sophie} alt="sophie" />
              <div className="color__overlay"></div>
            </div>
          </div>
          <div className="about__personal_info">
            <div className="about__personal_text">
              <p>
                I have always been enchanted by the beauty and artistry of
                luxury items. My journey began with a single designer bag and
                has grown into a carefully curated collection of the finest
                bags, shoes, jewelry, and fashion treasures from around the
                world.
              </p>
            </div>
            <div className="about__second_section">
              <div className="about__story about">
                <h6>My Story</h6>
                <p>
                  {" "}
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
                <p>
                  {" "}
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
