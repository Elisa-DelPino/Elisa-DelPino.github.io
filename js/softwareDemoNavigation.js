// softwareDemoNavigation.js

import { loadStylesheet } from "./resourceLoader.js";

const SOFTWARE_DEMOS = [
  {
    key: "stock",
    title: "Gestion de stock",
    stylesheet: "./css/logicielStock.css",
    stylesheetId: "logiciel-stock-styles",
    module: "./logicielStock.js",
    openFunction: "openLogicielStockDemo",
  },
  {
    key: "quotes",
    title: "Clients & devis",
    stylesheet: "./css/logicielDevis.css",
    stylesheetId: "logiciel-devis-styles",
    module: "./logicielDevis.js",
    openFunction: "openLogicielDevisDemo",
  },
];

const SWIPE_MIN_DISTANCE = 50;
const SWIPE_DIRECTION_RATIO = 1.15;

let navigationInProgress = false;

loadStylesheet(
  "./css/softwareDemoNavigation.css",
  "software-demo-navigation-styles",
).catch(() => {});

/* =====================================================
   OUTILS
===================================================== */

function getDemoIndex(key) {
  return SOFTWARE_DEMOS.findIndex((demo) => demo.key === key);
}

function getTargetDemo(currentSoftware, direction) {
  const currentIndex = getDemoIndex(currentSoftware);

  if (currentIndex === -1 || SOFTWARE_DEMOS.length < 2) {
    return null;
  }

  const targetIndex =
    (currentIndex + direction + SOFTWARE_DEMOS.length) % SOFTWARE_DEMOS.length;

  return SOFTWARE_DEMOS[targetIndex] ?? null;
}

function createArrowButton(currentSoftware, direction) {
  const targetDemo = getTargetDemo(currentSoftware, direction);

  if (!targetDemo) {
    return null;
  }

  const button = document.createElement("button");
  const side = direction < 0 ? "left" : "right";
  const symbol = direction < 0 ? "‹" : "›";

  button.type = "button";
  button.className = `software-demo-navigation__arrow software-demo-navigation__arrow--${side}`;
  button.dataset.softwareDemoDirection = String(direction);
  button.setAttribute(
    "aria-label",
    `${direction < 0 ? "Voir le logiciel précédent" : "Voir le logiciel suivant"} : ${targetDemo.title}`,
  );
  button.innerHTML = `<span aria-hidden="true">${symbol}</span>`;

  return button;
}

/* =====================================================
   NAVIGATION ENTRE LES LOGICIELS
===================================================== */

async function navigateSoftwareDemo(
  currentSoftware,
  direction,
  closeCurrentDemo,
  getReturnFocusElement,
) {
  if (navigationInProgress) {
    return;
  }

  const targetDemo = getTargetDemo(currentSoftware, direction);

  if (!targetDemo) {
    return;
  }

  navigationInProgress = true;

  try {
    const returnFocusElement = getReturnFocusElement?.() ?? null;

    const [, module] = await Promise.all([
      loadStylesheet(targetDemo.stylesheet, targetDemo.stylesheetId),
      import(targetDemo.module),
    ]);

    const openTargetDemo = module[targetDemo.openFunction];

    if (typeof openTargetDemo !== "function") {
      return;
    }

    closeCurrentDemo(true, false);
    openTargetDemo(returnFocusElement);
  } finally {
    navigationInProgress = false;
  }
}

/* =====================================================
   FLÈCHES
===================================================== */

function addNavigationArrows(
  container,
  currentSoftware,
  closeCurrentDemo,
  getReturnFocusElement,
) {
  if (!container || container.querySelector("[data-software-demo-direction]")) {
    return;
  }

  const previousButton = createArrowButton(currentSoftware, -1);
  const nextButton = createArrowButton(currentSoftware, 1);

  [previousButton, nextButton].forEach((button) => {
    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      navigateSoftwareDemo(
        currentSoftware,
        Number(button.dataset.softwareDemoDirection),
        closeCurrentDemo,
        getReturnFocusElement,
      );
    });

    container.appendChild(button);
  });
}

/* =====================================================
   SWIPE MOBILE
===================================================== */

function addMobileSwipe(
  mobilePreview,
  currentSoftware,
  closeCurrentDemo,
  getReturnFocusElement,
) {
  if (!mobilePreview || mobilePreview.dataset.softwareSwipeReady === "true") {
    return;
  }

  let touchStartX = null;
  let touchStartY = null;
  let swipeBlocked = false;

  const resetSwipe = () => {
    touchStartX = null;
    touchStartY = null;
    swipeBlocked = false;
  };

  mobilePreview.addEventListener(
    "touchstart",
    (event) => {
      if (event.touches.length !== 1) {
        resetSwipe();
        return;
      }

      swipeBlocked = Boolean(
        event.target.closest(
          "button,a,input,textarea,select,[contenteditable='true']",
        ),
      );

      if (swipeBlocked) {
        return;
      }

      const touch = event.touches[0];

      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    },
    { passive: true },
  );

  mobilePreview.addEventListener(
    "touchend",
    (event) => {
      if (
        swipeBlocked ||
        touchStartX === null ||
        touchStartY === null ||
        event.changedTouches.length !== 1
      ) {
        resetSwipe();
        return;
      }

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      const horizontalDistance = Math.abs(deltaX);
      const verticalDistance = Math.abs(deltaY);

      resetSwipe();

      if (
        horizontalDistance < SWIPE_MIN_DISTANCE ||
        horizontalDistance < verticalDistance * SWIPE_DIRECTION_RATIO
      ) {
        return;
      }

      navigateSoftwareDemo(
        currentSoftware,
        deltaX < 0 ? 1 : -1,
        closeCurrentDemo,
        getReturnFocusElement,
      );
    },
    { passive: true },
  );

  mobilePreview.addEventListener("touchcancel", resetSwipe, { passive: true });

  mobilePreview.dataset.softwareSwipeReady = "true";
}

/* =====================================================
   INITIALISATION
===================================================== */

export function setupSoftwareDemoNavigation({
  currentSoftware,
  desktopOverlay,
  mobileOverlay,
  mobilePreview,
  closeCurrentDemo,
  getReturnFocusElement,
}) {
  if (typeof closeCurrentDemo !== "function") {
    return;
  }

  addNavigationArrows(
    desktopOverlay,
    currentSoftware,
    closeCurrentDemo,
    getReturnFocusElement,
  );

  addNavigationArrows(
    mobileOverlay,
    currentSoftware,
    closeCurrentDemo,
    getReturnFocusElement,
  );

  addMobileSwipe(
    mobilePreview,
    currentSoftware,
    closeCurrentDemo,
    getReturnFocusElement,
  );
}
