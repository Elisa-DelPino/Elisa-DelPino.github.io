// horloge.js

import * as THREE from "https://esm.sh/three@0.180.0";

let horlogeAnimationFrameId = null;
let horlogeResizeObserver = null;
let horlogeRenderer = null;
let horlogeScene = null;
let horlogeAnimationLoop = null;
let horlogeAnimationRunning = false;

export function initHorloge() {
  const container = document.getElementById("horloge-container");

  if (!container) {
    console.error("Le conteneur #horloge-container est introuvable.");
    return;
  }

  if (container.querySelector("canvas")) {
    startHorloge();

    return;
  }

  // ------------------------------------------------ SCÈNE

  const scene = new THREE.Scene();

  horlogeScene = scene;

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);

  camera.position.set(0, 0, 5);

  horlogeRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  horlogeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  horlogeRenderer.setClearColor(0x000000, 0);

  container.appendChild(horlogeRenderer.domElement);

  // ------------------------------------------------ GROUPE PRINCIPAL

  const clockGroup = new THREE.Group();

  clockGroup.scale.set(0.78, 0.78, 0.78);

  scene.add(clockGroup);

  // ------------------------------------------------ COULEURS

  const white = 0xffffff;
  const lightGray = 0xe8e8e8;
  const mediumGray = 0xa8a8a8;
  const darkGray = 0x2a2a2a;
  const blueGray = 0x000000;

  // ------------------------------------------------ FOND DE L'HORLOGE

  const faceGeometry = new THREE.CircleGeometry(1.52, 96);

  const faceMaterial = new THREE.MeshPhongMaterial({
    color: blueGray,
    emissive: darkGray,
    emissiveIntensity: 0.35,
    transparent: false,
    opacity: 1,
    shininess: 80,
    side: THREE.DoubleSide,
  });

  const face = new THREE.Mesh(faceGeometry, faceMaterial);

  face.position.z = 0;

  clockGroup.add(face);

  // ------------------------------------------------ CONTOUR EXTÉRIEUR

  const outerRingGeometry = new THREE.RingGeometry(1.5, 1.52, 96);

  const outerRingMaterial = new THREE.MeshBasicMaterial({
    color: lightGray,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide,
  });

  const outerRing = new THREE.Mesh(outerRingGeometry, outerRingMaterial);

  outerRing.position.z = 0.02;

  clockGroup.add(outerRing);

  // ------------------------------------------------ CONTOUR INTÉRIEUR

  const innerRingGeometry = new THREE.RingGeometry(1.39, 1.405, 96);

  const innerRingMaterial = new THREE.MeshBasicMaterial({
    color: mediumGray,
    transparent: true,
    opacity: 0.28,
    side: THREE.DoubleSide,
  });

  const innerRing = new THREE.Mesh(innerRingGeometry, innerRingMaterial);

  innerRing.position.z = 0.025;

  clockGroup.add(innerRing);

  // ------------------------------------------------ REPÈRES DES MINUTES

  for (let index = 0; index < 60; index++) {
    const major = index % 5 === 0;

    const width = major ? 0.025 : 0.008;
    const height = major ? 0.16 : 0.075;

    const geometry = new THREE.PlaneGeometry(width, height);

    const material = new THREE.MeshBasicMaterial({
      color: major ? lightGray : mediumGray,
      transparent: true,
      opacity: major ? 0.92 : 0.42,
      side: THREE.DoubleSide,
    });

    const marker = new THREE.Mesh(geometry, material);

    const angle = (index / 60) * Math.PI * 2;

    const radius = major ? 1.27 : 1.31;

    marker.position.set(
      Math.sin(angle) * radius,
      Math.cos(angle) * radius,
      0.04,
    );

    marker.rotation.z = -angle;

    clockGroup.add(marker);
  }

  // ------------------------------------------------ POINTS DES HEURES

  for (let index = 0; index < 12; index++) {
    const angle = (index / 12) * Math.PI * 2;

    const geometry = new THREE.CircleGeometry(0.035, 24);

    const material = new THREE.MeshBasicMaterial({
      color: white,
      transparent: true,
      opacity: 0.88,
    });

    const point = new THREE.Mesh(geometry, material);

    const radius = 1.08;

    point.position.set(
      Math.sin(angle) * radius,
      Math.cos(angle) * radius,
      0.055,
    );

    clockGroup.add(point);
  }

  // ------------------------------------------------ AIGUILLE DES HEURES

  const hourHandGroup = new THREE.Group();

  hourHandGroup.position.z = 0.1;

  clockGroup.add(hourHandGroup);

  const hourHandGeometry = new THREE.PlaneGeometry(0.075, 0.72);

  const hourHandMaterial = new THREE.MeshBasicMaterial({
    color: lightGray,
    transparent: true,
    opacity: 1,
    side: THREE.DoubleSide,
  });

  const hourHand = new THREE.Mesh(hourHandGeometry, hourHandMaterial);

  hourHand.position.y = 0.32;

  hourHandGroup.add(hourHand);

  // ------------------------------------------------ AIGUILLE DES MINUTES

  const minuteHandGroup = new THREE.Group();

  minuteHandGroup.position.z = 0.12;

  clockGroup.add(minuteHandGroup);

  const minuteHandGeometry = new THREE.PlaneGeometry(0.05, 1);

  const minuteHandMaterial = new THREE.MeshBasicMaterial({
    color: white,
    transparent: true,
    opacity: 1,
    side: THREE.DoubleSide,
  });

  const minuteHand = new THREE.Mesh(minuteHandGeometry, minuteHandMaterial);

  minuteHand.position.y = 0.45;

  minuteHandGroup.add(minuteHand);

  // ------------------------------------------------ AIGUILLE DES SECONDES

  const secondHandGroup = new THREE.Group();

  secondHandGroup.position.z = 0.15;

  clockGroup.add(secondHandGroup);

  const secondHandGeometry = new THREE.PlaneGeometry(0.018, 1.15);

  const secondHandMaterial = new THREE.MeshBasicMaterial({
    color: mediumGray,
    transparent: true,
    opacity: 0.95,
    side: THREE.DoubleSide,
  });

  const secondHand = new THREE.Mesh(secondHandGeometry, secondHandMaterial);

  secondHand.position.y = 0.46;

  secondHandGroup.add(secondHand);

  // ------------------------------------------------ CONTREPOIDS DE LA TROTTEUSE

  const counterWeightGeometry = new THREE.PlaneGeometry(0.018, 0.28);

  const counterWeightMaterial = new THREE.MeshBasicMaterial({
    color: mediumGray,
    transparent: true,
    opacity: 0.95,
    side: THREE.DoubleSide,
  });

  const counterWeight = new THREE.Mesh(
    counterWeightGeometry,
    counterWeightMaterial,
  );

  counterWeight.position.y = -0.13;

  secondHandGroup.add(counterWeight);

  // ------------------------------------------------ CENTRE

  const centerOuterGeometry = new THREE.CircleGeometry(0.095, 32);

  const centerOuterMaterial = new THREE.MeshBasicMaterial({
    color: darkGray,
    transparent: true,
    opacity: 1,
  });

  const centerOuter = new THREE.Mesh(centerOuterGeometry, centerOuterMaterial);

  centerOuter.position.z = 0.18;

  clockGroup.add(centerOuter);

  const centerInnerGeometry = new THREE.CircleGeometry(0.052, 32);

  const centerInnerMaterial = new THREE.MeshBasicMaterial({
    color: white,
    transparent: true,
    opacity: 1,
  });

  const centerInner = new THREE.Mesh(centerInnerGeometry, centerInnerMaterial);

  centerInner.position.z = 0.19;

  clockGroup.add(centerInner);

  // ------------------------------------------------ CERCLE CENTRAL DISCRET

  const centerRingGeometry = new THREE.RingGeometry(0.17, 0.18, 48);

  const centerRingMaterial = new THREE.MeshBasicMaterial({
    color: mediumGray,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
  });

  const centerRing = new THREE.Mesh(centerRingGeometry, centerRingMaterial);

  centerRing.position.z = 0.07;

  clockGroup.add(centerRing);

  // ------------------------------------------------ LUMIÈRES

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);

  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.4);

  directionalLight.position.set(2, 3, 5);

  scene.add(directionalLight);

  const softLight = new THREE.PointLight(0xd8d8d8, 0.8, 8);

  softLight.position.set(-2, 1, 3);

  scene.add(softLight);

  // ------------------------------------------------ MISE À L'HEURE

  function updateClock() {
    const now = new Date();

    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    const preciseSeconds = seconds + milliseconds / 1000;
    const preciseMinutes = minutes + preciseSeconds / 60;
    const preciseHours = hours + preciseMinutes / 60;

    const secondAngle = (preciseSeconds / 60) * Math.PI * 2;
    const minuteAngle = (preciseMinutes / 60) * Math.PI * 2;
    const hourAngle = (preciseHours / 12) * Math.PI * 2;

    secondHandGroup.rotation.z = -secondAngle;
    minuteHandGroup.rotation.z = -minuteAngle;
    hourHandGroup.rotation.z = -hourAngle;
  }

  // ------------------------------------------------ REDIMENSIONNEMENT

  function resizeHorloge() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width <= 0 || height <= 0) {
      return;
    }

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    horlogeRenderer.setSize(width, height, false);
  }

  horlogeResizeObserver = new ResizeObserver(() => {
    resizeHorloge();
  });

  horlogeResizeObserver.observe(container);

  // ------------------------------------------------ ANIMATION

  function animate() {
    if (!horlogeAnimationRunning || !horlogeRenderer || !horlogeScene) {
      horlogeAnimationFrameId = null;

      return;
    }

    updateClock();

    horlogeRenderer.render(scene, camera);

    horlogeAnimationFrameId = requestAnimationFrame(animate);
  }

  horlogeAnimationLoop = animate;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      resizeHorloge();
      updateClock();

      if (horlogeRenderer && horlogeScene) {
        horlogeRenderer.render(scene, camera);
      }
    });
  });
}

export function startHorloge() {
  if (
    horlogeAnimationRunning ||
    !horlogeRenderer ||
    !horlogeScene ||
    typeof horlogeAnimationLoop !== "function"
  ) {
    return;
  }

  horlogeAnimationRunning = true;

  horlogeAnimationFrameId = requestAnimationFrame(horlogeAnimationLoop);
}

export function stopHorloge() {
  horlogeAnimationRunning = false;

  if (horlogeAnimationFrameId !== null) {
    cancelAnimationFrame(horlogeAnimationFrameId);
    horlogeAnimationFrameId = null;
  }
}

// ------------------------------------------------ DESTRUCTION

export function destroyHorloge() {
  stopHorloge();

  if (horlogeResizeObserver) {
    horlogeResizeObserver.disconnect();
    horlogeResizeObserver = null;
  }

  if (horlogeRenderer) {
    horlogeRenderer.dispose();

    if (horlogeRenderer.domElement) {
      horlogeRenderer.domElement.remove();
    }

    horlogeRenderer = null;
  }

  horlogeScene = null;
  horlogeAnimationLoop = null;
}
