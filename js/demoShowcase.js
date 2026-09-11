import { openLogicielStockDemo } from "./logicielStock.js";
import { addLigthBox } from "./demoLightbox.js";

const WEBSITE_SHOWCASE_AUTOPLAY_DELAY = 4200;
const SOFTWARE_SHOWCASE_AUTOPLAY_DELAY = 4200;
const SHOWCASE_OUT_DURATION = 220;
const SHOWCASE_IN_DURATION = 420;
const SHOWCASE_EASING = "cubic-bezier(.22,1,.36,1)";

const softwareDemoSources = [
  ...document.querySelectorAll(".software-demo-card"),
];

/* =========================================================
   CONTENU DU SLIDER SITES WEB
========================================================= */

const webDemoCardsData = [
  {
    title: "Coiffure",
    image: "./img/siteCoiffure.png",
    alt: "Démonstration d'un site web pour un salon de coiffure",
    features: [
      {
        name: "Prise de rdv",
        icon: "calendar",
      },
      {
        name: "Prestations",
        icon: "scissors",
      },
    ],
  },
  {
    title: "Pâtisserie",
    image: "./img/sitePatisserie.png",
    alt: "Démonstration d'un site web pour une pâtisserie",
    features: [
      {
        name: "Galerie",
        icon: "gallery",
      },
      {
        name: "Animation",
        icon: "animation",
      },
    ],
  },
  {
    title: "E-Commerce",
    image: "./img/siteDeco.png",
    alt: "Démonstration d'un site e-commerce de décoration",
    features: [
      {
        name: "Produits",
        icon: "gallery",
      },
      {
        name: "Panier",
        icon: "cart",
      },
    ],
  },
];

/* =========================================================
   CONTENU DES CARTES LOGICIELS
========================================================= */

const softwareDemoCardsData = [
  {
    key: "stock",
    title: "Gestion de stock",
    features: [
      {
        name: "Gestion produits",
        icon: "box",
      },
      {
        name: "Alertes de stock",
        icon: "alert",
      },
    ],
  },
  {
    key: "quotes",
    title: "Clients & devis",
    features: [
      {
        name: "Répertoire clients",
        icon: "users",
      },
      {
        name: "Devis instantanés",
        icon: "file",
      },
    ],
  },
];

/* =========================================================
   ICÔNES
========================================================= */

function getWebDemoFeatureIcon(icon) {
  if (icon === "calendar") {
    return `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="5"
          width="18"
          height="16"
          rx="2"
        ></rect>

        <path d="M16 3v4"></path>
        <path d="M8 3v4"></path>
        <path d="M3 10h18"></path>

        <path d="M8 14h.01"></path>
        <path d="M12 14h.01"></path>
        <path d="M16 14h.01"></path>

        <path d="M8 17h.01"></path>
        <path d="M12 17h.01"></path>
      </svg>
    `;
  }

  if (icon === "scissors") {
    return `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="6" cy="7" r="3"></circle>
        <circle cx="6" cy="17" r="3"></circle>
        <path d="m8.7 8.4 11.3 7.1"></path>
        <path d="M8.7 15.6 20 8.5"></path>
      </svg>
    `;
  }

  if (icon === "gallery") {
    return `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="16" rx="2"></rect>
        <circle cx="9" cy="9" r="1.5"></circle>
        <path d="m4 17 5-5 4 4 2-2 5 5"></path>
      </svg>
    `;
  }

  if (icon === "cart") {
    return `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path
          d="M3 4h2l2.3 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.5L21 7H6"
        ></path>

        <circle cx="10" cy="20" r="1"></circle>
        <circle cx="18" cy="20" r="1"></circle>
      </svg>
    `;
  }

  if (icon === "animation") {
    return `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M4 12h4"></path>
        <path d="M16 12h4"></path>
        <path d="M12 4v4"></path>
        <path d="M12 16v4"></path>
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M6.5 6.5l2.2 2.2"></path>
        <path d="M15.3 15.3l2.2 2.2"></path>
        <path d="M17.5 6.5l-2.2 2.2"></path>
        <path d="M8.7 15.3l-2.2 2.2"></path>
      </svg>
    `;
  }

  if (icon === "box") {
    return `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m21 8-9 5-9-5"></path>
        <path d="m3 8 9-5 9 5v8l-9 5-9-5Z"></path>
        <path d="M12 13v8"></path>
      </svg>
    `;
  }

  if (icon === "alert") {
    return `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3 2.8 20h18.4L12 3Z"></path>
        <path d="M12 9v5"></path>
        <path d="M12 17h.01"></path>
      </svg>
    `;
  }

  if (icon === "users") {
    return `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="9" cy="8" r="3"></circle>
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"></path>
        <path d="M16 5.5a3 3 0 0 1 0 5"></path>
        <path d="M17 14c2.4.5 4 2.6 4 5"></path>
      </svg>
    `;
  }

  if (icon === "file") {
    return `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M6 3h8l4 4v14H6Z"></path>
        <path d="M14 3v5h5"></path>
        <path d="M9 13h6"></path>
        <path d="M9 17h4"></path>
      </svg>
    `;
  }

  return "";
}

/* =========================================================
   SHOWCASES SITES WEB ET LOGICIELS
========================================================= */

const webDemoLightboxTrigger = document.createElement("div");

webDemoLightboxTrigger.classList.add("div-fakeWeb__demo");

function createShowcaseFeatures(features) {
  return features
    .map(
      (feature) => `
        <div class="websites-showcase__feature">
          <div class="shared-icon">
            ${getWebDemoFeatureIcon(feature.icon)}
          </div>

          <span class="websites-showcase__feature-label">
            ${feature.name}
          </span>
        </div>
      `,
    )
    .join("");
}

function createShowcaseMarkup(slides, ariaLabel) {
  const firstSlide = slides[0];

  if (!firstSlide) {
    return "";
  }

  return `
    <div class="websites-showcase__panel">
      <div class="websites-showcase__visual">
        <img
          class="websites-showcase__image"
          src="${firstSlide.image}"
          alt="${firstSlide.alt}"
        >

        <div
          class="websites-showcase__visual-overlay"
          aria-hidden="true"
        ></div>
      </div>

      <div class="websites-showcase__content">
        <h2 class="websites-showcase__title">
          ${firstSlide.title}
        </h2>

        <div
          class="websites-showcase__features-heading"
          aria-hidden="true"
        >
          <span></span>
          <p>FONCTIONNALITÉS</p>
          <span></span>
        </div>

        <div class="websites-showcase__features">
          ${createShowcaseFeatures(firstSlide.features)}
        </div>

        <button
          class="websites-showcase__button shared-button shared-button--arrow"
          type="button"
        >
          <span>TESTER LA DÉMO</span>

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
            <path d="M5 12h13"></path>
            <path d="m13 5 7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>

    <div
      class="websites-showcase__dots"
      role="tablist"
      aria-label="${ariaLabel}"
    >
      ${slides
        .map(
          (slide, index) => `
            <button
              class="websites-showcase__dot${index === 0 ? " is-active" : ""}"
              type="button"
              role="tab"
              aria-selected="${index === 0 ? "true" : "false"}"
              aria-label="Voir ${slide.title}"
              data-index="${index}"
            ></button>
          `,
        )
        .join("")}
    </div>
  `;
}

function updateShowcaseDots(dots, index) {
  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === index;

    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-selected", isActive ? "true" : "false");
  });
}

function preloadShowcaseImages(slides) {
  slides.forEach((slide) => {
    if (!slide?.image) {
      return;
    }

    const preloadImage = new Image();

    preloadImage.src = slide.image;
  });
}

function getCircularSlideDirection(currentIndex, targetIndex, total) {
  if (currentIndex === targetIndex || total <= 1) {
    return 1;
  }

  const forwardDistance = (targetIndex - currentIndex + total) % total;
  const backwardDistance = (currentIndex - targetIndex + total) % total;

  return forwardDistance <= backwardDistance ? 1 : -1;
}

function resetShowcaseTransitionStyles(visual, content) {
  [visual, content].forEach((element) => {
    element.style.transition = "";
    element.style.transform = "";
    element.style.opacity = "";
    element.style.willChange = "";
  });
}

function animateShowcaseTransition({
  visual,
  content,
  applySlideContent,
  direction,
}) {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion) {
    applySlideContent();
    resetShowcaseTransitionStyles(visual, content);

    return null;
  }

  const distance = window.innerWidth <= 650 ? 8 : 14;
  const exitDistance = -direction * distance;
  const enterDistance = direction * distance;

  visual.style.willChange = "transform,opacity";
  content.style.willChange = "transform,opacity";

  visual.style.transition = `transform ${SHOWCASE_OUT_DURATION}ms ease,opacity ${SHOWCASE_OUT_DURATION}ms ease`;
  content.style.transition = `transform ${SHOWCASE_OUT_DURATION}ms ease,opacity ${SHOWCASE_OUT_DURATION}ms ease`;

  visual.style.transform = `translate3d(${exitDistance}px,0,0)`;
  visual.style.opacity = "0";

  content.style.transform = `translate3d(${exitDistance}px,0,0)`;
  content.style.opacity = "0";

  return window.setTimeout(() => {
    applySlideContent();

    visual.style.transition = "none";
    content.style.transition = "none";

    visual.style.transform = `translate3d(${enterDistance}px,0,0)`;
    content.style.transform = `translate3d(${enterDistance}px,0,0)`;

    visual.style.opacity = "0";
    content.style.opacity = "0";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        visual.style.transition = `transform ${SHOWCASE_IN_DURATION}ms ${SHOWCASE_EASING},opacity ${SHOWCASE_IN_DURATION}ms ease`;
        content.style.transition = `transform ${SHOWCASE_IN_DURATION}ms ${SHOWCASE_EASING},opacity ${SHOWCASE_IN_DURATION}ms ease`;

        visual.style.transform = "translate3d(0,0,0)";
        visual.style.opacity = "1";

        content.style.transform = "translate3d(0,0,0)";
        content.style.opacity = "1";
      });
    });
  }, SHOWCASE_OUT_DURATION);
}

function initializeShowcase({ showcase, slides, autoplayDelay, onOpen }) {
  if (!showcase || !Array.isArray(slides) || slides.length === 0) {
    return;
  }

  showcase.className = "websites-showcase";
  showcase.innerHTML = createShowcaseMarkup(
    slides,
    "Choisir une démonstration",
  );

  const visual = showcase.querySelector(".websites-showcase__visual");
  const content = showcase.querySelector(".websites-showcase__content");
  const image = showcase.querySelector(".websites-showcase__image");
  const title = showcase.querySelector(".websites-showcase__title");
  const features = showcase.querySelector(".websites-showcase__features");
  const button = showcase.querySelector(".websites-showcase__button");
  const dots = [...showcase.querySelectorAll(".websites-showcase__dot")];

  if (
    !visual ||
    !content ||
    !image ||
    !title ||
    !features ||
    !button ||
    dots.length === 0
  ) {
    return;
  }

  let currentIndex = 0;
  let autoplayInterval = null;
  let transitionTimeout = null;

  preloadShowcaseImages(slides);

  function renderSlide(index, animate = true) {
    const slide = slides[index];

    if (!slide) {
      return;
    }

    clearTimeout(transitionTimeout);
    resetShowcaseTransitionStyles(visual, content);

    const direction = getCircularSlideDirection(
      currentIndex,
      index,
      slides.length,
    );

    const applySlideContent = () => {
      image.src = slide.image;
      image.alt = slide.alt;
      title.textContent = slide.title;
      features.innerHTML = createShowcaseFeatures(slide.features);

      updateShowcaseDots(dots, index);

      currentIndex = index;
    };

    if (!animate) {
      applySlideContent();
      resetShowcaseTransitionStyles(visual, content);

      return;
    }

    transitionTimeout = animateShowcaseTransition({
      visual,
      content,
      applySlideContent,
      direction,
    });
  }

  function goToSlide(index, animate = true) {
    const normalizedIndex = (index + slides.length) % slides.length;

    if (normalizedIndex === currentIndex && animate) {
      return;
    }

    renderSlide(normalizedIndex, animate);
  }

  function stopAutoSlide() {
    if (autoplayInterval !== null) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  function startAutoSlide() {
    stopAutoSlide();

    if (slides.length <= 1) {
      return;
    }

    autoplayInterval = window.setInterval(() => {
      goToSlide(currentIndex + 1);
    }, autoplayDelay);
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.index);

      if (!Number.isFinite(index)) {
        return;
      }

      goToSlide(index);
      startAutoSlide();
    });
  });

  button.addEventListener("click", () => {
    onOpen?.(currentIndex, slides[currentIndex]);
  });

  renderSlide(0, false);
  startAutoSlide();
}

function prepareSoftwareShowcaseData() {
  softwareDemoSources.forEach((item, index) => {
    const data = softwareDemoCardsData[index];

    if (!data) {
      return;
    }

    const currentImage = item.querySelector("img");

    data.image = currentImage?.getAttribute("src") || "";
    data.alt =
      currentImage?.getAttribute("alt") ||
      `Démonstration du logiciel ${data.title}`;
  });
}

export function initializeUnifiedShowcases() {
  const websiteShowcase = document.querySelector("#demos .websites-showcase");

  const softwareShowcase = document.querySelector(
    ".section__demo--softwares .demo-softwares__grid",
  );

  prepareSoftwareShowcaseData();

  initializeShowcase({
    showcase: websiteShowcase,
    slides: webDemoCardsData,
    autoplayDelay: WEBSITE_SHOWCASE_AUTOPLAY_DELAY,
    onOpen: (index) => {
      addLigthBox(webDemoLightboxTrigger, index);
    },
  });

  initializeShowcase({
    showcase: softwareShowcase,
    slides: softwareDemoCardsData,
    autoplayDelay: SOFTWARE_SHOWCASE_AUTOPLAY_DELAY,
    onOpen: (index, slide) => {
      if (!slide) {
        return;
      }

      openSoftwareDemo(slide.key);
    },
  });
}

/* =========================================================
   OUVERTURE DES DÉMOS LOGICIELS
========================================================= */

function openSoftwareDemo(software) {
  if (!software) {
    return;
  }

  if (software === "stock") {
    openLogicielStockDemo();

    return;
  }

  if (
    software === "quotes" &&
    typeof window.openLogicielDevisDemo === "function"
  ) {
    window.openLogicielDevisDemo();

    return;
  }

  console.info("La démonstration Clients & devis sera ajoutée prochainement.");
}
