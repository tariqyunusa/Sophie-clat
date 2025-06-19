import { Canvas, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { TextureLoader } from "three";
import "../styles/Slider.css";

const DisplayPlane = ({ imageUrl }) => {
  const texture = useLoader(TextureLoader, imageUrl);
  const meshRef = useRef();

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3, 4]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
};
const getWrappedIndex = (idx, length) => {
  return ((idx % length) + length) % length;
};

const Slider = ({ images }) => {
  const [selected, setSelected] = useState(0);
  const visibleCount = 7;
  const centerIndex = Math.floor(visibleCount / 2);

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

  const thumbnails = getVisibleThumbnails();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight />
          <DisplayPlane imageUrl={images[selected]} />
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
