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

  return initializeShowcase;
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

const initializeWebsiteDemos = observeLazyShowcase(
  "#demos",
  "initializeWebsiteShowcase",
);
observeLazyShowcase("#software-demos", "initializeSoftwareShowcase");
observeLazyAnimationCarousel();

/* =========================================================
   LIENS DIRECTS VERS LES DÉMONSTRATIONS (?demo=...)
========================================================= */

const WEBSITE_DEMO_KEYS = ["coiffure", "patisserie", "e-commerce"];

function isOpenedFromServicePage() {
  if (!document.referrer) {
    return false;
  }

  try {
    const referrer = new URL(document.referrer);

    return (
      referrer.origin === window.location.origin &&
      referrer.pathname.startsWith("/creation-site-internet-marseille")
    );
  } catch {
    return false;
  }
}

function returnToPreviousPageOnClose() {
  let wasOpen = false;

  const observer = new MutationObserver(() => {
    if (document.querySelector(".overlay")) {
      wasOpen = true;

      return;
    }

    if (!wasOpen) {
      return;
    }

    observer.disconnect();

    let attempts = 0;

    const goBack = () => {
      if (window.history.state?.portfolioOverlay && attempts < 12) {
        attempts += 1;
        window.setTimeout(goBack, 25);

        return;
      }

      window.history.go(window.history.state?.portfolioOverlay ? -2 : -1);
    };

    goBack();
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

async function openDemoFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const index = WEBSITE_DEMO_KEYS.indexOf(params.get("demo"));

  if (index === -1 || !initializeWebsiteDemos) {
    return;
  }

  const returnOnClose = isOpenedFromServicePage();

  window.history.replaceState(
    window.history.state,
    "",
    `${window.location.pathname}#demos`,
  );

  await new Promise((resolve) => {
    window.addEventListener("pageContentReady", resolve, { once: true });
  });

  await new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });

  const controller = await initializeWebsiteDemos();

  if (returnOnClose) {
    returnToPreviousPageOnClose();
  }

  controller?.openSlide?.(index);
}

openDemoFromUrl();
