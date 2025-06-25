import { Canvas, useLoader, useFrame, extend } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three";
import "../styles/Slider.css";
import FadeMaterial from "./FadeMaterial";
import * as THREE from "three";
import gsap from "gsap";
import GrayscaleMaterial from "./GrayScaleMaterial"
extend({ GrayscaleMaterial });
extend({ FadeMaterial });




const getWrappedIndex = (idx, length) => ((idx % length) + length) % length;

const DisplayPlane = ({ scrollValue, textures }) => {
  const matRef = useRef();

  useEffect(() => {
    if (matRef.current) {
      matRef.current.uniforms.mixFactor.value = scrollValue % 1;

      const currentIdx = Math.floor(scrollValue);
      const nextIdx = currentIdx + 1;

      const currentTexture = textures[getWrappedIndex(currentIdx, textures.length)];
      const nextTexture = textures[getWrappedIndex(nextIdx, textures.length)];

      matRef.current.uniforms.texture1.value = currentTexture;
      matRef.current.uniforms.texture2.value = nextTexture;
    }
  }, [scrollValue, textures]);

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[3, 4]} />
      <fadeMaterial ref={matRef} attach="material" transparent={false} mixFactor={0} />
    </mesh>
  );
};

const ScrollController = ({ scrollTarget, scrollCurrent, setScrollValue }) => {
  useFrame(() => {
    scrollCurrent.current += (scrollTarget.current - scrollCurrent.current) * 0.07;
    setScrollValue(scrollCurrent.current);
  });
  return null;
};


// Thumbnails



const Thumbnails = ({ scrollCurrent, textures }) => {
  const groupRef = useRef();
  const visibleCount = 15;
  const spacing = 1.6;
  const materialRefs = useRef([]);

  useFrame(() => {
    const activeIndex = Math.round(scrollCurrent.current) % textures.length;

    groupRef.current.children.forEach((mesh, i) => {
      const offset = i - Math.floor(visibleCount / 2);
      const y = offset * spacing - (scrollCurrent.current % 1) * spacing;
      mesh.position.y = y;

      const virtualIndex = scrollCurrent.current + offset;
      const wrappedIndex = getWrappedIndex(Math.floor(virtualIndex), textures.length);

      const material = materialRefs.current[i];
      if (material) {
        material.map = textures[wrappedIndex];
        material.uniforms.map.value = textures[wrappedIndex];
        material.uniforms.grayscale.value = wrappedIndex === getWrappedIndex(activeIndex, textures.length) ? 0.0 : 1.0;
        material.needsUpdate = true;
      }
    });
  });

  return (
    <group ref={groupRef} position={[7.5, 0, 0]}>
      {Array.from({ length: visibleCount }).map((_, i) => (
        <mesh key={i}>
          <planeGeometry args={[1, 1.4]} />
          <grayscaleMaterial
            ref={(ref) => (materialRefs.current[i] = ref)}
            map={textures[0]}
            grayscale={1.0}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
};

// Slider

const Slider = ({ images }) => {
  const textures = useLoader(TextureLoader, images);
  const scrollTarget = useRef(0);
  const scrollCurrent = useRef(0);
  const [scrollValue, setScrollValue] = useState(0);

  const scrollStopTimeout = useRef();

  const handleScroll = (e) => {
    e.preventDefault();
    scrollTarget.current += e.deltaY * 0.002;

    if (scrollStopTimeout.current) clearTimeout(scrollStopTimeout.current);
    scrollStopTimeout.current = setTimeout(() => {
      scrollTarget.current = Math.round(scrollTarget.current);
    }, 250);
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (scrollStopTimeout.current) clearTimeout(scrollStopTimeout.current);
    };
  }, []);

  return (
    <div className="slider">
      <div className="gallery__canvas_wrapper">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight />
          <ScrollController
            scrollTarget={scrollTarget}
            scrollCurrent={scrollCurrent}
            setScrollValue={setScrollValue}
          />
          <DisplayPlane scrollValue={scrollValue} textures={textures} />
          <Thumbnails scrollCurrent={scrollCurrent} textures={textures} />
        </Canvas>
      </div>
    </div>
  );
};

export default Slider;
