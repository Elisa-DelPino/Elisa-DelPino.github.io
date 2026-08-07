// robot3d.js

let robotAnimationFrameId = null;
let robotResizeObserver = null;
let robotRenderer = null;

export function initRobot3D() {
  const container = document.getElementById("robot-container");

  if (!container) {
    console.error("Le conteneur #robot-container est introuvable.");
    return;
  }

  if (typeof THREE === "undefined") {
    console.error("Three.js n'est pas chargé.");
    return;
  }

  /*
   * Empêche la création de plusieurs scènes
   * ou de plusieurs canvas dans le même conteneur.
   */
  if (container.querySelector("canvas")) {
    return;
  }

  // ---------------------------------------------------------------- SCÈNE

  const scene = new THREE.Scene();

  const camera = new THREE.OrthographicCamera(-3.2, 3.2, 3.2, -3.2, 0.1, 100);

  camera.position.set(0, 0, 10);

  robotRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  robotRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  robotRenderer.setClearColor(0x000000, 0);

  container.appendChild(robotRenderer.domElement);

  // ---------------------------------------------------------------- GROUPE PRINCIPAL

  const robotGroup = new THREE.Group();

  robotGroup.scale.set(0.82, 0.82, 0.82);

  scene.add(robotGroup);

  // ---------------------------------------------------------------- COULEURS

  const purple = 0xa240df;
  const brightPurple = 0xc45cff;

  // ---------------------------------------------------------------- OUTILS DE DESSIN

  const glowMaterials = [];
  const neonCoreMaterials = [];

  function createLineMaterial(
    color,
    opacity,
    blending = THREE.AdditiveBlending,
  ) {
    return new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
      blending,
      depthWrite: false,
    });
  }

  function createNeonLine(points, closed = false) {
    const vectors = points.map(([x, y]) => new THREE.Vector3(x, y, 0));

    if (closed) {
      vectors.push(vectors[0].clone());
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(vectors);

    // Halo extérieur.
    const outerGlowMaterial = createLineMaterial(purple, 0.22);

    const outerGlow = new THREE.Line(geometry.clone(), outerGlowMaterial);

    outerGlow.scale.set(1.15, 1.15, 1);
    outerGlow.position.z = -0.03;

    robotGroup.add(outerGlow);

    // Halo intermédiaire.
    const middleGlowMaterial = createLineMaterial(brightPurple, 0.55);

    const middleGlow = new THREE.Line(geometry.clone(), middleGlowMaterial);

    middleGlow.scale.set(1.1, 1.1, 1);
    middleGlow.position.z = -0.015;

    robotGroup.add(middleGlow);

    // Ligne principale violette.
    const neonMaterial = createLineMaterial(
      brightPurple,
      1,
      THREE.NormalBlending,
    );

    const neonLine = new THREE.Line(geometry.clone(), neonMaterial);

    neonLine.scale.set(1.02, 1.02, 1);
    neonLine.position.z = 0;

    robotGroup.add(neonLine);

    // Cœur presque blanc.
    const coreMaterial = createLineMaterial(
      0xffffff,
      0.28,
      THREE.AdditiveBlending,
    );

    const coreLine = new THREE.Line(geometry, coreMaterial);

    coreLine.scale.set(1.01, 1.01, 1);
    coreLine.position.z = 0.01;

    robotGroup.add(coreLine);

    glowMaterials.push(outerGlowMaterial, middleGlowMaterial);

    neonCoreMaterials.push(neonMaterial, coreMaterial);
  }

  // ---------------------------------------------------------------- FORME DE LA TÊTE

  createNeonLine(
    [
      [-2.05, 1.75],
      [-1.75, 2.05],
      [1.75, 2.05],
      [2.05, 1.75],
      [2.05, -1.75],
      [1.75, -2.05],
      [-1.75, -2.05],
      [-2.05, -1.75],
    ],
    true,
  );

  // ---------------------------------------------------------------- OREILLES

  createNeonLine(
    [
      [-2.05, 0.85],
      [-2.45, 0.85],
      [-2.45, -0.85],
      [-2.05, -0.85],
    ],
    true,
  );

  createNeonLine(
    [
      [2.05, 0.85],
      [2.45, 0.85],
      [2.45, -0.85],
      [2.05, -0.85],
    ],
    true,
  );

  // ---------------------------------------------------------------- ANTENNE

  createNeonLine(
    [
      [-0.55, 2.05],
      [-0.55, 2.45],
      [0.55, 2.45],
      [0.55, 2.05],
    ],
    true,
  );

  createNeonLine([
    [0, 2.45],
    [0, 3.15],
  ]);

  createNeonLine(
    [
      [-0.28, 3.15],
      [0.28, 3.15],
      [0.28, 3.7],
      [-0.28, 3.7],
    ],
    true,
  );

  // ---------------------------------------------------------------- YEUX

  createNeonLine(
    [
      [-1.25, 0.75],
      [-0.55, 0.75],
      [-0.55, 0.05],
      [-1.25, 0.05],
    ],
    true,
  );

  createNeonLine(
    [
      [0.55, 0.75],
      [1.25, 0.75],
      [1.25, 0.05],
      [0.55, 0.05],
    ],
    true,
  );

  // ---------------------------------------------------------------- BOUCHE

  createNeonLine(
    [
      [-1.05, -1.05],
      [1.05, -1.05],
      [1.05, -1.35],
      [-1.05, -1.35],
    ],
    true,
  );

  // ---------------------------------------------------------------- REDIMENSIONNEMENT

  function resizeRobot() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width <= 0 || height <= 0) {
      return;
    }

    const aspect = width / height;

    const viewHeight = 7.4;
    const viewWidth = viewHeight * aspect;

    camera.left = -viewWidth / 2;
    camera.right = viewWidth / 2;
    camera.top = viewHeight / 2;
    camera.bottom = -viewHeight / 2;

    camera.updateProjectionMatrix();

    robotRenderer.setSize(width, height, false);
  }

  robotResizeObserver = new ResizeObserver(() => {
    console.count("resize robot");
    resizeRobot();
  });

  robotResizeObserver.observe(container);

  // ---------------------------------------------------------------- ANIMATION DU NÉON

  const clock = new THREE.Clock();

  let nextFlickerTime = 0;
  let flickerEndTime = 0;
  let isFlickering = false;

  function animate() {
    robotAnimationFrameId = requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    /*
     * Respiration lente du néon.
     */
    const breathing = 1 + Math.sin(elapsed * 0.35) * 0.18;

    neonCoreMaterials.forEach((material, index) => {
      const baseOpacity = index % 2 === 0 ? 1 : 0.3;

      material.opacity = Math.min(1, baseOpacity * breathing);
    });

    glowMaterials.forEach((material, index) => {
      const baseOpacity = index % 2 === 0 ? 0.22 : 0.55;

      material.opacity = Math.min(1, baseOpacity * breathing);
    });

    /*
     * Déclenchement du grésillement.
     */
    if (!isFlickering && elapsed >= nextFlickerTime) {
      isFlickering = true;

      flickerEndTime = elapsed + 0.35 + Math.random() * 0.25;
    }

    if (isFlickering) {
      const randomValue = Math.random();

      let flicker = 1;

      if (randomValue < 0.18) {
        flicker = 0.18;
      } else if (randomValue < 0.38) {
        flicker = 0.45;
      } else if (randomValue < 0.58) {
        flicker = 0.72;
      }

      neonCoreMaterials.forEach((material) => {
        material.opacity *= flicker;
      });

      glowMaterials.forEach((material) => {
        material.opacity *= flicker;
      });

      /*
       * Conservé uniquement si robotLight existe
       * dans une autre version du script.
       */
      if (typeof robotLight !== "undefined") {
        robotLight.intensity *= flicker;
      }

      if (elapsed >= flickerEndTime) {
        isFlickering = false;

        nextFlickerTime = elapsed + 1 + Math.random();
      }
    }

    robotRenderer.render(scene, camera);
  }

  /*
   * Un seul lancement de la boucle.
   *
   * Il y avait auparavant deux blocs identiques,
   * ce qui créait deux boucles requestAnimationFrame
   * permanentes pour le même robot.
   */
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      resizeRobot();
      animate();
    });
  });
}

export function destroyRobot3D() {
  if (robotAnimationFrameId !== null) {
    cancelAnimationFrame(robotAnimationFrameId);

    robotAnimationFrameId = null;
  }

  if (robotResizeObserver) {
    robotResizeObserver.disconnect();
    robotResizeObserver = null;
  }

  if (robotRenderer) {
    robotRenderer.dispose();

    if (robotRenderer.domElement) {
      robotRenderer.domElement.remove();
    }

    robotRenderer = null;
  }
}
