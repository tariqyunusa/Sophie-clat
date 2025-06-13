import React from 'react'
import { useLoader, extend } from '@react-three/fiber'
import { TextureLoader } from 'three'
import CurvedSliceMaterial from './CurvedMaterial'
import * as THREE from 'three'

extend({ CurvedSliceMaterial })

const Zoetrope = ({ items }) => {
  const radius = 14
const spacingFactor = 1.15 
const baseAngle = (2 * Math.PI) / items.length
const curvedAngle = baseAngle * 0.95
  const textures = useLoader(TextureLoader, items.map(i => i.Img))

  return (
    <group>
      <ambientLight intensity={0.5} />
      {textures.map((texture, idx) => {
        const theta = idx * baseAngle * spacingFactor 
        const x = Math.sin(theta) * radius
        const z = Math.cos(theta) * radius

        return (
          <mesh
            key={idx}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]} 
          >
            <planeGeometry args={[20, 12, 84, 84]} />
            <curvedSliceMaterial
              map={texture}
              radius={radius}
              angle={curvedAngle}
              thetaOffset={theta}
              transparent
              side={THREE.DoubleSide}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export default Zoetrope
