import { useEffect, useRef } from "react";
import { useLoader, useFrame, extend } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import gsap from "gsap";
import CurvedSliceMaterial from "./CurvedMaterial";


extend({ CurvedSliceMaterial });

const Zoetrope = ({ items, isMobile, phase }) => {
  const groupRef = useRef();
  const meshRefs = useRef([]);
  const radius = isMobile ? 60 : 94;
  const spacingFactor = 1.05;
  const baseAngle = ((2 * Math.PI) / items.length) * 0.95;
  const curvedAngle = baseAngle * 0.95;

  const textures = useLoader(
    TextureLoader,
    items.map((i) => i.Img)
  );

  useEffect(() => {
    if (!phase || meshRefs.current.length === 0) return;

    if (phase === "entering") {
      meshRefs.current.forEach((mesh) => {
        if (!mesh) return;
        gsap.set(mesh.position, { y: -80 });
        gsap.set(mesh.material, { opacity: 0 });
      });
      gsap.to(
        meshRefs.current.map((m) => m?.position),
        {
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );

      gsap.to(
        meshRefs.current.map((m) => m?.material),
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }

    if (phase === "exiting") {
      gsap.to(
        meshRefs.current.map((m) => m?.position),
        {
          y: -80,
          duration: 0.8,
          ease: "power2.in",
        }
      );

      gsap.to(
        meshRefs.current.map((m) => m?.material),
        {
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        }
      );
    }
  }, [phase]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const speed = 0.3;

    meshRefs.current.forEach((mesh, idx) => {
      if (!mesh) return;
      const theta =
        (idx * baseAngle * spacingFactor + t * speed) % (2 * Math.PI);
      mesh.material.uniforms.thetaOffset.value = theta;
    });
  });

  return (
    <group
      ref={groupRef}
      scale={isMobile ? 1.5 : 1}
      position={[10, isMobile ? 20 : 30, 0]}
    >
      {textures.map((texture, idx) => (
        <mesh
          key={idx}
          ref={(el) => (meshRefs.current[idx] = el)}
          position={[0, -80, 0]}
        >
          <planeGeometry args={[10, 55, 100, 100]} />
          <curvedSliceMaterial
            map={texture}
            radius={radius}
            angle={curvedAngle}
            thetaOffset={idx * baseAngle * spacingFactor}
            transparent
            opacity={1}
            side={THREE.DoubleSide}
            lightColor={new THREE.Color("#8B3D6B")}
            ambientStrength={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

export default Zoetrope;
