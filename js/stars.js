// js/stars.js
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.module.js";

export function initStars(element = document.body, options = {}) {
  if (!element) return;

  const params = {
    starCount: 6000,
    baseSize: 3,
    maxSize: 3.5,
    minSpeed: 0.01,
    maxSpeed: 0.05,
    rotationX: 0.00005,
    rotationY: 0.0005,
    rotationZ: 0.000001,
    scintillationSpeed: 0.005,
    texture: "./img/star1.png",
    adaptToDiv: false, // si true, le renderer prend la taille de la div
    ...options,
  };

  // --- Scene et Camera ---
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    params.adaptToDiv
      ? element.clientWidth / element.clientHeight
      : window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 1;

  // --- Renderer ---
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  if (params.adaptToDiv) {
    renderer.setSize(element.clientWidth, element.clientHeight);
  } else {
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = "0";
  renderer.domElement.style.left = "0";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.pointerEvents = "none";
  renderer.domElement.style.zIndex = "1";
  element.style.position = "relative";
  element.appendChild(renderer.domElement);

  // --- Création des étoiles ---
  const positions = new Float32Array(params.starCount * 3);
  const velocities = [];
  for (let i = 0; i < params.starCount; i++) {
    positions[i * 3 + 0] = Math.random() * 600 - 300;
    positions[i * 3 + 1] = Math.random() * 600 - 300;
    positions[i * 3 + 2] = Math.random() * 600 - 300;
    velocities[i] =
      Math.random() * (params.maxSpeed - params.minSpeed) + params.minSpeed;
  }

  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const sprite = new THREE.TextureLoader().load(params.texture);
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: params.baseSize,
    map: sprite,
    transparent: true,
  });

  const stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);

  // --- Resize ---
  window.addEventListener("resize", () => {
    if (params.adaptToDiv) {
      camera.aspect = element.clientWidth / element.clientHeight;
      renderer.setSize(element.clientWidth, element.clientHeight);
    } else {
      camera.aspect = window.innerWidth / window.innerHeight;
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    camera.updateProjectionMatrix();
  });

  // --- Animation ---
  function animate() {
    const pos = starGeo.attributes.position.array;
    const time = Date.now() * params.scintillationSpeed;
    for (let i = 0; i < params.starCount; i++) {
      pos[i * 3 + 1] -= velocities[i];
      if (pos[i * 3 + 1] < -300) {
        pos[i * 3 + 1] = 300;
        velocities[i] =
          Math.random() * (params.maxSpeed - params.minSpeed) + params.minSpeed;
      }
    }

    stars.material.size = Math.min(
      params.baseSize + Math.sin(time) * 0.3,
      params.maxSize,
    );
    starGeo.attributes.position.needsUpdate = true;

    stars.rotation.x += params.rotationX;
    stars.rotation.y += params.rotationY;
    stars.rotation.z += params.rotationZ;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
}
