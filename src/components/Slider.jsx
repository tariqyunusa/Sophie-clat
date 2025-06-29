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

const DisplayPlane = ({ scrollValue, textures, phase }) => {
  const matRef = useRef();
  const meshRef = useRef();
  useEffect(() => {
  if (matRef.current) {
    gsap.fromTo(
      matRef.current.uniforms.twistFactor,
      { value: 0.8 },
      {
        value: 0.0,
        duration: 2,
        ease: "power4.out"
      }
    );
  }
}, []);

  useEffect(() => {
    const mesh = meshRef.current;
    const material = matRef.current;

    if (mesh && material) {

      mesh.rotation.y = THREE.MathUtils.degToRad(35);
      mesh.position.z = -2;
      mesh.position.x = -1; 
      mesh.scale.set(0.9, 0.95, 0.9);
      material.opacity = 0;
      gsap.to(mesh.rotation, {
        y: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.to(mesh.position, {
        x: 0,
        z: 0,
        duration: 1.2,
        ease: "power2.out",
      });

      gsap.to(mesh.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
        ease: "back.out(1.4)",
      });

      gsap.to(material, {
        opacity: 1,
        duration: 0.8,
        ease: "power1.out",
      });
    }

    return () => {
      if (mesh && material) {
        gsap.to(mesh.rotation, {
          y: THREE.MathUtils.degToRad(-35),
          duration: 0.6,
          ease: "power3.in",
        });

        gsap.to(mesh.position, {
          x: 1,
          z: -2,
          duration: 0.6,
          ease: "power2.in",
        });

        gsap.to(mesh.scale, {
          x: 0.85,
          y: 0.9,
          duration: 0.6,
          ease: "power2.in",
        });

        gsap.to(material, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        });
      }
    };
  }, []);
 const lastScroll = useRef(scrollValue);

useEffect(() => {
  if (!matRef.current) return;

  const material = matRef.current;

  const currentIdx = Math.floor(scrollValue);
  const frac = scrollValue - currentIdx;

  const direction = scrollValue - lastScroll.current >= 0 ? "forward" : "backward";

  let fromIdx, toIdx, mix;

  if (direction === "forward") {
    fromIdx = currentIdx;
    toIdx = currentIdx + 1;
    mix = frac; // forward mix
  } else {
    fromIdx = currentIdx + 1;
    toIdx = currentIdx;
    mix = 1.0 - frac; // reverse mix
  }

  const fromTexture = textures[getWrappedIndex(fromIdx, textures.length)];
  const toTexture = textures[getWrappedIndex(toIdx, textures.length)];

  material.uniforms.texture1.value = fromTexture;
  material.uniforms.texture2.value = toTexture;
  material.uniforms.mixFactor.value = mix;

  lastScroll.current = scrollValue;
}, [scrollValue, textures]);


  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[4, 5, 64, 64]} />
      <fadeMaterial
        ref={matRef}
        attach="material"
        transparent
        opacity={0}
        mixFactor={0}
      />
    </mesh>
  );
};


const ScrollController = ({ scrollTarget, scrollCurrent, setScrollValue, setExternalScrollValue }) => {
  useFrame(() => {
    scrollCurrent.current += (scrollTarget.current - scrollCurrent.current) * 0.07;

    const currentScroll = scrollCurrent.current;

    setScrollValue(currentScroll);           // Update DisplayPlane scroll
    setExternalScrollValue(currentScroll);   // Sync with Gallery
  });

  return null;
};



// Thumbnails



const Thumbnails = ({ scrollCurrent, textures, phase }) => {
  const groupRef = useRef();
  const visibleCount = 15;
  const spacing = 1.6;
  const materialRefs = useRef([]);
useEffect(() => {
    const meshes = groupRef.current.children;

    meshes.forEach((mesh) => {
      mesh.material.transparent = true;
      mesh.material.opacity = 0;
      mesh.scale.y = 0;
    });

    meshes.forEach((mesh, i) => {
      gsap.to(mesh.scale, {
        y: 1,
        duration: 0.8,
        delay: i * 0.07,
        ease: "back.out(1.7)",
      });

      gsap.to(mesh.material, {
        opacity: 1,
        duration: 0.8,
        delay: i * 0.07,
        ease: "power3.out",
        onUpdate: () => {
          mesh.material.needsUpdate = true;
        },
      });
    });

    return () => {
      meshes.forEach((mesh, i) => {
        gsap.to(mesh.scale, {
          y: 0,
          duration: 0.5,
          delay: (meshes.length - i - 1) * 0.05,
          ease: "power3.in",
        });

        gsap.to(mesh.material, {
          opacity: 0,
          duration: 0.5,
          delay: (meshes.length - i - 1) * 0.05,
          ease: "power3.in",
          onUpdate: () => {
            mesh.material.needsUpdate = true;
          },
        });
      });
    };
  }, []);





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
        <mesh key={i} scale={[1, 0, 1]}>
  <planeGeometry args={[1, 1.4]} />
  <grayscaleMaterial
    ref={(ref) => (materialRefs.current[i] = ref)}
    map={textures[0]}
    grayscale={1.0}
    toneMapped={false}
    transparent={true} 
    opacity={0} 
  />
</mesh>

      ))}
    </group>
  );
};

// Slider

const Slider = ({ images, setScrollValue }) => {
  const textures = useLoader(TextureLoader, images);
  const scrollTarget = useRef(0);
  const scrollCurrent = useRef(0);

  // 🟢 Local state used for DisplayPlane
  const [scrollValue, setLocalScrollValue] = useState(0);

  const [phase, setPhase] = useState("entering");
  const [showThumbnails, setShowThumbnails] = useState(true);
  const scrollStopTimeout = useRef();

  // 🟣 Handle wheel scroll input
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

  // 🟢 Sync local scrollValue to parent (Gallery)
//   useFrame(() => {
//   setScrollValue(scrollCurrent.current);
// });


  return (
    <div className="slider">
      <div className="gallery__canvas_wrapper">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight />
        <ScrollController
  scrollTarget={scrollTarget}
  scrollCurrent={scrollCurrent}
  setScrollValue={setLocalScrollValue}
  setExternalScrollValue={setScrollValue} // 👈 new
/>

          <DisplayPlane scrollValue={scrollValue} textures={textures} />
          <Thumbnails scrollCurrent={scrollCurrent} textures={textures} phase={phase} />
        </Canvas>
      </div>
    </div>
  );
};



export default Slider;
