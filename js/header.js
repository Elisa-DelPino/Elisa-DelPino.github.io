// header.js

export function loadHeaderScriptDirect() {
  /*
   * Empêche la création de plusieurs headers
   * si cette fonction est appelée plusieurs fois.
   */
  const existingHeader = document.querySelector(".header");

  if (existingHeader) {
    return;
  }

  // ---------------------------------------------------------------------------
  // CSS DU HEADER
  // ---------------------------------------------------------------------------

  if (!document.getElementById("headerStyle")) {
    const style = document.createElement("style");

    style.id = "headerStyle";

    style.innerHTML = `
      .header {
        background-color: black;
        width: 100%;
        height: 15vh;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 clamp(25px, 6vw, 35px);
        box-shadow:
          rgba(185, 185, 194, 0.35) 0 13px 27px -5px,
          rgba(218, 203, 221, 0.53) 0 8px 16px -8px;
        z-index: 999;
      }

      /* -----------------------------------------------------------------------
         LOGO
      ----------------------------------------------------------------------- */

      .header__logo {
        flex-shrink: 0;
        position: relative;
        z-index: 3;
      }

      .header__logo a {
        display: block;
        cursor: pointer;
      }

      .header__logo img {
        display: block;
        max-width: clamp(80px, 12vw, 120px);
        max-height: clamp(80px, 12vw, 120px);
      }

      /* -----------------------------------------------------------------------
         TITRE NÉON
      ----------------------------------------------------------------------- */

      .header__title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        width: max-content;
        max-width: 60vw;
        margin: 0;
        pointer-events: none;
        z-index: 1;
      }

      .header__neon-title {
        position: relative;
        isolation: isolate;
        display: inline-block;
        color: #c45cff;
        font-family: "Montserrat", sans-serif;
        font-weight: 100;
        font-size: clamp(20px, 2vw, 30px);
        letter-spacing: 3px;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        opacity: 1;
        transform: translateZ(0);
        text-shadow:
          0 0 1px #d98cff,
          0 0 3px rgba(196, 92, 255, 0.85),
          0 0 7px rgba(162, 64, 223, 0.65),
          0 0 14px rgba(162, 64, 223, 0.4);
        transition:
          opacity 30ms linear,
          filter 30ms linear,
          text-shadow 30ms linear;
      }

      .header__neon-title::before {
        content: attr(data-text);
        position: absolute;
        inset: 0;
        color: #a240df;
        transform: translate(0.5px, 0.5px);
        filter: blur(1px);
        opacity: 0.48;
        text-shadow:
          0 0 4px rgba(196, 92, 255, 0.8),
          0 0 9px rgba(162, 64, 223, 0.65),
          0 0 16px rgba(162, 64, 223, 0.38);
        z-index: -1;
      }

      .header__neon-title::after {
        content: attr(data-text);
        position: absolute;
        inset: 0;
        color: transparent;
        opacity: 0.32;
        filter: blur(4px);
        text-shadow:
          0 0 8px rgba(196, 92, 255, 0.72),
          0 0 18px rgba(162, 64, 223, 0.5),
          0 0 30px rgba(162, 64, 223, 0.28);
        z-index: -2;
      }

      .header__neon-title.neon-dim {
        opacity: 0.48;
        filter: brightness(0.68) saturate(0.9);
        text-shadow:
          0 0 1px rgba(196, 92, 255, 0.8),
          0 0 3px rgba(162, 64, 223, 0.55),
          0 0 7px rgba(162, 64, 223, 0.35);
      }

      .header__neon-title.neon-off {
        opacity: 0.14;
        filter: brightness(0.3) saturate(0.55);
        text-shadow:
          0 0 1px rgba(162, 64, 223, 0.28),
          0 0 3px rgba(162, 64, 223, 0.18);
      }

      .header__neon-title.neon-flash {
        opacity: 1;
        filter: brightness(1.28) saturate(1.15);
        text-shadow:
          0 0 1px #d98cff,
          0 0 3px #c45cff,
          0 0 7px rgba(196, 92, 255, 0.9),
          0 0 13px rgba(162, 64, 223, 0.72),
          0 0 22px rgba(162, 64, 223, 0.42);
      }

      /* -----------------------------------------------------------------------
         NAVIGATION
      ----------------------------------------------------------------------- */

      .header__nav {
        position: relative;
        z-index: 3;
      }

      .header__nav__menu {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        align-items: center;
        gap: clamp(12px, 1.5vw, 22px);
      }

      .header__nav__menu__link {
        margin-right: 0;
      }

      .header__nav__menu__link a {
        color: var(--text-color);
        font-family: monospace;
        font-size: clamp(5px, 2vw, 15px);
        font-weight: 600;
        text-decoration: none;
        position: relative;
        cursor: pointer;
      }

      .header__nav__menu__link a::after {
        content: "";
        width: 0;
        height: 2px;
        position: absolute;
        right: 0;
        bottom: -5px;
        background: var(--other-color);
        transition: width 200ms ease-in-out;
      }

      .header__nav__menu__link a:hover::after,
      .header__nav__menu__link a.active::after {
        width: 100%;
        left: 0;
        right: auto;
      }

      /* -----------------------------------------------------------------------
         LOGO RÉSEAUX
      ----------------------------------------------------------------------- */

      .header__nav__menu__reseaux {
        position: relative;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-left: -8px;
        overflow: visible;
      }

      /*
       * Petite zone invisible entre le logo
       * et la popup pour pouvoir descendre
       * la souris sans fermer la popup.
       */

      .header__nav__menu__reseaux::after {
        content: "";
        position: absolute;
        top: 100%;
        left: -18px;
        width: 84px;
        height: 18px;
      }

      .header__reseauxButton {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: none;
        background: transparent;
        cursor: pointer;
      }

      .header__img__reseaux {
        width: 65px;
        height: 65px;
        display: block;
        object-fit: contain;
        transform: scale(2.4);
        transform-origin: center;
        pointer-events: none;
      }

      /* -----------------------------------------------------------------------
         POPUP RÉSEAUX DESKTOP
      ----------------------------------------------------------------------- */

      .header__reseauxPopup {
        position: absolute;
        top: calc(100% + 15px);
        right: 50%;
        width: 110px;
        display: flex;
        flex-direction: column;
        padding: 6px;
        background: #050505;
        border: 1px solid rgba(162, 64, 223, 0.7);
        border-radius: 6px;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translate(50%, -8px);
        box-shadow:
          0 0 8px rgba(162, 64, 223, 0.35),
          0 0 18px rgba(162, 64, 223, 0.18);
        transition:
          opacity 180ms ease,
          transform 180ms ease,
          visibility 180ms ease;
        z-index: 1000;
      }

      .header__reseauxPopup::before {
        content: "";
        position: absolute;
        top: -6px;
        right: 50%;
        width: 11px;
        height: 11px;
        background: #050505;
        border-top: 1px solid rgba(162, 64, 223, 0.7);
        border-left: 1px solid rgba(162, 64, 223, 0.7);
        transform: translateX(50%) rotate(45deg);
      }

      /*
       * La popup apparaît uniquement au survol.
       * Aucun clic n'est nécessaire.
       */

      .header__nav__menu__reseaux:hover .header__reseauxPopup {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translate(50%, 0);
      }

      .header__reseauxPopupLink {
        width: 100%;
        min-height: 40px;
        display: flex;
        align-items: center;
        gap: 9px;
        padding: 6px 7px;
        color: var(--text-color);
        text-decoration: none;
        font-family: monospace;
        font-size: 11px;
        font-weight: 600;
        white-space: nowrap;
        transition:
          color 180ms ease,
          background-color 180ms ease;
      }

      .header__reseauxPopupLink:not(:last-child) {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .header__reseauxPopupLink:hover {
        color: #c45cff;
        background: rgba(162, 64, 223, 0.08);
      }

      .header__reseauxPopupIcon {
        width: 15px;
        height: 15px;
        flex-shrink: 0;
        color: currentColor;
      }

      .header__reseauxPopupIcon--instagram {
        fill: none;
        stroke: currentColor;
        stroke-width: 1.7;
      }

      .header__reseauxPopupIcon--facebook,
      .header__reseauxPopupIcon--linkedin {
        fill: currentColor;
      }

      .header__reseauxIconDot {
        fill: currentColor;
        stroke: none;
      }

      /* -----------------------------------------------------------------------
         MENU BURGER
      ----------------------------------------------------------------------- */

      .header__burger {
        display: none;
        align-items: center;
        justify-content: center;
        width: clamp(45px, 5vw, 80px);
        height: clamp(45px, 5vw, 80px);
        cursor: pointer;
        position: relative;
        z-index: 4;
        flex-shrink: 0;
      }

      .header__burger svg {
        display: block;
        width: 100%;
        height: 100%;
        stroke: var(--other-color);
        position: static;
      }

      .header__nav__close {
        display: none;
        position: relative;
        z-index: 5;
      }

      /* -----------------------------------------------------------------------
         VERSION BURGER
      ----------------------------------------------------------------------- */

      @media screen and (max-width: 1600px) {
        .header__burger {
          display: flex;
        }

        .header__nav {
          position: fixed;
          top: 0;
          right: 0;
          width: clamp(200px, 30vw, 600px);
          height: 100%;
          display: none;
          align-items: center;
          justify-content: center;
          background-color: black;
        }

        .header__nav.open {
          display: flex;
          animation: transformMenu 300ms ease-in-out forwards;
        }

        @keyframes transformMenu {
          from {
            transform: translateX(100%);
          }

          to {
            transform: translateX(0);
          }
        }

        .header.open .header__burger {
          display: none;
        }

        .header.open .header__nav__close {
          display: flex;
        }

        .header__nav__menu {
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
        }

        .header__nav__menu__link {
          margin-right: 0;
          margin-bottom: 25px;
        }

        .header__nav__menu__link a {
          font-size: clamp(18px, 2vw, 25px);
        }

        /* -------------------------------------------------------------------
           RÉSEAUX DIRECTEMENT VISIBLES DANS LE BURGER
        ------------------------------------------------------------------- */

        .header__nav__menu__reseaux {
          width: auto;
          height: auto;
          display: block;
          margin-top: 4px;
          margin-left: 0;
        }

        .header__nav__menu__reseaux::after {
          display: none;
        }

        /*
         * Le gros logo général disparaît.
         */

        .header__reseauxButton {
          display: none;
        }

        /*
         * La popup devient simplement le conteneur
         * permanent des trois réseaux.
         */

        .header__reseauxPopup {
          position: static;
          width: auto;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          padding: 0;
          background: transparent;
          border: none;
          border-radius: 0;
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: none;
          box-shadow: none;
        }

        .header__reseauxPopup::before {
          display: none;
        }

        .header__nav__menu__reseaux:hover .header__reseauxPopup {
          opacity: 1;
          visibility: visible;
          transform: none;
        }

        /*
         * Chaque ligne :
         *
         * petite icône + Elisa.Dev
         */

        .header__reseauxPopupLink {
          width: auto;
          min-height: 30px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 8px;
          padding: 2px 0;
          border: none;
          background: transparent;
          font-size: clamp(11px, 1.3vw, 14px);
        }

        .header__reseauxPopupLink:not(:last-child) {
          border-bottom: none;
        }

        .header__reseauxPopupLink:hover {
          color: #c45cff;
          background: transparent;
        }

        .header__reseauxPopupLink span {
          display: inline-block;
        }

        /*
         * Logos plus petits dans le burger.
         */

        .header__reseauxPopupIcon {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        /* -------------------------------------------------------------------
           CROIX
        ------------------------------------------------------------------- */

        .header__nav__close {
          display: none;
          align-items: center;
          justify-content: center;
          width: clamp(45px, 5vw, 80px);
          height: clamp(45px, 5vw, 80px);
          cursor: pointer;
          position: relative;
          z-index: 5;
          flex-shrink: 0;
          transition:
            transform 220ms ease,
            color 220ms ease;
        }

        .header__nav__close.is-rotating {
          transform: rotate(90deg);
        }

        @media (hover: hover) and (pointer: fine) {
          .header__nav__close:hover {
            transform: rotate(90deg);
          }
        }

        .header__nav__close svg {
          display: block;
          width: 100%;
          height: 100%;
          stroke: var(--text-color);
          position: static;
        }

        .header__title {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: max-content;
          max-width: 56vw;
          margin: 0;
          justify-content: center;
        }

        .header__neon-title {
          max-width: none;
          font-size: clamp(10px, 2.3vw, 17px);
          font-weight: 200;
          line-height: 1;
          white-space: nowrap;
          text-align: center;
        }
      }

      @media screen and (max-width: 500px) {
        .header {
          padding-left: 15px;
          padding-right: 15px;
        }

        .header__title {
          max-width: 52vw;
        }

        .header__neon-title {
          font-size: clamp(8px, 2.5vw, 12px);
          letter-spacing: 0.8px;
        }

        .header__reseauxPopupLink {
          font-size: 11px;
        }

        .header__reseauxPopupIcon {
          width: 17px;
          height: 17px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  // ---------------------------------------------------------------------------
  // HTML DU HEADER
  // ---------------------------------------------------------------------------

  const header = document.createElement("header");

  header.className = "header";

  header.innerHTML = `
    <div class="header__logo">
      <a
        href="#top"
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
      <span
        class="header__neon-title"
        data-text="CRÉATION SITE & LOGICIEL"
      >
        CRÉATION SITE & LOGICIEL
      </span>
    </div>

    <nav class="header__nav">
      <ul class="header__nav__menu">

        <li class="header__nav__menu__link">
          <a
            href="#top"
            data-section="home"
            class="active"
          >
            ACCUEIL
          </a>
        </li>

        <li class="header__nav__menu__link">
          <a
            href="#demos"
            data-section="demos"
          >
            DEMO
          </a>
        </li>

        <li class="header__nav__menu__link">
          <a
            href="#services"
            data-section="services"
          >
            SERVICES
          </a>
        </li>

        <li class="header__nav__menu__link">
          <a
            href="#about"
            data-section="about"
          >
            À PROPOS
          </a>
        </li>

        <li class="header__nav__menu__link">
          <a
            href="#contact"
            data-section="contact"
          >
            CONTACT
          </a>
        </li>

        <li class="header__nav__menu__reseaux">

          <button
            type="button"
            class="header__reseauxButton"
            aria-label="Afficher mes réseaux sociaux"
          >
            <img
              src="./img/logoReseaux.png"
              alt=""
              class="header__img__reseaux"
            >
          </button>


          <div class="header__reseauxPopup">

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

              <span>Elisa.Dev</span>
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

              <span>Elisa.Dev</span>
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

              <span>Elisa.Dev</span>
            </a>

          </div>

        </li>

      </ul>
    </nav>


    <div
      class="header__burger"
      role="button"
      tabindex="0"
      aria-label="Ouvrir le menu"
      aria-expanded="false"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </div>


    <div
      class="header__nav__close"
      role="button"
      tabindex="0"
      aria-label="Fermer le menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </div>
  `;

  document.body.prepend(header);

  // ---------------------------------------------------------------------------
  // RÉCUPÉRATION DES ÉLÉMENTS
  // ---------------------------------------------------------------------------

  const burger = header.querySelector(".header__burger");

  const closeButton = header.querySelector(".header__nav__close");

  const nav = header.querySelector(".header__nav");

  const overlay = document.getElementById("overlay__menu__mobile");

  const menuLinks = [
    ...header.querySelectorAll(".header__nav__menu__link a[data-section]"),
  ];

  const logoLink = header.querySelector(".header__logo a[data-section='home']");

  const neonTitle = header.querySelector(".header__neon-title");

  let scrollAnimationFrameId = null;

  /*
   * Dernière section active.
   * Elle reste sélectionnée dans les espaces
   * situés entre deux sections.
   */

  let currentActiveSection = "home";

  // ---------------------------------------------------------------------------
  // OUVERTURE ET FERMETURE DU MENU MOBILE
  // ---------------------------------------------------------------------------

  function openMenu() {
    header.classList.add("open");

    nav.classList.add("open");

    burger.setAttribute("aria-expanded", "true");

    if (overlay) {
      overlay.classList.add("open");
    }
  }

  function closeMenu() {
    header.classList.remove("open");

    nav.classList.remove("open");

    burger.setAttribute("aria-expanded", "false");

    if (overlay) {
      overlay.classList.remove("open");
    }
  }

  // ---------------------------------------------------------------------------
  // MENU BURGER
  // ---------------------------------------------------------------------------

  burger.addEventListener("click", openMenu);

  closeButton.addEventListener("click", closeMenu);

  burger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      openMenu();
    }
  });

  closeButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      closeMenu();
    }
  });

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 1000) {
        closeMenu();
      }
    },
    {
      passive: true,
    },
  );

  // ---------------------------------------------------------------------------
  // LIEN ACTIF
  // ---------------------------------------------------------------------------

  function setActiveLink(sectionName) {
    if (!sectionName) {
      return;
    }

    currentActiveSection = sectionName;

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

  // ---------------------------------------------------------------------------
  // RÉCUPÉRATION DES SECTIONS
  // ---------------------------------------------------------------------------

  function getSectionElement(sectionName) {
    /*
     * SERVICES :
     * on cherche d'abord #services.
     *
     * Si ta section actuelle s'appelle encore #products,
     * le menu continuera quand même à fonctionner.
     */

    if (sectionName === "services") {
      return (
        document.getElementById("services") ||
        document.getElementById("products")
      );
    }

    /*
     * À PROPOS :
     * plusieurs noms d'id sont acceptés.
     */

    if (sectionName === "about") {
      return (
        document.getElementById("about") ||
        document.getElementById("a-propos") ||
        document.getElementById("apropos")
      );
    }

    return document.getElementById(sectionName);
  }

  // ---------------------------------------------------------------------------
  // SCROLL VERS LES SECTIONS
  // ---------------------------------------------------------------------------

  function scrollToSection(sectionName) {
    if (sectionName === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setActiveLink("home");

      return;
    }

    const target = getSectionElement(sectionName);

    if (!target) {
      console.warn(`La section #${sectionName} est introuvable.`);

      return;
    }

    const headerHeight = header.offsetHeight;

    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: "smooth",
    });

    setActiveLink(sectionName);
  }

  function handleNavigationClick(event) {
    event.preventDefault();

    const link = event.currentTarget;

    const sectionName = link.dataset.section;

    closeMenu();

    scrollToSection(sectionName);
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", handleNavigationClick);
  });

  if (logoLink) {
    logoLink.addEventListener("click", (event) => {
      event.preventDefault();

      closeMenu();

      scrollToSection("home");
    });
  }

  // ---------------------------------------------------------------------------
  // DÉTECTION DE LA SECTION ACTIVE
  // ---------------------------------------------------------------------------

  /*
   * On garde uniquement les références vers les sections.
   *
   * IMPORTANT :
   * on ne mémorise plus leur offsetTop au démarrage.
   * Certaines sections changent de position visuelle pendant
   * les animations ou après le chargement des différents éléments.
   *
   * On recalculera donc leur position réelle à chaque mise à jour.
   */

  const sectionConfiguration = [
    {
      name: "demos",
      element: getSectionElement("demos"),
    },
    {
      name: "services",
      element: getSectionElement("services"),
    },
    {
      name: "about",
      element: getSectionElement("about"),
    },
    {
      name: "contact",
      element: getSectionElement("contact"),
    },
  ].filter((section) => section.element);

  function updateActiveLinkOnScroll() {
    const scrollPosition = window.scrollY;

    const headerHeight = header.offsetHeight;

    /*
     * Ligne virtuelle située légèrement sous le header.
     *
     * Dès que le haut VISUEL d'une section passe cette ligne,
     * son lien devient actif.
     *
     * getBoundingClientRect() tient compte de la vraie position
     * affichée à l'écran, y compris des transforms d'animation.
     * C'est particulièrement important pour la section À PROPOS.
     */

    const activationLine =
      headerHeight + Math.min(80, window.innerHeight * 0.08);

    if (scrollPosition <= 10 || sectionConfiguration.length === 0) {
      setActiveLink("home");

      return;
    }

    /*
     * Les positions sont recalculées à chaque scroll.
     *
     * Cela évite qu'une ancienne valeur d'offsetTop
     * fasse sauter À PROPOS ou active CONTACT trop tôt.
     */

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

    /*
     * Tout en bas de la page, CONTACT doit rester actif
     * même si la page n'a pas assez de hauteur disponible
     * pour faire passer son début exactement sous la ligne.
     */

    const pageBottomReached =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;

    if (pageBottomReached && orderedSections.length > 0) {
      detectedSection = orderedSections[orderedSections.length - 1].name;
    }

    setActiveLink(detectedSection);
  }

  function requestActiveLinkUpdate() {
    if (scrollAnimationFrameId !== null) {
      return;
    }

    scrollAnimationFrameId = requestAnimationFrame(() => {
      updateActiveLinkOnScroll();

      scrollAnimationFrameId = null;
    });
  }

  window.addEventListener("scroll", requestActiveLinkUpdate, {
    passive: true,
  });

  window.addEventListener("resize", requestActiveLinkUpdate, {
    passive: true,
  });

  /*
   * Les animations de la page peuvent modifier
   * la position visuelle d'une section sans provoquer
   * immédiatement un nouvel événement scroll.
   *
   * On recalcule donc aussi lorsque le contenu principal
   * signale qu'il est prêt.
   */

  window.addEventListener("pageContentReady", requestActiveLinkUpdate);

  /*
   * La section À PROPOS possède une animation
   * de translateY. Lorsqu'elle se termine,
   * on vérifie immédiatement quel lien doit être actif.
   */

  const aboutSection = getSectionElement("about");

  aboutSection?.addEventListener("transitionend", requestActiveLinkUpdate);

  /*
   * Même vérification après le chargement des polices,
   * car elles peuvent légèrement modifier les hauteurs
   * et donc la position des sections.
   */

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      requestActiveLinkUpdate();
    });
  }

  updateActiveLinkOnScroll();

  // ---------------------------------------------------------------------------
  // ANIMATION DU TITRE NÉON
  // ---------------------------------------------------------------------------

  let neonSequenceTimeout = null;

  let neonStepTimeout = null;

  function clearNeonState() {
    if (!neonTitle) {
      return;
    }

    neonTitle.classList.remove("neon-dim", "neon-off", "neon-flash");
  }

  function setNeonState(stateClass = null) {
    clearNeonState();

    if (stateClass) {
      neonTitle.classList.add(stateClass);
    }
  }

  /*
   * Même rythme général que le robot :
   * le prochain grésillement arrive
   * entre une et deux secondes plus tard.
   */

  function scheduleNextNeonFlicker() {
    if (!neonTitle) {
      return;
    }

    clearTimeout(neonSequenceTimeout);

    const delay = 1000 + Math.random() * 1000;

    neonSequenceTimeout = window.setTimeout(playNeonFlicker, delay);
  }

  /*
   * Séquence comparable au robot :
   * elle dure entre 350 et 600 millisecondes
   * avec des intensités irrégulières.
   */

  function playNeonFlicker() {
    if (!neonTitle) {
      return;
    }

    const sequenceDuration = 350 + Math.random() * 250;

    const startTime = performance.now();

    function flickerStep(now) {
      const elapsed = now - startTime;

      if (elapsed >= sequenceDuration) {
        clearNeonState();

        scheduleNextNeonFlicker();

        return;
      }

      const randomValue = Math.random();

      if (randomValue < 0.18) {
        setNeonState("neon-off");
      } else if (randomValue < 0.38) {
        setNeonState("neon-dim");
      } else if (randomValue < 0.58) {
        setNeonState("neon-flash");
      } else {
        setNeonState(null);
      }

      neonStepTimeout = window.setTimeout(
        () => {
          requestAnimationFrame(flickerStep);
        },
        35 + Math.random() * 35,
      );
    }

    requestAnimationFrame(flickerStep);
  }

  scheduleNextNeonFlicker();
}
