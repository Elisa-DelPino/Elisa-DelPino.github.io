// cookieConsent.js

const CONSENT_KEY = "elisaDevAnalyticsConsent";
const CLARITY_PROJECT_ID = "ynv7op2b6c";

let clarityLoaded = false;

/* =====================================================
   CLARITY
===================================================== */

function loadClarity() {
  if (clarityLoaded || window.clarity) {
    return;
  }

  clarityLoaded = true;

  window.clarity =
    window.clarity ||
    function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };

  const script = document.createElement("script");

  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;

  document.head.appendChild(script);

  window.clarity("consentv2", {
    ad_Storage: "denied",
    analytics_Storage: "granted",
  });
}

/* =====================================================
   CONSENTEMENT
===================================================== */

function saveConsent(value) {
  localStorage.setItem(CONSENT_KEY, value);
}

function acceptAnalytics() {
  saveConsent("accepted");

  loadClarity();

  closeCookieBanner();
}

function refuseAnalytics() {
  saveConsent("refused");

  if (window.clarity) {
    window.clarity("consentv2", {
      ad_Storage: "denied",
      analytics_Storage: "denied",
    });

    window.clarity("consent", false);
  }

  closeCookieBanner();
}

/* =====================================================
   BANDEAU
===================================================== */

function closeCookieBanner() {
  document.querySelector(".cookie-banner")?.remove();
}

function createCookieBanner() {
  if (document.querySelector(".cookie-banner")) {
    return;
  }

  const banner = document.createElement("div");

  banner.className = "cookie-banner";

  banner.innerHTML = `
    <div class="cookie-banner__content">
      <div class="cookie-banner__text">
        <p class="cookie-banner__title">
          Cookies et mesure d’audience
        </p>

        <p class="cookie-banner__description">
          Ce site utilise Microsoft Clarity afin de comprendre la navigation,
          améliorer l’ergonomie et détecter d’éventuels problèmes.
          Vous pouvez accepter ou refuser ces traceurs.
        </p>
      </div>

      <div class="cookie-banner__actions">
        <button
          type="button"
          class="cookie-banner__button"
          data-cookie-refuse
        >
          Tout refuser
        </button>

        <button
          type="button"
          class="cookie-banner__button"
          data-cookie-accept
        >
          Tout accepter
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(banner);

  banner
    .querySelector("[data-cookie-refuse]")
    .addEventListener("click", refuseAnalytics);

  banner
    .querySelector("[data-cookie-accept]")
    .addEventListener("click", acceptAnalytics);
}

/* =====================================================
   GESTION DES COOKIES
===================================================== */

function openCookieSettings() {
  localStorage.removeItem(CONSENT_KEY);

  createCookieBanner();
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-cookie-settings]");

  if (!button) {
    return;
  }

  event.preventDefault();

  openCookieSettings();
});

/* =====================================================
   INITIALISATION
===================================================== */

function initCookieConsent() {
  const consent = localStorage.getItem(CONSENT_KEY);

  if (consent === "accepted") {
    loadClarity();

    return;
  }

  if (consent === "refused") {
    return;
  }

  createCookieBanner();
}

document.addEventListener("DOMContentLoaded", initCookieConsent);
