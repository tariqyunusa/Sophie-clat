import "../styles/Collection.css";
import Nav from "../components/Nav";
import { items } from "../utils";
import Layout from "../components/Layout";
import { useState, useLayoutEffect } from "react";
import { Flip } from "gsap/Flip";
import gsap from "gsap";
gsap.registerPlugin(Flip)


const Collections = () => {
  const [layout, setLayout] = useState("zoetrope")
  const handleLayoutChange = (e) => {
    const newLayout = e.target.value

    if(newLayout === 'zoetrope') {
      setLayout(newLayout)
      return;
    }
  setLayout(newLayout);
  }

  return (
    <section className="collections__section">
      <Nav />
      <main className="collection__main">
        <div className="collection__selector_mode">
          <fieldset>
            <div>
              <input type="radio" name="mode" id="grid" value="grid" onChange={handleLayoutChange}/>
              <label htmlFor="grid">grid</label>
            </div>
            <div>
              <input type="radio" name="mode" id="list" value="list" onChange={handleLayoutChange} />
              <label htmlFor="list">list</label>
            </div>
            <div>
              <input type="radio" name="mode" id="zoetrope" value="zoetrope" onChange={handleLayoutChange} />
              <label htmlFor="zoetrope">zoetrope</label>
            </div>
          </fieldset>
        </div>
        <Layout layout={layout} items={items} key="layout" onFlipComplete={() => setLayout(pendingLayout)}/>
      </main>
    </section>
  );
};

export default Collections;
