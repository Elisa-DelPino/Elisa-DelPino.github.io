import { startImprimedCircuit } from "./imprimedCircuit.js";
import { loadHeaderScriptDirect } from "./header.js";
import { getDataWeb, getDataAnim } from "./dataDemo.js";

// -------------------------------------- INJECT CSS ------------------------------

let lightboxAnimationInterval = null;

if (!document.getElementById("cssStyle")) {
  const style = document.createElement("style");
  style.id = "cssStyle";

  style.textContent = `
    .big {
      transform: scale(1.05);
      opacity: 1;
    }

    .little {
      opacity: 0.5;
      transform: scale(0.95);
    }

    .overlay {
      position: fixed;
      display: flex;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.8);
      z-index: 9998;
      gap: 2vw;
    }

    .closeButton {
      stroke: var(--text-color);
      width: clamp(45px, 5vw, 60px);
      height: clamp(45px, 5vw, 60px);
      position: absolute;
      top: 4%;
      right: 3%;
      cursor: pointer;
    }

    .containerLigthBox {
      display: flex;
      width: 65%;
      height: clamp(450px, 50vw, 600px);
      align-items: center;
      justify-content: center;
      gap: 20px;
    }

    .divImg {
      flex: 1;
      width: 100%;
      height: 100%;
      overflow: auto;
      overscroll-behavior: contain;
    }

    .arrow {
      width: clamp(20px, 4vw, 45px);
      height: clamp(20px, 4vw, 45px);
    }

    .divTexte {
      width: 20%;
      height: clamp(450px, 50vw, 600px);
      background: black;
      display: flex;
      flex-direction: column;
      padding: clamp(20px, 2vw, 35px);
      border: 0.5px solid var(--main-color);
      gap: clamp(20px, 3vw, 40px);
    }

    .div-title__ligthBox {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .h1__ligthBox {
      color: var(--text-color);
    }

    .divContent__ligthBox {
      flex: 1;
      padding: clamp(10px, 2vw, 35px);
      display: flex;
      flex-direction: column;
      gap: clamp(10px, 2vw, 20px);
      justify-content: center;
      align-items: center;
    }

    #colorPicker {
  width: 100%;
  display: flex;
  justify-content: center;
}

.colorValue {
  color: white;
  font-family: monospace;
  font-size: 14px;
  text-align: center;
}

    .input__ligthBox__text, .input__ligthBox__speed {
      width: 90%;
      height: 15%;
      padding: 2%;
      font-size: clamp(8px, 1vw, 12px);
  }

    .text__ligthBox {
      color: var(--text-color);
      font-size: clamp(8px, 2.2vw, 18px);
    }

    .button__ligthBox {
      width: 50%;
      height: 5%;
      margin: 0 50%;
      padding: 1%;
      transform: translate(-50%, -50%);
      color: var(--text-color);
      background: transparent;
      border: 0.5px solid var(--main-color);
      font-size: clamp(8px, 1vw, 12px);
    }

    @media screen and (max-width: 1000px) {
      .overlay {
        flex-direction: column;
        gap: 5%;
      }

      .containerLigthBox {
        width:80%;
      }

      .divTexte {
        width: 80%; 
        height: 20%;
      }

      .div-title__ligthBox {
        justify-content: left;
      }

      .button__ligthBox {
        height: 10%;
        width:20%; 
      }
    };

    .demo-carousel__item {
  position: relative;
  overflow: hidden;
}

.demo-carousel__previewText {
  position: relative;
  z-index: 2;

  display: inline-block;
  max-width: 90%;
  margin: 0;

  color: #a240df;
  font-family: Arial, sans-serif;
  font-size: clamp(10px, 2vw, 24px);
  line-height: 1;
  text-align: center;
  white-space: nowrap;
}

.demo-carousel__video {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;
  pointer-events: none;

  transform: scale(1.5);
  transform-origin: center;
}
  `;

  document.head.appendChild(style);
}

// ----------------------------- HOVER -------------------------------------------

const fakeWeb = document.querySelectorAll(".div-fakeWeb__demo");

function hoverFakeWeb(elements) {
  elements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      elements.forEach((item) => {
        item.classList.remove("big", "little");

        if (item === element) {
          item.classList.add("big");
        } else {
          item.classList.add("little");
        }
      });
    });

    element.addEventListener("mouseleave", () => {
      elements.forEach((item) => {
        item.classList.remove("big", "little");
      });
    });
  });
}

// ----------------------------------- LIGTH BOX --------------------------------

function addLigthBox(item, index) {
  if (document.querySelector(".overlay")) return;

  let currentIndex = index;

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  overlay.innerHTML = `
    <svg class="closeButton"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>

    <div class="containerLigthBox">
      <button class="arrow left" type="button">&#10094;</button>

      <div class="divImg"> </div>

      <button class="arrow right" type="button">&#10095;</button>
    </div>

    <div class="divTexte"> </div>
  `;

  document.body.appendChild(overlay);

  addDataLigthBox(item, currentIndex);

  const arrowRight = overlay.querySelector(".arrow.right");
  const arrowLeft = overlay.querySelector(".arrow.left");
  const closeButton = overlay.querySelector(".closeButton");

  blockScroll();

  let data;

  if (item.classList.contains("div-fakeWeb__demo")) {
    data = getDataWeb();
  } else {
    data = getDataAnim();
  }

  arrowRight.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex > data.length - 1) currentIndex = 0;
    addDataLigthBox(item, currentIndex);
  });

  arrowLeft.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) currentIndex = data.length - 1;
    addDataLigthBox(item, currentIndex);
  });

  closeButton.addEventListener("click", () => {
    clearInterval(lightboxAnimationInterval);
    lightboxAnimationInterval = null;

    overlay.remove();
    restoreScroll();
  });
}

function addDataLigthBox(item, index) {
  let data;

  if (item.classList.contains("div-fakeWeb__demo")) {
    data = getDataWeb();
  } else {
    data = getDataAnim();
  }

  const currentData = data[index];
  if (!currentData) return;

  const overlay = document.querySelector(".overlay");
  if (!overlay) return;

  const divImg = overlay.querySelector(".divImg");

  divImg.innerHTML = "";
  divImg.style.background = "";

  if (typeof currentData.img === "function") {
    currentData.img(divImg);
    webData(currentData);
  } else {
    divImg.style.background = "white";
    divImg.style.border = "0.5px solid var(--main-color)";
    animData(currentData);
  }
}

function webData(currentData) {
  const overlay = document.querySelector(".overlay");
  const divText = overlay.querySelector(".divTexte");

  divText.innerHTML = ` 
      
      <div class="div-title__ligthBox">
        <h1 class="h1__ligthBox"></h1>
      </div>

      <div class="divContent__ligthBox">
        <span class="text__ligthBox"></span>
      </div>

      <button class="button__ligthBox">DEVIS</button>
    `;

  const h1 = overlay.querySelector(".h1__ligthBox");
  h1.textContent = currentData.title;

  const textLightBox = overlay.querySelector(".text__ligthBox");
  textLightBox.textContent = currentData.textContent;
}

function animData(currentData) {
  const overlay = document.querySelector(".overlay");
  const divImg = overlay.querySelector(".divImg");
  const divText = overlay.querySelector(".divTexte");

  let currentSpeed = 250;
  let currentText = "ANIMATION";
  let currentColor = "#a240df";
  let h1 = null;

  function createFreshH1() {
    divImg.innerHTML = `
      <h1 class="h1__ligthBox">${currentText}</h1>
    `;

    h1 = divImg.querySelector(".h1__ligthBox");
    h1.style.fontSize = "clamp(20px, 5vw, 60px)";
    h1.style.color = currentColor;
  }

  function launchAnimation() {
    if (!currentData.anim) return;

    clearInterval(lightboxAnimationInterval);

    createFreshH1();

    currentData.anim(h1, currentSpeed);

    lightboxAnimationInterval = setInterval(() => {
      createFreshH1();
      currentData.anim(h1, currentSpeed);
    }, 5000);
  }

  createFreshH1();
  launchAnimation();

  divImg.style.display = "flex";
  divImg.style.alignItems = "center";
  divImg.style.justifyContent = "center";

  divText.innerHTML = `
    <div class="div-title__ligthBox">
      <h1 class="h1__ligthBox">Personnaliser</h1>
    </div>

    <div class="divContent__ligthBox">
      <input
        type="text"
        placeholder="Votre texte..."
        class="input__ligthBox__text"
      >

      <div id="colorPicker"></div>

      <span class="colorValue">#a240df</span>
    </div>

    <button class="button__ligthBox">DEVIS</button>
  `;

  const inputText = overlay.querySelector(".input__ligthBox__text");
  const colorValue = overlay.querySelector(".colorValue");

  inputText.addEventListener("input", () => {
    currentText = inputText.value || "ANIMATION";
    launchAnimation();
  });

  if (typeof iro === "undefined") {
    console.error("iro.js n'est pas chargé.");
    return;
  }

  const colorPicker = new iro.ColorPicker("#colorPicker", {
    width: 180,
    color: currentColor,
    borderWidth: 1,
    borderColor: "#a240df",

    layout: [
      {
        component: iro.ui.Box,
      },
      {
        component: iro.ui.Slider,
        options: {
          sliderType: "hue",
        },
      },
    ],
  });

  colorPicker.on("color:change", (color) => {
    currentColor = color.hexString;
    colorValue.textContent = currentColor;

    if (h1) {
      h1.style.color = currentColor;
    }
  });

  colorPicker.on("input:end", () => {
    launchAnimation();
  });
}

function bindClickInteractions(elements) {
  hoverFakeWeb(elements);

  elements.forEach((item) => {
    item.addEventListener("click", () => {
      const realIndex = Number(item.dataset.index);
      addLigthBox(item, realIndex);
    });
  });
}

function blockScroll() {
  const scrollY = window.scrollY;
  document.body.dataset.scrollY = scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.width = "100%";
}

function restoreScroll() {
  const scrollY = document.body.dataset.scrollY || "0";

  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.width = "";
  delete document.body.dataset.scrollY;

  window.scrollTo(0, Number(scrollY));
}

// -------------------------------- CAROUSSEL ------------------------------------

const track = document.getElementById("demoTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// On enrichit les données avec leur vrai index d'origine
const items = getDataAnim().map((item, index) => ({
  ...item,
  originalIndex: index,
}));

// Calcul nombre de colonnes
function getVisibleColumnCount() {
  if (window.innerWidth <= 900) {
    return 2;
  }

  return 3;
}

// Crée un tableau du nombre de colonnes utile
function buildColumns(data) {
  const columns = [];

  for (let i = 0; i < data.length; i += 2) {
    const topItem = data[i];
    const bottomItem = data[(i + 1) % data.length];

    columns.push([topItem, bottomItem]);
  }

  return columns;
}

const carouselAnimationIntervals = new Set();

function clearCarouselAnimationIntervals() {
  carouselAnimationIntervals.forEach((intervalId) => {
    clearInterval(intervalId);
  });

  carouselAnimationIntervals.clear();
}

function createColumnElement(columnData) {
  const columnDiv = document.createElement("div");
  columnDiv.className = "demo-carousel__column";

  columnData.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "demo-carousel__item";
    itemDiv.dataset.index = item.originalIndex;

    if (item.video) {
      const video = document.createElement("video");

      video.className = "demo-carousel__video";
      video.src = item.video;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;

      itemDiv.appendChild(video);

      video.play().catch(() => {
        // L'autoplay peut être bloqué temporairement par le navigateur.
      });
    } else if (typeof item.anim === "function") {
      let previewText = null;

      function createFreshPreview() {
        itemDiv.innerHTML = "";

        previewText = document.createElement("h2");
        previewText.className = "demo-carousel__previewText";

        previewText.textContent =
          item.previewText || item.textContent || "ANIMATION";

        previewText.style.color = item.previewColor || "#a240df";

        itemDiv.appendChild(previewText);
      }

      function launchPreviewAnimation() {
        createFreshPreview();

        item.anim(previewText);
      }

      launchPreviewAnimation();

      const intervalId = setInterval(() => {
        launchPreviewAnimation();
      }, 5000);

      carouselAnimationIntervals.add(intervalId);
    } else {
      itemDiv.style.background = item.img || "black";
    }

    columnDiv.appendChild(itemDiv);
  });

  return columnDiv;
}

let startIndex = 0;
const columns = buildColumns(items);

// Initialise carousel
function initCarousel() {
  clearCarouselAnimationIntervals();

  const visibleCount = getVisibleColumnCount();

  track.innerHTML = "";

  for (let i = 0; i < visibleCount; i++) {
    const columnIndex = (startIndex + i) % columns.length;
    const columnElement = createColumnElement(columns[columnIndex]);

    track.appendChild(columnElement);
  }

  track.style.transition = "none";
  track.style.transform = "translateX(0)";

  const carouselItems = track.querySelectorAll(".demo-carousel__item");

  bindClickInteractions(carouselItems);
}

// Slide suivant
function slideNext() {
  const visibleCount = getVisibleColumnCount();
  const shift = 100 / visibleCount;

  const newColumnIndex = (startIndex + visibleCount) % columns.length;

  const newColumnElement = createColumnElement(columns[newColumnIndex]);

  track.appendChild(newColumnElement);

  requestAnimationFrame(() => {
    track.style.transition = "transform 0.4s ease";
    track.style.transform = `translateX(-${shift}%)`;

    setTimeout(() => {
      track.firstElementChild?.remove();

      track.style.transition = "none";
      track.style.transform = "translateX(0)";

      startIndex = (startIndex + 1) % columns.length;

      initCarousel();
    }, 400);
  });
}

// Slide précédent
function slidePrev() {
  const visibleCount = getVisibleColumnCount();
  const shift = 100 / visibleCount;

  const newColumnIndex = (startIndex - 1 + columns.length) % columns.length;

  const newColumnElement = createColumnElement(columns[newColumnIndex]);

  track.style.transition = "none";
  track.prepend(newColumnElement);
  track.style.transform = `translateX(-${shift}%)`;

  requestAnimationFrame(() => {
    track.style.transition = "transform 0.4s ease";
    track.style.transform = "translateX(0)";

    setTimeout(() => {
      track.lastElementChild?.remove();

      startIndex = (startIndex - 1 + columns.length) % columns.length;

      initCarousel();
    }, 400);
  });
}

// Ajout des listeners
nextBtn.addEventListener("click", slideNext);
prevBtn.addEventListener("click", slidePrev);

let resizeTimeout = null;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);

  resizeTimeout = setTimeout(() => {
    initCarousel();
  }, 150);
});

// ----------------------------------- LOGIC JS -----------------------------------

startImprimedCircuit(window.imprimedCircuitConfig);
loadHeaderScriptDirect();
const header = document.querySelector(".header");
if (header) {
  header.classList.add("visible");
}

initCarousel();

fakeWeb.forEach((item, index) => {
  item.dataset.index = index;
});

hoverFakeWeb(fakeWeb);
bindClickInteractions(fakeWeb);
