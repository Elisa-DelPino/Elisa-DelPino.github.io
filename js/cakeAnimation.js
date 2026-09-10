import * as THREE from "https://esm.sh/three@0.180.0";

/* =====================================================
   ANIMATION GÂTEAU — MODULE INDÉPENDANT
===================================================== */

/* =====================================================
   VARIABLES
===================================================== */

let cakeRenderer = null;
let cakeScene = null;
let cakeCamera = null;

let cakeAnimationFrame = null;

let cakeResizeObserver = null;
let cakeVisibilityObserver = null;

let cakeSceneVersion = 0;

let cakeGroup = null;

let cakeTiers = [];

let glazeSystem = null;
let glazeStartTime = 0;

let roseModel = null;
let rosesGroup = null;

let eucalyptusModel = null;
let eucalyptusGroup = null;

let cakeContainer = null;

let decorationAnimation = {
  phase: "waitingGlaze",
  phaseStart: 0,
  leaves: [],
  roses: [],
};

/* =====================================================
   CSS DE L'ANIMATION
===================================================== */

if (!document.getElementById("cakeAnimationStyle")) {
  const cakeStyle = document.createElement("style");

  cakeStyle.id = "cakeAnimationStyle";

  cakeStyle.innerHTML = `
    .cake-animation {
      position: relative;
      width: 100%;
      min-width: 0;
      min-height: 300px;
      overflow: hidden;
      background: transparent;
      box-sizing: border-box;
    }

    .cake-animation canvas {
      position: absolute;
      inset: 0;
      width: 100% !important;
      height: 100% !important;
      display: block;
    }
  `;

  document.head.appendChild(cakeStyle);
}

/* =====================================================
   OBSERVER VISIBILITÉ
===================================================== */

function disconnectCakeVisibilityObserver() {
  if (cakeVisibilityObserver) {
    cakeVisibilityObserver.disconnect();
    cakeVisibilityObserver = null;
  }
}

/* =====================================================
   FONCTION PUBLIQUE
   DÉMARRER L'ANIMATION
===================================================== */

export function startCakeAnimation(container) {
  if (typeof container === "string") {
    container = document.querySelector(container);
  }

  if (!container) {
    console.warn("Cake animation : conteneur introuvable.");
    return;
  }

  disconnectCakeVisibilityObserver();
  destroyCakeScene();

  cakeContainer = container;
  cakeContainer.classList.add("cake-animation");

  /* ===================================================
     OBSERVATION DE LA DIV
  =================================================== */

  cakeVisibilityObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];

      if (!entry.isIntersecting) {
        destroyCakeScene();
        return;
      }

      if (entry.intersectionRatio >= 0.8 && !cakeRenderer) {
        initCakeScene(cakeContainer);
      }
    },
    {
      threshold: [0, 0.8],
    },
  );

  cakeVisibilityObserver.observe(cakeContainer);
}

/* =====================================================
   FONCTION PUBLIQUE
   ARRÊTER L'ANIMATION
===================================================== */

export function stopCakeAnimation() {
  disconnectCakeVisibilityObserver();
  destroyCakeScene();
  cakeContainer = null;
}

/* =====================================================
   INITIALISATION DE LA SCÈNE
===================================================== */

function initCakeScene(container) {
  if (!container) return;

  /* =====================================================
     NETTOYAGE AU CAS OÙ
     UNE SCÈNE EXISTE DÉJÀ
  ===================================================== */

  destroyCakeScene();

  const sceneVersion = cakeSceneVersion;

  /* =====================================================
     SCÈNE
  ===================================================== */

  cakeScene = new THREE.Scene();
  cakeScene.background = null;

  /* =====================================================
     RENDERER
  ===================================================== */

  cakeRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  cakeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const initialWidth = container.clientWidth;
  const initialHeight = container.clientHeight;

  cakeRenderer.setSize(initialWidth, initialHeight, false);

  cakeRenderer.shadowMap.enabled = true;
  cakeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
  cakeRenderer.outputColorSpace = THREE.SRGBColorSpace;
  cakeRenderer.toneMapping = THREE.ACESFilmicToneMapping;
  cakeRenderer.toneMappingExposure = 1.05;

  container.appendChild(cakeRenderer.domElement);

  /* =====================================================
     CAMÉRA
  ===================================================== */

  cakeCamera = new THREE.OrthographicCamera();

  updateCakeCamera(container);

  cakeCamera.position.set(5, 4.5, 8);
  cakeCamera.lookAt(0, 1.7, 0);

  /* =====================================================
     LUMIÈRE AMBIANTE
  ===================================================== */

  const ambientLight = new THREE.HemisphereLight(0xfff8f2, 0xc7936e, 1.4);

  cakeScene.add(ambientLight);

  /* =====================================================
     LUMIÈRE PRINCIPALE
  ===================================================== */

  const mainLight = new THREE.DirectionalLight(0xfffaf5, 2.7);

  mainLight.position.set(4, 7, 6);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 1024;
  mainLight.shadow.mapSize.height = 1024;

  cakeScene.add(mainLight);

  /* =====================================================
     LUMIÈRE DOUCE CÔTÉ GAUCHE
  ===================================================== */

  const fillLight = new THREE.DirectionalLight(0xffdccc, 0.9);

  fillLight.position.set(-5, 3, 3);

  cakeScene.add(fillLight);

  /* =====================================================
     GROUPE DU GÂTEAU
  ===================================================== */

  cakeGroup = new THREE.Group();

  cakeGroup.position.set(0.45, 8, 0);

  cakeScene.add(cakeGroup);

  /* =====================================================
     TEXTURE DU GÂTEAU
  ===================================================== */

  const textureLoader = new THREE.TextureLoader();
  const spongeTexture = textureLoader.load("./img/cakeTexture.png");

  spongeTexture.colorSpace = THREE.SRGBColorSpace;
  spongeTexture.wrapS = THREE.RepeatWrapping;
  spongeTexture.wrapT = THREE.ClampToEdgeWrapping;
  spongeTexture.repeat.set(1, 1);
  spongeTexture.anisotropy = cakeRenderer.capabilities.getMaxAnisotropy();

  /* =====================================================
     MATÉRIAU DU GÂTEAU
  ===================================================== */

  const spongeMaterial = new THREE.MeshBasicMaterial({
    map: spongeTexture,
    color: 0xffffff,
    toneMapped: false,
  });

  /* =====================================================
     CRÈME DES DESSUS
  ===================================================== */

  const creamMaterial = new THREE.MeshBasicMaterial({
    color: 0xede0d4,
    toneMapped: false,
  });

  /* =====================================================
     CRÉATION DES TROIS ÉTAGES
  ===================================================== */

  cakeTiers = [];

  /* ÉTAGE DU BAS */

  cakeTiers.push(
    createCakeTier({
      group: cakeGroup,
      y: 0.55,
      radius: 2.05,
      height: 1.15,
      spongeMaterial,
      creamMaterial,
    }),
  );

  /* ÉTAGE DU MILIEU */

  cakeTiers.push(
    createCakeTier({
      group: cakeGroup,
      y: 1.82,
      radius: 1.55,
      height: 1,
      spongeMaterial,
      creamMaterial,
    }),
  );

  /* ÉTAGE DU HAUT */

  cakeTiers.push(
    createCakeTier({
      group: cakeGroup,
      y: 2.95,
      radius: 1.05,
      height: 0.9,
      spongeMaterial,
      creamMaterial,
    }),
  );

  /* =====================================================
     CHARGEMENT DES ROSES
  ===================================================== */

  async function loadCakeRoses() {
    try {
      const module =
        await import("https://esm.sh/three@0.180.0/examples/jsm/loaders/GLTFLoader.js");

      const GLTFLoader = module.GLTFLoader;
      const loader = new GLTFLoader();

      loader.load(
        "./img/rose.glb",
        (gltf) => {
          if (!cakeGroup || sceneVersion !== cakeSceneVersion) {
            return;
          }

          roseModel = gltf.scene;

          roseModel.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          rosesGroup = new THREE.Group();

          cakeGroup.add(rosesGroup);

          /* =========================================
             ROSE 1
          ========================================= */

          addRose({
            x: 2.2,
            y: 2,
            z: 1.25,
            scale: 4.5,
            rotationX: -0.25,
            rotationY: -0.25,
            rotationZ: 0.15,
            color: "rgb(236, 68, 68)",
          });

          /* =========================================
             ROSE 2
          ========================================= */

          addRose({
            x: 1.7,
            y: 2.5,
            z: 1.45,
            scale: 4.5,
            rotationX: 0,
            rotationY: 0.75,
            rotationZ: 0.2,
            color: "rgb(232, 121, 121)",
          });

          /* =========================================
             ROSE 3
          ========================================= */

          addRose({
            x: -0.25,
            y: 0.8,
            z: 1.05,
            scale: 5,
            rotationX: -0.15,
            rotationY: -0.2,
            rotationZ: -0.45,
            color: "rgb(223, 66, 66)",
          });

          /* =========================================
             ROSE 4
          ========================================= */

          addRose({
            x: 0.2,
            y: 0.75,
            z: 1.75,
            scale: 4.5,
            rotationX: -0.2,
            rotationY: 0.2,
            rotationZ: -0.3,
            color: "#c9828b",
          });

          /* =========================================
             ROSE 5
          ========================================= */

          addRose({
            x: 3.25,
            y: 0,
            z: 1,
            scale: 5,
            rotationX: -0.15,
            rotationY: -0.2,
            rotationZ: -0.45,
            color: "#f03948",
          });

          /* =========================================
             ROSE 6
          ========================================= */

          addRose({
            x: 3.4,
            y: -0.15,
            z: 1.95,
            scale: 4.5,
            rotationX: -0.2,
            rotationY: -0.5,
            rotationZ: -0.3,
            color: "#ffa3a7",
          });
        },
        undefined,
        (error) => {
          console.error("Erreur pendant le chargement de rose.glb :", error);
        },
      );
    } catch (error) {
      console.error("Impossible de charger GLTFLoader :", error);
    }
  }

  /* =====================================================
     CHARGEMENT EUCALYPTUS
  ===================================================== */

  async function loadCakeEucalyptus() {
    try {
      const module =
        await import("https://esm.sh/three@0.180.0/examples/jsm/loaders/GLTFLoader.js");

      const GLTFLoader = module.GLTFLoader;
      const loader = new GLTFLoader();

      loader.load(
        "./img/Eucalyptus.glb",
        (gltf) => {
          if (!cakeGroup || sceneVersion !== cakeSceneVersion) {
            return;
          }

          eucalyptusModel = gltf.scene;

          eucalyptusModel.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          eucalyptusGroup = new THREE.Group();

          cakeGroup.add(eucalyptusGroup);

          /* FEUILLE 1 */

          addEucalyptus({
            x: -0.7,
            y: 1.6,
            z: 2,
            scale: 0.8,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 1,
          });

          /* FEUILLE 2 */

          addEucalyptus({
            x: 0.7,
            y: 1.4,
            z: 2.5,
            scale: 0.8,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 3.5,
          });

          /* FEUILLE 3 */

          addEucalyptus({
            x: 2.6,
            y: 3.2,
            z: 2,
            scale: 0.8,
            rotationX: 0,
            rotationY: 0,
            rotationZ: -1,
          });

          /* FEUILLE 4 */

          addEucalyptus({
            x: 2.6,
            y: 0.7,
            z: 2,
            scale: 0.9,
            rotationX: 0,
            rotationY: 0,
            rotationZ: -1,
          });
        },
        undefined,
        (error) => {
          console.error("Erreur chargement Eucalyptus.glb :", error);
        },
      );
    } catch (error) {
      console.error(
        "Impossible de charger GLTFLoader pour l'eucalyptus :",
        error,
      );
    }
  }

  /* =====================================================
     AJOUT EUCALYPTUS
  ===================================================== */

  function addEucalyptus({
    x = 0,
    y = 2,
    z = 2,
    scale = 1,
    rotationX = 0,
    rotationY = 0,
    rotationZ = 0,
  }) {
    if (!eucalyptusModel || !eucalyptusGroup) {
      return;
    }

    const eucalyptus = eucalyptusModel.clone(true);

    /* =========================================
       CALCUL DIMENSIONS + CENTRE
    ========================================= */

    const box = new THREE.Box3().setFromObject(eucalyptus);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    /* =========================================
       PIVOT
    ========================================= */

    const wrapper = new THREE.Group();

    eucalyptus.position.set(-center.x, -center.y, -center.z);

    wrapper.add(eucalyptus);

    /* =========================================
       NORMALISATION DE TAILLE
    ========================================= */

    const maxDimension = Math.max(size.x, size.y, size.z);
    const normalizedScale = 1.5 / maxDimension;

    wrapper.scale.setScalar(normalizedScale * scale);

    /* =========================================
       POSITION FINALE
    ========================================= */

    const finalPosition = new THREE.Vector3(x, y, z);
    const finalRotation = new THREE.Euler(rotationX, rotationY, rotationZ);

    /* =========================================
       POSITION DE DÉPART
    ========================================= */

    const fallHeight = THREE.MathUtils.randFloat(4.5, 6);

    wrapper.position.set(x, y + fallHeight, z);

    wrapper.rotation.set(
      rotationX + THREE.MathUtils.randFloat(-0.25, 0.25),
      rotationY + THREE.MathUtils.randFloat(-0.25, 0.25),
      rotationZ + THREE.MathUtils.randFloat(-0.7, 0.7),
    );

    wrapper.visible = false;

    /* =========================================
       DONNÉES D'ANIMATION
    ========================================= */

    wrapper.userData.fallAnimation = {
      finalPosition,
      finalRotation,
      duration: THREE.MathUtils.randFloat(2.2, 3.0),
      finished: false,
    };

    decorationAnimation.leaves.push(wrapper);

    eucalyptusGroup.add(wrapper);

    wrapper.rotation.set(rotationX, rotationY, rotationZ);

    /* =========================================
       MATÉRIAU EUCALYPTUS
    ========================================= */

    eucalyptus.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#588157",
          roughness: 0.8,
          metalness: 0,
          side: THREE.DoubleSide,
        });

        child.visible = true;
        child.frustumCulled = false;
      }
    });
  }

  /* =====================================================
     AJOUT ROSE
  ===================================================== */

  function addRose({ x, y, z, scale, rotationX, rotationY, rotationZ, color }) {
    if (!roseModel || !rosesGroup) {
      return;
    }

    const rose = roseModel.clone(true);

    rose.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: color,
          roughness: 0.72,
          metalness: 0,
          side: THREE.DoubleSide,
        });

        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    rose.scale.setScalar(scale);

    /* =========================================
       POSITION FINALE
    ========================================= */

    const finalPosition = new THREE.Vector3(x, y, z);
    const finalRotation = new THREE.Euler(rotationX, rotationY, rotationZ);

    /* =========================================
       POSITION DE DÉPART
    ========================================= */

    const fallHeight = THREE.MathUtils.randFloat(4.5, 6.5);

    rose.position.set(x, y + fallHeight, z);

    rose.rotation.set(
      rotationX + THREE.MathUtils.randFloat(-0.8, 0.8),
      rotationY + THREE.MathUtils.randFloat(-0.8, 0.8),
      rotationZ + THREE.MathUtils.randFloat(-2.2, 2.2),
    );

    rose.visible = false;

    /* =========================================
       ANIMATION
    ========================================= */

    rose.userData.fallAnimation = {
      finalPosition,
      finalRotation,
      duration: THREE.MathUtils.randFloat(0.8, 1.3),
      finished: false,
    };

    decorationAnimation.roses.push(rose);

    rosesGroup.add(rose);
  }

  /* =====================================================
     SUPPORT DU GÂTEAU
  ===================================================== */

  const plateGeometry = new THREE.CylinderGeometry(2.35, 2.35, 0.12, 64);

  const plateMaterial = new THREE.MeshStandardMaterial({
    color: 0xc9a14a,
    metalness: 0.65,
    roughness: 0.28,
  });

  const plate = new THREE.Mesh(plateGeometry, plateMaterial);

  plate.position.y = -0.08;
  plate.receiveShadow = true;

  cakeGroup.add(plate);

  /* =====================================================
     GLAÇAGE
  ===================================================== */

  glazeSystem = createGlazeSystem();

  glazeSystem.group.visible = false;

  loadCakeRoses();
  loadCakeEucalyptus();

  glazeStartTime = 0;

  /* =====================================================
     OMBRE SOUS LE GÂTEAU
  ===================================================== */

  const shadowGeometry = new THREE.CircleGeometry(2.5, 64);

  const shadowMaterial = new THREE.ShadowMaterial({
    color: 0x7a4d43,
    opacity: 0.13,
  });

  const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);

  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -0.15;
  shadow.receiveShadow = true;

  cakeScene.add(shadow);

  /* =====================================================
     RESIZE RESPONSIVE
  ===================================================== */

  cakeResizeObserver = new ResizeObserver(() => {
    if (!cakeRenderer || !cakeCamera) {
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width === 0 || height === 0) {
      return;
    }

    cakeRenderer.setSize(width, height, false);

    updateCakeCamera(container);
  });

  cakeResizeObserver.observe(container);

  /* =====================================================
     CYCLE COMPLET DU GÂTEAU
  ===================================================== */

  const cakeCycle = {
    phase: "entering",
    phaseStart: null,
    exitStartPosition: new THREE.Vector3(),
  };

  /* =====================================================
     ANIMATION GÉNÉRALE DU GÂTEAU
  ===================================================== */

  function updateCakeCycle(time) {
    if (!cakeGroup) {
      return false;
    }

    /* ===================================================
       1 — CHUTE DU GÂTEAU
    =================================================== */

    if (cakeCycle.phase === "entering") {
      if (cakeCycle.phaseStart === null) {
        cakeCycle.phaseStart = time;
      }

      const duration = 1200;

      const progress = THREE.MathUtils.clamp(
        (time - cakeCycle.phaseStart) / duration,
        0,
        1,
      );

      const eased = progress * progress * progress;

      cakeGroup.position.y = THREE.MathUtils.lerp(8, 0, eased);

      if (progress >= 1) {
        cakeGroup.position.y = 0;
        cakeCycle.phase = "waitingGlaze";
        cakeCycle.phaseStart = time;
      }

      return false;
    }

    /* ===================================================
       2 — ATTENTE DE 0,5 SECONDE
    =================================================== */

    if (cakeCycle.phase === "waitingGlaze") {
      if (time - cakeCycle.phaseStart < 500) {
        return false;
      }

      if (glazeSystem) {
        glazeSystem.group.visible = true;
      }

      glazeStartTime = time;

      cakeCycle.phase = "decorating";
      cakeCycle.phaseStart = time;

      return false;
    }

    /* ===================================================
       3 — DÉCORATION
    =================================================== */

    if (cakeCycle.phase === "decorating") {
      updateGlazeAnimation(time);
      updateDecorationAnimation(time);

      if (decorationAnimation.phase === "finished") {
        cakeCycle.phase = "waitingExit";
        cakeCycle.phaseStart = time;
      }

      return false;
    }

    /* ===================================================
       4 — ATTENTE AVANT SORTIE
    =================================================== */

    if (cakeCycle.phase === "waitingExit") {
      if (time - cakeCycle.phaseStart < 1000) {
        return false;
      }

      cakeCycle.phase = "exiting";
      cakeCycle.phaseStart = time;
      cakeCycle.exitStartPosition.copy(cakeGroup.position);

      return false;
    }

    /* ===================================================
       5 — SORTIE À DROITE
    =================================================== */

    if (cakeCycle.phase === "exiting") {
      const duration = 1200;

      const progress = THREE.MathUtils.clamp(
        (time - cakeCycle.phaseStart) / duration,
        0,
        1,
      );

      const eased = progress * progress * progress;

      const screenRight = new THREE.Vector3(1, 0, 0)
        .applyQuaternion(cakeCamera.quaternion)
        .normalize();

      const distance = THREE.MathUtils.lerp(0, 12, eased);

      cakeGroup.position.set(
        cakeCycle.exitStartPosition.x + screenRight.x * distance,
        cakeCycle.exitStartPosition.y + screenRight.y * distance,
        cakeCycle.exitStartPosition.z + screenRight.z * distance,
      );

      if (progress >= 1) {
        initCakeScene(container);

        return true;
      }

      return false;
    }

    return false;
  }

  /* =====================================================
     BOUCLE DE RENDU
  ===================================================== */

  function renderCake(time) {
    const restarted = updateCakeCycle(time);

    if (restarted) {
      return;
    }

    if (!cakeRenderer || !cakeScene || !cakeCamera) {
      return;
    }

    cakeRenderer.render(cakeScene, cakeCamera);

    cakeAnimationFrame = requestAnimationFrame(renderCake);
  }

  cakeAnimationFrame = requestAnimationFrame(renderCake);
}

/* =====================================================
   CRÉATION D'UN ÉTAGE DU GÂTEAU
===================================================== */

function createCakeTier({
  group,
  y,
  radius,
  height,
  spongeMaterial,
  creamMaterial,
}) {
  const tierGroup = new THREE.Group();

  /* =====================================================
     CORPS
  ===================================================== */

  const spongeGeometry = new THREE.CylinderGeometry(
    radius,
    radius * 1.01,
    height,
    96,
  );

  const sponge = new THREE.Mesh(spongeGeometry, spongeMaterial);

  sponge.castShadow = true;
  sponge.receiveShadow = true;

  tierGroup.add(sponge);

  /* =====================================================
     CRÈME SUR LE DESSUS
  ===================================================== */

  const topCreamGeometry = new THREE.CylinderGeometry(
    radius * 0.985,
    radius * 0.985,
    0.045,
    96,
  );

  const topCream = new THREE.Mesh(topCreamGeometry, creamMaterial);

  topCream.position.y = height / 2 + 0.018;
  topCream.castShadow = true;
  topCream.receiveShadow = true;

  tierGroup.add(topCream);

  /* =====================================================
     POSITION
  ===================================================== */

  tierGroup.position.y = y;

  group.add(tierGroup);

  return {
    group: tierGroup,
    y,
    radius,
    height,
  };
}

/* =====================================================
   SYSTÈME DE GLAÇAGE
===================================================== */

function createGlazeSystem() {
  /* =====================================================
     MATÉRIAU
  ===================================================== */

  const glazeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffcfd2,
    roughness: 0.27,
    metalness: 0,
    clearcoat: 0.55,
    clearcoatRoughness: 0.18,
  });

  const dripMaterial = glazeMaterial.clone();

  dripMaterial.transparent = true;
  dripMaterial.opacity = 1;

  /* =====================================================
     GROUPE
  ===================================================== */

  const glazeGroup = new THREE.Group();

  cakeGroup.add(glazeGroup);

  /* =====================================================
     ÉTAGES GLACÉS
  ===================================================== */

  const glazedTiers = [
    createGlazeTier(cakeTiers[2], glazeMaterial, dripMaterial, glazeGroup, 14),
    createGlazeTier(cakeTiers[1], glazeMaterial, dripMaterial, glazeGroup, 17),
    createGlazeTier(cakeTiers[0], glazeMaterial, dripMaterial, glazeGroup, 20),
  ];

  /* =====================================================
     FILET DE GLAÇAGE
  ===================================================== */

  const streamGeometry = new THREE.CylinderGeometry(0.055, 0.075, 2.8, 20);
  const stream = new THREE.Mesh(streamGeometry, glazeMaterial);

  stream.position.set(0, 4.8, 0);

  glazeGroup.add(stream);

  /* =====================================================
     MASSE À L'IMPACT
  ===================================================== */

  const impactGeometry = new THREE.SphereGeometry(0.18, 32, 16);
  const impact = new THREE.Mesh(impactGeometry, glazeMaterial);

  impact.scale.set(1, 0.2, 1);
  impact.position.set(0, cakeTiers[2].y + cakeTiers[2].height / 2 + 0.07, 0);

  glazeGroup.add(impact);

  return {
    group: glazeGroup,
    tiers: glazedTiers,
    stream,
    impact,
    material: glazeMaterial,
    dripMaterial,
    finished: false,
  };
}

/* =====================================================
   GLAÇAGE D'UN ÉTAGE
===================================================== */

function createGlazeTier(tier, glazeMaterial, dripMaterial, parent, dripCount) {
  const group = new THREE.Group();

  group.position.y = tier.y;

  parent.add(group);

  /* =====================================================
     DESSUS
  ===================================================== */

  const topGeometry = new THREE.CylinderGeometry(
    tier.radius + 0.035,
    tier.radius + 0.035,
    0.065,
    96,
  );

  const top = new THREE.Mesh(topGeometry, glazeMaterial);

  top.position.y = tier.height / 2 + 0.045;
  top.scale.set(0.04, 1, 0.04);

  group.add(top);

  /* =====================================================
     PAROI
  ===================================================== */

  const shellGeometry = new THREE.CylinderGeometry(
    tier.radius + 0.045,
    tier.radius + 0.045,
    tier.height + 0.04,
    96,
    1,
    true,
  );

  const shell = new THREE.Mesh(shellGeometry, glazeMaterial);

  shell.scale.y = 0.001;
  shell.position.y = tier.height / 2;

  group.add(shell);

  /* =====================================================
     BORD ARRONDI
  ===================================================== */

  const rimGeometry = new THREE.TorusGeometry(
    tier.radius + 0.02,
    0.055,
    16,
    96,
  );

  const rim = new THREE.Mesh(rimGeometry, glazeMaterial);

  rim.rotation.x = Math.PI / 2;
  rim.position.y = tier.height / 2 + 0.035;
  rim.scale.set(0.05, 0.05, 0.05);

  group.add(rim);

  /* =====================================================
     COULURES
  ===================================================== */

  const drips = [];

  for (let i = 0; i < dripCount; i++) {
    const angle =
      (i / dripCount) * Math.PI * 2 + THREE.MathUtils.randFloat(-0.12, 0.12);

    let maxLength = THREE.MathUtils.randFloat(
      tier.height * 0.18,
      tier.height * 0.75,
    );

    if (i % 5 === 0) {
      maxLength = tier.height * 1.12;
    }

    const drip = createGlazeDrip(
      tier.radius + 0.055,
      angle,
      maxLength,
      tier.height,
      dripMaterial,
    );

    group.add(drip.group);

    drips.push(drip);
  }

  return {
    tier,
    group,
    top,
    shell,
    rim,
    drips,
  };
}

/* =====================================================
   CRÉATION D'UNE COULURE
===================================================== */

function createGlazeDrip(radius, angle, maxLength, tierHeight, material) {
  const group = new THREE.Group();

  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  group.position.set(x, tierHeight / 2 + 0.015, z);

  const width = THREE.MathUtils.randFloat(0.045, 0.095);

  /* =====================================================
     CORPS
  ===================================================== */

  const bodyGeometry = new THREE.CylinderGeometry(width * 0.72, width, 1, 14);

  const body = new THREE.Mesh(bodyGeometry, material);

  body.scale.y = 0.001;

  group.add(body);

  /* =====================================================
     GOUTTE
  ===================================================== */

  const dropGeometry = new THREE.SphereGeometry(width * 1.15, 18, 12);
  const drop = new THREE.Mesh(dropGeometry, material);

  drop.scale.y = 1.25;
  drop.visible = false;

  group.add(drop);

  return {
    group,
    body,
    drop,
    maxLength,
    width,
  };
}

/* =====================================================
   UPDATE GLAÇAGE
===================================================== */

function updateGlazeAnimation(time) {
  if (!glazeSystem || glazeSystem.finished) {
    return;
  }

  const elapsed = (time - glazeStartTime) / 1000;
  const tierStarts = [0, 1.3, 2.6];
  const tierDuration = 1.8;

  glazeSystem.tiers.forEach((glazedTier, index) => {
    const localTime = elapsed - tierStarts[index];

    if (localTime < 0) {
      return;
    }

    const progress = THREE.MathUtils.clamp(localTime / tierDuration, 0, 1);

    animateGlazeTier(glazedTier, progress);
  });

  /* =====================================================
     FILET
  ===================================================== */

  if (elapsed < 4.2) {
    glazeSystem.stream.visible = true;

    const pulse = 1 + Math.sin(elapsed * 7) * 0.035;

    glazeSystem.stream.scale.x = pulse;
    glazeSystem.stream.scale.z = pulse;

    glazeSystem.impact.visible = true;

    const impactScale = 1 + Math.sin(elapsed * 5) * 0.06;

    glazeSystem.impact.scale.x = impactScale;
    glazeSystem.impact.scale.z = impactScale;
  }

  /* =====================================================
     FINITION
  ===================================================== */

  if (elapsed > 4.2) {
    const finishProgress = THREE.MathUtils.clamp((elapsed - 4.2) / 0.8, 0, 1);

    glazeSystem.dripMaterial.opacity = 1 - smoothStep(finishProgress);

    const originalHeight = 2.8;
    const remaining = Math.max(0.001, 1 - finishProgress);

    glazeSystem.stream.scale.y = remaining;

    const originalCenterY = 4.8;

    glazeSystem.stream.position.y =
      originalCenterY - (originalHeight * (1 - remaining)) / 2;

    glazeSystem.impact.scale.set(1 - finishProgress, 0.2, 1 - finishProgress);

    if (finishProgress >= 1) {
      glazeSystem.stream.visible = false;
      glazeSystem.impact.visible = false;
      glazeSystem.finished = true;
    }
  }
}

/* =====================================================
   ANIMATION DU GLAÇAGE D'UN ÉTAGE
===================================================== */

function animateGlazeTier(glazedTier, progress) {
  const { tier, top, shell, rim, drips } = glazedTier;

  /* =====================================================
     ÉTALEMENT DU DESSUS
  ===================================================== */

  const topProgress = smoothStep(THREE.MathUtils.clamp(progress / 0.28, 0, 1));

  const topScale = THREE.MathUtils.lerp(0.04, 1, topProgress);

  top.scale.x = topScale;
  top.scale.z = topScale;

  rim.scale.set(topScale, topScale, topScale);

  /* =====================================================
     COULURES
  ===================================================== */

  const dripProgress = smoothStep(
    THREE.MathUtils.clamp((progress - 0.18) / 0.48, 0, 1),
  );

  drips.forEach((drip, index) => {
    const delay = (index % 5) * 0.045;

    const individual = smoothStep(
      THREE.MathUtils.clamp((dripProgress - delay) / (1 - delay), 0, 1),
    );

    const length = drip.maxLength * individual;

    drip.body.scale.y = Math.max(length, 0.001);
    drip.body.position.y = -length / 2;
    drip.drop.position.y = -length;
    drip.drop.visible = individual > 0.03;
  });

  /* =====================================================
     RECOUVREMENT DE LA PAROI
  ===================================================== */

  const shellProgress = smoothStep(
    THREE.MathUtils.clamp((progress - 0.35) / 0.58, 0, 1),
  );

  shell.scale.y = Math.max(shellProgress, 0.001);
  shell.position.y = tier.height / 2 - (tier.height * shellProgress) / 2;
}

/* =====================================================
   SMOOTH STEP
===================================================== */

function smoothStep(value) {
  value = THREE.MathUtils.clamp(value, 0, 1);

  return value * value * (3 - 2 * value);
}

/* =====================================================
   EASE IN CUBIC
===================================================== */

function easeInCubic(t) {
  return t * t * t;
}

/* =====================================================
   ANIMATION ROSES
===================================================== */

function animateFallingSequence(items, elapsed) {
  const gap = 0.5;

  let cursor = 0;
  let allFinished = true;

  items.forEach((item) => {
    const anim = item.userData.fallAnimation;

    if (!anim) return;

    const startTime = cursor;
    const endTime = startTime + anim.duration;

    cursor = endTime + gap;

    if (elapsed < startTime) {
      allFinished = false;
      return;
    }

    item.visible = true;

    const progress = THREE.MathUtils.clamp(
      (elapsed - startTime) / anim.duration,
      0,
      1,
    );

    const eased = easeInCubic(progress);
    const startY = anim.finalPosition.y + 5;

    item.position.x = anim.finalPosition.x;
    item.position.y = THREE.MathUtils.lerp(startY, anim.finalPosition.y, eased);
    item.position.z = anim.finalPosition.z;

    item.rotation.x = THREE.MathUtils.lerp(
      item.rotation.x,
      anim.finalRotation.x,
      eased,
    );

    item.rotation.y = THREE.MathUtils.lerp(
      item.rotation.y,
      anim.finalRotation.y,
      eased,
    );

    item.rotation.z = THREE.MathUtils.lerp(
      item.rotation.z,
      anim.finalRotation.z,
      eased,
    );

    if (progress < 1) {
      allFinished = false;
    } else {
      item.position.copy(anim.finalPosition);
      item.rotation.copy(anim.finalRotation);
      anim.finished = true;
    }
  });

  return {
    finished: allFinished,
    totalDuration: cursor,
  };
}

/* =====================================================
   ANIMATION FEUILLES
===================================================== */

function animateFallingLeaves(items, elapsed) {
  const gap = 0.5;

  let cursor = 0;
  let allFinished = true;

  items.forEach((item, index) => {
    const anim = item.userData.fallAnimation;

    if (!anim) return;

    const startTime = cursor;
    const endTime = startTime + anim.duration;

    cursor = endTime + gap;

    if (elapsed < startTime) {
      allFinished = false;
      return;
    }

    item.visible = true;

    const progress = THREE.MathUtils.clamp(
      (elapsed - startTime) / anim.duration,
      0,
      1,
    );

    const eased = easeInCubic(progress);

    /* =========================================
       CHUTE VERTICALE
    ========================================= */

    const startY = anim.finalPosition.y + 5;

    item.position.y = THREE.MathUtils.lerp(startY, anim.finalPosition.y, eased);

    /* =========================================
       BALANCEMENT
    ========================================= */

    const windStrength = (1 - progress) * 1.8;
    const frequency = 2.5 + index * 0.2;
    const swing = Math.sin(progress * Math.PI * frequency) * windStrength;

    item.position.x = anim.finalPosition.x + swing;
    item.position.z = anim.finalPosition.z;

    /* =========================================
       ROTATION
    ========================================= */

    const rotationSwing =
      Math.sin(progress * Math.PI * frequency) * (1 - progress) * 0.35;

    item.rotation.x = THREE.MathUtils.lerp(
      item.rotation.x,
      anim.finalRotation.x,
      eased,
    );

    item.rotation.y = THREE.MathUtils.lerp(
      item.rotation.y,
      anim.finalRotation.y,
      eased,
    );

    item.rotation.z = anim.finalRotation.z + rotationSwing;

    /* =========================================
       ARRIVÉE
    ========================================= */

    if (progress < 1) {
      allFinished = false;
    } else {
      item.position.copy(anim.finalPosition);
      item.rotation.copy(anim.finalRotation);
      anim.finished = true;
    }
  });

  return {
    finished: allFinished,
    totalDuration: cursor,
  };
}

/* =====================================================
   DÉCORATION
===================================================== */

function updateDecorationAnimation(time) {
  if (!glazeSystem) {
    return;
  }

  /* =========================================
     ATTENTE FIN DU GLAÇAGE
  ========================================= */

  if (decorationAnimation.phase === "waitingGlaze") {
    if (!glazeSystem.finished) {
      return;
    }

    decorationAnimation.phase = "roses";
    decorationAnimation.phaseStart = time;
  }

  /* =========================================
     ROSES
  ========================================= */

  if (decorationAnimation.phase === "roses") {
    if (decorationAnimation.roses.length === 0) {
      return;
    }

    const elapsed = (time - decorationAnimation.phaseStart) / 1000;

    const result = animateFallingSequence(decorationAnimation.roses, elapsed);

    if (result.finished) {
      decorationAnimation.phase = "leaves";
      decorationAnimation.phaseStart = time + 500;
    }

    return;
  }

  /* =========================================
     FEUILLES
  ========================================= */

  if (decorationAnimation.phase === "leaves") {
    if (decorationAnimation.leaves.length === 0) {
      return;
    }

    if (time < decorationAnimation.phaseStart) {
      return;
    }

    const elapsed = (time - decorationAnimation.phaseStart) / 1000;

    const result = animateFallingLeaves(decorationAnimation.leaves, elapsed);

    if (result.finished) {
      decorationAnimation.phase = "finished";
    }
  }
}

/* =====================================================
   CAMÉRA RESPONSIVE
===================================================== */

function updateCakeCamera(container) {
  if (!cakeCamera) {
    return;
  }

  const width = container.clientWidth;
  const height = container.clientHeight;

  if (width === 0 || height === 0) {
    return;
  }

  const aspect = width / height;
  const viewHeight = 8.2;

  cakeCamera.left = -(viewHeight * aspect) / 2;
  cakeCamera.right = (viewHeight * aspect) / 2;
  cakeCamera.top = viewHeight / 2;
  cakeCamera.bottom = -viewHeight / 2;
  cakeCamera.near = 0.1;
  cakeCamera.far = 100;

  cakeCamera.updateProjectionMatrix();
}

/* =====================================================
   DESTRUCTION COMPLÈTE
===================================================== */

function destroyCakeScene() {
  cakeSceneVersion++;

  /* =====================================================
     REQUEST ANIMATION FRAME
  ===================================================== */

  if (cakeAnimationFrame) {
    cancelAnimationFrame(cakeAnimationFrame);
    cakeAnimationFrame = null;
  }

  /* =====================================================
     RESIZE OBSERVER
  ===================================================== */

  if (cakeResizeObserver) {
    cakeResizeObserver.disconnect();
    cakeResizeObserver = null;
  }

  /* =====================================================
     GÉOMÉTRIES / MATÉRIAUX / TEXTURES
  ===================================================== */

  if (cakeScene) {
    cakeScene.traverse((object) => {
      if (object.geometry) {
        object.geometry.dispose();
      }

      if (object.material) {
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];

        materials.forEach((material) => {
          if (material.map) {
            material.map.dispose();
          }

          material.dispose();
        });
      }
    });
  }

  /* =====================================================
     RENDERER
  ===================================================== */

  if (cakeRenderer) {
    cakeRenderer.dispose();

    if (cakeRenderer.domElement) {
      cakeRenderer.domElement.remove();
    }
  }

  /* =====================================================
     RESET DES VARIABLES
  ===================================================== */

  cakeTiers = [];
  glazeSystem = null;
  glazeStartTime = 0;
  roseModel = null;
  rosesGroup = null;
  eucalyptusModel = null;
  eucalyptusGroup = null;
  cakeRenderer = null;
  cakeScene = null;
  cakeCamera = null;
  cakeGroup = null;

  decorationAnimation = {
    phase: "waitingGlaze",
    phaseStart: 0,
    leaves: [],
    roses: [],
  };
}
