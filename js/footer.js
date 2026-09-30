// footer.js

import { initSectionNavigation } from "./navigation.js";

const FOOTER_HTML = `
  <div class="site-footer__desktop">
    <div class="site-footer__main">
      <div class="site-footer__brand">
        <a
          class="site-footer__logo-link"
          href="#home"
          data-section="home"
          aria-label="Retourner en haut de la page"
        >
          <img
            class="site-footer__logo"
            src="./img/Logo.png"
            alt="Logo Elisa.dev"
          />
        </a>

        <p class="site-footer__created-by">
          SITE CRÉÉ PAR
        </p>

        <p class="site-footer__name">
          ELISA DEL PINO
        </p>

        <span
          class="site-footer__brand-line"
          aria-hidden="true"
        ></span>

        <p class="site-footer__tagline">
          DES IDÉES EN SOLUTIONS
        </p>
      </div>

      <nav
        class="site-footer__column"
        aria-label="Navigation du pied de page"
      >
        <h2 class="site-footer__title">
          Navigation
        </h2>

        <span
          class="site-footer__title-line"
          aria-hidden="true"
        ></span>

        <ul class="site-footer__links">
          <li>
            <a
              href="#home"
              data-section="home"
            >
              Accueil
            </a>
          </li>

          <li>
            <a
              href="#demos"
              data-section="demos"
            >
              Démos
            </a>
          </li>

          <li>
            <a
              href="#services"
              data-section="services"
            >
              Services
            </a>
          </li>

          <li>
            <a
              href="#about"
              data-section="about"
            >
              À propos
            </a>
          </li>

          <li>
            <a
              href="#contact"
              data-section="contact"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <nav
        class="site-footer__column"
        aria-label="Aide et informations légales"
      >
        <h2 class="site-footer__title">
          Aide &amp; Légal
        </h2>

        <span
          class="site-footer__title-line"
          aria-hidden="true"
        ></span>

        <ul class="site-footer__links">
          <li>
            <a
              href="./faq.html#top"
              target="_blank"
              rel="noopener noreferrer"
            >
              FAQ
            </a>
          </li>

          <li>
            <a
              href="./mentions-legales.html#top"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mentions légales
            </a>
          </li>

          <li>
            <a
              href="./conditions-generales.html#top"
              target="_blank"
              rel="noopener noreferrer"
            >
              Conditions générales
            </a>
          </li>

          <li>
            <a
              href="./politique-confidentialite.html#top"
              target="_blank"
              rel="noopener noreferrer"
            >
              Politique de confidentialité
            </a>
          </li>

          <li>
            <a
              href="#"
              data-cookie-settings
            >
              Gérer mes cookies
            </a>
          </li>
        </ul>
      </nav>

      <div class="site-footer__column site-footer__contact">
        <h2 class="site-footer__title">
          Restons en contact
        </h2>

        <span
          class="site-footer__title-line"
          aria-hidden="true"
        ></span>

        <p class="site-footer__contact-text">
          Un projet ? Une question ?<br />
          Échangeons ensemble.
        </p>

        <div class="site-footer__contact-actions">
          <a
            class="site-footer__contact-button"
            href="#contact"
            data-section="contact"
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
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
              ></rect>

              <path
                d="m3 7 9 6 9-6"
              ></path>
            </svg>

            <span>
              Me contacter
            </span>

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

            <span>
              06 20 50 42 63
            </span>

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

      <div
        class="site-footer__socials"
        aria-label="Réseaux sociaux"
      >
        <!-- INSTAGRAM -->

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
            ></circle>
          </svg>
        </a>

        <!-- FACEBOOK -->

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

        <!-- LINKEDIN -->

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
        href="#home"
        data-section="home"
        aria-label="Retourner en haut de la page"
      >
        <img
          class="site-footer__logo"
          src="./img/Logo.png"
          alt="Logo Elisa.dev"
        />
      </a>

      <p class="site-footer__mobile-name">
        ELISA DEL PINO
      </p>

      <p class="site-footer__mobile-job">
        DÉVELOPPEMENT WEB SUR MESURE
      </p>

      <span
        class="site-footer__brand-line"
        aria-hidden="true"
      ></span>

      <p class="site-footer__tagline">
        DES IDÉES EN SOLUTIONS
      </p>

      <div
        class="site-footer__socials"
        aria-label="Réseaux sociaux"
      >
        <!-- INSTAGRAM -->

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
            ></circle>
          </svg>
        </a>

        <!-- FACEBOOK -->

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

        <!-- LINKEDIN -->

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
        <summary>
          Navigation
        </summary>

        <ul class="site-footer__mobile-links">
          <li>
            <a
              href="#home"
              data-section="home"
            >
              Accueil
            </a>
          </li>

          <li>
            <a
              href="#demos"
              data-section="demos"
            >
              Démos
            </a>
          </li>

          <li>
            <a
              href="#services"
              data-section="services"
            >
              Services
            </a>
          </li>

          <li>
            <a
              href="#about"
              data-section="about"
            >
              À propos
            </a>
          </li>

          <li>
            <a
              href="#contact"
              data-section="contact"
            >
              Contact
            </a>
          </li>
        </ul>
      </details>

      <details class="site-footer__accordion">
        <summary>
          Aide &amp; Légal
        </summary>

        <ul class="site-footer__mobile-links">
          <li>
            <a href="./faq.html">
              FAQ
            </a>
          </li>

          <li>
            <a href="./mentions-legales.html">
              Mentions légales
            </a>
          </li>

          <li>
            <a href="./conditions-generales.html">
              Conditions générales
            </a>
          </li>

          <li>
            <a href="./politique-confidentialite.html">
              Politique de confidentialité
            </a>
          </li>

          <li>
            <a
              href="#"
              data-cookie-settings
            >
              Gérer mes cookies
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
        Un projet ? Une question ?<br />
        Échangeons ensemble.
      </p>

      <div class="site-footer__contact-actions">
        <a
          class="site-footer__contact-button"
          href="#contact"
          data-section="contact"
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
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
            ></rect>

            <path
              d="m3 7 9 6 9-6"
            ></path>
          </svg>

          <span>
            Me contacter
          </span>

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

          <span>
            06 20 50 42 63
          </span>

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
        © 2026 elisa-dev.<br />
        Tous droits réservés.
      </p>

      <div class="site-footer__mobile-created">
        <span>
          Site créé par elisa-dev
        </span>

        <img
          src="./img/Logo.png"
          alt=""
          aria-hidden="true"
        />
      </div>
    </div>
  </div>
`;

/* ---------------------------------------------------------------------------
   CHARGEMENT DU FOOTER
--------------------------------------------------------------------------- */

export function loadFooterScriptDirect() {
  const footer = document.getElementById("site-footer");

  if (!footer) {
    console.warn("Le conteneur #site-footer est introuvable.");

    return;
  }

  if (footer.dataset.footerLoaded === "true") {
    return;
  }

  /* ---------------------------------------------------------------------------
     HTML DU FOOTER
  --------------------------------------------------------------------------- */

  footer.classList.add("site-footer");

  footer.innerHTML = FOOTER_HTML;

  footer.dataset.footerLoaded = "true";

  /* ---------------------------------------------------------------------------
     NAVIGATION COMMUNE
  --------------------------------------------------------------------------- */

  initSectionNavigation(footer);
}

/* ---------------------------------------------------------------------------
   INITIALISATION
--------------------------------------------------------------------------- */

function initFooter() {
  loadFooterScriptDirect();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFooter, {
    once: true,
  });
} else {
  initFooter();
}
