const LEGAL_HEADER_HTML = `
  <div class="header__left">
    <div class="header__logo">
      <a href="./index.html" aria-label="Retourner à l'accueil">
        <img src="./img/Logo.png" alt="Logo Elisa.dev">
      </a>
    </div>
    <div class="header__title">
      <span class="header__neon-title">
        CRÉATION SITE &amp; LOGICIEL
      </span>
    </div>
  </div>

  <nav class="header__nav" aria-label="Navigation principale">
    <ul class="header__nav__menu">
      <li class="header__nav__menu__link">
        <a href="./index.html">Accueil</a>
      </li>

      <li class="header__nav__menu__link">
        <a href="./index.html#demos">Démos</a>
      </li>

      <li class="header__nav__menu__link">
        <a href="./index.html#services">Services</a>
      </li>

      <li class="header__nav__menu__link">
        <a href="./index.html#about">À propos</a>
      </li>

      <li class="header__nav__menu__link">
        <a href="./index.html#contact">Contact</a>
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
          <a
            href="#"
            class="header__reseauxPopupLink"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Elisa.Dev"
          >
            <svg
              class="header__reseauxPopupIcon header__reseauxPopupIcon--instagram"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5"></rect>
              <circle cx="12" cy="12" r="4"></circle>
              <circle
                cx="17.5"
                cy="6.5"
                r="1"
                class="header__reseauxIconDot"
              ></circle>
            </svg>
          </a>

          <a
            href="#"
            class="header__reseauxPopupLink"
            target="_blank"
            rel="noopener noreferrer"
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

          <a
            href="#"
            class="header__reseauxPopupLink"
            target="_blank"
            rel="noopener noreferrer"
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

const LEGAL_FOOTER_HTML = `
  <div class="site-footer__desktop">
    <div class="site-footer__main">
      <div class="site-footer__brand">
        <a
          class="site-footer__logo-link"
          href="./index.html#home"
          aria-label="Retourner à l'accueil"
        >
          <img
            class="site-footer__logo"
            src="./img/Logo.png"
            alt="Logo Elisa.dev"
          >
        </a>

        <p class="site-footer__created-by">SITE CRÉÉ PAR</p>
        <p class="site-footer__name">ELISA DEL PINO</p>

        <span class="site-footer__brand-line" aria-hidden="true"></span>

        <p class="site-footer__tagline">DES IDÉES EN SOLUTIONS</p>
      </div>

      <nav
        class="site-footer__column"
        aria-label="Navigation du pied de page"
      >
        <h2 class="site-footer__title">Navigation</h2>

        <span class="site-footer__title-line" aria-hidden="true"></span>

        <ul class="site-footer__links">
          <li>
            <a href="./index.html">Accueil</a>
          </li>

          <li>
            <a href="./index.html#demos">Démos</a>
          </li>

          <li>
            <a href="./index.html#services">Services</a>
          </li>

          <li>
            <a href="./index.html#about">À propos</a>
          </li>

          <li>
            <a href="./index.html#contact">Contact</a>
          </li>
        </ul>
      </nav>

      <nav
        class="site-footer__column"
        aria-label="Aide et informations légales"
      >
        <h2 class="site-footer__title">Aide &amp; Légal</h2>

        <span class="site-footer__title-line" aria-hidden="true"></span>

        <ul class="site-footer__links">
          <li>
            <a href="./faq.html#top" data-legal-page="faq.html">
              FAQ
            </a>
          </li>

          <li>
            <a
              href="./mentions-legales.html#top"
              data-legal-page="mentions-legales.html"
            >
              Mentions légales
            </a>
          </li>

          <li>
            <a
              href="./conditions-generales.html#top"
              data-legal-page="conditions-generales.html"
            >
              Conditions générales
            </a>
          </li>

          <li>
            <a
              href="./politique-confidentialite.html#top"
              data-legal-page="politique-confidentialite.html"
            >
              Politique de confidentialité
            </a>
          </li>
        </ul>
      </nav>

      <div class="site-footer__column site-footer__contact">
        <h2 class="site-footer__title">Restons en contact</h2>

        <span class="site-footer__title-line" aria-hidden="true"></span>

        <p class="site-footer__contact-text">
          Un projet ? Une question ?<br>
          Échangeons ensemble.
        </p>

        <div class="site-footer__contact-actions">
          <a
            class="site-footer__contact-button"
            href="mailto:delpino.elisa@gmail.com"
          >
            <svg
              class="site-footer__contact-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2"></rect>
              <path d="m3 7 9 6 9-6"></path>
            </svg>

            <span>Me contacter</span>

            <svg
              class="site-footer__contact-arrow"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h13"></path>
              <path d="m13 5 7 7-7 7"></path>
            </svg>
          </a>

          <a
            class="site-footer__contact-button site-footer__contact-button--phone"
            href="tel:+33620504263"
          >
            <svg
              class="site-footer__contact-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.89.33 1.76.63 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.48-1.15a2 2 0 0 1 2.11-.45c.84.3 1.71.51 2.6.63A2 2 0 0 1 22 16.92z"
              ></path>
            </svg>

            <span>06 20 50 42 63</span>

            <svg
              class="site-footer__contact-arrow"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h13"></path>
              <path d="m13 5 7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div class="site-footer__bottom">
      <p class="site-footer__copyright">
        © 2026 elisa-dev. Tous droits réservés.
      </p>

      <p class="site-footer__signature">
        Développement web sur mesure
        <span aria-hidden="true">—</span>
        Des idées en solutions
      </p>

      <div class="site-footer__socials" aria-label="Réseaux sociaux">
        <a
          href="#"
          class="shared-icon site-footer__social-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="5"></rect>
            <circle cx="12" cy="12" r="4"></circle>
            <circle cx="17.5" cy="6.5" r="1"></circle>
          </svg>
        </a>

        <a
          href="#"
          class="shared-icon site-footer__social-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M13.7 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5H17V4.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H8V14h2.6v8h3.1Z"
            ></path>
          </svg>
        </a>

        <a
          href="#"
          class="shared-icon site-footer__social-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M6.5 8.1H3.2V21h3.3V8.1ZM4.8 3A1.9 1.9 0 1 0 4.8 6.8 1.9 1.9 0 0 0 4.8 3ZM21 13.6c0-3.9-2.1-5.8-4.9-5.8-2.3 0-3.3 1.3-3.9 2.1V8.1H9V21h3.3v-6.4c0-1.7.3-3.3 2.4-3.3 2.1 0 2.1 1.9 2.1 3.4V21H20v-7.4Z"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  </div>

  <div class="site-footer__mobile">
    <div class="site-footer__mobile-brand">
      <a
        class="site-footer__logo-link"
        href="./index.html#home"
        aria-label="Retourner à l'accueil"
      >
        <img
          class="site-footer__logo"
          src="./img/Logo.png"
          alt="Logo Elisa.dev"
        >
      </a>

      <p class="site-footer__mobile-name">ELISA DEL PINO</p>

      <p class="site-footer__mobile-job">
        DÉVELOPPEMENT WEB SUR MESURE
      </p>

      <span class="site-footer__brand-line" aria-hidden="true"></span>

      <p class="site-footer__tagline">DES IDÉES EN SOLUTIONS</p>

      <div class="site-footer__socials" aria-label="Réseaux sociaux">
        <a
          href="#"
          class="shared-icon site-footer__social-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="5"></rect>
            <circle cx="12" cy="12" r="4"></circle>
            <circle cx="17.5" cy="6.5" r="1"></circle>
          </svg>
        </a>

        <a
          href="#"
          class="shared-icon site-footer__social-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M13.7 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5H17V4.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H8V14h2.6v8h3.1Z"
            ></path>
          </svg>
        </a>

        <a
          href="#"
          class="shared-icon site-footer__social-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M6.5 8.1H3.2V21h3.3V8.1ZM4.8 3A1.9 1.9 0 1 0 4.8 6.8 1.9 1.9 0 0 0 4.8 3ZM21 13.6c0-3.9-2.1-5.8-4.9-5.8-2.3 0-3.3 1.3-3.9 2.1V8.1H9V21h3.3v-6.4c0-1.7.3-3.3 2.4-3.3 2.1 0 2.1 1.9 2.1 3.4V21H20v-7.4Z"
            ></path>
          </svg>
        </a>
      </div>
    </div>

    <div class="site-footer__accordions">
      <details class="site-footer__accordion">
        <summary>Navigation</summary>

        <ul class="site-footer__mobile-links">
          <li>
            <a href="./index.html">Accueil</a>
          </li>

          <li>
            <a href="./index.html#demos">Démos</a>
          </li>

          <li>
            <a href="./index.html#services">Services</a>
          </li>

          <li>
            <a href="./index.html#about">À propos</a>
          </li>

          <li>
            <a href="./index.html#contact">Contact</a>
          </li>
        </ul>
      </details>

      <details class="site-footer__accordion">
        <summary>Aide &amp; Légal</summary>

        <ul class="site-footer__mobile-links">
          <li>
            <a href="./faq.html#top" data-legal-page="faq.html">
              FAQ
            </a>
          </li>

          <li>
            <a
              href="./mentions-legales.html#top"
              data-legal-page="mentions-legales.html"
            >
              Mentions légales
            </a>
          </li>

          <li>
            <a
              href="./conditions-generales.html#top"
              data-legal-page="conditions-generales.html"
            >
              Conditions générales
            </a>
          </li>

          <li>
            <a
              href="./politique-confidentialite.html#top"
              data-legal-page="politique-confidentialite.html"
            >
              Politique de confidentialité
            </a>
          </li>
        </ul>
      </details>
    </div>

    <div class="site-footer__mobile-contact">
      <h2 class="site-footer__mobile-contact-title">
        Restons en contact
      </h2>

      <span
        class="site-footer__mobile-contact-line"
        aria-hidden="true"
      ></span>

      <p>
        Un projet ? Une question ?<br>
        Échangeons ensemble.
      </p>

      <div class="site-footer__contact-actions">
        <a
          class="site-footer__contact-button"
          href="mailto:delpino.elisa@gmail.com"
        >
          <svg
            class="site-footer__contact-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2"></rect>
            <path d="m3 7 9 6 9-6"></path>
          </svg>

          <span>Me contacter</span>

          <svg
            class="site-footer__contact-arrow"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h13"></path>
            <path d="m13 5 7 7-7 7"></path>
          </svg>
        </a>

        <a
          class="site-footer__contact-button site-footer__contact-button--phone"
          href="tel:+33620504263"
        >
          <svg
            class="site-footer__contact-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.89.33 1.76.63 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.48-1.15a2 2 0 0 1 2.11-.45c.84.3 1.71.51 2.6.63A2 2 0 0 1 22 16.92z"
            ></path>
          </svg>

          <span>06 20 50 42 63</span>

          <svg
            class="site-footer__contact-arrow"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h13"></path>
            <path d="m13 5 7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>

    <div class="site-footer__mobile-bottom">
      <p>
        © 2026 elisa-dev.<br>
        Tous droits réservés.
      </p>

      <div class="site-footer__mobile-created">
        <span>Site créé par elisa-dev</span>

        <img src="./img/Logo.png" alt="" aria-hidden="true">
      </div>
    </div>
  </div>
`;

function setCurrentLegalPage() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const legalLinks = document.querySelectorAll("[data-legal-page]");

  legalLinks.forEach((link) => {
    if (link.dataset.legalPage === currentPage) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function initLegalHeaderSocial() {
  const reseauxMenu = document.querySelector(".header__nav__menu__reseaux");

  const reseauxButton = document.querySelector(".header__reseauxButton");

  const reseauxPopup = document.querySelector(".header__reseauxPopup");

  function setReseauxPopupOpen(isOpen) {
    if (!reseauxMenu || !reseauxButton || !reseauxPopup) {
      return;
    }

    reseauxMenu.classList.toggle("is-open", isOpen);

    reseauxButton.setAttribute("aria-expanded", String(isOpen));

    reseauxPopup.setAttribute("aria-hidden", String(!isOpen));
  }

  reseauxButton?.addEventListener("click", (event) => {
    event.preventDefault();

    event.stopPropagation();

    setReseauxPopupOpen(!reseauxMenu.classList.contains("is-open"));
  });

  document.addEventListener("click", (event) => {
    if (!reseauxMenu || reseauxMenu.contains(event.target)) {
      return;
    }

    setReseauxPopupOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setReseauxPopupOpen(false);
    }
  });
}

function initLegalPageNavigation() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-legal-page]");

    if (!link) {
      return;
    }

    if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
      return;
    }

    event.preventDefault();

    window.location.replace(link.href);
  });
}

function initHeaderFooterLegal() {
  const header = document.getElementById("legal-header");

  const footer = document.getElementById("legal-footer");

  if (!header || !footer) {
    console.warn(
      "Le header ou le footer commun des pages légales est introuvable.",
    );

    return;
  }

  header.classList.add("header");

  footer.classList.add("site-footer");

  header.innerHTML = LEGAL_HEADER_HTML;

  footer.innerHTML = LEGAL_FOOTER_HTML;

  setCurrentLegalPage();

  initLegalHeaderSocial();

  initLegalPageNavigation();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHeaderFooterLegal);
} else {
  initHeaderFooterLegal();
}
