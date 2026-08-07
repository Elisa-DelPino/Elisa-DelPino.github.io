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

        max-width: clamp(45px, 5vw, 60px);
        max-height: clamp(45px, 5vw, 60px);
      }

      /* -----------------------------------------------------------------------
         TITRE NÉON
      ----------------------------------------------------------------------- */

      /*
       * Le titre est positionné par rapport au header
       * et non entre le logo et la navigation.
       *
       * Il reste donc exactement au centre de la fenêtre,
       * même si les éléments de gauche et de droite
       * n'ont pas la même largeur.
       */
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

        /*
         * Violet clair au centre du tube,
         * sans cœur blanc trop lumineux.
         */
        color: #c45cff;

        font-family: "Montserrat", sans-serif;
  font-weight: 100;
  font-size: clamp(20px, 2vw, 30px);
  letter-spacing: 3px;
  transform: translateZ(0) scaleX(0.88);

        
        line-height: 1;

        text-align: center;
        white-space: nowrap;

        opacity: 1;

        transform: translateZ(0);

        /*
         * Trait central fin, accompagné de plusieurs
         * halos violets de plus en plus diffus.
         */
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

      /*
       * Première couche du néon.
       * Elle reproduit le dédoublement fin
       * présent sur les lignes du robot.
       */
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

      /*
       * Deuxième halo, plus large et plus discret.
       */
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

      /*
       * Néon légèrement affaibli.
       */
      .header__neon-title.neon-dim {
        opacity: 0.48;

        filter:
          brightness(0.68)
          saturate(0.9);

        text-shadow:
          0 0 1px rgba(196, 92, 255, 0.8),
          0 0 3px rgba(162, 64, 223, 0.55),
          0 0 7px rgba(162, 64, 223, 0.35);
      }

      /*
       * Néon presque éteint.
       */
      .header__neon-title.neon-off {
        opacity: 0.14;

        filter:
          brightness(0.3)
          saturate(0.55);

        text-shadow:
          0 0 1px rgba(162, 64, 223, 0.28),
          0 0 3px rgba(162, 64, 223, 0.18);
      }

      /*
       * Petit flash électrique.
       * Il reste violet et ne devient pas blanc agressif.
       */
      .header__neon-title.neon-flash {
        opacity: 1;

        filter:
          brightness(1.28)
          saturate(1.15);

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
      }

      .header__nav__menu__link {
        margin-right: clamp(10px, 2vw, 25px);
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

        height: 2px;
        width: 0;

        background: var(--other-color);

        position: absolute;
        right: 0;
        bottom: -5px;

        transition: width 200ms ease-in-out;
      }

      .header__nav__menu__link a:hover::after,
      .header__nav__menu__link a.active::after {
        width: 100%;

        left: 0;
        right: auto;
      }

      .header__nav__menu__reseaux {
        display: flex;
        gap: clamp(2px, 0.5vw, 5px);
      }

      .header__img__reseaux {
        width: 20px;
        height: 80%;
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

  stroke: var(--text-color);

  position: static;
}

      .header__nav__close {
        display: none;
        position: relative;
        z-index: 5;
      }

      /* -----------------------------------------------------------------------
         VERSION MOBILE
      ----------------------------------------------------------------------- */

      @media screen and (max-width: 1000px) {
       .header__burger {
    display:flex;
}

        .header__nav {
          position: fixed;
          top: 0;
          right: 0;

          width: clamp(200px, 30vw, 600px);
          height: 100%;

          background-color: black;

          align-items: center;
          justify-content: center;

          display: none;
        }

        .header__nav.open {
          display: flex;

          animation:
            transformMenu 300ms ease-in-out forwards;
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
    display:flex;
}

        .header__nav__menu {
          flex-direction: column;
          align-items: flex-start;
        }

        .header__nav__menu__link {
          margin-right: 0;
          margin-bottom: 25px;
        }

        .header__nav__menu__link a {
          font-size: clamp(18px, 2vw, 25px);
        }

        .header__nav__close {
    display:none;

    align-items:center;
    justify-content:center;

    width:clamp(45px,5vw,80px);
    height:clamp(45px,5vw,80px);

    cursor:pointer;

    position:relative;
    z-index:5;
    flex-shrink:0;
}

        .header__nav__close svg {
    display:block;

    width:100%;
    height:100%;

    stroke:var(--text-color);

    position:static;
}

        /*
         * Le titre reste centré par rapport à la page,
         * même lorsque le menu burger apparaît.
         */
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
          src="./img/lightGreyLogo.png"
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
            href="#products"
            data-section="products"
          >
            PRODUITS
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
          <img
            src="./img/lightGreyLogo.png"
            alt="Réseau social"
            class="header__img__reseaux"
          >

          <img
            src="./img/lightGreyLogo.png"
            alt="Réseau social"
            class="header__img__reseaux"
          >

          <img
            src="./img/lightGreyLogo.png"
            alt="Réseau social"
            class="header__img__reseaux"
          >
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

    const target = document.getElementById(sectionName);

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

  const sectionConfiguration = [
    {
      name: "demos",
      element: document.getElementById("demos"),
    },
    {
      name: "products",
      element: document.getElementById("products"),
    },
    {
      name: "contact",
      element: document.getElementById("contact"),
    },
  ].filter((section) => section.element);

  function updateActiveLinkOnScroll() {
    const scrollPosition = window.scrollY;

    const headerHeight = header.offsetHeight;

    const activationPosition = scrollPosition + headerHeight + 80;

    if (scrollPosition <= 10 || sectionConfiguration.length === 0) {
      setActiveLink("home");
      return;
    }

    let detectedSection = currentActiveSection;

    for (const section of sectionConfiguration) {
      const sectionTop = section.element.offsetTop;

      if (activationPosition >= sectionTop) {
        detectedSection = section.name;
      } else {
        break;
      }
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

      /*
       * Les proportions reprennent celles
       * utilisées dans l'animation du robot.
       */
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
