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
              href="/faq#top"
              target="_blank"
              rel="noopener noreferrer"
            >
              FAQ
            </a>
          </li>

          <li>
            <a
              href="/mentions-legales#top"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mentions légales
            </a>
          </li>

          <li>
            <a
              href="/conditions-generales#top"
              target="_blank"
              rel="noopener noreferrer"
            >
              Conditions générales
            </a>
          </li>

          <li>
            <a
              href="/politique-confidentialite#top"
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
              <use href="/img/icons.svg#email"></use>
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
              <use href="/img/icons.svg#arrow-right"></use>
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
              <use href="/img/icons.svg#phone"></use>
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
              <use href="/img/icons.svg#arrow-right"></use>
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
            <use href="/img/icons.svg#instagram"></use>
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
            <use href="/img/icons.svg#facebook"></use>
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
            <use href="/img/icons.svg#linkedin"></use>
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
            <use href="/img/icons.svg#instagram"></use>
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
            <use href="/img/icons.svg#facebook"></use>
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
            <use href="/img/icons.svg#linkedin"></use>
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
            <a href="/faq">
              FAQ
            </a>
          </li>

          <li>
            <a href="/mentions-legales">
              Mentions légales
            </a>
          </li>

          <li>
            <a href="/conditions-generales">
              Conditions générales
            </a>
          </li>

          <li>
            <a href="/politique-confidentialite">
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
            <use href="/img/icons.svg#email"></use>
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
            <use href="/img/icons.svg#arrow-right"></use>
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
            <use href="/img/icons.svg#phone"></use>
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
            <use href="/img/icons.svg#arrow-right"></use>
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
