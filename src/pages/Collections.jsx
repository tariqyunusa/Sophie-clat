import "../styles/Collection.css";
import Nav from "../components/Nav";
import { items } from "../utils";
import Layout from "../components/Layout";
import { useState } from "react";


const Collections = () => {
  const [layout, setLayout] = useState("grid")
  return (
    <section className="collections__section">
      <Nav />
      <main className="collection__main">
        <div className="collection__selector_mode">
          <fieldset>
            <div>
              <input type="radio" name="mode" id="grid" value="grid" />
              <label htmlFor="grid">grid</label>
            </div>
            <div>
              <input type="radio" name="mode" id="list" value="list" />
              <label htmlFor="list">list</label>
            </div>
            <div>
              <input type="radio" name="mode" id="zoetrope" value="zoetrope" />
              <label htmlFor="zoetrope">zoetrope</label>
            </div>
          </fieldset>
        </div>
        <Layout layout={layout} items={items} />
      </main>
    </section>
  );
};

export default Collections;
