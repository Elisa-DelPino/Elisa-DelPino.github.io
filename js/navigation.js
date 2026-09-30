// navigation.js

const REDUCED_MOTION_QUERY = window.matchMedia(
  "(prefers-reduced-motion:reduce)",
);

const MAIN_PAGE_PATH = "./index.html";

const TRACKED_SECTIONS = ["demos", "services", "about", "contact"];

let activeLinkAnimationFrameId = null;
let sectionTrackingInitialized = false;

let backToTopButton = null;

const initializedNavigationLinks = new WeakSet();

/* ---------------------------------------------------------------------------
   RÉCUPÉRATION DU HEADER
--------------------------------------------------------------------------- */

function getHeaderElement() {
  return document.querySelector(".header");
}

/* ---------------------------------------------------------------------------
   RÉCUPÉRATION DES SECTIONS
--------------------------------------------------------------------------- */

export function getSectionElement(sectionName) {
  if (!sectionName) {
    return null;
  }

  return document.getElementById(sectionName);
}

export function getSectionNavigationTarget(sectionName) {
  const section = getSectionElement(sectionName);

  if (!section) {
    return null;
  }

  const wrapper = section.closest(".section-with-title");

  if (wrapper) {
    const wrapperTitle = wrapper.querySelector(".section-title");

    if (wrapperTitle) {
      return wrapperTitle;
    }

    return wrapper;
  }

  const sectionTitle = section.querySelector(".section-title");

  if (sectionTitle) {
    return sectionTitle;
  }

  return section;
}

/* ---------------------------------------------------------------------------
   PAGE PRINCIPALE
--------------------------------------------------------------------------- */

export function isMainPage() {
  return Boolean(getSectionElement("home"));
}

function getMainPageSectionUrl(sectionName) {
  if (!sectionName || sectionName === "home") {
    return MAIN_PAGE_PATH;
  }

  return `${MAIN_PAGE_PATH}#${encodeURIComponent(sectionName)}`;
}

/* ---------------------------------------------------------------------------
   POSITION DES SECTIONS
--------------------------------------------------------------------------- */

export function getSectionTargetPosition(sectionName) {
  if (!sectionName) {
    return null;
  }

  if (sectionName === "home") {
    if (!isMainPage()) {
      return null;
    }

    return 0;
  }

  const target = getSectionNavigationTarget(sectionName);

  if (!target) {
    return null;
  }

  const header = getHeaderElement();

  const headerHeight = header ? header.getBoundingClientRect().height : 0;

  const targetPosition =
    target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

  return Math.max(0, Math.round(targetPosition));
}

/* ---------------------------------------------------------------------------
   LIEN ACTIF DU HEADER
--------------------------------------------------------------------------- */

export function setActiveSection(sectionName) {
  if (!sectionName) {
    return;
  }

  const menuLinks = [
    ...document.querySelectorAll(".header__nav__menu__link a[data-section]"),
  ];

  menuLinks.forEach((link) => {
    const isActive = link.dataset.section === sectionName;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

/* ---------------------------------------------------------------------------
   BOUTON RETOUR EN HAUT
--------------------------------------------------------------------------- */

function createBackToTopButton() {
  if (!isMainPage()) {
    return;
  }

  const existingButton = document.querySelector(".back-to-top");

  if (existingButton) {
    backToTopButton = existingButton;

    return;
  }

  backToTopButton = document.createElement("button");

  backToTopButton.type = "button";
  backToTopButton.className = "back-to-top";
  backToTopButton.setAttribute("aria-label", "Retourner en haut de la page");
  backToTopButton.setAttribute("aria-hidden", "true");
  backToTopButton.tabIndex = -1;

  backToTopButton.innerHTML = `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m6 15 6-6 6 6"></path>
    </svg>
  `;

  backToTopButton.addEventListener("click", () => {
    navigateToSection("home");
  });

  document.body.appendChild(backToTopButton);
}

function updateBackToTopVisibility() {
  if (!backToTopButton || !isMainPage()) {
    return;
  }

  const demosPosition = getSectionTargetPosition("demos");

  if (demosPosition === null) {
    return;
  }

  const isVisible = window.scrollY >= demosPosition;

  backToTopButton.classList.toggle("is-visible", isVisible);
  backToTopButton.setAttribute("aria-hidden", String(!isVisible));
  backToTopButton.tabIndex = isVisible ? 0 : -1;
}

/* ---------------------------------------------------------------------------
   ANNULATION DU SCROLL
--------------------------------------------------------------------------- */

export function cancelNavigationScroll() {
  window.scrollTo({
    top: window.scrollY,
    left: 0,
    behavior: "auto",
  });
}

/* ---------------------------------------------------------------------------
   SCROLL VERS UNE SECTION
--------------------------------------------------------------------------- */

export function scrollToSection(sectionName) {
  const targetPosition = getSectionTargetPosition(sectionName);

  if (targetPosition === null) {
    return false;
  }

  setActiveSection(sectionName);

  window.scrollTo({
    top: targetPosition,
    left: 0,
    behavior: REDUCED_MOTION_QUERY.matches ? "auto" : "smooth",
  });

  return true;
}

/* ---------------------------------------------------------------------------
   NAVIGATION VERS UNE SECTION
--------------------------------------------------------------------------- */

export function navigateToSection(sectionName) {
  if (!sectionName) {
    return;
  }

  const targetPosition = getSectionTargetPosition(sectionName);

  if (targetPosition !== null) {
    scrollToSection(sectionName);

    return;
  }

  window.location.href = getMainPageSectionUrl(sectionName);
}

/* ---------------------------------------------------------------------------
   CLIC SUR UN LIEN DE NAVIGATION
--------------------------------------------------------------------------- */

function handleNavigationClick(event) {
  const link = event.currentTarget;
  const sectionName = link.dataset.section;

  if (!sectionName) {
    return;
  }

  event.preventDefault();

  navigateToSection(sectionName);
}

/* ---------------------------------------------------------------------------
   INITIALISATION DES LIENS
--------------------------------------------------------------------------- */

export function initSectionNavigation(root = document) {
  const links = [...root.querySelectorAll("a[data-section]")];

  links.forEach((link) => {
    if (initializedNavigationLinks.has(link)) {
      return;
    }

    link.addEventListener("click", handleNavigationClick);

    initializedNavigationLinks.add(link);
  });
}

/* ---------------------------------------------------------------------------
   SECTIONS SUIVIES
--------------------------------------------------------------------------- */

function getSectionConfiguration() {
  return TRACKED_SECTIONS.map((sectionName) => {
    return {
      name: sectionName,
      element: getSectionNavigationTarget(sectionName),
    };
  }).filter((section) => section.element);
}

/* ---------------------------------------------------------------------------
   DÉTECTION DE LA SECTION ACTIVE
--------------------------------------------------------------------------- */

export function updateActiveSectionOnScroll() {
  if (!isMainPage()) {
    return;
  }

  const sectionConfiguration = getSectionConfiguration();

  const scrollPosition = window.scrollY;

  const header = getHeaderElement();

  const headerHeight = header ? header.offsetHeight : 0;

  const activationLine = headerHeight + Math.min(80, window.innerHeight * 0.08);

  if (scrollPosition <= 10 || sectionConfiguration.length === 0) {
    setActiveSection("home");

    return;
  }

  const orderedSections = sectionConfiguration
    .map((section) => {
      return {
        ...section,
        visualTop: section.element.getBoundingClientRect().top,
      };
    })
    .sort((sectionA, sectionB) => {
      return sectionA.visualTop - sectionB.visualTop;
    });

  let detectedSection = "home";

  for (const section of orderedSections) {
    if (section.visualTop <= activationLine) {
      detectedSection = section.name;
    } else {
      break;
    }
  }

  const pageBottomReached =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2;

  if (pageBottomReached && orderedSections.length > 0) {
    detectedSection = orderedSections[orderedSections.length - 1].name;
  }

  setActiveSection(detectedSection);
}

/* ---------------------------------------------------------------------------
   MISE À JOUR DU LIEN ACTIF
--------------------------------------------------------------------------- */

export function requestActiveSectionUpdate() {
  if (activeLinkAnimationFrameId !== null) {
    return;
  }

  activeLinkAnimationFrameId = requestAnimationFrame(() => {
    updateActiveSectionOnScroll();
    updateBackToTopVisibility();

    activeLinkAnimationFrameId = null;
  });
}

/* ---------------------------------------------------------------------------
   SUIVI DU SCROLL
--------------------------------------------------------------------------- */

function initSectionTracking() {
  if (sectionTrackingInitialized || !isMainPage()) {
    return;
  }

  sectionTrackingInitialized = true;

  window.addEventListener("scroll", requestActiveSectionUpdate, {
    passive: true,
  });

  window.addEventListener("resize", requestActiveSectionUpdate, {
    passive: true,
  });

  window.addEventListener("pageContentReady", requestActiveSectionUpdate);

  const aboutSection = getSectionElement("about");

  aboutSection?.addEventListener("transitionend", requestActiveSectionUpdate);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      requestActiveSectionUpdate();
    });
  }

  updateActiveSectionOnScroll();
  updateBackToTopVisibility();
}

/* ---------------------------------------------------------------------------
   HASH À L’OUVERTURE DE LA PAGE
--------------------------------------------------------------------------- */

function initHashNavigation() {
  if (!isMainPage()) {
    return;
  }

  const hash = window.location.hash.replace(/^#/, "").trim();

  if (!hash) {
    return;
  }

  const sectionName = decodeURIComponent(hash);

  const target = getSectionTargetPosition(sectionName);

  if (target === null) {
    return;
  }

  requestAnimationFrame(() => {
    window.scrollTo({
      top: target,
      left: 0,
      behavior: "auto",
    });

    setActiveSection(sectionName);
    updateBackToTopVisibility();
  });
}

/* ---------------------------------------------------------------------------
   INITIALISATION GÉNÉRALE
--------------------------------------------------------------------------- */

export function initNavigation(root = document) {
  initSectionNavigation(root);

  createBackToTopButton();

  initSectionTracking();
}

/* ---------------------------------------------------------------------------
   INITIALISATION DE LA PAGE
--------------------------------------------------------------------------- */

export function initPageNavigation() {
  initNavigation(document);

  initHashNavigation();
}
