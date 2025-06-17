import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const CurvedSliceMaterial = shaderMaterial(
  {
    map: null,
    angle: Math.PI / 6,
    radius: 14.0,
    thetaOffset: 0.0,
    ambientStrength: 1.0,
    lightColor: new THREE.Color("#8B3D6B"),
  },
  /* glsl */ `
    precision mediump float;

    varying vec2 vUv;

    uniform float angle;
    uniform float radius;
    uniform float thetaOffset;

    void main() {
      vUv = uv;

      float theta = (uv.x - 0.5) * angle + thetaOffset;
      float x = sin(theta) * radius - 1.0;
      float z = radius - cos(theta) * radius ;

      vec3 transformed = position;
      transformed.x = x * 1.05;
      transformed.z = z ;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    }
  `,
  /* glsl */ `
    uniform sampler2D map;
    uniform float ambientStrength;
    uniform vec3 lightColor;

    varying vec2 vUv;

    void main() {
    vec4 tex = texture2D(map, vUv);
    if (tex.a < 0.1) discard;

    vec3 tinted = mix(tex.rgb, tex.rgb * lightColor, ambientStrength);
    tinted = pow(tinted, vec3(1.0 / 1.4)); 

    gl_FragColor = vec4(tinted, tex.a);
  }


  `
);

export default CurvedSliceMaterial;
