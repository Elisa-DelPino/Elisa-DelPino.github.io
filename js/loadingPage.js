// loadingPage.js

import { addDecodeText } from "./animationHome.js";
import { loadHeaderScriptDirect } from "./header.js";
import { initAnimations } from "./animationProducts.js";
import { initContactAnimation } from "./animationContact.js";
import { initAboutAnimation } from "./animationAbout.js";

/* =====================================================
   ANIMATIONS THREE.JS DIFFÉRÉES
===================================================== */

function observeLazyThreeAnimation({
  selector,
  modulePath,
  initName,
  startName,
  stopName,
}) {
  const container = document.querySelector(selector);

  if (!container) {
    return;
  }

  let modulePromise = null;
  let animationModule = null;
  let initialized = false;
  let isVisible = false;

  async function getAnimationModule() {
    if (animationModule) {
      return animationModule;
    }

    if (!modulePromise) {
      modulePromise = import(modulePath);
    }

    animationModule = await modulePromise;

    return animationModule;
  }

  async function startAnimationIfNeeded() {
    const module = await getAnimationModule();

    if (!isVisible || document.hidden) {
      return;
    }

    if (!initialized) {
      const init = module[initName];

      if (typeof init !== "function") {
        return;
      }

      init();
      initialized = true;
    }

    module[startName]?.();
  }

  function stopAnimationIfLoaded() {
    animationModule?.[stopName]?.();
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];

      isVisible = Boolean(entry?.isIntersecting);

      if (!isVisible) {
        stopAnimationIfLoaded();

        return;
      }

      startAnimationIfNeeded();
    },
    {
      threshold: [0, 0.01, 0.15, 0.35, 0.6],
    },
  );

  observer.observe(container);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden || !isVisible) {
      stopAnimationIfLoaded();

      return;
    }

    startAnimationIfNeeded();
  });
}

/* =====================================================
   PROCÉDURE DIFFÉRÉE
===================================================== */

function observeLazyProcedure() {
  const section = document.getElementById("procedure");

  if (!section) {
    return;
  }

  let modulePromise = null;
  let initialized = false;

  async function initializeProcedure() {
    if (initialized) {
      return;
    }

    initialized = true;

    if (!modulePromise) {
      modulePromise = import("./procedure.js");
    }

    try {
      const module = await modulePromise;

      module.initProcedure?.();
    } catch (error) {
      initialized = false;

      console.error(
        "Impossible de charger l’animation de la procédure :",
        error,
      );
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];

      if (!entry?.isIntersecting) {
        return;
      }

      observer.disconnect();

      initializeProcedure();
    },
    {
      threshold: 0,
      rootMargin: "300px 0px",
    },
  );

  observer.observe(section);
}

/* =====================================================
   INITIALISATION DU CONTENU
===================================================== */

function initPageContent() {
  loadHeaderScriptDirect();

  showDiagonals();

  addDecodeText();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      initContactAnimation();

      initAboutAnimation();

      observeLazyThreeAnimation({
        selector: "#globe-container",
        modulePath: "./globe3d.js",
        initName: "initGlobe",
        startName: "startGlobe",
        stopName: "stopGlobe",
      });

      observeLazyThreeAnimation({
        selector: "#horloge-container",
        modulePath: "./horloge.js",
        initName: "initHorloge",
        startName: "startHorloge",
        stopName: "stopHorloge",
      });

      observeLazyThreeAnimation({
        selector: "#circuit-container",
        modulePath: "./circuit3d.js",
        initName: "initCircuit3D",
        startName: "startCircuit3D",
        stopName: "stopCircuit3D",
      });

      observeLazyProcedure();

      requestAnimationFrame(() => {
        initAnimations();

        window.dispatchEvent(new CustomEvent("pageContentReady"));
      });
    });
  });
}

/* =====================================================
   LANCEMENT DU SITE
===================================================== */

export function AddLoader() {
  initPageContent();
}

/* =====================================================
   ANIMATION DES DIAGONALES
===================================================== */

function showDiagonals() {
  const diagonals = [
    ...document.querySelectorAll(".section__home .diagonal"),
  ].reverse();

  diagonals.forEach((diagonal, index) => {
    setTimeout(() => {
      diagonal.classList.add("show");
    }, index * 1500);
  });
}
