// header.js

export function loadHeaderScriptDirect() {
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
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:clamp(80px,8vw,120px);
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:0 clamp(25px,6vw,35px);
        background-color:black;
        z-index:999;
      }

      /* -----------------------------------------------------------------------
         PARTIE GAUCHE
      ----------------------------------------------------------------------- */

      .header__left {
        display:flex;
        align-items:center;
        flex-shrink:0;
      }

      /* -----------------------------------------------------------------------
         LOGO
      ----------------------------------------------------------------------- */

      .header__logo {
        position:relative;
        flex-shrink:0;
        z-index:3;
      }

      .header__logo a {
        display:block;
        cursor:pointer;
      }

      .header__logo img {
        display:block;
        max-width:clamp(80px,12vw,120px);
        max-height:clamp(80px,12vw,120px);
      }

      /* -----------------------------------------------------------------------
         TITRE
      ----------------------------------------------------------------------- */

      .header__title {
        position:absolute;
        top:50%;
        left:50%;
        width:max-content;
        max-width:60vw;
        margin:0;
        display:flex;
        align-items:center;
        justify-content:center;
        transform:translate(-50%,-50%);
        pointer-events:none;
        z-index:1;
      }

      .header__neon-title {
        position:relative;
        display:inline-block;
        color:var(--text-color);
        font-family:"Montserrat",sans-serif;
        font-size:clamp(20px,2vw,30px);
        font-weight:100;
        line-height:1;
        letter-spacing:3px;
        text-align:center;
        white-space:nowrap;
      }

      /* -----------------------------------------------------------------------
         NAVIGATION
      ----------------------------------------------------------------------- */

      .header__nav {
        position:relative;
        z-index:3;
      }

      .header__nav__menu {
        margin:0;
        padding:0;
        display:flex;
        align-items:center;
        gap:clamp(12px,1vw,15px);
        list-style:none;
      }

      .header__nav__menu__link {
        margin-right:0;
      }

      .header__nav__menu__link a {
        position:relative;
        color:var(--text-color);
        font-family:"Montserrat",sans-serif;
        font-size:clamp(14px,1.2vw,18px);
        font-weight:100;
        text-decoration:none;
        cursor:pointer;
      }

      .header__nav__menu__link a::after {
        content:"";
        position:absolute;
        right:0;
        bottom:-5px;
        width:0;
        height:2px;
        background:var(--text-color);
        transition:width 200ms ease-in-out;
      }

      .header__nav__menu__link a:hover::after,
      .header__nav__menu__link a.active::after {
        left:0;
        right:auto;
        width:100%;
      }

      /* -----------------------------------------------------------------------
         LOGO RÉSEAUX
      ----------------------------------------------------------------------- */

      .header__nav__menu__reseaux {
        position:relative;
        width:48px;
        height:48px;
        margin-left:-8px;
        display:flex;
        align-items:center;
        justify-content:center;
        flex-shrink:0;
        overflow:visible;
      }

      .header__nav__menu__reseaux::after {
        content:"";
        position:absolute;
        top:100%;
        left:-18px;
        width:84px;
        height:18px;
      }

      .header__reseauxButton {
        width:48px;
        height:48px;
        padding:0;
        display:flex;
        align-items:center;
        justify-content:center;
        border:none;
        background:transparent;
        cursor:pointer;
      }

      .header__img__reseaux {
        width:18px;
        height:18px;
        display:block;
        object-fit:contain;
        transform:scale(2.4);
        transform-origin:center;
        pointer-events:none;
      }

      /* -----------------------------------------------------------------------
         POPUP RÉSEAUX
      ----------------------------------------------------------------------- */

      .header__reseauxPopup {
        position:absolute;
        top:calc(100% + 15px);
        right:30%;
        width:45px;
        padding:6px;
        display:flex;
        flex-direction:column;
        background:#050505;
        border:1px solid var(--text-color);
        border-radius:6px;
        opacity:0;
        visibility:hidden;
        pointer-events:none;
        transform:translate(50%,-8px);
        box-shadow:0 0 8px rgba(184,184,184,.2),0 0 18px rgba(184,184,184,.08);
        transition:opacity 180ms ease,transform 180ms ease,visibility 180ms ease;
        z-index:1000;
      }

      .header__reseauxPopup::before {
        content:"";
        position:absolute;
        top:-6px;
        right:50%;
        width:11px;
        height:11px;
        background:#050505;
        border-top:1px solid var(--text-color);
        border-left:1px solid var(--text-color);
        transform:translateX(50%) rotate(45deg);
      }

      .header__nav__menu__reseaux:hover .header__reseauxPopup {
        opacity:1;
        visibility:visible;
        pointer-events:auto;
        transform:translate(50%,0);
      }

      .header__reseauxPopupLink {
        width:100%;
        min-height:40px;
        padding:6px 7px;
        display:flex;
        align-items:center;
        gap:9px;
        color:var(--text-color);
        font-family:monospace;
        font-size:13px;
        font-weight:600;
        text-decoration:none;
        white-space:nowrap;
        transition:color 180ms ease,background-color 180ms ease;
      }

      .header__reseauxPopupLink:not(:last-child) {
        border-bottom:1px solid rgba(255,255,255,.1);
      }

      .header__reseauxPopupLink:hover {
        color:#fff;
        background:rgba(184,184,184,.08);
      }

      .header__reseauxPopupIcon {
        width:15px;
        height:15px;
        flex-shrink:0;
        color:currentColor;
      }

      .header__reseauxPopupIcon--instagram {
        fill:none;
        stroke:currentColor;
        stroke-width:1.7;
      }

      .header__reseauxPopupIcon--facebook,
      .header__reseauxPopupIcon--linkedin {
        fill:currentColor;
      }

      .header__reseauxIconDot {
        fill:currentColor;
        stroke:none;
      }

      /* -----------------------------------------------------------------------
         RESPONSIVE <= 1600PX
      ----------------------------------------------------------------------- */

      @media screen and (max-width:1600px) {
        .header__left {
          gap:clamp(14px,1.4vw,24px);
        }

        .header__title {
          position:static;
          top:auto;
          left:auto;
          width:max-content;
          max-width:none;
          margin:0;
          transform:none;
          justify-content:flex-start;
        }

        .header__neon-title {
          font-size:clamp(11px,1.3vw,18px);
          font-weight:100;
          letter-spacing:clamp(1.5px,.2vw,3px);
          text-align:left;
        }

        .header__nav__menu {
          gap:clamp(9px,1vw,14px);
        }

        .header__nav__menu__link a {
          font-size:clamp(13px,1.25vw,18px);
        }
      }

      /* -----------------------------------------------------------------------
         RESPONSIVE <= 900PX
      ----------------------------------------------------------------------- */

      @media screen and (max-width:900px) {
        .header {
          padding:0 18px;
        }

        .header__logo img {
          max-width:75px;
          max-height:75px;
        }

        .header__left {
          gap:12px;
        }

        .header__nav__menu {
          gap:8px;
        }

        .header__nav__menu__link a {
          font-size:clamp(11px,1.8vw,15px);
        }

        .header__nav__menu__reseaux {
          width:40px;
          height:40px;
          margin-left:-4px;
        }

        .header__reseauxButton {
          width:40px;
          height:40px;
        }

        .header__img__reseaux {
          width:15px;
          height:15px;
          transform:scale(2.2);
        }
      }

      /* -----------------------------------------------------------------------
         RESPONSIVE <= 600PX
      ----------------------------------------------------------------------- */

      @media screen and (max-width:600px) {
        .header {
          height:72px;
          padding:0 10px;
        }

        .header__logo img {
          max-width:62px;
          max-height:62px;
        }

        .header__title {
          display:none;
        }

        .header__nav {
          position:absolute;
          inset:0;
          width:100%;
          height:100%;
          z-index:3;
        }

        .header__nav__menu {
          position:relative;
          width:100%;
          height:100%;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:6px;
        }

        .header__nav__menu__link a {
          font-size:clamp(10px,2.5vw,14px);
        }

        .header__nav__menu__reseaux {
          position:absolute;
          top:50%;
          right:10px;
          width:34px;
          height:34px;
          margin-left:0;
          transform:translateY(-50%);
        }

        .header__reseauxButton {
          width:34px;
          height:34px;
        }

        .header__img__reseaux {
          width:18px;
          height:18px;
          transform:scale(2);
        }
      }

      /* -----------------------------------------------------------------------
         RESPONSIVE <= 420PX
      ----------------------------------------------------------------------- */

      @media screen and (max-width:420px) {
        .header {
          padding:0 7px;
        }

        .header__logo img {
          max-width:54px;
          max-height:54px;
        }

        .header__nav__menu {
          gap:4px;
        }

        .header__nav__menu__link a {
          font-size:10px;
        }

        .header__nav__menu__reseaux {
          right:7px;
          width:30px;
          height:30px;
        }

        .header__reseauxButton {
          width:30px;
          height:30px;
        }

        .header__img__reseaux {
          width:12px;
          height:12px;
          transform:scale(1.8);
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
    <div class="header__left">

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
        <span class="header__neon-title">
          CRÉATION SITE & LOGICIEL
        </span>
      </div>

    </div>

    <nav class="header__nav">
      <ul class="header__nav__menu">

        <li class="header__nav__menu__link">
          <a
            href="#top"
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

  document.body.prepend(header);

  // ---------------------------------------------------------------------------
  // RÉCUPÉRATION DES ÉLÉMENTS
  // ---------------------------------------------------------------------------

  const menuLinks = [
    ...header.querySelectorAll(".header__nav__menu__link a[data-section]"),
  ];

  const logoLink = header.querySelector(".header__logo a[data-section='home']");

  let scrollAnimationFrameId = null;

  // ---------------------------------------------------------------------------
  // LIEN ACTIF
  // ---------------------------------------------------------------------------

  function setActiveLink(sectionName) {
    if (!sectionName) {
      return;
    }

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
    if (sectionName === "services") {
      return (
        document.getElementById("services") ||
        document.getElementById("products")
      );
    }

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

    scrollToSection(sectionName);
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", handleNavigationClick);
  });

  if (logoLink) {
    logoLink.addEventListener("click", (event) => {
      event.preventDefault();

      scrollToSection("home");
    });
  }

  // ---------------------------------------------------------------------------
  // DÉTECTION DE LA SECTION ACTIVE
  // ---------------------------------------------------------------------------

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
    const activationLine =
      headerHeight + Math.min(80, window.innerHeight * 0.08);

    if (scrollPosition <= 10 || sectionConfiguration.length === 0) {
      setActiveLink("home");
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

  window.addEventListener("pageContentReady", requestActiveLinkUpdate);

  const aboutSection = getSectionElement("about");

  aboutSection?.addEventListener("transitionend", requestActiveLinkUpdate);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      requestActiveLinkUpdate();
    });
  }

  updateActiveLinkOnScroll();
}
