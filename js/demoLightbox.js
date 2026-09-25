import { getDataWeb, getDataAnim } from "./dataDemo.js";
import {
  pauseAllCarouselVideos,
  updateVisibleCarouselVideos,
} from "./demoVideos.js";
import { loadScript, loadStylesheet } from "./resourceLoader.js";
import { openOverlayHistory, closeOverlayHistory } from "./overlayHistory.js";

/* =========================================================
   VARIABLES GLOBALES
========================================================= */

let lightboxAnimationInterval = null;
let lightboxScrollFrame = null;
const lightboxScrollTimeouts = new Set();
let lightboxAutoScrollCancelled = false;
let lightboxRenderToken = 0;
let lightboxOpening = false;

const FOCUSABLE_SELECTOR =
  'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

/* =========================================================
   PRÉFÉRENCE DE RÉDUCTION DES MOUVEMENTS
========================================================= */

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* =========================================================
   GESTION DU FOCUS DANS LA LIGHTBOX
========================================================= */

function getFocusableElements(container) {
  if (!container) {
    return [];
  }

  return [...container.querySelectorAll(FOCUSABLE_SELECTOR)].filter(
    (element) => {
      const style = window.getComputedStyle(element);

      return (
        !element.closest('[hidden], [aria-hidden="true"]') &&
        style.display !== "none" &&
        style.visibility !== "hidden"
      );
    },
  );
}

function trapFocus(event, container) {
  if (event.key !== "Tab" || !container) {
    return;
  }

  const focusableElements = getFocusableElements(container);

  if (focusableElements.length === 0) {
    event.preventDefault();
    container.focus();
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  const activeElement = document.activeElement;

  if (!container.contains(activeElement)) {
    event.preventDefault();
    (event.shiftKey ? lastElement : firstElement).focus();
    return;
  }

  if (event.shiftKey && activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
    return;
  }

  if (!event.shiftKey && activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

/* =========================================================
   ARRÊT DU PETIT SCROLL AUTOMATIQUE
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

/* =========================================================
   ARRÊT DU SCROLL AUTO SI L'UTILISATEUR INTERAGIT
========================================================= */

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

/* =========================================================
   TIMEOUTS DU SCROLL AUTOMATIQUE
========================================================= */

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

/* =========================================================
   COURBE D'ANIMATION DU SCROLL AUTO
========================================================= */

function easeInOutCubic(progress) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

/* =========================================================
   ANIMATION DU SCROLL AUTOMATIQUE
========================================================= */

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

/* =========================================================
   PETIT MOUVEMENT AUTOMATIQUE À L'OUVERTURE
========================================================= */

function launchWebPreviewNudge(scrollContainer) {
  clearLightboxScrollAnimation();

  if (!scrollContainer) {
    return;
  }

  lightboxAutoScrollCancelled = false;

  scrollContainer.scrollTop = 0;

  if (prefersReducedMotion()) {
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
   OUVERTURE ET CRÉATION DE LA LIGHTBOX
========================================================= */

export async function addLigthBox(item, index) {
  if (document.querySelector(".overlay") || lightboxOpening) {
    return;
  }

  lightboxOpening = true;

  /* =========================================================
     CHARGEMENT DU CSS DE LA LIGHTBOX
  ========================================================= */

  try {
    await loadStylesheet("./css/demoLightbox.css", "demo-lightbox-styles");
  } catch (error) {
    console.error(error);
    lightboxOpening = false;

    return;
  }

  if (document.querySelector(".overlay")) {
    lightboxOpening = false;

    return;
  }

  /* =========================================================
     INDEX DE LA DÉMO ACTUELLEMENT AFFICHÉE
  ========================================================= */

  let currentIndex = index;
  const lastFocusedElement = document.activeElement;

  pauseAllCarouselVideos();

  /* =========================================================
     CRÉATION DE L'OVERLAY
  ========================================================= */

  const overlay = document.createElement("div");

  overlay.classList.add("overlay");

  const isWebPreview = item.classList.contains("div-fakeWeb__demo");

  if (isWebPreview) {
    overlay.classList.add("overlay--web");
  } else {
    overlay.classList.add("overlay--animation");
  }

  /* =========================================================
     HTML LIGHTBOX SITE WEB OU ANIMATION
  ========================================================= */

  overlay.innerHTML = isWebPreview
    ? `
        <div
          class="lightbox__frame"
          role="dialog"
          aria-modal="true"
          aria-label="Aperçu interactif d'un site web"
          tabindex="-1"
        >

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
        <div
          class="lightbox__frame"
          role="dialog"
          aria-modal="true"
          aria-label="Personnalisation d'une animation"
          tabindex="-1"
        >

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

  lightboxOpening = false;

  /* =========================================================
     BOUTON RETOUR DU NAVIGATEUR
  ========================================================= */

  openOverlayHistory(() => {
    closeLightbox(true);
  });

  /* =========================================================
     DÉTECTION DES INTERACTIONS DE SCROLL
  ========================================================= */

  if (isWebPreview) {
    stopLightboxAutoScrollOnUserInteraction(overlay);
  }

  /* =========================================================
     RÉCUPÉRATION DES BOUTONS DE LA LIGHTBOX
  ========================================================= */

  const lightboxFrame = overlay.querySelector(".lightbox__frame");
  const arrowRight = overlay.querySelector(".arrow.right");
  const arrowLeft = overlay.querySelector(".arrow.left");
  const closeButton = overlay.querySelector(".closeButton");

  blockScroll();

  const data = isWebPreview ? getDataWeb() : getDataAnim();

  /* =========================================================
     AFFICHAGE DE LA DÉMO ACTUELLE
  ========================================================= */

  async function renderCurrentData() {
    await addDataLigthBox(item, currentIndex);
  }

  /* =========================================================
     FLÈCHES DE NAVIGATION
  ========================================================= */

  arrowRight.addEventListener("click", async () => {
    currentIndex++;

    if (currentIndex > data.length - 1) {
      currentIndex = 0;
    }

    await renderCurrentData();
  });

  arrowLeft.addEventListener("click", async () => {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = data.length - 1;
    }

    await renderCurrentData();
  });

  /* =========================================================
     CONTRÔLES AU CLAVIER
  ========================================================= */

  function handleKeyboard(event) {
    /* =========================================================
       TAB RESTE À L'INTÉRIEUR DE LA LIGHTBOX
    ========================================================= */

    if (event.key === "Tab") {
      trapFocus(event, lightboxFrame);
      return;
    }

    /* =========================================================
       NE PAS INTERCEPTER ← / → DANS LES CHAMPS DE SAISIE
    ========================================================= */

    const keyboardTarget = event.target;
    const isEditableTarget =
      keyboardTarget instanceof HTMLElement &&
      (keyboardTarget.matches("input, textarea, select") ||
        keyboardTarget.isContentEditable ||
        keyboardTarget.closest('[contenteditable="true"]'));

    if (
      !isWebPreview &&
      isEditableTarget &&
      (event.key === "ArrowLeft" || event.key === "ArrowRight")
    ) {
      return;
    }

    /* =========================================================
       FLÈCHES HAUT ET BAS : SCROLL DES SITES WEB
    ========================================================= */

    if (
      isWebPreview &&
      (event.key === "ArrowDown" || event.key === "ArrowUp")
    ) {
      const scrollContainer = overlay.querySelector(".divImg");

      if (!scrollContainer) {
        return;
      }

      event.preventDefault();

      clearLightboxScrollAnimation();

      const scrollDistance = event.repeat
        ? 55
        : Math.max(90, scrollContainer.clientHeight * 0.14);

      scrollContainer.scrollBy({
        top: event.key === "ArrowDown" ? scrollDistance : -scrollDistance,
        behavior: event.repeat || prefersReducedMotion() ? "auto" : "smooth",
      });

      return;
    }

    /* =========================================================
       AUTRES TOUCHES DU CLAVIER
    ========================================================= */

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

  /* =========================================================
     FERMETURE DE LA LIGHTBOX
  ========================================================= */

  function closeLightbox(fromHistory = false) {
    clearLightboxScrollAnimation();

    clearInterval(lightboxAnimationInterval);

    lightboxAnimationInterval = null;

    document.removeEventListener("keydown", handleKeyboard);

    overlay.remove();

    restoreScroll();

    if (!fromHistory) {
      closeOverlayHistory();
    }

    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }

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

  /* =========================================================
     PREMIER AFFICHAGE
  ========================================================= */

  await renderCurrentData();

  if (overlay.isConnected) {
    requestAnimationFrame(() => {
      closeButton?.focus();
    });
  }
}

/* =========================================================
   CHARGEMENT DU CONTENU DE LA DÉMO
========================================================= */

async function addDataLigthBox(item, index) {
  const renderToken = ++lightboxRenderToken;

  clearLightboxScrollAnimation();

  clearInterval(lightboxAnimationInterval);

  lightboxAnimationInterval = null;

  const isWebPreview = item.classList.contains("div-fakeWeb__demo");
  const data = isWebPreview ? getDataWeb() : getDataAnim();
  const currentData = data[index];

  if (!currentData) {
    return;
  }

  const overlay = document.querySelector(".overlay");

  if (!overlay) {
    return;
  }

  const divImg = overlay.querySelector(".divImg");

  if (!divImg) {
    return;
  }

  /* =========================================================
     REMISE À ZÉRO DE LA ZONE D'AFFICHAGE
  ========================================================= */

  divImg.innerHTML = "";
  divImg.style.background = "";
  divImg.style.border = "";
  divImg.style.display = "";
  divImg.style.alignItems = "";
  divImg.style.justifyContent = "";

  /* =========================================================
     CHARGEMENT D'UNE DÉMO DE SITE WEB
  ========================================================= */

  if (isWebPreview) {
    let renderWebDemo = null;

    try {
      if (typeof currentData.loadImg === "function") {
        renderWebDemo = await currentData.loadImg();
      } else if (typeof currentData.img === "function") {
        renderWebDemo = currentData.img;
      }
    } catch (error) {
      console.error(error);

      return;
    }

    if (
      renderToken !== lightboxRenderToken ||
      !overlay.isConnected ||
      typeof renderWebDemo !== "function"
    ) {
      return;
    }

    renderWebDemo(divImg);

    webData(currentData);

    return;
  }

  /* =========================================================
     CHARGEMENT D'IRO.JS POUR LES ANIMATIONS
  ========================================================= */

  if (!window.iro) {
    try {
      await loadScript(
        "https://cdn.jsdelivr.net/npm/@jaames/iro@5",
        "iro-color-picker-script",
      );
    } catch (error) {
      console.error(error);
    }
  }

  if (renderToken !== lightboxRenderToken || !overlay.isConnected) {
    return;
  }

  /* =========================================================
     AFFICHAGE D'UNE ANIMATION
  ========================================================= */

  divImg.style.background = "";
  divImg.style.border = "";
  divImg.style.overflow = "hidden";

  animData(currentData);
}

/* =========================================================
   CONFIGURATION D'UNE DÉMO DE SITE WEB
========================================================= */

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

  /* =========================================================
     LANCEMENT DU PETIT SCROLL D'INDICATION
  ========================================================= */

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      launchWebPreviewNudge(divImg);
    });
  });
}

/* =========================================================
   CONFIGURATION D'UNE DÉMO D'ANIMATION
========================================================= */

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

  /* =========================================================
     VALEURS PAR DÉFAUT
  ========================================================= */

  const DEFAULT_TEXT = "ANIMATION";
  const DEFAULT_COLOR = "#E09E35";

  let currentText = DEFAULT_TEXT;
  let currentColor = DEFAULT_COLOR;
  let h1 = null;
  let colorPicker = null;

  overlay.style.setProperty("--animation-accent", currentColor);

  /* =========================================================
     CLASSES ET DIMENSIONS DE L'ANIMATION
  ========================================================= */

  containerLightbox.classList.add("containerLigthBox--animation");
  divImg.classList.add("animation-preview");
  divText.classList.add("animation-controls");

  divImg.style.width = "";
  divImg.style.height = "";
  divImg.style.display = "";
  divText.style.width = "";
  divText.style.height = "";
  divText.style.display = "";

  /* =========================================================
     ZONE D'APERÇU DE L'ANIMATION
  ========================================================= */

  divImg.innerHTML = `
    <div class="animation-preview__content">

      <h1
        class="animation-preview__title"
      ></h1>

    </div>
  `;

  /* =========================================================
     CONTRÔLES DE PERSONNALISATION
  ========================================================= */

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

  /* =========================================================
     RECRÉATION DU TITRE ANIMÉ
  ========================================================= */

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

  /* =========================================================
     LANCEMENT ET RELANCE DE L'ANIMATION
  ========================================================= */

  function launchAnimation() {
    if (typeof currentData.anim !== "function") {
      return;
    }

    clearInterval(lightboxAnimationInterval);

    createFreshH1();

    currentData.anim(h1);

    if (prefersReducedMotion()) {
      return;
    }

    lightboxAnimationInterval = window.setInterval(() => {
      createFreshH1();

      currentData.anim(h1);
    }, 5000);
  }

  /* =========================================================
     RÉCUPÉRATION DES CONTRÔLES
  ========================================================= */

  const inputText = divText.querySelector("#animationTextInput");
  const colorValue = divText.querySelector(".colorValue");
  const colorSwatch = divText.querySelector(".animation-color-swatch");
  const resetButton = divText.querySelector(".animation-reset-button");
  const labelDot = overlay.querySelector(".lightbox__label-dot");
  const arrowButtons = overlay.querySelectorAll(".arrow");
  const closeButton = overlay.querySelector(".closeButton");

  /* =========================================================
     APPLICATION DE LA COULEUR
  ========================================================= */

  function applyColor(color) {
    currentColor = color;

    overlay.style.setProperty("--animation-accent", currentColor);

    if (colorValue) {
      colorValue.value = currentColor.toUpperCase();
    }

    if (colorSwatch) {
      colorSwatch.style.background = currentColor;
    }

    if (resetButton) {
      resetButton.style.setProperty("border-color", currentColor, "important");
    }

    if (labelDot) {
      labelDot.style.setProperty("background-color", currentColor, "important");

      labelDot.style.setProperty(
        "box-shadow",
        `0 0 10px ${currentColor}`,
        "important",
      );
    }

    arrowButtons.forEach((arrow) => {
      arrow.style.setProperty("color", currentColor, "important");
    });

    if (closeButton) {
      closeButton.style.setProperty("color", currentColor, "important");
    }

    if (h1) {
      h1.style.color = currentColor;
    }
  }

  /* =========================================================
     VALIDATION D'UNE COULEUR HEXADÉCIMALE
  ========================================================= */

  function normalizeHexColor(value) {
    let hex = value.trim();

    if (!hex.startsWith("#")) {
      hex = `#${hex}`;
    }

    const isValidHex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);

    return isValidHex ? hex.toUpperCase() : null;
  }

  /* =========================================================
     MODIFICATION DU TEXTE
  ========================================================= */

  inputText?.addEventListener("input", () => {
    currentText = inputText.value.trim() || DEFAULT_TEXT;

    launchAnimation();
  });

  /* =========================================================
     RÉINITIALISATION
  ========================================================= */

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

  /* =========================================================
     SÉCURITÉ SI IRO.JS N'EST PAS DISPONIBLE
  ========================================================= */

  if (!window.iro) {
    console.error("iro.js n'est pas chargé.");

    applyColor(DEFAULT_COLOR);

    launchAnimation();

    return;
  }

  /* =========================================================
     TAILLE DU SÉLECTEUR DE COULEUR
  ========================================================= */

  const colorPickerWidth = window.matchMedia("(max-width:600px)").matches
    ? 105
    : 140;

  /* =========================================================
     CRÉATION DU SÉLECTEUR DE COULEUR
  ========================================================= */

  colorPicker = new window.iro.ColorPicker("#colorPicker", {
    width: colorPickerWidth,
    color: DEFAULT_COLOR,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.8)",

    layout: [
      {
        component: window.iro.ui.Box,
      },
      {
        component: window.iro.ui.Slider,
        options: {
          sliderType: "hue",
        },
      },
    ],
  });

  /* =========================================================
     CHANGEMENT DE COULEUR
  ========================================================= */

  colorPicker.on("color:change", (color) => {
    applyColor(color.hexString);
  });

  colorPicker.on("input:end", () => {
    launchAnimation();
  });

  applyColor(DEFAULT_COLOR);

  launchAnimation();

  /* =========================================================
     SAISIE MANUELLE DU CODE HEXADÉCIMAL
  ========================================================= */

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

  /* =========================================================
     VALIDATION À LA PERTE DU FOCUS
  ========================================================= */

  colorValue?.addEventListener("blur", () => {
    const validColor = normalizeHexColor(colorValue.value);

    if (!validColor) {
      colorValue.value = currentColor.toUpperCase();
      colorValue.classList.remove("is-invalid");

      return;
    }

    colorValue.value = validColor;
  });

  /* =========================================================
     VALIDATION AVEC ENTRÉE
  ========================================================= */

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

/* =========================================================
   RESTAURATION DU SCROLL
========================================================= */

function restoreScroll() {
  const scrollY = document.body.dataset.scrollY || "0";

  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.width = "";

  delete document.body.dataset.scrollY;

  window.scrollTo(0, Number(scrollY));
}
