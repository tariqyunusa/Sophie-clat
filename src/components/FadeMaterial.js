import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const FadeMaterial = shaderMaterial(
  {
    texture1: null,
    texture2: null,
    mixFactor: 0,
    twistFactor: 0.0,
  },
  // Vertex Shader
  `
   // Vertex Shader (Add this inside your FadeMaterial)
uniform float twistFactor;
varying vec2 vUv;

void main() {
  vUv = uv;
  float twist = position.y * twistFactor;
  float s = sin(twist);
  float c = cos(twist);
  vec3 twistedPosition = position;
  twistedPosition.x = position.x * c - position.z * s;
  twistedPosition.z = position.x * s + position.z * c;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(twistedPosition, 1.0);
}

  `,
  // Fragment Shader
  `
    uniform sampler2D texture1;
    uniform sampler2D texture2;
    uniform float mixFactor;
    varying vec2 vUv;

    vec3 gammaCorrect(vec3 color) {
      return pow(color, vec3(2.2)); 
    }

    vec3 gammaUncorrect(vec3 color) {
      return pow(color, vec3(1.0 / 2.2)); 
    }

    void main() {
      vec4 tex1 = texture2D(texture1, vUv);
      vec4 tex2 = texture2D(texture2, vUv);

      vec3 linear1 = gammaCorrect(tex1.rgb);
      vec3 linear2 = gammaCorrect(tex2.rgb);

      vec3 mixed = mix(linear1, linear2, clamp(mixFactor, 0.0, 1.0));
      vec3 finalColor = gammaUncorrect(mixed);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

export default FadeMaterial;
