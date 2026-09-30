// header.js

import { initPageNavigation } from "./navigation.js";

const HEADER_HTML = `
  <div class="header__left">
    <div class="header__logo">
      <a
        href="#home"
        data-section="home"
        aria-label="Retourner en haut de la page"
      >
        <img
          src="./img/Logo.png"
          alt="Logo"
        >
      </a>
    </div>

    <div class="header__title">
      <span class="header__neon-title">
        CRÉATION SITE & LOGICIEL
      </span>
    </div>
  </div>

  <nav class="header__nav">
    <ul class="header__nav__menu">
      <li class="header__nav__menu__link">
        <a
          href="#home"
          data-section="home"
          class="active"
        >
          Accueil
        </a>
      </li>

      <li class="header__nav__menu__link">
        <a
          href="#demos"
          data-section="demos"
        >
          Démos
        </a>
      </li>

      <li class="header__nav__menu__link">
        <a
          href="#services"
          data-section="services"
        >
          Services
        </a>
      </li>

      <li class="header__nav__menu__link">
        <a
          href="#about"
          data-section="about"
        >
          À propos
        </a>
      </li>

      <li class="header__nav__menu__link">
        <a
          href="#contact"
          data-section="contact"
        >
          Contact
        </a>
      </li>

      <li class="header__nav__menu__reseaux">
        <button
          type="button"
          class="header__reseauxButton"
          aria-label="Afficher mes réseaux sociaux"
          aria-expanded="false"
          aria-controls="headerReseauxPopup"
        >
          <img
            src="./img/logoReseaux.png"
            alt=""
            class="header__img__reseaux"
          >
        </button>

        <div
          id="headerReseauxPopup"
          class="header__reseauxPopup"
          aria-hidden="true"
        >
          <!-- INSTAGRAM -->

          <a
            href="#"
            class="header__reseauxPopupLink"
            aria-label="Instagram Elisa.Dev"
          >
            <svg
              class="header__reseauxPopupIcon header__reseauxPopupIcon--instagram"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
              ></rect>

              <circle
                cx="12"
                cy="12"
                r="4"
              ></circle>

              <circle
                cx="17.5"
                cy="6.5"
                r="1"
                class="header__reseauxIconDot"
              ></circle>
            </svg>
          </a>

          <!-- FACEBOOK -->

          <a
            href="#"
            class="header__reseauxPopupLink"
            aria-label="Facebook Elisa.Dev"
          >
            <svg
              class="header__reseauxPopupIcon header__reseauxPopupIcon--facebook"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M13.8 8H17V4.5c-.5-.1-2.1-.2-4-.2-3.9 0-6.6 2.4-6.6 6.9V15H2v4h4.4v5h5.1v-5h4.2l.7-4h-4.9v-3.4c0-1.2.4-3.6 2.3-3.6Z"
              ></path>
            </svg>
          </a>

          <!-- LINKEDIN -->

          <a
            href="#"
            class="header__reseauxPopupLink"
            aria-label="LinkedIn Elisa.Dev"
          >
            <svg
              class="header__reseauxPopupIcon header__reseauxPopupIcon--linkedin"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M5.3 3.5A2.3 2.3 0 1 1 5.3 8a2.3 2.3 0 0 1 0-4.5ZM3.3 9.5h4V21h-4V9.5ZM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2.1 3.8-2.1 4 0 4.8 2.7 4.8 6.1V21h-4v-5.2c0-1.2 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V21h-4V9.5Z"
              ></path>
            </svg>
          </a>
        </div>
      </li>
    </ul>
  </nav>
`;

const MOBILE_SOCIAL_QUERY = window.matchMedia("(max-width:600px)");

const FINE_POINTER_QUERY = window.matchMedia(
  "(hover:hover) and (pointer:fine)",
);

let navigationInitialized = false;

/* ---------------------------------------------------------------------------
   CHARGEMENT DU HEADER
--------------------------------------------------------------------------- */

export function loadHeaderScriptDirect() {
  const existingHeader = document.querySelector(".header");

  if (existingHeader) {
    return;
  }

  /* ---------------------------------------------------------------------------
     HTML DU HEADER
  --------------------------------------------------------------------------- */

  const header = document.createElement("header");

  header.className = "header";
  header.innerHTML = HEADER_HTML;

  document.body.prepend(header);

  /* ---------------------------------------------------------------------------
     RÉCUPÉRATION DES ÉLÉMENTS
  --------------------------------------------------------------------------- */

  const reseauxMenu = header.querySelector(".header__nav__menu__reseaux");

  const reseauxButton = header.querySelector(".header__reseauxButton");

  const reseauxPopup = header.querySelector(".header__reseauxPopup");

  const reseauxPopupLinks = [
    ...header.querySelectorAll(".header__reseauxPopupLink"),
  ];

  let desktopPopupClickedOpen = false;

  /* ---------------------------------------------------------------------------
     MENU RÉSEAUX
  --------------------------------------------------------------------------- */

  function usesTouchSocialMenu() {
    return MOBILE_SOCIAL_QUERY.matches || !FINE_POINTER_QUERY.matches;
  }

  function setReseauxPopupOpen(isOpen) {
    if (!reseauxMenu || !reseauxButton || !reseauxPopup) {
      return;
    }

    reseauxMenu.classList.toggle("is-open", isOpen);

    reseauxButton.setAttribute("aria-expanded", String(isOpen));

    reseauxPopup.setAttribute("aria-hidden", String(!isOpen));
  }

  function setDesktopPopupForcedHidden(isHidden) {
    if (!reseauxPopup) {
      return;
    }

    if (isHidden) {
      reseauxPopup.style.opacity = "0";
      reseauxPopup.style.visibility = "hidden";
      reseauxPopup.style.pointerEvents = "none";
      reseauxPopup.style.transform = "translate(50%,-8px)";

      return;
    }

    reseauxPopup.style.removeProperty("opacity");

    reseauxPopup.style.removeProperty("visibility");

    reseauxPopup.style.removeProperty("pointer-events");

    reseauxPopup.style.removeProperty("transform");
  }

  function closeDesktopPopup(forceHidden = false) {
    desktopPopupClickedOpen = false;

    setReseauxPopupOpen(false);

    setDesktopPopupForcedHidden(forceHidden);

    reseauxButton?.blur();
  }

  reseauxButton?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (usesTouchSocialMenu()) {
      const shouldOpen = !reseauxMenu?.classList.contains("is-open");

      setReseauxPopupOpen(shouldOpen);

      return;
    }

    if (desktopPopupClickedOpen) {
      closeDesktopPopup(true);

      return;
    }

    desktopPopupClickedOpen = true;

    setDesktopPopupForcedHidden(false);

    setReseauxPopupOpen(true);
  });

  reseauxMenu?.addEventListener("mouseenter", () => {
    if (usesTouchSocialMenu()) {
      return;
    }

    if (!desktopPopupClickedOpen) {
      setDesktopPopupForcedHidden(false);
    }
  });

  reseauxMenu?.addEventListener("mouseleave", () => {
    if (usesTouchSocialMenu()) {
      return;
    }

    closeDesktopPopup(false);
  });

  reseauxPopupLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (usesTouchSocialMenu()) {
        setReseauxPopupOpen(false);

        return;
      }

      closeDesktopPopup(true);
    });
  });

  document.addEventListener("click", (event) => {
    if (!reseauxMenu || reseauxMenu.contains(event.target)) {
      return;
    }

    if (usesTouchSocialMenu()) {
      if (reseauxMenu.classList.contains("is-open")) {
        setReseauxPopupOpen(false);
      }

      return;
    }

    if (desktopPopupClickedOpen) {
      closeDesktopPopup(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    if (usesTouchSocialMenu()) {
      setReseauxPopupOpen(false);

      return;
    }

    closeDesktopPopup(true);
  });

  window.addEventListener(
    "resize",
    () => {
      if (!usesTouchSocialMenu()) {
        closeDesktopPopup(false);
      }
    },
    {
      passive: true,
    },
  );

  /* ---------------------------------------------------------------------------
     NAVIGATION COMMUNE
  --------------------------------------------------------------------------- */

  if (!navigationInitialized) {
    navigationInitialized = true;

    initPageNavigation();
  }
}
