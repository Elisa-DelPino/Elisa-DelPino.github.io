// js/uiBuilder.js
import { initStars } from "./stars.js";

const STYLE_ID = "uiBuilderCSS";
const ANIMATION_DURATION = 500;

const SELECTORS = {
  wrapper: ".ui-wrapper",
  headerNav: ".ui-header__nav",
  item1: ".grid-item-1",
  item2: ".grid-item-2",
  overlay: ".ui-builder__overlay",
  button: ".bottom-button",
};

const OFFSETS = {
  overlayXRatio: -0.07,
  overlayYRatio: 0.0,
  item1XRatio: -0.03,
  item1YRatio: -0.01,
  item2XRatio: -0.03,
  item2YRatio: 0.01,
  buttonYRatio: -0.11,
};

const UI_BUILDER_CSS = `
  .ui-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }

  .ui-header {
    width: 100%;
    display: flex;
    justify-content: right;
    padding: clamp(8px, 1.5vw, 12px);
    background: #0d1117;
    color: white;
    font-family: "Consolas", monospace;
    box-sizing: border-box;
    position: relative;
    z-index: 10;
  }

  .ui-header__nav {
    opacity: 0;
    pointer-events: none;
    transform: translateY(-50px);
    transition:
      transform 0.5s ease,
      opacity 0.5s ease;
  }

  .ui-header__nav.is-visible {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .ui-header__nav ul {
    display: flex;
    gap: clamp(5px, 1vw, 10px);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .ui-header__nav a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: clamp(5px, 1.5vw, 12px);
  }

  .input-wrapper {
    position: relative;
    display: inline-block;
  }

  .input-wrapper input {
    width: clamp(5px, 3vw, 100px);
    margin: clamp(0.2px, 0.35vw, 3px) clamp(3px, 0.3vw, 15px);
    padding-right: 25px;
    border-radius: clamp(2px, 0.5vw, 3px);
    border: clamp(0.1px, 0.1vw, 0.5px) solid rgba(255, 255, 255, 0.2);
    background: #0d1117;
    color: rgba(255, 255, 255, 0.7);
  }

  .content__pics {
    width: 100%;
    height: 100%;
    position: relative;
    clear: both;
  }

  .content__pics canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .grid-container {
    position: absolute;
    inset: 0;
    z-index: 5;
  }

  .grid-item-1,
  .grid-item-2 {
    position: absolute;
    background-color: var(--text-color);
    width: clamp(35px, 7vw, 75px);
    height: clamp(35px, 7vw, 75px);
    display: flex;
    font-family: monospace;
    color: white;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    opacity: 0;
    --anim-x: 0px;
    --anim-y: 0px;
    transform: translate(-50%, -50%) translate(var(--anim-x), var(--anim-y));
    transition:
      transform 0.5s ease,
      opacity 0.5s ease;
  }

  .ui-builder__overlay {
  position: absolute;
  width: clamp(65px, 12vw, 150px);
  height: clamp(65px, 12vw, 150px);
  z-index: 20;
  display: flex;
  pointer-events: none;
  transform: translate(-50%, -50%);
}

  .overlay-content {
    width: 100%;
    height: 100%;
    background: var(--text-color);
    opacity : 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }

  .div-children {
    width: 98%;
    height: 98%;
    background: #0d1117;
    display: flex;
    align-items: center;
    justify-content: center;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }

  .grid-item-1 > .div-children,
  .grid-item-2 > .div-children {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .bottom-button {
    position: absolute;
    z-index: 20;
    padding: clamp(6px, 1vw, 10px) clamp(20px, 3vw, 40px);
    background: #0d1117;
    border-radius: clamp(5px, 1vw, 8px);
    border: clamp(0.05px, 0.05vw, 0.2px) solid rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.7);
    font-family: "Consolas", monospace;
    cursor: pointer;
    font-size: clamp(5px, 1.5vw, 12px);
    opacity: 0;
    --anim-x: 0px;
    --anim-y: 0px;
    transform: translate(-50%, -50%) translate(var(--anim-x), var(--anim-y));
    transition:
      transform 0.5s ease,
      opacity 0.5s ease;
  }

  .anim-layer {
    width: 100%;
    height: 100%;
    opacity: 0;
    --anim-x: 0px;
    --anim-y: 0px;
    transform: translate(var(--anim-x), var(--anim-y));
    transition:
      transform 0.5s ease,
      opacity 0.5s ease;
  }

  .from-left {
    --anim-x: -40px;
    --anim-y: 0px;
    opacity: 0;
  }

  .from-right {
    --anim-x: 40px;
    --anim-y: 0px;
    opacity: 0;
  }

  .from-bottom {
    --anim-x: 0px;
    --anim-y: 40px;
    opacity: 0;
  }

  .is-visible {
    --anim-x: 0px;
    --anim-y: 0px;
    opacity: 1;
    pointer-events: auto;
  }

  .grid-item-1,
  .grid-item-2,
  .ui-builder__overlay,
  .bottom-button {
    display: none;
  }

  .ui-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

let picturesTimeouts = [];

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = UI_BUILDER_CSS;
  document.head.appendChild(style);
}

function clearPictureTimeouts() {
  picturesTimeouts.forEach(clearTimeout);
  picturesTimeouts = [];
}

function parseCssValueToPixels(value, size) {
  if (value.endsWith("%")) return (parseFloat(value) / 100) * size;
  return parseFloat(value);
}

function getPolygonPointsInPixels(el) {
  const clipPath = getComputedStyle(el).clipPath;
  const rect = el.getBoundingClientRect();
  const match = clipPath.match(/polygon\((.*)\)/);
  if (!match) return null;

  return match[1].split(",").map((point) => {
    const [x, y] = point.trim().split(/\s+/);
    return {
      x: parseCssValueToPixels(x, rect.width),
      y: parseCssValueToPixels(y, rect.height),
    };
  });
}

function getPolygonCentroid(points) {
  let x = 0;
  let y = 0;
  let area = 0;

  for (let i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length;
    const cross = points[i].x * points[j].y - points[j].x * points[i].y;
    x += (points[i].x + points[j].x) * cross;
    y += (points[i].y + points[j].y) * cross;
    area += cross;
  }

  area *= 0.5;
  return {
    x: x / (6 * area),
    y: y / (6 * area),
  };
}

function getMiddle(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}

function getDiagonalRightGeometry() {
  const diagonal = document.querySelector(".diagonal.right");
  if (!diagonal) return null;

  const points = getPolygonPointsInPixels(diagonal);
  if (!points) return null;

  return {
    rect: diagonal.getBoundingClientRect(),
    points,
    center: getPolygonCentroid(points),
  };
}

function getElementSize(el, displayMode = "block") {
  if (!el) return { width: 0, height: 0 };

  const computedDisplay = getComputedStyle(el).display;
  if (computedDisplay !== "none") {
    const rect = el.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }

  const previous = {
    display: el.style.display,
    visibility: el.style.visibility,
    opacity: el.style.opacity,
    pointerEvents: el.style.pointerEvents,
  };

  el.style.display = displayMode;
  el.style.visibility = "hidden";
  el.style.opacity = "0";
  el.style.pointerEvents = "none";

  const rect = el.getBoundingClientRect();

  Object.assign(el.style, previous);

  return { width: rect.width, height: rect.height };
}

function setAbsolutePosition(el, x, y) {
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.bottom = "auto";
}

function getLayoutOffsets(width, height) {
  return {
    overlayX: width * OFFSETS.overlayXRatio,
    overlayY: height * OFFSETS.overlayYRatio,
    item1X: width * OFFSETS.item1XRatio,
    item1Y: height * OFFSETS.item1YRatio,
    item2X: width * OFFSETS.item2XRatio,
    item2Y: height * OFFSETS.item2YRatio,
    buttonY: height * OFFSETS.buttonYRatio,
  };
}

function getAnimNode(el) {
  return el.matches(SELECTORS.overlay) ? el.querySelector(".anim-layer") : el;
}

function getAnimClass(el) {
  if (el.matches(SELECTORS.overlay)) return "from-right";
  if (el.matches(SELECTORS.button)) return "from-bottom";
  return "from-left";
}

function toggleHeaderNav(el) {
  el.classList.toggle("is-visible");
}

function showAnimatedElement(el) {
  const animNode = getAnimNode(el);
  const animClass = getAnimClass(el);

  el.style.display = el.matches(SELECTORS.overlay) ? "flex" : "block";

  if (!animNode) return;

  animNode.classList.remove(
    "is-visible",
    "from-left",
    "from-right",
    "from-bottom",
  );
  animNode.classList.add(animClass);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      animNode.classList.add("is-visible");
      animNode.classList.remove(animClass);
    });
  });
}

function hideAnimatedElement(el) {
  const animNode = getAnimNode(el);
  const animClass = getAnimClass(el);

  if (!animNode) return;

  animNode.classList.remove(
    "is-visible",
    "from-left",
    "from-right",
    "from-bottom",
  );
  animNode.classList.add(animClass);

  clearTimeout(el._hideTimeout);
  el._hideTimeout = setTimeout(() => {
    el.style.display = "none";
    const canvas = el.querySelector("canvas");
    if (canvas) canvas.remove();
  }, ANIMATION_DURATION);
}

export function Create(el) {
  if (!el) return;

  if (el.matches(SELECTORS.headerNav)) {
    toggleHeaderNav(el);
    return;
  }

  const isHidden = getComputedStyle(el).display === "none";
  if (isHidden) {
    showAnimatedElement(el);
  } else {
    hideAnimatedElement(el);
  }
}

export function PicturesSystem(show) {
  const elements = [
    document.querySelector(SELECTORS.item1),
    document.querySelector(SELECTORS.overlay),
    document.querySelector(SELECTORS.item2),
  ];

  clearPictureTimeouts();

  const ordered = show ? elements : elements.slice().reverse();

  ordered.forEach((el, index) => {
    if (!el) return;

    const timeoutId = setTimeout(() => {
      const isHidden = getComputedStyle(el).display === "none";
      const shouldToggle = show ? isHidden : !isHidden;
      if (shouldToggle) Create(el);
    }, index * 650);

    picturesTimeouts.push(timeoutId);
  });
}

function updateUIPositions(contentPics) {
  const geometry = getDiagonalRightGeometry();
  if (!geometry) return;

  const item1 = contentPics.querySelector(SELECTORS.item1);
  const item2 = contentPics.querySelector(SELECTORS.item2);
  const overlay = contentPics.querySelector(SELECTORS.overlay);
  const button = contentPics.querySelector(SELECTORS.button);

  if (!item1 || !item2 || !overlay || !button) return;

  const { center, rect, points } = geometry;
  const localCenterX = center.x - contentPics.offsetLeft;
  const localCenterY = center.y - contentPics.offsetTop;

  const overlaySize = getElementSize(overlay, "flex");
  const item1Size = getElementSize(item1, "block");
  const item2Size = getElementSize(item2, "block");

  const offsets = getLayoutOffsets(rect.width, rect.height);
  const bottomMid = getMiddle(points[2], points[3]);
  const buttonLocalX = bottomMid.x - contentPics.offsetLeft;
  const buttonLocalY = bottomMid.y - contentPics.offsetTop;

  setAbsolutePosition(
    overlay,
    localCenterX + overlaySize.width / 2 + offsets.overlayX,
    localCenterY + offsets.overlayY,
  );

  setAbsolutePosition(
    item1,
    localCenterX - item1Size.width / 2 + offsets.item1X,
    localCenterY - item1Size.height / 2 + offsets.item1Y,
  );

  setAbsolutePosition(
    item2,
    localCenterX - item2Size.width / 2 + offsets.item2X,
    localCenterY + item2Size.height / 2 + offsets.item2Y,
  );

  setAbsolutePosition(button, buttonLocalX, buttonLocalY + offsets.buttonY);
}

function createHeader() {
  const header = document.createElement("div");
  header.className = "ui-header";
  header.innerHTML = `
    <nav class="ui-header__nav">
      <ul>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Pics</a></li>
        <div class="input-wrapper">
          <input>
        </div>
      </ul>
    </nav>
  `;
  return header;
}

function createGridItem(className, imagePath, alt) {
  const item = document.createElement("div");
  item.className = className;
  item.innerHTML = `
    <div class="div-children">
      <img src="${imagePath}" alt="${alt}">
    </div>
  `;
  return item;
}

function createOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "ui-builder__overlay";
  overlay.innerHTML = `
    <div class="anim-layer">
      <div class="overlay-content">
        <div class="div-children">
          <img src="./img/siteCoiffure.png" alt="img3">
        </div>
      </div>
    </div>
  `;
  return overlay;
}

function createButton() {
  const button = document.createElement("button");
  button.className = "bottom-button";
  button.textContent = "ENTER";
  return button;
}

function createContentArea() {
  const contentPics = document.createElement("div");
  contentPics.className = "content__pics";

  const gridContainer = document.createElement("div");
  gridContainer.className = "grid-container";

  gridContainer.appendChild(
    createGridItem("grid-item-1", "./img/sitePatisserie.png", "img1"),
  );
  gridContainer.appendChild(
    createGridItem("grid-item-2", "./img/siteDeco.png", "img2"),
  );

  contentPics.appendChild(gridContainer);
  contentPics.appendChild(createOverlay());
  contentPics.appendChild(createButton());

  return contentPics;
}

export function initUiBuilder(parentSelector) {
  const parent = document.querySelector(parentSelector);
  if (!parent || parent.querySelector(SELECTORS.wrapper)) return;

  ensureStyles();

  const wrapper = document.createElement("div");
  wrapper.className = "ui-wrapper";

  const header = createHeader();
  const contentPics = createContentArea();

  wrapper.appendChild(header);
  wrapper.appendChild(contentPics);
  parent.appendChild(wrapper);

  updateUIPositions(contentPics);
  window.addEventListener("resize", () => updateUIPositions(contentPics));

  initStars(contentPics);
}
