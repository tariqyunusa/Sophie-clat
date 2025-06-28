import "../styles/Collection.css";
import Nav from "../components/Nav";
import { items } from "../utils";
import Layout from "../components/Layout";
import { useState } from "react";
import { zoetropeImages } from "../utils";



const Collections = () => {
  const [layout, setLayout] = useState("grid")
  const handleLayoutChange = (e) => {
    const newLayout = e.target.value

    if(newLayout === 'zoetrope') {
      setLayout(newLayout)
      console.log(layout);
      
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
              <input type="radio" name="mode" id="grid" value="grid" onChange={handleLayoutChange} checked={layout === "grid"} />
              <label htmlFor="grid">grid</label>
            </div>
            <div>
              <input type="radio" name="mode" id="list" value="list" onChange={handleLayoutChange} checked={layout === "list"} />
              <label htmlFor="list">list</label>
            </div>
            <div>
              <input type="radio" name="mode" id="zoetrope" value="zoetrope" onChange={handleLayoutChange} checked={layout === "zoetrope"} />
              <label htmlFor="zoetrope">zoetrope</label>
            </div>
          </fieldset>
        </div>
        <Layout layout={layout} items={items} images={zoetropeImages} key="layout" />
      </main>
    </section>
  );
};

export default Collections;
