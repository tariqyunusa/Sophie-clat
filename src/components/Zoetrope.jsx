import React, { useRef } from "react";
import { useLoader, useFrame, extend } from "@react-three/fiber";
import { TextureLoader } from "three";
import CurvedSliceMaterial from "./CurvedMaterial";
import * as THREE from "three";

extend({ CurvedSliceMaterial });

const Zoetrope = ({ items }) => {
  const radius = 94;
  const spacingFactor = 1.05;
  const baseAngle = ((2 * Math.PI) / items.length) * 0.95;
  const curvedAngle = baseAngle * 0.95;
  const textures = useLoader(
    TextureLoader,
    items.map((i) => i.Img)
  );

  const meshRefs = useRef([]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const speed = 0.3; 

    meshRefs.current.forEach((mesh, idx) => {
      if (!mesh) return;
      const theta = (idx * baseAngle * spacingFactor + t * speed) % (2 * Math.PI);
      mesh.material.uniforms.thetaOffset.value = theta;
    });
  });

  return (
    <group position={[10, 30, 0]}>
      {textures.map((texture, idx) => (
        <mesh
          key={idx}
          ref={(el) => (meshRefs.current[idx] = el)}
          position={[0, 0, 0]}
        >
          <planeGeometry args={[0, 55, 100, 100]} />
          <curvedSliceMaterial
            map={texture}
            radius={radius}
            angle={curvedAngle}
            thetaOffset={idx * baseAngle * spacingFactor}
            transparent
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
