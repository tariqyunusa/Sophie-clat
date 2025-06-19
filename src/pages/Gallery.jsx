import "../styles/Gallery.css";
import Nav from "../components/Nav";
import { getImages } from "../utils";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";

const Gallery = () => {
  const images = getImages();
  console.log(images);

  return (
    <section className="gallery__section">
      <Nav />
      <main className="gallery__section_main">
        <Link>Back to Collections</Link>
        <div className="gallery">
          <div>
            <h1>Allure Grace</h1>
            <p>(2024)</p>
          </div>
          <Slider images={images}/>
        </div>
      </main>
    </section>
  );
};

export default Gallery;
