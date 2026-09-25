// header.js

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
          href="./index.html"
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

const REDUCED_MOTION_QUERY = window.matchMedia(
  "(prefers-reduced-motion:reduce)",
);

export function loadHeaderScriptDirect() {
  const existingHeader = document.querySelector(".header");

  if (existingHeader) {
    return;
  }

  // ---------------------------------------------------------------------------
  // HTML DU HEADER
  // ---------------------------------------------------------------------------

  const header = document.createElement("header");

  header.className = "header";
  header.innerHTML = HEADER_HTML;

  document.body.prepend(header);

  // ---------------------------------------------------------------------------
  // RÉCUPÉRATION DES ÉLÉMENTS
  // ---------------------------------------------------------------------------

  const menuLinks = [
    ...header.querySelectorAll(".header__nav__menu__link a[data-section]"),
  ];

  const logoLink = header.querySelector(".header__logo a[data-section='home']");
  const reseauxMenu = header.querySelector(".header__nav__menu__reseaux");
  const reseauxButton = header.querySelector(".header__reseauxButton");
  const reseauxPopup = header.querySelector(".header__reseauxPopup");

  const reseauxPopupLinks = [
    ...header.querySelectorAll(".header__reseauxPopupLink"),
  ];

  let scrollAnimationFrameId = null;
  let navigationAnimationFrameId = null;
  let navigationRequestId = 0;
  let desktopPopupClickedOpen = false;

  // ---------------------------------------------------------------------------
  // MENU RÉSEAUX
  // ---------------------------------------------------------------------------

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
    return document.getElementById(sectionName);
  }

  function getSectionNavigationTarget(sectionName) {
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

  // ---------------------------------------------------------------------------
  // SCROLL VERS LES SECTIONS
  // ---------------------------------------------------------------------------

  function getSectionTargetPosition(sectionName) {
    if (sectionName === "home") {
      return 0;
    }

    const target = getSectionNavigationTarget(sectionName);

    if (!target) {
      return null;
    }

    const headerHeight = header.getBoundingClientRect().height;

    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

    return Math.max(0, Math.round(targetPosition));
  }

  function cancelNavigationScroll() {
    navigationRequestId += 1;

    if (navigationAnimationFrameId !== null) {
      cancelAnimationFrame(navigationAnimationFrameId);
      navigationAnimationFrameId = null;
    }
  }

  function scrollToSection(sectionName) {
    const initialTargetPosition = getSectionTargetPosition(sectionName);

    if (initialTargetPosition === null) {
      console.warn(`La section #${sectionName} est introuvable.`);

      return;
    }

    cancelNavigationScroll();

    const requestId = navigationRequestId;
    const startPosition = window.scrollY;
    const initialDistance = Math.abs(initialTargetPosition - startPosition);

    setActiveLink(sectionName);

    if (REDUCED_MOTION_QUERY.matches || initialDistance < 2) {
      window.scrollTo({
        top: initialTargetPosition,
        left: 0,
        behavior: "auto",
      });

      return;
    }

    const duration = Math.min(800, Math.max(350, initialDistance * 0.35));

    const startTime = performance.now();

    function animateNavigationScroll(currentTime) {
      if (requestId !== navigationRequestId) {
        return;
      }

      const currentTargetPosition = getSectionTargetPosition(sectionName);

      if (currentTargetPosition === null) {
        navigationAnimationFrameId = null;

        return;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);

      const easedProgress = 1 - Math.pow(1 - progress, 4);

      const nextPosition =
        startPosition + (currentTargetPosition - startPosition) * easedProgress;

      window.scrollTo({
        top: nextPosition,
        left: 0,
        behavior: "auto",
      });

      if (progress < 1) {
        navigationAnimationFrameId = requestAnimationFrame(
          animateNavigationScroll,
        );

        return;
      }

      navigationAnimationFrameId = null;

      requestAnimationFrame(() => {
        if (requestId !== navigationRequestId) {
          return;
        }

        requestAnimationFrame(() => {
          if (requestId !== navigationRequestId) {
            return;
          }

          const finalTargetPosition = getSectionTargetPosition(sectionName);

          if (finalTargetPosition === null) {
            return;
          }

          window.scrollTo({
            top: finalTargetPosition,
            left: 0,
            behavior: "auto",
          });

          setActiveLink(sectionName);
        });
      });
    }

    navigationAnimationFrameId = requestAnimationFrame(animateNavigationScroll);
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
  // ANNULATION DU SCROLL AUTOMATIQUE EN CAS DE SCROLL MANUEL
  // ---------------------------------------------------------------------------

  window.addEventListener(
    "wheel",
    () => {
      if (navigationAnimationFrameId !== null) {
        cancelNavigationScroll();
      }
    },
    {
      passive: true,
    },
  );

  window.addEventListener(
    "touchstart",
    () => {
      if (navigationAnimationFrameId !== null) {
        cancelNavigationScroll();
      }
    },
    {
      passive: true,
    },
  );

  // ---------------------------------------------------------------------------
  // DÉTECTION DE LA SECTION ACTIVE
  // ---------------------------------------------------------------------------

  const sectionConfiguration = [
    {
      name: "demos",
      element: getSectionNavigationTarget("demos"),
    },
    {
      name: "services",
      element: getSectionNavigationTarget("services"),
    },
    {
      name: "about",
      element: getSectionNavigationTarget("about"),
    },
    {
      name: "contact",
      element: getSectionNavigationTarget("contact"),
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
