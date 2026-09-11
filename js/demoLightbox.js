import { getDataWeb, getDataAnim } from "./dataDemo.js";
import {
  pauseAllCarouselVideos,
  updateVisibleCarouselVideos,
} from "./demoVideos.js";

let lightboxAnimationInterval = null;
let lightboxScrollFrame = null;
const lightboxScrollTimeouts = new Set();
let lightboxAutoScrollCancelled = false;

/* =========================================================
   PETIT MOUVEMENT AUTOMATIQUE DE LA DÉMO WEB
========================================================= */

function clearLightboxScrollAnimation() {
  lightboxAutoScrollCancelled = true;

  if (lightboxScrollFrame !== null) {
    cancelAnimationFrame(lightboxScrollFrame);

    lightboxScrollFrame = null;
  }

  lightboxScrollTimeouts.forEach((timeoutId) => {
    clearTimeout(timeoutId);
  });

  lightboxScrollTimeouts.clear();
}

function stopLightboxAutoScrollOnUserInteraction(overlay) {
  if (!overlay) {
    return;
  }

  const scrollContainer = overlay.querySelector(".divImg");

  const stopAutoScroll = () => {
    lightboxAutoScrollCancelled = true;

    clearLightboxScrollAnimation();
  };

  scrollContainer?.addEventListener("wheel", stopAutoScroll, {
    passive: true,
    capture: true,
  });

  scrollContainer?.addEventListener("touchstart", stopAutoScroll, {
    passive: true,
    capture: true,
  });

  scrollContainer?.addEventListener("pointerdown", stopAutoScroll, {
    passive: true,
    capture: true,
  });
}

function lightboxTimeout(callback, delay) {
  const timeoutId = window.setTimeout(() => {
    lightboxScrollTimeouts.delete(timeoutId);

    if (lightboxAutoScrollCancelled) {
      return;
    }

    callback();
  }, delay);

  lightboxScrollTimeouts.add(timeoutId);

  return timeoutId;
}

function easeInOutCubic(progress) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function animateLightboxScroll(element, target, duration) {
  return new Promise((resolve) => {
    if (!element || lightboxAutoScrollCancelled) {
      resolve(false);

      return;
    }

    if (lightboxScrollFrame !== null) {
      cancelAnimationFrame(lightboxScrollFrame);

      lightboxScrollFrame = null;
    }

    const startPosition = element.scrollTop;
    const distance = target - startPosition;
    const startTime = performance.now();

    function step(now) {
      if (lightboxAutoScrollCancelled) {
        lightboxScrollFrame = null;

        resolve(false);

        return;
      }

      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      element.scrollTop = startPosition + distance * easedProgress;

      if (progress < 1) {
        lightboxScrollFrame = requestAnimationFrame(step);

        return;
      }

      lightboxScrollFrame = null;

      resolve(true);
    }

    lightboxScrollFrame = requestAnimationFrame(step);
  });
}

function launchWebPreviewNudge(scrollContainer) {
  clearLightboxScrollAnimation();

  if (!scrollContainer) {
    return;
  }

  lightboxAutoScrollCancelled = false;

  scrollContainer.scrollTop = 0;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion) {
    return;
  }

  lightboxTimeout(async () => {
    if (lightboxAutoScrollCancelled) {
      return;
    }

    const maximumScroll =
      scrollContainer.scrollHeight - scrollContainer.clientHeight;

    const targetScroll = Math.min(300, maximumScroll);

    if (targetScroll <= 0) {
      return;
    }

    const completed = await animateLightboxScroll(
      scrollContainer,
      targetScroll,
      1600,
    );

    if (!completed || lightboxAutoScrollCancelled) {
      return;
    }

    lightboxTimeout(async () => {
      if (lightboxAutoScrollCancelled) {
        return;
      }

      await animateLightboxScroll(scrollContainer, 0, 2100);
    }, 550);
  }, 900);
}

/* =========================================================
   LIGHTBOX
========================================================= */

export function addLigthBox(item, index) {
  if (document.querySelector(".overlay")) {
    return;
  }

  let currentIndex = index;

  pauseAllCarouselVideos();

  const overlay = document.createElement("div");

  overlay.classList.add("overlay");

  const isWebPreview = item.classList.contains("div-fakeWeb__demo");

  if (isWebPreview) {
    overlay.classList.add("overlay--web");
  } else {
    overlay.classList.add("overlay--animation");
  }

  overlay.innerHTML = isWebPreview
    ? `
        <div class="lightbox__frame">

          <div class="lightbox__topbar">

            <span class="lightbox__label">

              <span
                class="lightbox__label-dot"
                aria-hidden="true"
              ></span>

              APERÇU INTERACTIF

            </span>

            <button
              class="closeButton"
              type="button"
              aria-label="Fermer l'aperçu"
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>

            </button>

          </div>

          <div class="containerLigthBox">

            <button
              class="arrow left"
              type="button"
              aria-label="Démonstration précédente"
            >
              &#10094;
            </button>

            <div class="divImg"></div>

            <button
              class="arrow right"
              type="button"
              aria-label="Démonstration suivante"
            >
              &#10095;
            </button>

          </div>

          <div
            class="scrollIndicator"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="m6 7 6 6 6-6"
              ></path>

              <path
                d="m6 13 6 6 6-6"
              ></path>
            </svg>
          </div>

          <div class="divTexte"></div>

        </div>
      `
    : `
        <div class="lightbox__frame">

          <div class="lightbox__topbar">

            <span class="lightbox__label">

              <span
                class="lightbox__label-dot"
                aria-hidden="true"
              ></span>

              PERSONNALISEZ VOTRE ANIMATION

            </span>

            <button
              class="closeButton"
              type="button"
              aria-label="Fermer la personnalisation"
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>

            </button>

          </div>

          <div class="containerLigthBox">

            <button
              class="arrow left"
              type="button"
              aria-label="Animation précédente"
            >
              &#10094;
            </button>

            <div class="divImg"></div>

            <div class="divTexte"></div>

            <button
              class="arrow right"
              type="button"
              aria-label="Animation suivante"
            >
              &#10095;
            </button>

          </div>

        </div>
      `;

  document.body.appendChild(overlay);

  if (isWebPreview) {
    stopLightboxAutoScrollOnUserInteraction(overlay);
  }

  addDataLigthBox(item, currentIndex);

  const arrowRight = overlay.querySelector(".arrow.right");
  const arrowLeft = overlay.querySelector(".arrow.left");
  const closeButton = overlay.querySelector(".closeButton");

  blockScroll();

  const data = item.classList.contains("div-fakeWeb__demo")
    ? getDataWeb()
    : getDataAnim();

  arrowRight.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex > data.length - 1) {
      currentIndex = 0;
    }

    addDataLigthBox(item, currentIndex);
  });

  arrowLeft.addEventListener("click", () => {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = data.length - 1;
    }

    addDataLigthBox(item, currentIndex);
  });

  function handleKeyboard(event) {
    switch (event.key) {
      case "ArrowRight":
        arrowRight.click();

        break;

      case "ArrowLeft":
        arrowLeft.click();

        break;

      case "Escape":
        closeLightbox();

        break;
    }
  }

  document.addEventListener("keydown", handleKeyboard);

  function closeLightbox() {
    clearLightboxScrollAnimation();

    clearInterval(lightboxAnimationInterval);

    lightboxAnimationInterval = null;

    document.removeEventListener("keydown", handleKeyboard);

    overlay.remove();

    restoreScroll();

    requestAnimationFrame(() => {
      updateVisibleCarouselVideos();
    });
  }

  closeButton.addEventListener("click", closeLightbox);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeLightbox();
    }
  });
}

function addDataLigthBox(item, index) {
  clearLightboxScrollAnimation();

  clearInterval(lightboxAnimationInterval);

  lightboxAnimationInterval = null;

  const data = item.classList.contains("div-fakeWeb__demo")
    ? getDataWeb()
    : getDataAnim();

  const currentData = data[index];

  if (!currentData) {
    return;
  }

  const overlay = document.querySelector(".overlay");

  if (!overlay) {
    return;
  }

  const divImg = overlay.querySelector(".divImg");

  divImg.innerHTML = "";
  divImg.style.background = "";
  divImg.style.border = "";
  divImg.style.display = "";
  divImg.style.alignItems = "";
  divImg.style.justifyContent = "";

  if (typeof currentData.img === "function") {
    currentData.img(divImg);

    webData(currentData);
  } else {
    divImg.style.background = "";
    divImg.style.border = "";
    divImg.style.overflow = "hidden";

    animData(currentData);
  }
}

function webData(currentData) {
  const overlay = document.querySelector(".overlay");

  if (!overlay) {
    return;
  }

  const divText = overlay.querySelector(".divTexte");
  const divImg = overlay.querySelector(".divImg");
  const containerLigthBox = overlay.querySelector(".containerLigthBox");

  divText.style.display = "";
  divText.style.display = "none";

  containerLigthBox.style.width = "100%";

  if (!divImg) {
    return;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      launchWebPreviewNudge(divImg);
    });
  });
}

function animData(currentData) {
  const overlay = document.querySelector(".overlay");

  if (!overlay) {
    return;
  }

  const divImg = overlay.querySelector(".divImg");
  const divText = overlay.querySelector(".divTexte");
  const containerLightbox = overlay.querySelector(".containerLigthBox");

  if (!divImg || !divText || !containerLightbox) {
    return;
  }

  const DEFAULT_TEXT = "ANIMATION";
  const DEFAULT_COLOR = "#b8b8b8";

  let currentText = DEFAULT_TEXT;
  let currentColor = DEFAULT_COLOR;
  let h1 = null;
  let colorPicker = null;

  overlay.style.setProperty("--animation-accent", currentColor);

  containerLightbox.classList.add("containerLigthBox--animation");
  divImg.classList.add("animation-preview");
  divText.classList.add("animation-controls");

  divImg.style.width = "";
  divImg.style.height = "";
  divImg.style.display = "";
  divText.style.width = "";
  divText.style.height = "";
  divText.style.display = "";

  divImg.innerHTML = `
    <div
      class="animation-preview__particles"
      aria-hidden="true"
    >
      <span
        class="animation-preview__stars"
      ></span>
    </div>

    <div class="animation-preview__content">

      <h1
        class="animation-preview__title"
      ></h1>

    </div>
  `;

  divText.innerHTML = `
    <div class="animation-control-group">

      <label
        class="animation-control-label"
        for="animationTextInput"
      >
        TEXTE
      </label>

      <input
        id="animationTextInput"
        type="text"
        value="${DEFAULT_TEXT}"
        maxlength="40"
        class="input__ligthBox__text"
        autocomplete="off"
      >

    </div>

    <div class="animation-control-group">

      <span class="animation-control-label">
        COULEUR PRINCIPALE
      </span>

      <div id="colorPicker"></div>

      <div class="animation-color-value">

        <span
          class="animation-color-swatch"
          aria-hidden="true"
        ></span>

        <input
          type="text"
          class="colorValue"
          value="${DEFAULT_COLOR.toUpperCase()}"
          maxlength="7"
          spellcheck="false"
          autocomplete="off"
          aria-label="Code couleur hexadécimal"
        >

      </div>

    </div>

    <button
      class="animation-reset-button shared-button"
      type="button"
    >
      <span>RÉINITIALISER</span>
    </button>
  `;

  function createFreshH1() {
    const content = divImg.querySelector(".animation-preview__content");

    if (!content) {
      return;
    }

    const previousTitle = content.querySelector(".animation-preview__title");

    if (previousTitle) {
      previousTitle.remove();
    }

    h1 = document.createElement("h1");

    h1.className = "animation-preview__title";
    h1.textContent = currentText;
    h1.style.color = currentColor;

    content.prepend(h1);
  }

  function launchAnimation() {
    if (typeof currentData.anim !== "function") {
      return;
    }

    clearInterval(lightboxAnimationInterval);

    createFreshH1();

    currentData.anim(h1);

    lightboxAnimationInterval = window.setInterval(() => {
      createFreshH1();

      currentData.anim(h1);
    }, 5000);
  }

  const inputText = divText.querySelector("#animationTextInput");
  const colorValue = divText.querySelector(".colorValue");
  const colorSwatch = divText.querySelector(".animation-color-swatch");
  const resetButton = divText.querySelector(".animation-reset-button");

  function applyColor(color) {
    currentColor = color;

    overlay.style.setProperty("--animation-accent", currentColor);

    if (colorValue) {
      colorValue.value = currentColor.toUpperCase();
    }

    if (colorSwatch) {
      colorSwatch.style.background = currentColor;
    }

    if (h1) {
      h1.style.color = currentColor;
    }
  }

  function normalizeHexColor(value) {
    let hex = value.trim();

    if (!hex.startsWith("#")) {
      hex = `#${hex}`;
    }

    const isValidHex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);

    return isValidHex ? hex.toUpperCase() : null;
  }

  inputText?.addEventListener("input", () => {
    currentText = inputText.value.trim() || DEFAULT_TEXT;

    launchAnimation();
  });

  resetButton?.addEventListener("click", () => {
    currentText = DEFAULT_TEXT;
    currentColor = DEFAULT_COLOR;

    if (inputText) {
      inputText.value = DEFAULT_TEXT;
    }

    if (colorPicker) {
      colorPicker.color.set(DEFAULT_COLOR);
    }

    applyColor(DEFAULT_COLOR);

    launchAnimation();
  });

  if (typeof iro === "undefined") {
    console.error("iro.js n'est pas chargé.");

    applyColor(DEFAULT_COLOR);

    launchAnimation();

    return;
  }

  const colorPickerWidth = window.matchMedia("(max-width:600px)").matches
    ? 105
    : 140;

  colorPicker = new iro.ColorPicker("#colorPicker", {
    width: colorPickerWidth,
    color: DEFAULT_COLOR,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.8)",

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
    applyColor(color.hexString);
  });

  colorPicker.on("input:end", () => {
    launchAnimation();
  });

  applyColor(DEFAULT_COLOR);

  launchAnimation();

  colorValue?.addEventListener("input", () => {
    const validColor = normalizeHexColor(colorValue.value);

    if (!validColor) {
      colorValue.classList.add("is-invalid");

      return;
    }

    colorValue.classList.remove("is-invalid");

    if (colorPicker) {
      colorPicker.color.set(validColor);
    } else {
      applyColor(validColor);

      launchAnimation();
    }
  });

  colorValue?.addEventListener("blur", () => {
    const validColor = normalizeHexColor(colorValue.value);

    if (!validColor) {
      colorValue.value = currentColor.toUpperCase();
      colorValue.classList.remove("is-invalid");

      return;
    }

    colorValue.value = validColor;
  });

  colorValue?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      colorValue.blur();
    }
  });
}

/* =========================================================
   BLOCAGE DU SCROLL
========================================================= */

function blockScroll() {
  const scrollY = window.scrollY;

  document.body.dataset.scrollY = String(scrollY);
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
