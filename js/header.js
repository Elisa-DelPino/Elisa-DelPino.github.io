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
              <use href="/img/icons.svg#instagram"></use>
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
              <use href="/img/icons.svg#facebook"></use>
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
              <use href="/img/icons.svg#linkedin"></use>
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
