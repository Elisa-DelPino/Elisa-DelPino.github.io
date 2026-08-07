// circuit3d.js
// Three.js est chargé globalement dans index.html avec three.min.js.
// Ne mets pas : import * as THREE from "three";

let circuitAnimationFrameId = null;
let circuitResizeObserver = null;
let circuitRenderer = null;

export function initCircuit3D() {
  const container = document.getElementById("circuit-container");

  if (!container) {
    console.error("Le conteneur #circuit-container est introuvable.");
    return;
  }

  if (typeof THREE === "undefined") {
    console.error("Three.js n'est pas chargé.");
    return;
  }

  // Évite de recréer plusieurs canvas.
  if (container.querySelector("canvas")) {
    return;
  }

  // ---------------------------------------------------------------- SCÈNE

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);

  camera.position.set(0, 0, 7);

  circuitRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  circuitRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  circuitRenderer.setClearColor(0x000000, 0);

  container.appendChild(circuitRenderer.domElement);

  // ---------------------------------------------------------------- GROUPE PRINCIPAL

  const circuitGroup = new THREE.Group();

  // Circuit parfaitement droit.
  circuitGroup.rotation.set(0, 0, 0);

  // Taille générale du circuit.
  circuitGroup.scale.set(0.7, 0.7, 0.7);

  scene.add(circuitGroup);

  // ---------------------------------------------------------------- COULEURS

  const purple = 0xa240df;
  const brightPurple = 0xd88cff;
  const whitePurple = 0xf5ddff;
  const darkPurple = 0x260b38;

  // ---------------------------------------------------------------- PUCE CENTRALE

  const chipGeometry = new THREE.BoxGeometry(1.45, 1.45, 0.25);

  const chipMaterial = new THREE.MeshBasicMaterial({
    color: purple,
    transparent: true,
    opacity: 0.95,
  });

  const chip = new THREE.Mesh(chipGeometry, chipMaterial);

  chip.position.z = 0.1;

  circuitGroup.add(chip);

  // Contour de la puce centrale uniquement.
  const chipEdges = new THREE.EdgesGeometry(chipGeometry);

  const chipEdgeMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
  });

  const chipOutline = new THREE.LineSegments(chipEdges, chipEdgeMaterial);

  chipOutline.position.z = 0.105;

  circuitGroup.add(chipOutline);

  // ---------------------------------------------------------------- CŒUR DE LA PUCE

  const coreGeometry = new THREE.PlaneGeometry(0.62, 0.62);

  const coreMaterial = new THREE.MeshBasicMaterial({
    color: brightPurple,
    transparent: true,
    opacity: 1,
    blending: THREE.NormalBlending,
    depthWrite: false,
  });

  const core = new THREE.Mesh(coreGeometry, coreMaterial);

  core.position.z = 0.24;

  circuitGroup.add(core);

  // Halo derrière le cœur.
  const coreHaloGeometry = new THREE.PlaneGeometry(0.95, 0.95);

  const coreHaloMaterial = new THREE.MeshBasicMaterial({
    color: brightPurple,
    transparent: true,
    opacity: 0.08,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const coreHalo = new THREE.Mesh(coreHaloGeometry, coreHaloMaterial);

  coreHalo.position.z = 0.23;

  circuitGroup.add(coreHalo);

  // ---------------------------------------------------------------- PISTES ET IMPULSIONS

  const circuitPaths = [];

  /**
   * Calcule la longueur totale d’un chemin composé
   * de plusieurs segments droits.
   */
  function calculatePathData(vectors) {
    const segmentLengths = [];
    let totalLength = 0;

    for (let index = 0; index < vectors.length - 1; index++) {
      const length = vectors[index].distanceTo(vectors[index + 1]);

      segmentLengths.push(length);
      totalLength += length;
    }

    return {
      segmentLengths,
      totalLength,
    };
  }

  /**
   * Retourne une position précise le long d’un chemin.
   * progress doit être compris entre 0 et 1.
   */
  function getPositionAlongPath(pathData, progress) {
    const { vectors, segmentLengths, totalLength } = pathData;

    const targetDistance = THREE.MathUtils.clamp(progress, 0, 1) * totalLength;

    let travelledDistance = 0;

    for (let index = 0; index < segmentLengths.length; index++) {
      const segmentLength = segmentLengths[index];

      if (travelledDistance + segmentLength >= targetDistance) {
        const distanceInsideSegment = targetDistance - travelledDistance;

        const localProgress =
          segmentLength === 0 ? 0 : distanceInsideSegment / segmentLength;

        return new THREE.Vector3().lerpVectors(
          vectors[index],
          vectors[index + 1],
          localProgress,
        );
      }

      travelledDistance += segmentLength;
    }

    return vectors[vectors.length - 1].clone();
  }

  /**
   * Crée un halo circulaire pour une impulsion.
   */
  function createPulseHalo(size, opacity) {
    const geometry = new THREE.CircleGeometry(size, 32);

    const material = new THREE.MeshBasicMaterial({
      color: purple,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return new THREE.Mesh(geometry, material);
  }

  /**
   * Crée une piste et son impulsion lumineuse animée.
   */
  function createCircuitPath(points, delay = 0, speed = 0.32) {
    const vectors = points.map(([x, y]) => new THREE.Vector3(x, y, 0.03));

    const geometry = new THREE.BufferGeometry().setFromPoints(vectors);

    // Ligne principale sombre et violette.
    const material = new THREE.LineBasicMaterial({
      color: purple,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const line = new THREE.Line(geometry, material);

    circuitGroup.add(line);

    // Petite impulsion centrale très lumineuse.
    const pulseCoreGeometry = new THREE.CircleGeometry(0.045, 24);

    const pulseCoreMaterial = new THREE.MeshBasicMaterial({
      color: whitePurple,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pulseCore = new THREE.Mesh(pulseCoreGeometry, pulseCoreMaterial);

    pulseCore.position.z = 0.09;

    circuitGroup.add(pulseCore);

    // Premier halo.
    const pulseHalo = createPulseHalo(0.11, 0.55);

    pulseHalo.position.z = 0.075;

    circuitGroup.add(pulseHalo);

    // Second halo plus large et plus discret.
    const pulseOuterHalo = createPulseHalo(0.2, 0.18);

    pulseOuterHalo.position.z = 0.065;

    circuitGroup.add(pulseOuterHalo);

    const pathMeasurements = calculatePathData(vectors);

    circuitPaths.push({
      vectors,
      segmentLengths: pathMeasurements.segmentLengths,
      totalLength: pathMeasurements.totalLength,

      material,

      pulseCore,
      pulseCoreMaterial,

      pulseHalo,
      pulseHaloMaterial: pulseHalo.material,

      pulseOuterHalo,
      pulseOuterHaloMaterial: pulseOuterHalo.material,

      delay,
      speed,
    });

    return line;
  }

  // ---------------------------------------------------------------- PISTES VERS LA GAUCHE

  createCircuitPath(
    [
      [-0.72, 0.48],
      [-1.25, 0.48],
      [-1.25, 1.5],
      [-2.25, 1.5],
    ],
    0,
    0.3,
  );

  createCircuitPath(
    [
      [-0.72, 0.12],
      [-1.55, 0.12],
      [-1.55, 0.75],
      [-2.35, 0.75],
    ],
    0.65,
    0.28,
  );

  createCircuitPath(
    [
      [-0.72, -0.3],
      [-1.15, -0.3],
      [-1.15, -1.3],
      [-2.25, -1.3],
    ],
    1.25,
    0.32,
  );

  createCircuitPath(
    [
      [-0.35, -0.72],
      [-0.35, -1.55],
      [-1.65, -1.55],
      [-1.65, -2.3],
    ],
    1.9,
    0.29,
  );

  // ---------------------------------------------------------------- PISTES VERS LA DROITE

  createCircuitPath(
    [
      [0.72, 0.5],
      [1.4, 0.5],
      [1.4, 1.45],
      [2.3, 1.45],
    ],
    0.3,
    0.31,
  );

  createCircuitPath(
    [
      [0.72, 0.08],
      [1.65, 0.08],
      [1.65, 0.8],
      [2.35, 0.8],
    ],
    0.95,
    0.27,
  );

  createCircuitPath(
    [
      [0.72, -0.35],
      [1.25, -0.35],
      [1.25, -1.4],
      [2.25, -1.4],
    ],
    1.55,
    0.3,
  );

  createCircuitPath(
    [
      [0.35, -0.72],
      [0.35, -1.55],
      [1.7, -1.55],
      [1.7, -2.3],
    ],
    2.2,
    0.28,
  );

  // ---------------------------------------------------------------- PISTES VERS LE HAUT

  createCircuitPath(
    [
      [-0.45, 0.72],
      [-0.45, 1.4],
      [-1.55, 1.4],
      [-1.55, 2.3],
    ],
    0.45,
    0.29,
  );

  createCircuitPath(
    [
      [0, 0.72],
      [0, 2.3],
    ],
    1.1,
    0.33,
  );

  createCircuitPath(
    [
      [0.45, 0.72],
      [0.45, 1.4],
      [1.55, 1.4],
      [1.55, 2.3],
    ],
    1.75,
    0.28,
  );

  // ---------------------------------------------------------------- PISTE VERS LE BAS

  createCircuitPath(
    [
      [0, -0.72],
      [0, -2.3],
    ],
    2.4,
    0.34,
  );

  // ---------------------------------------------------------------- NŒUDS AUX EXTRÉMITÉS

  const glowingNodes = [];

  function createNode(x, y, size = 0.055) {
    const geometry = new THREE.CircleGeometry(size, 24);

    const material = new THREE.MeshBasicMaterial({
      color: brightPurple,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const node = new THREE.Mesh(geometry, material);

    node.position.set(x, y, 0.05);

    circuitGroup.add(node);

    const halo = createPulseHalo(size * 2.6, 0.12);

    halo.position.set(x, y, 0.045);

    circuitGroup.add(halo);

    glowingNodes.push({
      node,
      halo,
      material,
      haloMaterial: halo.material,
    });

    return node;
  }

  createNode(-2.25, 1.5);
  createNode(-2.35, 0.75);
  createNode(-2.25, -1.3);
  createNode(-1.65, -2.3);

  createNode(2.3, 1.45);
  createNode(2.35, 0.8);
  createNode(2.25, -1.4);
  createNode(1.7, -2.3);

  createNode(-1.55, 2.3);
  createNode(0, 2.3);
  createNode(1.55, 2.3);
  createNode(0, -2.3);

  // ---------------------------------------------------------------- PETITS COMPOSANTS

  function createComponent(x, y, width, height) {
    const geometry = new THREE.BoxGeometry(width, height, 0.1);

    const material = new THREE.MeshPhongMaterial({
      color: 0x160820,
      emissive: purple,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.85,
    });

    const component = new THREE.Mesh(geometry, material);

    component.position.set(x, y, 0.02);

    circuitGroup.add(component);

    return component;
  }

  createComponent(-1.75, 0.25, 0.34, 0.18);
  createComponent(1.9, -0.15, 0.4, 0.2);
  createComponent(-0.9, 1.85, 0.28, 0.28);
  createComponent(0.85, -1.9, 0.3, 0.22);
  createComponent(1.75, 1.85, 0.25, 0.36);
  createComponent(-1.9, -0.65, 0.22, 0.35);

  // ---------------------------------------------------------------- LUMIÈRES

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);

  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);

  directionalLight.position.set(2, 3, 5);

  scene.add(directionalLight);

  const neonLight = new THREE.PointLight(purple, 1.4, 10);

  neonLight.position.set(0, 0, 4);

  scene.add(neonLight);

  // ---------------------------------------------------------------- REDIMENSIONNEMENT

  function resizeCircuit() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width <= 0 || height <= 0) {
      return;
    }

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    circuitRenderer.setSize(width, height, false);
  }

  circuitResizeObserver = new ResizeObserver(() => {
    console.count("resize circuit");
    resizeCircuit();
  });

  circuitResizeObserver.observe(container);

  // ---------------------------------------------------------------- ANIMATION

  const clock = new THREE.Clock();

  function animate() {
    circuitAnimationFrameId = requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    // Le circuit reste toujours parfaitement droit.
    circuitGroup.rotation.set(0, 0, 0);

    // Pulsation douce du cœur.
    const pulse = 1 + Math.sin(elapsed * 2.8) * 0.08;

    // Le cœur grossit légèrement.
    core.scale.set(pulse, pulse, pulse);

    // Le halo suit le mouvement avec une amplitude un peu plus grande.
    const haloPulse = 1 + Math.sin(elapsed * 2.8) * 0.15;

    coreHalo.scale.set(haloPulse, haloPulse, haloPulse);

    // L'opacité varie très légèrement.
    coreMaterial.opacity = 0.95 + Math.sin(elapsed * 2.8) * 0.05;

    coreHaloMaterial.opacity = 0.06 + Math.sin(elapsed * 2.8) * 0.04;

    // Déplacement des impulsions sur les pistes.
    circuitPaths.forEach((pathData) => {
      /*
       * Le modulo fait recommencer l’impulsion
       * après son arrivée à l’extrémité.
       */
      const rawProgress = elapsed * pathData.speed - pathData.delay;

      const progress = ((rawProgress % 1) + 1) % 1;

      const position = getPositionAlongPath(pathData, progress);

      pathData.pulseCore.position.set(position.x, position.y, 0.1);

      pathData.pulseHalo.position.set(position.x, position.y, 0.08);

      pathData.pulseOuterHalo.position.set(position.x, position.y, 0.07);

      /*
       * L’impulsion apparaît progressivement,
       * reste visible, puis disparaît doucement
       * à l’extrémité de la piste.
       */
      const fadeIn = THREE.MathUtils.smoothstep(progress, 0, 0.08);

      const fadeOut = 1 - THREE.MathUtils.smoothstep(progress, 0.82, 1);

      const visibility = fadeIn * fadeOut;

      pathData.pulseCoreMaterial.opacity = visibility;

      pathData.pulseHaloMaterial.opacity = visibility * 0.5;

      pathData.pulseOuterHaloMaterial.opacity = visibility * 0.16;

      const pulseScale = 0.9 + Math.sin(elapsed * 8) * 0.12;

      pathData.pulseCore.scale.set(pulseScale, pulseScale, pulseScale);

      pathData.pulseHalo.scale.set(pulseScale, pulseScale, pulseScale);

      // La piste s’éclaire légèrement au passage.
      pathData.material.opacity = 0.3 + visibility * 0.3;
    });

    // Pulsation discrète des extrémités.
    glowingNodes.forEach((nodeData, index) => {
      const pulse = 1 + Math.sin(elapsed * 2.5 - index * 0.4) * 0.13;

      nodeData.node.scale.set(pulse, pulse, pulse);

      nodeData.halo.scale.set(pulse, pulse, pulse);

      nodeData.material.opacity =
        0.58 + Math.sin(elapsed * 2.5 - index * 0.4) * 0.16;
    });

    circuitRenderer.render(scene, camera);
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      resizeCircuit();
      animate();
    });
  });
}

export function destroyCircuit3D() {
  if (circuitAnimationFrameId !== null) {
    cancelAnimationFrame(circuitAnimationFrameId);

    circuitAnimationFrameId = null;
  }

  if (circuitResizeObserver) {
    circuitResizeObserver.disconnect();
    circuitResizeObserver = null;
  }

  if (circuitRenderer) {
    circuitRenderer.dispose();

    if (circuitRenderer.domElement) {
      circuitRenderer.domElement.remove();
    }

    circuitRenderer = null;
  }
}
