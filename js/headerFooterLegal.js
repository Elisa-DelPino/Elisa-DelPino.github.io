const LEGAL_HEADER_HTML = `
  <div class="header__left">
    <div class="header__logo">
      <a href="/" aria-label="Retourner à l'accueil">
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
        <a href="/">Accueil</a>
      </li>

      <li class="header__nav__menu__link">
        <a href="/#demos">Démos</a>
      </li>

      <li class="header__nav__menu__link">
        <a href="/#services">Services</a>
      </li>

      <li class="header__nav__menu__link">
        <a href="/#about">À propos</a>
      </li>

      <li class="header__nav__menu__link">
        <a href="/#contact">Contact</a>
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
              <use href="/img/icons.svg#instagram"></use>
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
              <use href="/img/icons.svg#facebook"></use>
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
              <use href="/img/icons.svg#linkedin"></use>
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
          href="/#home"
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
            <a href="/">Accueil</a>
          </li>

          <li>
            <a href="/#demos">Démos</a>
          </li>

          <li>
            <a href="/#services">Services</a>
          </li>

          <li>
            <a href="/#about">À propos</a>
          </li>

          <li>
            <a href="/#contact">Contact</a>
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
            <a href="/faq#top" data-legal-page="faq.html">
              FAQ
            </a>
          </li>

          <li>
            <a
              href="/mentions-legales#top"
              data-legal-page="mentions-legales.html"
            >
              Mentions légales
            </a>
          </li>

          <li>
            <a
              href="/conditions-generales#top"
              data-legal-page="conditions-generales.html"
            >
              Conditions générales
            </a>
          </li>

          <li>
            <a
              href="/politique-confidentialite#top"
              data-legal-page="politique-confidentialite.html"
            >
              Politique de confidentialité
            </a>
          </li>
          <li>
            <a href="#" data-cookie-settings>
              Gérer mes cookies
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
            href="mailto:contact.elisadev@gmail.com"
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
            <use href="/img/icons.svg#instagram"></use>
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
            <use href="/img/icons.svg#facebook"></use>
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
        href="/#home"
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
            <use href="/img/icons.svg#instagram"></use>
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
            <use href="/img/icons.svg#facebook"></use>
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
            <use href="/img/icons.svg#linkedin"></use>
          </svg>
        </a>
      </div>
    </div>

    <div class="site-footer__accordions">
      <details class="site-footer__accordion">
        <summary>Navigation</summary>

        <ul class="site-footer__mobile-links">
          <li>
            <a href="/">Accueil</a>
          </li>

          <li>
            <a href="/#demos">Démos</a>
          </li>

          <li>
            <a href="/#services">Services</a>
          </li>

          <li>
            <a href="/#about">À propos</a>
          </li>

          <li>
            <a href="/#contact">Contact</a>
          </li>
        </ul>
      </details>

      <details class="site-footer__accordion">
        <summary>Aide &amp; Légal</summary>

        <ul class="site-footer__mobile-links">
          <li>
            <a href="/faq#top" data-legal-page="faq.html">
              FAQ
            </a>
          </li>

          <li>
            <a
              href="/mentions-legales#top"
              data-legal-page="mentions-legales.html"
            >
              Mentions légales
            </a>
          </li>

          <li>
            <a
              href="/conditions-generales#top"
              data-legal-page="conditions-generales.html"
            >
              Conditions générales
            </a>
          </li>

          <li>
            <a
              href="/politique-confidentialite#top"
              data-legal-page="politique-confidentialite.html"
            >
              Politique de confidentialité
            </a>
          </li>
           <li>
            <a href="#" data-cookie-settings>
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
        Un projet ? Une question ?<br>
        Échangeons ensemble.
      </p>

      <div class="site-footer__contact-actions">
        <a
          class="site-footer__contact-button"
          href="mailto:contact.elisadev@gmail.com"
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
            <use href="/img/icons.svg#arrow-right"></use>
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
  const currentPage = (
    window.location.pathname.split("/").pop() || "index"
  ).replace(/\.html$/, "");

  const legalLinks = document.querySelectorAll("[data-legal-page]");

  legalLinks.forEach((link) => {
    const linkedPage = link.dataset.legalPage.replace(/\.html$/, "");

    if (linkedPage === currentPage) {
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

    window.location.assign(link.href);
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
