import { getDataAnim } from "./dataDemo.js";
import {
  cleanupVideosInside,
  initializeVideoVisibilityHandling,
  isCarouselSliding,
  pauseAllCarouselVideos,
  registerCarouselVideo,
  restartVisibleCarouselVideosFromStart,
  setCarouselSliding,
  setCarouselVideoPlaybackEnabled,
  updateVisibleCarouselVideos,
} from "./demoVideos.js";

let resizeTimeout = null;
const carouselAnimationIntervals = new Set();

const track = document.getElementById("demoTrack");

/* =========================================================
   HOVER
========================================================= */

function hoverFakeWeb(elements) {
  elements.forEach((element) => {
    if (element.dataset.hoverBound === "true") {
      return;
    }

    element.dataset.hoverBound = "true";

    element.addEventListener("mouseenter", () => {
      const group = element.classList.contains("demo-carousel__item")
        ? document.querySelectorAll("#demoTrack .demo-carousel__item")
        : elements;

      group.forEach((item) => {
        item.classList.remove("big", "little");

        if (item === element) {
          item.classList.add("big");
        } else {
          item.classList.add("little");
        }
      });
    });

    element.addEventListener("mouseleave", () => {
      const group = element.classList.contains("demo-carousel__item")
        ? document.querySelectorAll("#demoTrack .demo-carousel__item")
        : elements;

      group.forEach((item) => {
        item.classList.remove("big", "little");
      });
    });
  });
}

/* =========================================================
   INTERACTIONS DE CLIC
========================================================= */

function bindClickInteractions(elements) {
  hoverFakeWeb(elements);

  elements.forEach((item) => {
    if (item.dataset.clickBound === "true") {
      return;
    }

    item.dataset.clickBound = "true";

    item.addEventListener("click", async () => {
      const realIndex = Number(item.dataset.index);

      if (!Number.isFinite(realIndex)) {
        return;
      }

      const { addLigthBox } = await import("./demoLightbox.js");

      await addLigthBox(item, realIndex);
    });
  });
}

/* =========================================================
   DONNÉES DU CARROUSEL
========================================================= */

const items = getDataAnim().map((item, index) => ({
  ...item,
  originalIndex: index,
}));

const ANIMATION_CAROUSEL_PAGE_SIZE = 3;
const ANIMATION_CAROUSEL_AUTOPLAY_DELAY = 8000;
const ANIMATION_CAROUSEL_TRANSITION_DURATION = 650;
const ANIMATION_CAROUSEL_EASING = "cubic-bezier(.22,1,.36,1)";

function buildAnimationPages(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  const pageCount = Math.ceil(data.length / ANIMATION_CAROUSEL_PAGE_SIZE);
  const pages = [];

  for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
    const page = [];

    for (let offset = 0; offset < ANIMATION_CAROUSEL_PAGE_SIZE; offset++) {
      const itemIndex =
        (pageIndex * ANIMATION_CAROUSEL_PAGE_SIZE + offset) % data.length;

      page.push(data[itemIndex]);
    }

    pages.push(page);
  }

  return pages;
}

const animationPages = buildAnimationPages(items);

let animationCarouselPageIndex = 0;
let animationCarouselAutoInterval = null;
let animationCarouselActive = false;

/* =========================================================
   INTERVALLES DES APERÇUS
========================================================= */

function clearCarouselAnimationIntervals() {
  carouselAnimationIntervals.forEach((intervalId) => {
    clearInterval(intervalId);
  });

  carouselAnimationIntervals.clear();
}

function cleanupAnimationIntervalsInside(page) {
  if (!page) {
    return;
  }

  const intervalIds = page._carouselIntervalIds;

  if (!Array.isArray(intervalIds)) {
    return;
  }

  intervalIds.forEach((intervalId) => {
    clearInterval(intervalId);

    carouselAnimationIntervals.delete(intervalId);
  });

  page._carouselIntervalIds = [];
}

/* =========================================================
   CRÉATION D'UNE CARTE
========================================================= */

function createAnimationCardElement(item, pageElement) {
  const itemDiv = document.createElement("article");

  itemDiv.className = "demo-carousel__item demo-animation-card";
  itemDiv.dataset.index = String(item.originalIndex);
  itemDiv.tabIndex = 0;

  itemDiv.setAttribute("aria-label", "Voir cette animation interactive");

  const mediaContainer = document.createElement("div");

  mediaContainer.className = "demo-animation-card__media";

  const shine = document.createElement("span");

  shine.className = "demo-animation-card__shine";
  shine.setAttribute("aria-hidden", "true");

  mediaContainer.appendChild(shine);

  if (item.video) {
    const video = document.createElement("video");

    video.className = "demo-carousel__video";
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = false;
    video.preload = "none";
    video.controls = false;

    video.setAttribute("muted", "");
    video.setAttribute("loop", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("preload", "none");
    video.setAttribute("aria-hidden", "true");
    video.setAttribute("tabindex", "-1");

    video.disablePictureInPicture = true;

    mediaContainer.insertBefore(video, shine);

    registerCarouselVideo(video, item.video);
  } else if (typeof item.anim === "function") {
    let previewText = null;

    function createFreshPreview() {
      const previousPreview = mediaContainer.querySelector(
        ".demo-carousel__previewText",
      );

      if (previousPreview) {
        previousPreview.remove();
      }

      previewText = document.createElement("h2");

      previewText.className = "demo-carousel__previewText";
      previewText.textContent =
        item.previewText || item.textContent || "ANIMATION";

      previewText.style.color =
        item.previewColor || "rgba(255, 255, 255, 0.85)";

      mediaContainer.insertBefore(previewText, shine);
    }

    function launchPreviewAnimation() {
      createFreshPreview();

      item.anim(previewText);
    }

    launchPreviewAnimation();

    const intervalId = window.setInterval(() => {
      if (
        !animationCarouselActive ||
        document.hidden ||
        document.querySelector(".overlay") ||
        isCarouselSliding()
      ) {
        return;
      }

      const rect = itemDiv.getBoundingClientRect();

      const isVisible =
        rect.bottom > 0 &&
        rect.top < window.innerHeight &&
        rect.right > 0 &&
        rect.left < window.innerWidth;

      if (isVisible) {
        launchPreviewAnimation();
      }
    }, 5000);

    carouselAnimationIntervals.add(intervalId);

    pageElement._carouselIntervalIds.push(intervalId);
  } else {
    mediaContainer.style.background = item.img || "#050609";
  }

  const actionButton = document.createElement("button");

  actionButton.className =
    "demo-animation-card__button shared-button shared-button--arrow";

  actionButton.type = "button";

  actionButton.setAttribute("aria-label", "Ouvrir cette animation");

  actionButton.innerHTML = `
      <span>
        VOIR L'ANIMATION
      </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path
          d="M5 12h13"
        ></path>

        <path
          d="m13 5 7 7-7 7"
        ></path>
      </svg>
    `;

  itemDiv.appendChild(mediaContainer);
  itemDiv.appendChild(actionButton);

  return itemDiv;
}

/* =========================================================
   CRÉATION D'UNE PAGE DE TROIS ANIMATIONS
========================================================= */

function createAnimationPageElement(pageData) {
  const pageDiv = document.createElement("div");

  pageDiv.className = "demo-carousel__page";
  pageDiv._carouselIntervalIds = [];

  pageData.forEach((item) => {
    const itemDiv = createAnimationCardElement(item, pageDiv);

    pageDiv.appendChild(itemDiv);
  });

  bindClickInteractions(pageDiv.querySelectorAll(".demo-carousel__item"));

  return pageDiv;
}

/* =========================================================
   NETTOYAGE D'UNE PAGE
========================================================= */

function cleanupAnimationPage(page) {
  if (!page) {
    return;
  }

  cleanupAnimationIntervalsInside(page);
  cleanupVideosInside(page);

  page.remove();
}

/* =========================================================
   POINTS DU CARROUSEL
========================================================= */

function getAnimationCarouselSection() {
  return track?.closest(".section__demo.animations") || null;
}

function updateAnimationCarouselDots() {
  const section = getAnimationCarouselSection();

  if (!section) {
    return;
  }

  const dots = section.querySelectorAll(".demo-carousel__dot");

  dots.forEach((dot, index) => {
    const isActive = index === animationCarouselPageIndex;

    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

function createAnimationCarouselDots() {
  const section = getAnimationCarouselSection();

  if (!section) {
    return;
  }

  section.querySelector(".demo-carousel__dots")?.remove();

  if (animationPages.length <= 1) {
    return;
  }

  const dotsContainer = document.createElement("div");

  dotsContainer.className = "demo-carousel__dots";

  dotsContainer.setAttribute("aria-label", "Navigation des animations");

  animationPages.forEach((page, index) => {
    const dot = document.createElement("button");

    dot.className = "demo-carousel__dot";
    dot.type = "button";
    dot.dataset.pageIndex = String(index);

    dot.setAttribute(
      "aria-label",
      `Afficher les animations ${index * 3 + 1} à ${index * 3 + 3}`,
    );

    dot.addEventListener("click", () => {
      goToAnimationPage(index);

      restartAnimationCarouselAutoSlide();
    });

    dotsContainer.appendChild(dot);
  });

  const viewport = track?.closest(".demo-carousel__viewport");

  if (viewport) {
    viewport.insertAdjacentElement("afterend", dotsContainer);
  } else {
    section.appendChild(dotsContainer);
  }

  updateAnimationCarouselDots();
}

/* =========================================================
   DÉFILEMENT AUTOMATIQUE
========================================================= */

function stopAnimationCarouselAutoSlide() {
  if (animationCarouselAutoInterval !== null) {
    clearInterval(animationCarouselAutoInterval);

    animationCarouselAutoInterval = null;
  }
}

function startAnimationCarouselAutoSlide() {
  stopAnimationCarouselAutoSlide();

  if (!animationCarouselActive || animationPages.length <= 1) {
    return;
  }

  animationCarouselAutoInterval = window.setInterval(() => {
    if (
      document.hidden ||
      document.querySelector(".overlay") ||
      isCarouselSliding()
    ) {
      return;
    }

    slideNext(false);
  }, ANIMATION_CAROUSEL_AUTOPLAY_DELAY);
}

function restartAnimationCarouselAutoSlide() {
  startAnimationCarouselAutoSlide();
}

/* =========================================================
   INITIALISATION DU CARROUSEL
========================================================= */

function initCarousel() {
  if (!track || animationPages.length === 0) {
    return;
  }

  setCarouselSliding(false);

  stopAnimationCarouselAutoSlide();
  clearCarouselAnimationIntervals();
  cleanupVideosInside(track);

  track.innerHTML = "";

  animationCarouselPageIndex =
    ((animationCarouselPageIndex % animationPages.length) +
      animationPages.length) %
    animationPages.length;

  const pageElement = createAnimationPageElement(
    animationPages[animationCarouselPageIndex],
  );

  track.appendChild(pageElement);

  track.style.transition = "none";
  track.style.transform = "translateX(0)";

  createAnimationCarouselDots();
}

/* =========================================================
   CHANGEMENT DE PAGE
========================================================= */

function slideToAnimationPage(targetIndex, direction = 1) {
  if (!track || isCarouselSliding() || animationPages.length <= 1) {
    return;
  }

  const normalizedIndex =
    ((targetIndex % animationPages.length) + animationPages.length) %
    animationPages.length;

  if (normalizedIndex === animationCarouselPageIndex) {
    return;
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  setCarouselSliding(true);
  pauseAllCarouselVideos();

  const currentPage = track.firstElementChild;
  const newPage = createAnimationPageElement(animationPages[normalizedIndex]);

  if (reducedMotion) {
    cleanupAnimationPage(currentPage);

    track.appendChild(newPage);
    track.style.transition = "none";
    track.style.transform = "translate3d(0,0,0)";

    animationCarouselPageIndex = normalizedIndex;

    setCarouselSliding(false);

    updateAnimationCarouselDots();

    requestAnimationFrame(() => {
      restartVisibleCarouselVideosFromStart();
    });

    return;
  }

  let slideFinished = false;
  let fallbackTimeout = null;

  function finishSlide() {
    if (slideFinished) {
      return;
    }

    slideFinished = true;

    if (fallbackTimeout !== null) {
      clearTimeout(fallbackTimeout);
    }

    track.removeEventListener("transitionend", handleTransitionEnd);

    cleanupAnimationPage(currentPage);

    track.style.transition = "none";
    track.style.transform = "translate3d(0,0,0)";

    animationCarouselPageIndex = normalizedIndex;

    setCarouselSliding(false);

    updateAnimationCarouselDots();

    requestAnimationFrame(() => {
      restartVisibleCarouselVideosFromStart();
    });
  }

  function handleTransitionEnd(event) {
    if (event.target !== track || event.propertyName !== "transform") {
      return;
    }

    finishSlide();
  }

  track.addEventListener("transitionend", handleTransitionEnd);

  fallbackTimeout = window.setTimeout(
    finishSlide,
    ANIMATION_CAROUSEL_TRANSITION_DURATION + 180,
  );

  if (direction >= 0) {
    track.appendChild(newPage);

    track.style.transition = "none";
    track.style.transform = "translate3d(0,0,0)";

    void track.offsetWidth;

    track.style.transition = `transform ${ANIMATION_CAROUSEL_TRANSITION_DURATION}ms ${ANIMATION_CAROUSEL_EASING}`;

    requestAnimationFrame(() => {
      track.style.transform = "translate3d(-100%,0,0)";
    });

    return;
  }

  track.prepend(newPage);

  track.style.transition = "none";
  track.style.transform = "translate3d(-100%,0,0)";

  void track.offsetWidth;

  track.style.transition = `transform ${ANIMATION_CAROUSEL_TRANSITION_DURATION}ms ${ANIMATION_CAROUSEL_EASING}`;

  requestAnimationFrame(() => {
    track.style.transform = "translate3d(0,0,0)";
  });
}

/* =========================================================
   SLIDE SUIVANT
========================================================= */

function slideNext(restartAuto = true) {
  if (animationPages.length <= 1) {
    return;
  }

  slideToAnimationPage(animationCarouselPageIndex + 1, 1);

  if (restartAuto) {
    restartAnimationCarouselAutoSlide();
  }
}

/* =========================================================
   SLIDE PRÉCÉDENT
========================================================= */

function slidePrev(restartAuto = true) {
  if (animationPages.length <= 1) {
    return;
  }

  slideToAnimationPage(animationCarouselPageIndex - 1, -1);

  if (restartAuto) {
    restartAnimationCarouselAutoSlide();
  }
}

/* =========================================================
   ACCÈS DIRECT À UNE PAGE
========================================================= */

function goToAnimationPage(pageIndex) {
  if (
    !Number.isFinite(pageIndex) ||
    animationPages.length <= 1 ||
    pageIndex === animationCarouselPageIndex
  ) {
    return;
  }

  const forwardDistance =
    (pageIndex - animationCarouselPageIndex + animationPages.length) %
    animationPages.length;

  const backwardDistance =
    (animationCarouselPageIndex - pageIndex + animationPages.length) %
    animationPages.length;

  const direction = forwardDistance <= backwardDistance ? 1 : -1;

  slideToAnimationPage(pageIndex, direction);
}

/* =========================================================
   CONTRÔLE DU CARROUSEL
========================================================= */

function startAnimationCarousel() {
  if (animationCarouselActive) {
    return;
  }

  animationCarouselActive = true;

  setCarouselVideoPlaybackEnabled(true);
  startAnimationCarouselAutoSlide();

  requestAnimationFrame(() => {
    updateVisibleCarouselVideos();
  });
}

function stopAnimationCarousel() {
  if (!animationCarouselActive) {
    return;
  }

  animationCarouselActive = false;

  stopAnimationCarouselAutoSlide();
  setCarouselVideoPlaybackEnabled(false);
  pauseAllCarouselVideos();
}

/* =========================================================
   INITIALISATION
========================================================= */

let animationCarouselInitialized = false;
let animationCarouselController = null;

export function initializeAnimationCarousel() {
  if (animationCarouselController) {
    return animationCarouselController;
  }

  if (!track || animationPages.length === 0) {
    return null;
  }

  if (!animationCarouselInitialized) {
    animationCarouselInitialized = true;

    initializeVideoVisibilityHandling();

    const previousButton = document.getElementById("prevBtn");
    const nextButton = document.getElementById("nextBtn");

    previousButton?.addEventListener("click", () => {
      slidePrev(false);

      if (animationCarouselActive) {
        restartAnimationCarouselAutoSlide();
      }
    });

    nextButton?.addEventListener("click", () => {
      slideNext(false);

      if (animationCarouselActive) {
        restartAnimationCarouselAutoSlide();
      }
    });

    window.addEventListener(
      "resize",
      () => {
        clearTimeout(resizeTimeout);

        resizeTimeout = window.setTimeout(() => {
          updateVisibleCarouselVideos();
        }, 200);
      },
      {
        passive: true,
      },
    );

    initCarousel();
  }

  animationCarouselController = {
    start: startAnimationCarousel,
    stop: stopAnimationCarousel,
  };

  return animationCarouselController;
}
