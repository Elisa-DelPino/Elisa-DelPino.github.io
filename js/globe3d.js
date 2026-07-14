// globe3d.js

let animationFrameId = null;
let resizeObserver = null;
let renderer = null;
let globeScene = null;

export function initGlobe() {
  const container = document.getElementById("globe-container");

  if (!container) {
    console.error("Le conteneur #globe-container est introuvable.");
    return;
  }

  if (typeof THREE === "undefined") {
    console.error("Three.js n'est pas chargé.");
    return;
  }

  // Évite de créer plusieurs globes.
  if (container.querySelector("canvas")) {
    return;
  }

  // ------------------------------------------------ CSS

  if (!document.getElementById("globe3d-style")) {
    const style = document.createElement("style");
    style.id = "globe3d-style";

    style.textContent = `
      #globe-container {
        position: relative;
        width: 100%;
        height: 100%;
        min-width: 0;
        min-height: 180px;
        overflow: hidden;
      }

      #globe-container canvas {
        display: block;
        width: 100% !important;
        height: 100% !important;
      }
    `;

    document.head.appendChild(style);
  }

  // ------------------------------------------------ SCÈNE

  const scene = new THREE.Scene();
  globeScene = scene;

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);

  camera.position.set(0, 0, 3.2);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  renderer.setClearColor(0x000000, 0);

  container.appendChild(renderer.domElement);

  // ------------------------------------------------ GROUPE PRINCIPAL

  const globeGroup = new THREE.Group();

  globeGroup.scale.set(0.65, 0.65, 0.65);

  globeGroup.rotation.x = 0.08;
  globeGroup.rotation.z = -0.18;

  scene.add(globeGroup);

  // ------------------------------------------------ COULEURS

  const purple = 0xa240df;
  const darkPurple = 0x36104f;
  const darkBlue = 0x070b15;

  // ------------------------------------------------ SPHÈRE CENTRALE

  const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);

  const sphereMaterial = new THREE.MeshPhongMaterial({
    color: darkBlue,
    emissive: darkPurple,
    emissiveIntensity: 0.35,
    transparent: true,
    opacity: 0.2,
    shininess: 80,
    side: THREE.DoubleSide,
  });

  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  globeGroup.add(sphere);

  // ------------------------------------------------ GRILLE DU GLOBE

  function createLatitude(latitude) {
    const points = [];

    for (let lon = 0; lon <= 360; lon += 2) {
      points.push(latLonToVector3(latitude, lon - 180, 1.01));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({
      color: purple,
      transparent: true,
      opacity: 0.15,
    });

    globeGroup.add(new THREE.Line(geometry, material));
  }

  function createLongitude(longitude) {
    const points = [];

    for (let lat = -90; lat <= 90; lat += 2) {
      points.push(latLonToVector3(lat, longitude, 1.01));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({
      color: purple,
      transparent: true,
      opacity: 0.15,
    });

    globeGroup.add(new THREE.Line(geometry, material));
  }

  // Latitude tous les 15°
  for (let lat = -75; lat <= 75; lat += 15) {
    createLatitude(lat);
  }

  // Longitude tous les 15°
  for (let lon = -180; lon < 180; lon += 15) {
    createLongitude(lon);
  }

  // ------------------------------------------------ ATMOSPHÈRE / GLOW

  const atmosphereGeometry = new THREE.SphereGeometry(1.06, 64, 64);

  const atmosphereMaterial = new THREE.MeshBasicMaterial({
    color: purple,
    transparent: true,
    opacity: 0.08,
    side: THREE.BackSide,
  });

  const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);

  globeGroup.add(atmosphere);

  // ------------------------------------------------ UTILITAIRES

  /**
   * Convertit une latitude et une longitude
   * en position 3D sur la sphère.
   */
  function latLonToVector3(latitude, longitude, radius = 1.025) {
    const phi = (90 - latitude) * (Math.PI / 180);

    const theta = (longitude + 180) * (Math.PI / 180);

    const x = -radius * Math.sin(phi) * Math.cos(theta);

    const y = radius * Math.cos(phi);

    const z = radius * Math.sin(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
  }

  /**
   * Dessine une ligne à partir d'une série
   * de coordonnées GeoJSON [longitude, latitude].
   */
  function drawGeoJsonRing(ring) {
    if (!Array.isArray(ring) || ring.length < 2) {
      return;
    }

    const points = ring.map(([longitude, latitude]) =>
      latLonToVector3(latitude, longitude, 1.025),
    );

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({
      color: purple,
      transparent: true,
      opacity: 0.8,
    });

    const line = new THREE.Line(geometry, material);

    globeGroup.add(line);
  }

  /**
   * Dessine une géométrie GeoJSON.
   */
  function drawGeoJsonGeometry(geometry) {
    if (!geometry) return;

    if (geometry.type === "Polygon") {
      geometry.coordinates.forEach((ring) => {
        drawGeoJsonRing(ring);
      });

      return;
    }

    if (geometry.type === "MultiPolygon") {
      geometry.coordinates.forEach((polygon) => {
        polygon.forEach((ring) => {
          drawGeoJsonRing(ring);
        });
      });
    }
  }

  /**
   * Charge les frontières réelles des pays.
   */
  async function loadWorldGeoJSON() {
    try {
      const response = await fetch("./data/world.geojson.json");

      if (!response.ok) {
        throw new Error(
          `Impossible de charger le GeoJSON : ${response.status}`,
        );
      }

      const geojson = await response.json();

      if (!Array.isArray(geojson.features)) {
        throw new Error(
          "Le fichier GeoJSON ne contient pas de tableau features.",
        );
      }

      geojson.features.forEach((feature) => {
        drawGeoJsonGeometry(feature.geometry);
      });

      console.log("Contours géographiques du globe chargés.");
    } catch (error) {
      console.error("Erreur pendant le chargement du GeoJSON :", error);
    }
  }

  /**
   * Ajoute un point lumineux sur le globe.
   */
  function createGlowingPoint(latitude, longitude, size = 0.025) {
    const pointGeometry = new THREE.SphereGeometry(size, 12, 12);

    const pointMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    const point = new THREE.Mesh(pointGeometry, pointMaterial);

    point.position.copy(latLonToVector3(latitude, longitude, 1.04));

    globeGroup.add(point);

    return point;
  }

  // ------------------------------------------------ CHARGEMENT DES CONTINENTS

  loadWorldGeoJSON();

  // ------------------------------------------------ LUMIÈRES

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);

  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);

  directionalLight.position.set(3, 2, 4);

  scene.add(directionalLight);

  const purpleLight = new THREE.PointLight(purple, 2, 8);

  purpleLight.position.set(-2, -1, 3);

  scene.add(purpleLight);

  // ------------------------------------------------ REDIMENSIONNEMENT

  function resizeGlobe() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width <= 0 || height <= 0) {
      return;
    }

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height, false);
  }

  resizeObserver = new ResizeObserver(() => {
    resizeGlobe();
  });

  resizeObserver.observe(container);

  // ------------------------------------------------ ANIMATION

  const clock = new THREE.Clock();

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    const delta = clock.getDelta();

    globeGroup.rotation.y += delta * 0.35;

    renderer.render(scene, camera);
  }

  // Attend que le conteneur visible ait ses dimensions.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      resizeGlobe();
      animate();
    });
  });
}

export function destroyGlobe() {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }

  if (renderer) {
    renderer.dispose();

    if (renderer.domElement) {
      renderer.domElement.remove();
    }

    renderer = null;
  }

  globeScene = null;
}
