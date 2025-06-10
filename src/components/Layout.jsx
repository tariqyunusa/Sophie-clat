import React, { useRef } from "react";
import "../styles/Layout.css";

const Layout = ({ layout, items }) => {
  const containerRef = useRef(null);
  return (
    <div>
      {layout === "zoetrope" ? (
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <OrbitControls />
            <Zoetrope items={items} radius={2} />
          </Canvas>
        </div>
      ) : (
        <div ref={containerRef} className={`container ${layout}`}>
          {items.map((item, idx) => (
            <div key={idx} className="grid__container">
              <div className="grid__upper">
                <div className="grid__item_detail">
                  <p className="grid__item_name">{item.name}</p>
                  <p className="grid__item_year">{item.year}</p>
                </div>
                <div className="grid__subitems">
                  {item.subItems.map((item, i) => (
                    <p key={i} className="grid__subitems_items">{item}</p>
                  ))}
                </div>
              </div>
              <div className="grid__lower">
                <div className="image__wrapper">
                    <img src={item.Img} alt={item.name}  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Layout;
