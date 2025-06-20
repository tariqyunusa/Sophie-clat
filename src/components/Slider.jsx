import { Canvas, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three";
import "../styles/Slider.css";

const DisplayPlane = ({ texture }) => {
  const meshRef = useRef();

  return (
    <mesh ref={meshRef} position={[0, 0.6, 0]}>
      <planeGeometry args={[3, 4]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
};

const getWrappedIndex = (idx, length) => ((idx % length) + length) % length;

const Slider = ({ images }) => {
  const [selected, setSelected] = useState(0);
  const visibleCount = 10;
  const centerIndex = Math.floor(visibleCount / 2);
  const scrollTimeout = useRef(null);

  const textures = useLoader(TextureLoader, images);

  const getVisibleThumbnails = () => {
    const result = [];
    for (let i = -centerIndex; i <= centerIndex; i++) {
      const wrappedIndex = getWrappedIndex(selected + i, images.length);
      result.push({
        url: images[wrappedIndex],
        originalIndex: wrappedIndex,
        isActive: i === 0,
      });
    }
    return result;
  };

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      if (scrollTimeout.current) return;

      const delta = e.deltaY;
      if (delta > 0) {
        setSelected((prev) => getWrappedIndex(prev + 1, images.length));
      } else {
        setSelected((prev) => getWrappedIndex(prev - 1, images.length));
      }

      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null;
      }, 200);
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [images.length]);

  const thumbnails = getVisibleThumbnails();

  return (
    <div className="slider">
      <div className="gallery__canvas_wrapper">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight />
          <DisplayPlane texture={textures[selected]} />
        </Canvas>
      </div>
      <div className="slider__thumbnails-container">
        {thumbnails.map((thumb, idx) => (
          <div
            key={idx}
            className={`slider__thumbnails ${thumb.isActive ? "active" : ""}`}
            onClick={() => setSelected(thumb.originalIndex)}
          >
            <img src={thumb.url} alt={`Thumb ${thumb.originalIndex}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
