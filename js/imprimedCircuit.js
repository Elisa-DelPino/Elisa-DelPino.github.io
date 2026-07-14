let scene, camera, renderer;
let lines = [];
let particles = [];
let config = null;

const defaultImprimedCircuitConfig = {
  numLines: 30,
  segmentMin: 15,
  segmentMax: 30,
  segmentDistanceMin: 20,
  segmentDistanceMax: 50,
  lineColor: "ligthGrey",
  lineOpacity: 0.35,
  lineWidth: 6,
  particlesPerLine: 10,
  particleColor: "#a240df",
  particleSizeMin: 0.5,
  particleSizeMax: 2,
  particleSpeedMin: 0.0001,
  particleSpeedMax: 0.0021,
  haloSizeMin: 1,
  haloSizeMax: 2.5,
  haloOpacity: 0.3,
  backgroundColor: 0x000000,
  containerId: null, // ID du div dans lequel on met le canvas, sinon body
};

export function startImprimedCircuit(options = {}) {
  if (scene) return;
  config = Object.assign({}, defaultImprimedCircuitConfig, options);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 0, 80);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(config.backgroundColor, 1);

  // Gestion du container : si config.containerId est défini, le canvas va dedans, sinon body
  const container = config.containerId
    ? document.getElementById(config.containerId)
    : document.body;

  // Style pour que le canvas devienne un vrai background
  renderer.domElement.style.position = "fixed";
  renderer.domElement.style.top = "0";
  renderer.domElement.style.left = "0";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.zIndex = "-1";
  renderer.domElement.style.pointerEvents = "none"; // pour ne pas bloquer les clics

  container.appendChild(renderer.domElement);

  createCircuit();
  window.addEventListener("resize", onResize);
  animate();
}

function createCircuit() {
  const lineMaterial = new THREE.LineBasicMaterial({
    color: config.lineColor,
    transparent: true,
    opacity: config.lineOpacity,
    linewidth: config.lineWidth,
  });

  for (let i = 0; i < config.numLines; i++) {
    let points = [];
    let x = 0,
      y = 0,
      z = 0;
    points.push(new THREE.Vector3(x, y, z));

    const segments =
      config.segmentMin +
      Math.floor(Math.random() * (config.segmentMax - config.segmentMin + 1));

    for (let j = 0; j < segments; j++) {
      let direction = Math.random() > 0.5 ? "x" : "y";
      let distance =
        (config.segmentDistanceMin +
          Math.random() *
            (config.segmentDistanceMax - config.segmentDistanceMin)) *
        (Math.random() > 0.5 ? 1 : -1);
      if (direction === "x") x += distance;
      else y += distance;
      points.push(new THREE.Vector3(x, y, z));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, lineMaterial);
    scene.add(line);
    lines.push(points);

    for (let k = 0; k < config.particlesPerLine; k++) {
      let startT = Math.random() * (points.length - 1);
      createParticle(i, startT);
    }
  }
}

function createParticle(lineIndex, startT) {
  let color;
  if (Array.isArray(config.particleColor)) {
    const c =
      config.particleColor[
        Math.floor(Math.random() * config.particleColor.length)
      ];
    color = new THREE.Color().setStyle(c);
  } else if (config.particleColor === "random") {
    color = new THREE.Color().setHSL(Math.random(), 1, 0.6);
  } else {
    color = new THREE.Color().setStyle(config.particleColor);
  }

  const map = new THREE.TextureLoader().load(
    "https://threejs.org/examples/textures/sprites/disc.png",
  );

  const haloMaterial = new THREE.SpriteMaterial({
    map: map,
    color: color,
    transparent: true,
    opacity: config.haloOpacity,
    blending: THREE.AdditiveBlending,
  });

  const halo = new THREE.Sprite(haloMaterial);
  const baseHaloSize =
    config.haloSizeMin +
    Math.random() * (config.haloSizeMax - config.haloSizeMin);
  halo.scale.set(baseHaloSize, baseHaloSize, 1);
  scene.add(halo);

  const baseParticleSize =
    config.particleSizeMin +
    Math.random() * (config.particleSizeMax - config.particleSizeMin);
  const material = new THREE.SpriteMaterial({
    map: map,
    color: color,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
  });

  const particle = new THREE.Sprite(material);
  particle.scale.set(baseParticleSize, baseParticleSize, 1);

  particle.userData = {
    lineIndex: lineIndex,
    t: startT,
    speed:
      config.particleSpeedMin +
      Math.random() * (config.particleSpeedMax - config.particleSpeedMin),
    halo: halo,
    baseHaloSize: baseHaloSize,
    pulsePhase: Math.random() * Math.PI * 2,
    pulseSpeed: 2 + Math.random() * 2,
  };

  scene.add(particle);
  particles.push(particle);
}

function animate() {
  requestAnimationFrame(animate);
  const time = Date.now() * 0.001;

  particles.forEach((p) => {
    let data = p.userData;
    let pts = lines[data.lineIndex];

    data.t += data.speed;

    if (data.t >= pts.length - 1) {
      scene.remove(p);
      if (data.halo) scene.remove(data.halo);
      particles.splice(particles.indexOf(p), 1);
      createParticle(data.lineIndex, 0);
      return;
    }

    let i = Math.floor(data.t);
    let next = Math.min(i + 1, pts.length - 1);
    let alpha = data.t - i;
    let pos = new THREE.Vector3().lerpVectors(pts[i], pts[next], alpha);

    p.position.set(pos.x, pos.y, pos.z);
    if (data.halo) {
      data.halo.position.set(pos.x, pos.y, pos.z);
      let pulse = 1 + 0.3 * Math.sin(time * data.pulseSpeed + data.pulsePhase);
      data.halo.scale.set(
        data.baseHaloSize * pulse,
        data.baseHaloSize * pulse,
        1,
      );
    }
  });

  renderer.render(scene, camera);
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
