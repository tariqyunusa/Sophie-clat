import reactLogo from "./assets/react.svg";
import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import image4 from '/image-4.webp'

function App() {
  return (
    <section className="hero__section">
      <Nav />
      <main className="hero__main">
        <ul>
          <li>
            <a href="/">Bags</a>
          </li>
          <li>
            <a href="">Shoes</a>
          </li>
          <li>
            <a href="">Jackets</a>
          </li>
          <li>
            <a href="">Stilleto Heels</a>
          </li>
          <li>
            <a href="">+More</a>
          </li>
        </ul>
        <div className="headline__main">
          <div className="text__wrapper header-1">
            <h1>La</h1>
          </div>
          <div className="header_2__spacer">
            <div className="header-2">
              <div className="text-wrapper ">
              <h1>Vie de </h1>
            </div>
            <div className="header_2__time">
              <h1>From <br/>(20-24)</h1>
            </div>
            </div>
          </div>
          <div className="header_3__spacer">
            <div className="main__image"><img src={image4} alt="image" /></div>
            <div className="header__3_"><h1>Sophie</h1></div>
          </div>
        </div>
        <div></div>
      </main>
      <Footer />
    </section>
  );
}

export default App;
