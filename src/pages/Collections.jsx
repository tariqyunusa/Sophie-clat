import "../styles/Collection.css";
import Nav from "../components/Nav";
import { items } from "../utils";
const Collections = () => {
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
        <div className="collection_grid">
          {items.map((item, idx) => (
            <div key={idx} className="collection__item_grid">
              <div className="collection__item_detail_grid">
                <p className="list__name">{item.name}</p>
                <p className="list__year">{item.year}</p>
              </div>
              <div className="collection__subitems_grid">
                {item.subItems.map((item, i) => (
                  <p key={i} className="subitems__item_grid">
                    {item}
                  </p>
                ))}
              </div>
              <div className="collection__item_grid_img">
                <img src={item.Img} alt={item.name} className="grid__img" />
                <div className="color__overlay"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </section>
  );
};

export default Collections;
