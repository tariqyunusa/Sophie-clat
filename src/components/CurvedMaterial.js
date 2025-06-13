import { shaderMaterial } from '@react-three/drei'

const CurvedSliceMaterial = shaderMaterial(
  {
    map: null,
    angle: Math.PI / 6, // angle of each slice
    radius: 14.0,
    thetaOffset: 0.0,
  },
  /* glsl */ `
  precision mediump float;

    varying vec2 vUv;

    uniform float angle;
    uniform float radius;
    uniform float thetaOffset;

    void main() {
      vUv = uv;

      float theta = (uv.x - 0.5) * angle + thetaOffset ;
      float x = sin(theta) * radius ;
      float z = radius - cos(theta) * radius ;

      vec3 transformed = position;
      transformed.x = x;
      transformed.z = z;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    }

  `,
  /* glsl */ `
    uniform sampler2D map;
    varying vec2 vUv;

    void main() {
      vec4 tex = texture2D(map, vUv);
      if (tex.a < 0.1) discard;
      gl_FragColor = tex;
    }
  `
)

export default CurvedSliceMaterial
