import { loadStylesheet } from "./resourceLoader.js";

/* =========================================================
   CHARGEMENT DIFFÉRÉ DES SLIDERS SITES ET LOGICIELS
========================================================= */

function observeLazyShowcase(sectionSelector, initializerName) {
  const section = document.querySelector(sectionSelector);

  if (!section) {
    return;
  }

  let controller = null;
  let modulePromise = null;
  let isVisible = false;

  async function initializeShowcase() {
    if (controller) {
      return controller;
    }

    await loadStylesheet("./css/demo.css", "demo-showcase-styles");

    if (!modulePromise) {
      modulePromise = import("./demoShowcase.js");
    }

    const module = await modulePromise;
    const initializer = module[initializerName];

    if (typeof initializer !== "function") {
      return null;
    }

    controller = initializer();

    return controller;
  }

  const observer = new IntersectionObserver(
    async (entries) => {
      const entry = entries[0];

      isVisible = Boolean(
        entry?.isIntersecting && entry.intersectionRatio >= 0.08,
      );

      if (!isVisible) {
        controller?.stop?.();

        return;
      }

      const activeController = await initializeShowcase();

      if (isVisible && !document.hidden) {
        activeController?.start?.();
      }
    },
    {
      threshold: [0, 0.08, 0.25],
    },
  );

  observer.observe(section);

  document.addEventListener("visibilitychange", () => {
    if (!controller) {
      return;
    }

    if (document.hidden || !isVisible) {
      controller.stop?.();
    } else {
      controller.start?.();
    }
  });
}

/* =========================================================
   CHARGEMENT DIFFÉRÉ DU CARROUSEL D'ANIMATIONS
========================================================= */

function observeLazyAnimationCarousel() {
  const section = document.querySelector(".section__demo.animations");

  if (!section) {
    return;
  }

  let controller = null;
  let modulePromise = null;
  let isVisible = false;

  async function initializeCarousel() {
    if (controller) {
      return controller;
    }

    if (!modulePromise) {
      modulePromise = import("./demoCarousel.js");
    }

    const module = await modulePromise;

    controller = module.initializeAnimationCarousel();

    return controller;
  }

  const observer = new IntersectionObserver(
    async (entries) => {
      const entry = entries[0];

      isVisible = Boolean(entry?.isIntersecting);

      if (!isVisible) {
        controller?.stop?.();

        return;
      }

      const activeController = await initializeCarousel();

      if (isVisible && !document.hidden) {
        activeController?.start?.();
      }
    },
    {
      threshold: [0, 0.01, 0.25],
    },
  );

  observer.observe(section);

  document.addEventListener("visibilitychange", () => {
    if (!controller) {
      return;
    }

    if (document.hidden || !isVisible) {
      controller.stop?.();
    } else {
      controller.start?.();
    }
  });
}

observeLazyShowcase("#demos", "initializeWebsiteShowcase");
observeLazyShowcase("#software-demos", "initializeSoftwareShowcase");
observeLazyAnimationCarousel();
