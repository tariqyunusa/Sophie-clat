import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const GrayscaleMaterial = shaderMaterial(
  {
    map: null,
    grayscale: 1.0,
  },

  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  `
    uniform sampler2D map;
    uniform float grayscale;
    varying vec2 vUv;

    void main() {
      vec4 color = texture2D(map, vUv);
      float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      vec3 finalColor = mix(color.rgb, vec3(gray), grayscale);
      gl_FragColor = vec4(finalColor, color.a);
    }
  `
);

export default GrayscaleMaterial;
