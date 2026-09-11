import { getDataWeb, getDataAnim } from "./dataDemo.js";
import { openLogicielStockDemo } from "./logicielStock.js";

// -----------------------------------------------------------------------------
// VARIABLES GLOBALES
// -----------------------------------------------------------------------------

let lightboxAnimationInterval = null;
let resizeTimeout = null;
let carouselIsSliding = false;
let lightboxScrollFrame = null;
const lightboxScrollTimeouts = new Set();
let lightboxAutoScrollCancelled = false;

const carouselAnimationIntervals = new Set();
const managedCarouselVideos = new Set();

let videoObserver = null;

const WEBSITE_SHOWCASE_AUTOPLAY_DELAY = 4200;
const SOFTWARE_SHOWCASE_AUTOPLAY_DELAY = 4200;
const SHOWCASE_OUT_DURATION = 220;
const SHOWCASE_IN_DURATION = 420;
const SHOWCASE_EASING = "cubic-bezier(.22,1,.36,1)";

// -----------------------------------------------------------------------------
// INJECTION DU CSS
// -----------------------------------------------------------------------------

if (!document.getElementById("cssStyle")) {
  const style = document.createElement("style");
  style.id = "cssStyle";

  style.textContent = `

  /* =========================================================
     LIGHTBOX
  ========================================================= */

  .overlay {
    position:fixed;
    top:clamp(70px,7vw,100px);
    right:0;
    bottom:0;
    left:0;
    z-index:9998;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:clamp(18px,3vw,46px);
    background:rgba(0,0,0,.96);
    backdrop-filter:blur(7px);
    -webkit-backdrop-filter:blur(7px);
  }

  .lightbox__frame {
    position:relative;
    width:min(94vw,1500px);
    height:min(82vh,800px);
    display:flex;
    flex-direction:column;
    padding:clamp(20px,2.5vw,38px) clamp(18px,2.8vw,44px) clamp(70px,5vw,75px);
    background:radial-gradient(circle at 50% 100%,rgba(184,184,184,.09),transparent 28%),#050608;
    border:1px solid rgba(255,255,255,.22);
    border-radius:6px;
    box-shadow:0 0 30px rgba(0,0,0,.9),inset 0 0 32px rgba(255,255,255,.012);
    overflow:hidden;
  }

  .lightbox__topbar {
    width:100%;
    min-height:clamp(36px,4vw,54px);
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
    flex-shrink:0;
  }

  .lightbox__label {
    display:inline-flex;
    align-items:center;
    gap:clamp(8px,.8vw,12px);
    color:rgba(255,255,255,.78);
    font-family:"Montserrat",Arial,sans-serif;
    font-size:clamp(8px,.95vw,13px);
    font-weight:500;
    letter-spacing:clamp(2px,.28vw,4px);
  }

  .lightbox__label-dot {
    width:8px;
    height:8px;
    flex-shrink:0;
    border-radius:50%;
    background:#b8b8b8;
    box-shadow:0 0 5px rgba(184,184,184,1),0 0 13px rgba(184,184,184,.7);
  }

  .closeButton {
    width:clamp(32px,3.2vw,47px);
    height:clamp(32px,3.2vw,47px);
    display:flex;
    align-items:center;
    justify-content:center;
    padding:0;
    border:0;
    background:transparent;
    color:rgba(255,255,255,.78);
    cursor:pointer;
    transition:color 220ms ease,transform 220ms ease;
  }

  .closeButton svg {
    width:100%;
    height:100%;
  }

  .closeButton:hover {
    color:white;
    transform:rotate(90deg);
  }

  .containerLigthBox {
    position:relative;
    width:100%;
    min-height:0;
    flex:1;
    display:grid;
    grid-template-columns:clamp(34px,4vw,52px) minmax(0,1fr) clamp(34px,4vw,52px);
    align-items:center;
    gap:clamp(10px,1.5vw,22px);
  }

  .divImg {
    position:relative;
    width:100%;
    height:100%;
    min-height:0;
    overflow:auto;
    background:white;
    border:1px solid rgba(255,255,255,.18);
    border-radius:4px;
    overscroll-behavior:contain;
    box-shadow:0 0 14px rgba(255,255,255,.07),0 0 34px rgba(0,0,0,.75);
    scrollbar-width:thin;
    scrollbar-color:rgba(255,255,255,.34) rgba(0,0,0,.15);
  }

  .arrow {
    width:100%;
    height:clamp(48px,6vw,72px);
    display:flex;
    align-items:center;
    justify-content:center;
    padding:0;
    border:1px solid rgba(255,255,255,.35);
    border-radius:2px;
    background:linear-gradient(145deg,rgba(255,255,255,.035),rgba(0,0,0,.98));
    color:rgba(255,255,255,.78);
    font-size:clamp(24px,3vw,38px);
    cursor:pointer;
    transition:border-color 220ms ease,color 220ms ease,background 220ms ease,transform 220ms ease;
  }

  .arrow:hover {
    color:white;
    border-color:rgba(255,255,255,.85);
    background:linear-gradient(145deg,rgba(255,255,255,.09),black);
    transform:scale(1.04);
  }

  .scrollIndicator {
    position:absolute;
    left:50%;
    bottom:30px;
    width:50px;
    height:50px;
    display:flex;
    align-items:center;
    justify-content:center;
    padding-top:clamp(10px,1.5vw,20px);
    transform:translateX(-50%);
    pointer-events:none;
    opacity:1;
    z-index:20;
    transition:opacity 450ms ease;
  }

  .scrollIndicator svg {
    width:40px;
    height:40px;
    color:white;
    filter:drop-shadow(0 0 6px rgba(184,184,184,.9)) drop-shadow(0 0 15px rgba(184,184,184,.55));
    animation:scrollArrow 1.4s infinite;
  }

  @keyframes scrollArrow {
    0% {
      transform:translateY(0);
      opacity:0;
    }

    20% {
      opacity:1;
    }

    60% {
      transform:translateY(12px);
      opacity:1;
    }

    100% {
      transform:translateY(18px);
      opacity:0;
    }
  }

  .colorValue {
    width:clamp(95px,8vw,125px);
    height:clamp(34px,3.5vw,44px);
    padding:0 clamp(10px,1vw,14px);
    border:1px solid rgba(255,255,255,.22);
    border-radius:4px;
    background:linear-gradient(145deg,rgba(255,255,255,.025),rgba(0,0,0,.9));
    color:rgba(255,255,255,.73);
    font-family:monospace;
    font-size:clamp(9px,1vw,14px);
    text-align:center;
    text-transform:uppercase;
    outline:none;
    transition:border-color 220ms ease,box-shadow 220ms ease,color 220ms ease;
  }

  .colorValue:focus {
    border-color:var(--animation-accent);
    box-shadow:0 0 7px color-mix(in srgb,var(--animation-accent) 38%,transparent);
  }

  .colorValue.is-invalid {
    border-color:#ff5c5c;
    color:#ff8a8a;
    box-shadow:0 0 7px rgba(255,92,92,.28);
  }

  @media screen and (max-width:1000px) {
    .containerLigthBox {
      width:80%;
    }
  }

  @media screen and (max-width:700px) {
    .overlay {
      padding:8px;
      top:20px;
    }

    .lightbox__frame {
      width:100%;
      height:75vh;
      padding:15px 9px 12px;
    }

    .containerLigthBox {
      width:100%;
      grid-template-columns:28px minmax(0,1fr) 28px;
      gap:5px;
    }

    .arrow {
      height:48px;
      font-size:22px;
    }

    .lightbox__label {
      font-size:7px;
      letter-spacing:1.5px;
    }

    .scrollIndicator {
      height:48px;
    }
  }

  /* =========================================================
     LIGHTBOX DES ANIMATIONS
  ========================================================= */

  .overlay--animation {
    --animation-accent:#b8b8b8;
  }

  .overlay--animation .lightbox__frame {
    width:min(94vw,1500px);
    height:min(83vh,800px);
    display:flex;
    flex-direction:column;
    padding:clamp(20px,2.5vw,38px) clamp(18px,2.8vw,44px) clamp(22px,2.5vw,36px);
    background:radial-gradient(circle at 50% 105%,color-mix(in srgb,var(--animation-accent) 16%,transparent),transparent 31%),#050608;
    overflow:hidden;
  }

  .overlay--animation .lightbox__label {
    display:inline-flex;
  }

  .overlay--animation .containerLigthBox {
    width:100%!important;
    height:auto!important;
    min-height:0;
    flex:1 1 auto!important;
    display:grid!important;
    grid-template-columns:clamp(36px,4vw,52px) minmax(0,3fr) minmax(270px,.95fr) clamp(36px,4vw,52px)!important;
    grid-template-rows:minmax(0,1fr)!important;
    grid-template-areas:"left preview controls right"!important;
    align-items:stretch!important;
    gap:clamp(12px,1.5vw,22px)!important;
    overflow:hidden;
  }

  .overlay--animation .arrow.left {
    grid-area:left;
    align-self:center;
  }

  .overlay--animation .arrow.right {
    grid-area:right;
    align-self:center;
  }

  .overlay--animation .divImg.animation-preview {
    grid-area:preview;
    width:100%!important;
    height:100%!important;
    min-width:0;
    min-height:0;
    margin:0!important;
  }

  .overlay--animation .divTexte.animation-controls {
    grid-area:controls;
    width:100%!important;
    height:100%!important;
    min-width:0;
    min-height:0;
    margin:0!important;
    display:flex!important;
    flex-direction:column!important;
    overflow-y:auto;
  }

  .overlay--animation .scrollIndicator {
    display:none!important;
  }

  .overlay--web .divTexte {
    display:none!important;
  }

  /* ---------------------------------------------------------
     PRÉVISUALISATION
  ---------------------------------------------------------- */

  .animation-preview {
    position:relative;
    width:100%;
    height:100%;
    min-height:0;
    display:flex!important;
    align-items:center!important;
    justify-content:center!important;
    overflow:hidden!important;
    background:radial-gradient(circle at center,color-mix(in srgb,var(--animation-accent) 13%,transparent),transparent 34%),radial-gradient(ellipse at 50% 115%,color-mix(in srgb,var(--animation-accent) 19%,transparent),transparent 50%),#010105!important;
    border:1px solid rgba(255,255,255,.2)!important;
    border-radius:6px;
    box-shadow:inset 0 0 60px rgba(0,0,0,.78),0 0 26px rgba(0,0,0,.55);
  }

  .animation-preview__content {
    position:relative;
    z-index:5;
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    text-align:center;
  }

  .animation-preview__title {
    font-size:clamp(18px,6vw,60px);
    letter-spacing:3px;
  }

  .animation-preview__particles,
  .animation-preview__stars {
    position:absolute;
    inset:0;
    pointer-events:none;
  }

  .animation-preview__particles {
    z-index:2;
    overflow:hidden;
  }

  .animation-preview__stars {
    opacity:.72;
    background-image:radial-gradient(circle,var(--animation-accent) 0 1px,transparent 1.5px),radial-gradient(circle,var(--animation-accent) 0 1px,transparent 1.5px),radial-gradient(circle,rgba(255,255,255,.7) 0 .7px,transparent 1.2px);
    background-size:67px 79px,103px 91px,137px 121px;
    background-position:5px 13px,31px 51px,77px 19px;
    animation:animationStarsMove 16s linear infinite;
  }

  @keyframes animationStarsMove {
    from {
      background-position:5px 13px,31px 51px,77px 19px;
    }

    to {
      background-position:72px 92px,-72px 142px,214px 140px;
    }
  }

  /* ---------------------------------------------------------
     PANNEAU DE PERSONNALISATION
  ---------------------------------------------------------- */

  .animation-controls {
    width:100%;
    height:100%;
    display:flex!important;
    flex-direction:column;
    gap:clamp(24px,2.7vw,40px);
    padding:clamp(22px,2.4vw,36px) clamp(18px,2vw,30px);
    background:linear-gradient(150deg,color-mix(in srgb,var(--animation-accent) 3.5%,transparent),rgba(4,5,9,.99) 38%);
    border:1px solid color-mix(in srgb,var(--animation-accent) 38%,rgba(255,255,255,.12));
    border-radius:6px;
    box-shadow:inset 0 0 26px rgba(255,255,255,.012);
    overflow-y:auto;
  }

  .animation-control-group {
    width:100%;
    display:flex;
    flex-direction:column;
    gap:clamp(12px,1.3vw,18px);
  }

  .animation-control-label {
    color:color-mix(in srgb,var(--animation-accent) 55%,white);
    font-family:"Montserrat",Arial,sans-serif;
    font-size:clamp(9px,1vw,14px);
    font-weight:500;
    letter-spacing:clamp(1px,.2vw,3px);
  }

  .input__ligthBox__text {
    width:100%;
    height:clamp(46px,5vw,65px);
    padding:0 clamp(14px,1.4vw,20px);
    border:1px solid rgba(255,255,255,.22);
    border-radius:4px;
    background:linear-gradient(145deg,rgba(255,255,255,.025),rgba(0,0,0,.9));
    color:rgba(255,255,255,.92);
    font-family:"Montserrat",Arial,sans-serif;
    font-size:clamp(10px,1.1vw,15px);
    letter-spacing:1.5px;
    outline:none;
    transition:border-color 220ms ease,box-shadow 220ms ease;
  }

  .input__ligthBox__text:focus {
    border-color:var(--animation-accent);
    box-shadow:0 0 7px color-mix(in srgb,var(--animation-accent) 38%,transparent);
  }

  #colorPicker {
    width:100%!important;
    max-width:100%;
    display:flex;
    justify-content:center;
  }

  #colorPicker > div,
  #colorPicker canvas {
    max-width:100%!important;
  }

  .animation-color-value {
    display:flex;
    align-items:center;
    justify-content:center;
    gap:clamp(10px,1vw,14px);
  }

  .animation-color-swatch {
    width:clamp(25px,2.5vw,38px);
    height:clamp(25px,2.5vw,38px);
    flex-shrink:0;
    border-radius:50%;
    background:var(--animation-accent);
    box-shadow:0 0 9px color-mix(in srgb,var(--animation-accent) 52%,transparent);
  }

  .animation-reset-button {
    margin:auto 0 0;
  }

  /* =========================================================
     DÉMOS WEB ET LOGICIELS
  ========================================================= */

  .websites-showcase__feature {
    grid-template-columns:clamp(32px,3.2vw,43px) minmax(0,1fr);
  }

  @media screen and (max-width:900px) {
    .websites-showcase__feature {
      grid-template-columns:clamp(28px,4vw,36px) minmax(0,1fr);
    }
  }

  @media screen and (max-width:650px) {
    .websites-showcase__content {
      align-items:center;
      text-align:center;
    }

    .websites-showcase__title {
      text-align:center;
    }

    .websites-showcase__title::after {
      margin-left:auto;
      margin-right:auto;
    }

    .websites-showcase__features-heading {
      justify-content:center;
      text-align:center;
    }

    .websites-showcase__features {
      justify-items:center;
    }

    .websites-showcase__feature {
      grid-template-columns:38px minmax(0,1fr);
    }

    .websites-showcase__feature-label {
      text-align:center;
    }
  }

  /* =========================================================
     MOBILE ANIMATIONS
  ========================================================= */

  @media screen and (max-width:850px) {
    .overlay--animation {
      padding:6px;
    }

    .overlay--animation .lightbox__frame {
      width:100%;
      height:75vh;
      padding:10px 7px 8px;
      overflow:hidden;
    }

    .overlay--animation .lightbox__topbar {
      min-height:46px;
    }

    .overlay--animation .containerLigthBox {
      width:100%!important;
      height:100%!important;
      min-height:0!important;
      display:grid!important;
      grid-template-columns:32px minmax(0,1fr) 32px!important;
      grid-template-rows:1fr 2fr!important;
      grid-template-areas:"left preview right" ". controls ."!important;
      gap:8px!important;
      align-items:stretch!important;
      overflow:hidden;
    }

    .overlay--animation .divImg.animation-preview {
      grid-area:preview;
      width:100%!important;
      height:100%!important;
      min-width:0;
      min-height:0;
      margin:0!important;
      overflow:hidden!important;
    }

    .overlay--animation .divTexte.animation-controls {
      grid-area:controls;
      width:100%!important;
      height:100%!important;
      min-width:0;
      min-height:0;
      margin:0!important;
      padding:14px 12px;
      display:grid!important;
      grid-template-columns:1fr;
      grid-template-rows:auto minmax(0,1fr) auto;
      gap:15px;
      overflow-y:auto;
      overflow-x:hidden;
    }

    .overlay--animation .arrow.left {
      grid-area:left;
      align-self:center;
    }

    .overlay--animation .arrow.right {
      grid-area:right;
      align-self:center;
    }

    .overlay--animation .arrow {
      width:100%;
      height:46px;
      font-size:22px;
    }

    .overlay--animation .input__ligthBox__text {
      height:46px;
    }

    .overlay--animation .animation-controls {
      scrollbar-width:thin;
    }

    .overlay--animation .animation-reset-button {
      min-height:46px;
      margin-top:10px;
    }

    .overlay--animation .animation-preview__title {
      font-size:clamp(18px,7vw,36px);
    }

    .animation-control-label {
      display:none;
    }

    .overlay--animation .animation-controls > .animation-control-group:first-child {
  width:100%;
  grid-column:1;
  grid-row:1;
}

.overlay--animation .animation-controls > .animation-control-group:nth-child(2) {
  width:100%;
  min-width:0;
  grid-column:1;
  grid-row:2;
  display:grid;
  grid-template-columns:minmax(0,1fr) minmax(0,1fr);
  align-items:center;
  gap:12px;
}

.overlay--animation .animation-controls > .animation-control-group:nth-child(2) #colorPicker {
  grid-column:1;
  grid-row:1;
  width:auto!important;
  max-width:100%;
  margin:0 auto;
  justify-self:center;
  align-self:center;
}

.overlay--animation .animation-controls > .animation-control-group:nth-child(2) .animation-color-value {
  grid-column:2;
  grid-row:1;
  width:100%;
  min-width:0;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:8px;
}

.overlay--animation .animation-color-swatch {
  width:32px;
  height:32px;
  flex:0 0 32px;
}

.overlay--animation .colorValue {
  width:min(100%,105px);
  min-width:0;
  height:40px;
  padding:0 8px;
  font-size:10px;
}

.overlay--animation .animation-reset-button {
  width:100%;
  min-height:46px;
  grid-column:1;
  grid-row:3;
  margin:0;
}

.overlay--animation .animation-control-label {
  display:none;
}
  }

@media screen and (max-width:380px) {
  .overlay--animation .animation-controls > .animation-control-group:nth-child(2) {
    gap:8px;
  }

  .overlay--animation .animation-color-swatch {
    width:28px;
    height:28px;
    flex-basis:28px;
  }

  .overlay--animation .animation-color-value {
    gap:6px;
  }

  .overlay--animation .colorValue {
    width:88px;
    padding:0 5px;
    font-size:9px;
  }
}

`;

  document.head.appendChild(style);
}

// -----------------------------------------------------------------------------
// ÉLÉMENTS DE LA PAGE
// -----------------------------------------------------------------------------

const softwareDemoSources = [
  ...document.querySelectorAll(".software-demo-card"),
];

const track = document.getElementById("demoTrack");

/* =========================================================
   CONTENU DU SLIDER SITES WEB
========================================================= */

const webDemoCardsData = [
  {
    title: "Coiffure",
    image: "./img/siteCoiffure.png",
    alt: "Démonstration d'un site web pour un salon de coiffure",
    features: [
      {
        name: "Prise de rdv",
        icon: "calendar",
      },
      {
        name: "Prestations",
        icon: "scissors",
      },
    ],
  },
  {
    title: "Pâtisserie",
    image: "./img/sitePatisserie.png",
    alt: "Démonstration d'un site web pour une pâtisserie",
    features: [
      {
        name: "Galerie",
        icon: "gallery",
      },
      {
        name: "Animation",
        icon: "animation",
      },
    ],
  },
  {
    title: "E-Commerce",
    image: "./img/siteDeco.png",
    alt: "Démonstration d'un site e-commerce de décoration",
    features: [
      {
        name: "Produits",
        icon: "gallery",
      },
      {
        name: "Panier",
        icon: "cart",
      },
    ],
  },
];

/* =========================================================
   CONTENU DES CARTES LOGICIELS
========================================================= */

const softwareDemoCardsData = [
  {
    key: "stock",

    title: "Gestion de stock",

    features: [
      {
        name: "Gestion produits",

        icon: "box",
      },

      {
        name: "Alertes de stock",

        icon: "alert",
      },
    ],
  },

  {
    key: "quotes",

    title: "Clients & devis",

    features: [
      {
        name: "Répertoire clients",

        icon: "users",
      },

      {
        name: "Devis instantanés",

        icon: "file",
      },
    ],
  },
];

/* =========================================================
   ICÔNES
========================================================= */

function getWebDemoFeatureIcon(icon) {
  if (icon === "calendar") {
    return `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="5"
          width="18"
          height="16"
          rx="2"
        ></rect>

        <path d="M16 3v4"></path>
        <path d="M8 3v4"></path>
        <path d="M3 10h18"></path>

        <path d="M8 14h.01"></path>
        <path d="M12 14h.01"></path>
        <path d="M16 14h.01"></path>

        <path d="M8 17h.01"></path>
        <path d="M12 17h.01"></path>
      </svg>
    `;
  }

  if (icon === "scissors") {
    return `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle
          cx="6"
          cy="7"
          r="3"
        ></circle>

        <circle
          cx="6"
          cy="17"
          r="3"
        ></circle>

        <path
          d="m8.7 8.4 11.3 7.1"
        ></path>

        <path
          d="M8.7 15.6 20 8.5"
        ></path>
      </svg>
    `;
  }

  if (icon === "gallery") {
    return `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="16"
          rx="2"
        ></rect>

        <circle
          cx="9"
          cy="9"
          r="1.5"
        ></circle>

        <path
          d="m4 17 5-5 4 4 2-2 5 5"
        ></path>
      </svg>
    `;
  }

  if (icon === "cart") {
    return `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path
          d="M3 4h2l2.3 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.5L21 7H6"
        ></path>

        <circle
          cx="10"
          cy="20"
          r="1"
        ></circle>

        <circle
          cx="18"
          cy="20"
          r="1"
        ></circle>
      </svg>
    `;
  }

  if (icon === "animation") {
    return `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M4 12h4"></path>
        <path d="M16 12h4"></path>
        <path d="M12 4v4"></path>
        <path d="M12 16v4"></path>

        <circle
          cx="12"
          cy="12"
          r="3"
        ></circle>

        <path d="M6.5 6.5l2.2 2.2"></path>
        <path d="M15.3 15.3l2.2 2.2"></path>
        <path d="M17.5 6.5l-2.2 2.2"></path>
        <path d="M8.7 15.3l-2.2 2.2"></path>
      </svg>
    `;
  }

  if (icon === "box") {
    return `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path
          d="m21 8-9 5-9-5"
        ></path>

        <path
          d="m3 8 9-5 9 5v8l-9 5-9-5Z"
        ></path>

        <path
          d="M12 13v8"
        ></path>
      </svg>
    `;
  }

  if (icon === "alert") {
    return `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path
          d="M12 3 2.8 20h18.4L12 3Z"
        ></path>

        <path
          d="M12 9v5"
        ></path>

        <path
          d="M12 17h.01"
        ></path>
      </svg>
    `;
  }

  if (icon === "users") {
    return `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle
          cx="9"
          cy="8"
          r="3"
        ></circle>

        <path
          d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"
        ></path>

        <path
          d="M16 5.5a3 3 0 0 1 0 5"
        ></path>

        <path
          d="M17 14c2.4.5 4 2.6 4 5"
        ></path>
      </svg>
    `;
  }

  if (icon === "file") {
    return `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path
          d="M6 3h8l4 4v14H6Z"
        ></path>

        <path
          d="M14 3v5h5"
        ></path>

        <path
          d="M9 13h6"
        ></path>

        <path
          d="M9 17h4"
        ></path>
      </svg>
    `;
  }

  return "";
}

/* =========================================================
   SHOWCASES SITES WEB ET LOGICIELS
========================================================= */

const webDemoLightboxTrigger = document.createElement("div");

webDemoLightboxTrigger.classList.add("div-fakeWeb__demo");

function createShowcaseFeatures(features) {
  return features
    .map(
      (feature) => `
        <div class="websites-showcase__feature">
          <div class="shared-icon">
            ${getWebDemoFeatureIcon(feature.icon)}
          </div>

          <span class="websites-showcase__feature-label">
            ${feature.name}
          </span>
        </div>
      `,
    )
    .join("");
}

function createShowcaseMarkup(slides, ariaLabel) {
  const firstSlide = slides[0];

  if (!firstSlide) {
    return "";
  }

  return `
    <div class="websites-showcase__panel">
      <div class="websites-showcase__visual">
        <img
          class="websites-showcase__image"
          src="${firstSlide.image}"
          alt="${firstSlide.alt}"
        >

        <div
          class="websites-showcase__visual-overlay"
          aria-hidden="true"
        ></div>
      </div>

      <div class="websites-showcase__content">
        <h2 class="websites-showcase__title">
          ${firstSlide.title}
        </h2>

        <div
          class="websites-showcase__features-heading"
          aria-hidden="true"
        >
          <span></span>
          <p>FONCTIONNALITÉS</p>
          <span></span>
        </div>

        <div class="websites-showcase__features">
          ${createShowcaseFeatures(firstSlide.features)}
        </div>

        <button
          class="websites-showcase__button shared-button shared-button--arrow"
          type="button"
        >
          <span>TESTER LA DÉMO</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h13"></path>
            <path d="m13 5 7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>

    <div
      class="websites-showcase__dots"
      role="tablist"
      aria-label="${ariaLabel}"
    >
      ${slides
        .map(
          (slide, index) => `
            <button
              class="websites-showcase__dot${index === 0 ? " is-active" : ""}"
              type="button"
              role="tab"
              aria-selected="${index === 0 ? "true" : "false"}"
              aria-label="Voir ${slide.title}"
              data-index="${index}"
            ></button>
          `,
        )
        .join("")}
    </div>
  `;
}

function updateShowcaseDots(dots, index) {
  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === index;

    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-selected", isActive ? "true" : "false");
  });
}

function preloadShowcaseImages(slides) {
  slides.forEach((slide) => {
    if (!slide?.image) {
      return;
    }

    const preloadImage = new Image();

    preloadImage.src = slide.image;
  });
}

function getCircularSlideDirection(currentIndex, targetIndex, total) {
  if (currentIndex === targetIndex || total <= 1) {
    return 1;
  }

  const forwardDistance = (targetIndex - currentIndex + total) % total;
  const backwardDistance = (currentIndex - targetIndex + total) % total;

  return forwardDistance <= backwardDistance ? 1 : -1;
}

function resetShowcaseTransitionStyles(visual, content) {
  [visual, content].forEach((element) => {
    element.style.transition = "";
    element.style.transform = "";
    element.style.opacity = "";
    element.style.willChange = "";
  });
}

function animateShowcaseTransition({
  visual,
  content,
  applySlideContent,
  direction,
}) {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion) {
    applySlideContent();
    resetShowcaseTransitionStyles(visual, content);

    return null;
  }

  const distance = window.innerWidth <= 650 ? 8 : 14;
  const exitDistance = -direction * distance;
  const enterDistance = direction * distance;

  visual.style.willChange = "transform,opacity";
  content.style.willChange = "transform,opacity";

  visual.style.transition = `transform ${SHOWCASE_OUT_DURATION}ms ease,opacity ${SHOWCASE_OUT_DURATION}ms ease`;

  content.style.transition = `transform ${SHOWCASE_OUT_DURATION}ms ease,opacity ${SHOWCASE_OUT_DURATION}ms ease`;

  visual.style.transform = `translate3d(${exitDistance}px,0,0)`;
  visual.style.opacity = "0";

  content.style.transform = `translate3d(${exitDistance}px,0,0)`;
  content.style.opacity = "0";

  return window.setTimeout(() => {
    applySlideContent();

    visual.style.transition = "none";
    content.style.transition = "none";

    visual.style.transform = `translate3d(${enterDistance}px,0,0)`;
    content.style.transform = `translate3d(${enterDistance}px,0,0)`;

    visual.style.opacity = "0";
    content.style.opacity = "0";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        visual.style.transition = `transform ${SHOWCASE_IN_DURATION}ms ${SHOWCASE_EASING},opacity ${SHOWCASE_IN_DURATION}ms ease`;

        content.style.transition = `transform ${SHOWCASE_IN_DURATION}ms ${SHOWCASE_EASING},opacity ${SHOWCASE_IN_DURATION}ms ease`;

        visual.style.transform = "translate3d(0,0,0)";
        visual.style.opacity = "1";

        content.style.transform = "translate3d(0,0,0)";
        content.style.opacity = "1";
      });
    });
  }, SHOWCASE_OUT_DURATION);
}

function initializeShowcase({ showcase, slides, autoplayDelay, onOpen }) {
  if (!showcase || !Array.isArray(slides) || slides.length === 0) {
    return;
  }

  showcase.className = "websites-showcase";
  showcase.innerHTML = createShowcaseMarkup(
    slides,
    "Choisir une démonstration",
  );

  const visual = showcase.querySelector(".websites-showcase__visual");
  const content = showcase.querySelector(".websites-showcase__content");
  const image = showcase.querySelector(".websites-showcase__image");
  const title = showcase.querySelector(".websites-showcase__title");
  const features = showcase.querySelector(".websites-showcase__features");
  const button = showcase.querySelector(".websites-showcase__button");
  const dots = [...showcase.querySelectorAll(".websites-showcase__dot")];

  if (
    !visual ||
    !content ||
    !image ||
    !title ||
    !features ||
    !button ||
    dots.length === 0
  ) {
    return;
  }

  let currentIndex = 0;
  let autoplayInterval = null;
  let transitionTimeout = null;

  preloadShowcaseImages(slides);

  function renderSlide(index, animate = true) {
    const slide = slides[index];

    if (!slide) {
      return;
    }

    clearTimeout(transitionTimeout);
    resetShowcaseTransitionStyles(visual, content);

    const direction = getCircularSlideDirection(
      currentIndex,
      index,
      slides.length,
    );

    const applySlideContent = () => {
      image.src = slide.image;
      image.alt = slide.alt;
      title.textContent = slide.title;
      features.innerHTML = createShowcaseFeatures(slide.features);

      updateShowcaseDots(dots, index);

      currentIndex = index;
    };

    if (!animate) {
      applySlideContent();
      resetShowcaseTransitionStyles(visual, content);

      return;
    }

    transitionTimeout = animateShowcaseTransition({
      visual,
      content,
      applySlideContent,
      direction,
    });
  }

  function goToSlide(index, animate = true) {
    const normalizedIndex = (index + slides.length) % slides.length;

    if (normalizedIndex === currentIndex && animate) {
      return;
    }

    renderSlide(normalizedIndex, animate);
  }

  function stopAutoSlide() {
    if (autoplayInterval !== null) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  function startAutoSlide() {
    stopAutoSlide();

    if (slides.length <= 1) {
      return;
    }

    autoplayInterval = window.setInterval(() => {
      goToSlide(currentIndex + 1);
    }, autoplayDelay);
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.index);

      if (!Number.isFinite(index)) {
        return;
      }

      goToSlide(index);
      startAutoSlide();
    });
  });

  button.addEventListener("click", () => {
    onOpen?.(currentIndex, slides[currentIndex]);
  });

  renderSlide(0, false);
  startAutoSlide();
}

function prepareSoftwareShowcaseData() {
  softwareDemoSources.forEach((item, index) => {
    const data = softwareDemoCardsData[index];

    if (!data) {
      return;
    }

    const currentImage = item.querySelector("img");

    data.image = currentImage?.getAttribute("src") || "";
    data.alt =
      currentImage?.getAttribute("alt") ||
      `Démonstration du logiciel ${data.title}`;
  });
}

function initializeUnifiedShowcases() {
  const websiteShowcase = document.querySelector("#demos .websites-showcase");

  const softwareShowcase = document.querySelector(
    ".section__demo--softwares .demo-softwares__grid",
  );

  prepareSoftwareShowcaseData();

  initializeShowcase({
    showcase: websiteShowcase,
    slides: webDemoCardsData,
    autoplayDelay: WEBSITE_SHOWCASE_AUTOPLAY_DELAY,
    onOpen: (index) => {
      addLigthBox(webDemoLightboxTrigger, index);
    },
  });

  initializeShowcase({
    showcase: softwareShowcase,
    slides: softwareDemoCardsData,
    autoplayDelay: SOFTWARE_SHOWCASE_AUTOPLAY_DELAY,
    onOpen: (index, slide) => {
      if (!slide) {
        return;
      }

      openSoftwareDemo(slide.key);
    },
  });
}

/* =========================================================
   GESTION OPTIMISÉE DES VIDÉOS
========================================================= */

function pauseVideo(video) {
  if (!video) {
    return;
  }

  try {
    video.pause();
  } catch (error) {
    console.warn("Impossible de mettre la vidéo en pause :", error);
  }
}

function playVideo(video) {
  if (!video) {
    return;
  }

  if (
    document.hidden ||
    document.querySelector(".overlay") ||
    carouselIsSliding
  ) {
    pauseVideo(video);

    return;
  }

  const playPromise = video.play();

  if (playPromise !== undefined) {
    playPromise.catch(() => {});
  }
}

function isVideoVisible(video) {
  if (!video) {
    return false;
  }

  const rect = video.getBoundingClientRect();

  if (rect.width === 0 || rect.height === 0) {
    return false;
  }

  const visibleWidth =
    Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0);

  const visibleHeight =
    Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

  return (
    visibleWidth >= rect.width * 0.5 && visibleHeight >= rect.height * 0.35
  );
}

function createVideoObserver() {
  if (videoObserver) {
    return videoObserver;
  }

  videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.35 &&
          !document.hidden &&
          !document.querySelector(".overlay") &&
          !carouselIsSliding
        ) {
          playVideo(video);
        } else {
          pauseVideo(video);
        }
      });
    },
    {
      threshold: [0, 0.35, 0.5, 0.75],

      rootMargin: "40px 0px",
    },
  );

  return videoObserver;
}

function registerCarouselVideo(video) {
  if (!video) {
    return;
  }

  managedCarouselVideos.add(video);

  createVideoObserver().observe(video);
}

function unregisterCarouselVideo(video) {
  if (!video) {
    return;
  }

  pauseVideo(video);

  if (videoObserver) {
    videoObserver.unobserve(video);
  }

  managedCarouselVideos.delete(video);
}

function pauseAllCarouselVideos() {
  managedCarouselVideos.forEach((video) => {
    pauseVideo(video);
  });
}

function updateVisibleCarouselVideos() {
  if (
    document.hidden ||
    document.querySelector(".overlay") ||
    carouselIsSliding
  ) {
    pauseAllCarouselVideos();

    return;
  }

  managedCarouselVideos.forEach((video) => {
    if (isVideoVisible(video)) {
      playVideo(video);
    } else {
      pauseVideo(video);
    }
  });
}

function restartVisibleCarouselVideosFromStart() {
  if (
    document.hidden ||
    document.querySelector(".overlay") ||
    carouselIsSliding
  ) {
    pauseAllCarouselVideos();

    return;
  }

  managedCarouselVideos.forEach((video) => {
    pauseVideo(video);

    if (!isVideoVisible(video)) {
      return;
    }

    const restartAndPlay = () => {
      if (
        document.hidden ||
        document.querySelector(".overlay") ||
        carouselIsSliding ||
        !isVideoVisible(video)
      ) {
        return;
      }

      try {
        video.currentTime = 0;
      } catch {}

      playVideo(video);
    };

    if (video.readyState >= 1) {
      restartAndPlay();
    } else {
      video.addEventListener("loadedmetadata", restartAndPlay, {
        once: true,
      });
    }
  });
}

function cleanupVideosInside(element) {
  if (!element) {
    return;
  }

  const videos = element.querySelectorAll(".demo-carousel__video");

  videos.forEach((video) => {
    unregisterCarouselVideo(video);

    video.removeAttribute("src");

    try {
      video.load();
    } catch {}
  });
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    pauseAllCarouselVideos();
  } else {
    requestAnimationFrame(() => {
      updateVisibleCarouselVideos();
    });
  }
});

/* =========================================================
   HOVER
========================================================= */

function hoverFakeWeb(elements) {
  elements.forEach((element) => {
    if (element.dataset.hoverBound === "true") {
      return;
    }

    element.dataset.hoverBound = "true";

    element.addEventListener("mouseenter", () => {
      const group = element.classList.contains("demo-carousel__item")
        ? document.querySelectorAll("#demoTrack .demo-carousel__item")
        : elements;

      group.forEach((item) => {
        item.classList.remove("big", "little");

        if (item === element) {
          item.classList.add("big");
        } else {
          item.classList.add("little");
        }
      });
    });

    element.addEventListener("mouseleave", () => {
      const group = element.classList.contains("demo-carousel__item")
        ? document.querySelectorAll("#demoTrack .demo-carousel__item")
        : elements;

      group.forEach((item) => {
        item.classList.remove("big", "little");
      });
    });
  });
}

/* =========================================================
   OUVERTURE DES DÉMOS LOGICIELS
========================================================= */

function openSoftwareDemo(software) {
  if (!software) {
    return;
  }

  if (software === "stock") {
    openLogicielStockDemo();

    return;
  }

  if (
    software === "quotes" &&
    typeof window.openLogicielDevisDemo === "function"
  ) {
    window.openLogicielDevisDemo();

    return;
  }

  console.info("La démonstration Clients & devis sera ajoutée prochainement.");
}

/* =========================================================
   PETIT MOUVEMENT AUTOMATIQUE DE LA DÉMO WEB
========================================================= */

function clearLightboxScrollAnimation() {
  lightboxAutoScrollCancelled = true;

  if (lightboxScrollFrame !== null) {
    cancelAnimationFrame(lightboxScrollFrame);

    lightboxScrollFrame = null;
  }

  lightboxScrollTimeouts.forEach((timeoutId) => {
    clearTimeout(timeoutId);
  });

  lightboxScrollTimeouts.clear();
}

function stopLightboxAutoScrollOnUserInteraction(overlay) {
  if (!overlay) {
    return;
  }

  const scrollContainer = overlay.querySelector(".divImg");

  const stopAutoScroll = () => {
    lightboxAutoScrollCancelled = true;

    clearLightboxScrollAnimation();
  };

  scrollContainer?.addEventListener("wheel", stopAutoScroll, {
    passive: true,
    capture: true,
  });

  scrollContainer?.addEventListener("touchstart", stopAutoScroll, {
    passive: true,
    capture: true,
  });

  scrollContainer?.addEventListener("pointerdown", stopAutoScroll, {
    passive: true,
    capture: true,
  });
}

function lightboxTimeout(callback, delay) {
  const timeoutId = window.setTimeout(() => {
    lightboxScrollTimeouts.delete(timeoutId);

    if (lightboxAutoScrollCancelled) {
      return;
    }

    callback();
  }, delay);

  lightboxScrollTimeouts.add(timeoutId);

  return timeoutId;
}

function easeInOutCubic(progress) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function animateLightboxScroll(element, target, duration) {
  return new Promise((resolve) => {
    if (!element || lightboxAutoScrollCancelled) {
      resolve(false);

      return;
    }

    if (lightboxScrollFrame !== null) {
      cancelAnimationFrame(lightboxScrollFrame);

      lightboxScrollFrame = null;
    }

    const startPosition = element.scrollTop;

    const distance = target - startPosition;

    const startTime = performance.now();

    function step(now) {
      if (lightboxAutoScrollCancelled) {
        lightboxScrollFrame = null;

        resolve(false);

        return;
      }

      const elapsed = now - startTime;

      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = easeInOutCubic(progress);

      element.scrollTop = startPosition + distance * easedProgress;

      if (progress < 1) {
        lightboxScrollFrame = requestAnimationFrame(step);

        return;
      }

      lightboxScrollFrame = null;

      resolve(true);
    }

    lightboxScrollFrame = requestAnimationFrame(step);
  });
}

function launchWebPreviewNudge(scrollContainer) {
  clearLightboxScrollAnimation();

  if (!scrollContainer) {
    return;
  }

  lightboxAutoScrollCancelled = false;

  scrollContainer.scrollTop = 0;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion) {
    return;
  }

  lightboxTimeout(async () => {
    if (lightboxAutoScrollCancelled) {
      return;
    }

    const maximumScroll =
      scrollContainer.scrollHeight - scrollContainer.clientHeight;

    const targetScroll = Math.min(300, maximumScroll);

    if (targetScroll <= 0) {
      return;
    }

    const completed = await animateLightboxScroll(
      scrollContainer,
      targetScroll,
      1600,
    );

    if (!completed || lightboxAutoScrollCancelled) {
      return;
    }

    lightboxTimeout(async () => {
      if (lightboxAutoScrollCancelled) {
        return;
      }

      await animateLightboxScroll(scrollContainer, 0, 2100);
    }, 550);
  }, 900);
}

/* =========================================================
   LIGHTBOX
========================================================= */

function addLigthBox(item, index) {
  if (document.querySelector(".overlay")) {
    return;
  }

  let currentIndex = index;

  pauseAllCarouselVideos();

  const overlay = document.createElement("div");

  overlay.classList.add("overlay");

  const isWebPreview = item.classList.contains("div-fakeWeb__demo");

  if (isWebPreview) {
    overlay.classList.add("overlay--web");
  } else {
    overlay.classList.add("overlay--animation");
  }

  overlay.innerHTML = isWebPreview
    ? `
        <div class="lightbox__frame">

          <div class="lightbox__topbar">

            <span class="lightbox__label">

              <span
                class="lightbox__label-dot"
                aria-hidden="true"
              ></span>

              APERÇU INTERACTIF

            </span>

            <button
              class="closeButton"
              type="button"
              aria-label="Fermer l'aperçu"
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>

            </button>

          </div>

          <div class="containerLigthBox">

            <button
              class="arrow left"
              type="button"
              aria-label="Démonstration précédente"
            >
              &#10094;
            </button>

            <div class="divImg"></div>

            <button
              class="arrow right"
              type="button"
              aria-label="Démonstration suivante"
            >
              &#10095;
            </button>

          </div>

          <div
            class="scrollIndicator"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="m6 7 6 6 6-6"
              ></path>

              <path
                d="m6 13 6 6 6-6"
              ></path>
            </svg>
          </div>

          <div class="divTexte"></div>

        </div>
      `
    : `
        <div class="lightbox__frame">

          <div class="lightbox__topbar">

            <span class="lightbox__label">

              <span
                class="lightbox__label-dot"
                aria-hidden="true"
              ></span>

              PERSONNALISEZ VOTRE ANIMATION

            </span>

            <button
              class="closeButton"
              type="button"
              aria-label="Fermer la personnalisation"
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>

            </button>

          </div>

          <div class="containerLigthBox">

            <button
              class="arrow left"
              type="button"
              aria-label="Animation précédente"
            >
              &#10094;
            </button>

            <div class="divImg"></div>

            <div class="divTexte"></div>

            <button
              class="arrow right"
              type="button"
              aria-label="Animation suivante"
            >
              &#10095;
            </button>

          </div>

        </div>
      `;

  document.body.appendChild(overlay);

  if (isWebPreview) {
    stopLightboxAutoScrollOnUserInteraction(overlay);
  }

  addDataLigthBox(item, currentIndex);

  const arrowRight = overlay.querySelector(".arrow.right");

  const arrowLeft = overlay.querySelector(".arrow.left");

  const closeButton = overlay.querySelector(".closeButton");

  blockScroll();

  const data = item.classList.contains("div-fakeWeb__demo")
    ? getDataWeb()
    : getDataAnim();

  arrowRight.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex > data.length - 1) {
      currentIndex = 0;
    }

    addDataLigthBox(item, currentIndex);
  });

  arrowLeft.addEventListener("click", () => {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = data.length - 1;
    }

    addDataLigthBox(item, currentIndex);
  });

  function handleKeyboard(event) {
    switch (event.key) {
      case "ArrowRight":
        arrowRight.click();

        break;

      case "ArrowLeft":
        arrowLeft.click();

        break;

      case "Escape":
        closeLightbox();

        break;
    }
  }

  document.addEventListener("keydown", handleKeyboard);

  function closeLightbox() {
    clearLightboxScrollAnimation();

    clearInterval(lightboxAnimationInterval);

    lightboxAnimationInterval = null;

    document.removeEventListener("keydown", handleKeyboard);

    overlay.remove();

    restoreScroll();

    requestAnimationFrame(() => {
      updateVisibleCarouselVideos();
    });
  }

  closeButton.addEventListener("click", closeLightbox);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeLightbox();
    }
  });
}

function addDataLigthBox(item, index) {
  clearLightboxScrollAnimation();

  clearInterval(lightboxAnimationInterval);

  lightboxAnimationInterval = null;

  const data = item.classList.contains("div-fakeWeb__demo")
    ? getDataWeb()
    : getDataAnim();

  const currentData = data[index];

  if (!currentData) {
    return;
  }

  const overlay = document.querySelector(".overlay");

  if (!overlay) {
    return;
  }

  const divImg = overlay.querySelector(".divImg");

  divImg.innerHTML = "";

  divImg.style.background = "";

  divImg.style.border = "";

  divImg.style.display = "";

  divImg.style.alignItems = "";

  divImg.style.justifyContent = "";

  if (typeof currentData.img === "function") {
    currentData.img(divImg);

    webData(currentData);
  } else {
    divImg.style.background = "";

    divImg.style.border = "";

    divImg.style.overflow = "hidden";

    animData(currentData);
  }
}

function webData(currentData) {
  const overlay = document.querySelector(".overlay");

  if (!overlay) {
    return;
  }

  const divText = overlay.querySelector(".divTexte");

  const divImg = overlay.querySelector(".divImg");

  const containerLigthBox = overlay.querySelector(".containerLigthBox");

  divText.style.display = "none";

  containerLigthBox.style.width = "100%";

  if (!divImg) {
    return;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      launchWebPreviewNudge(divImg);
    });
  });
}

function animData(currentData) {
  const overlay = document.querySelector(".overlay");

  if (!overlay) {
    return;
  }

  const divImg = overlay.querySelector(".divImg");

  const divText = overlay.querySelector(".divTexte");

  const containerLightbox = overlay.querySelector(".containerLigthBox");

  if (!divImg || !divText || !containerLightbox) {
    return;
  }

  const DEFAULT_TEXT = "ANIMATION";

  const DEFAULT_COLOR = "#b8b8b8";

  let currentText = DEFAULT_TEXT;

  let currentColor = DEFAULT_COLOR;

  let h1 = null;

  let colorPicker = null;

  overlay.style.setProperty("--animation-accent", currentColor);

  containerLightbox.classList.add("containerLigthBox--animation");

  divImg.classList.add("animation-preview");

  divText.classList.add("animation-controls");

  divImg.style.width = "";

  divImg.style.height = "";

  divImg.style.display = "";

  divText.style.width = "";

  divText.style.height = "";

  divText.style.display = "";

  divImg.innerHTML = `
    <div
      class="animation-preview__particles"
      aria-hidden="true"
    >
      <span
        class="animation-preview__stars"
      ></span>
    </div>

    <div class="animation-preview__content">

      <h1
        class="animation-preview__title"
      ></h1>

    </div>
  `;

  divText.innerHTML = `
    <div class="animation-control-group">

      <label
        class="animation-control-label"
        for="animationTextInput"
      >
        TEXTE
      </label>

      <input
        id="animationTextInput"
        type="text"
        value="${DEFAULT_TEXT}"
        maxlength="40"
        class="input__ligthBox__text"
        autocomplete="off"
      >

    </div>

    <div class="animation-control-group">

      <span class="animation-control-label">
        COULEUR PRINCIPALE
      </span>

      <div id="colorPicker"></div>

      <div class="animation-color-value">

        <span
          class="animation-color-swatch"
          aria-hidden="true"
        ></span>

        <input
          type="text"
          class="colorValue"
          value="${DEFAULT_COLOR.toUpperCase()}"
          maxlength="7"
          spellcheck="false"
          autocomplete="off"
          aria-label="Code couleur hexadécimal"
        >

      </div>

    </div>

    <button
      class="animation-reset-button shared-button"
      type="button"
    >
      <span>RÉINITIALISER</span>
    </button>
  `;

  function createFreshH1() {
    const content = divImg.querySelector(".animation-preview__content");

    if (!content) {
      return;
    }

    const previousTitle = content.querySelector(".animation-preview__title");

    if (previousTitle) {
      previousTitle.remove();
    }

    h1 = document.createElement("h1");

    h1.className = "animation-preview__title";

    h1.textContent = currentText;

    h1.style.color = currentColor;

    content.prepend(h1);
  }

  function launchAnimation() {
    if (typeof currentData.anim !== "function") {
      return;
    }

    clearInterval(lightboxAnimationInterval);

    createFreshH1();

    currentData.anim(h1);

    lightboxAnimationInterval = window.setInterval(() => {
      createFreshH1();

      currentData.anim(h1);
    }, 5000);
  }

  const inputText = divText.querySelector("#animationTextInput");

  const colorValue = divText.querySelector(".colorValue");

  const colorSwatch = divText.querySelector(".animation-color-swatch");

  const resetButton = divText.querySelector(".animation-reset-button");

  function applyColor(color) {
    currentColor = color;

    overlay.style.setProperty("--animation-accent", currentColor);

    if (colorValue) {
      colorValue.value = currentColor.toUpperCase();
    }

    if (colorSwatch) {
      colorSwatch.style.background = currentColor;
    }

    if (h1) {
      h1.style.color = currentColor;
    }
  }

  function normalizeHexColor(value) {
    let hex = value.trim();

    if (!hex.startsWith("#")) {
      hex = `#${hex}`;
    }

    const isValidHex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);

    return isValidHex ? hex.toUpperCase() : null;
  }

  inputText?.addEventListener("input", () => {
    currentText = inputText.value.trim() || DEFAULT_TEXT;

    launchAnimation();
  });

  resetButton?.addEventListener("click", () => {
    currentText = DEFAULT_TEXT;

    currentColor = DEFAULT_COLOR;

    if (inputText) {
      inputText.value = DEFAULT_TEXT;
    }

    if (colorPicker) {
      colorPicker.color.set(DEFAULT_COLOR);
    }

    applyColor(DEFAULT_COLOR);

    launchAnimation();
  });

  if (typeof iro === "undefined") {
    console.error("iro.js n'est pas chargé.");

    applyColor(DEFAULT_COLOR);

    launchAnimation();

    return;
  }

  const colorPickerWidth = window.matchMedia("(max-width:600px)").matches
    ? 105
    : 140;

  colorPicker = new iro.ColorPicker("#colorPicker", {
    width: colorPickerWidth,

    color: DEFAULT_COLOR,

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.8)",

    layout: [
      {
        component: iro.ui.Box,
      },

      {
        component: iro.ui.Slider,

        options: {
          sliderType: "hue",
        },
      },
    ],
  });

  colorPicker.on("color:change", (color) => {
    applyColor(color.hexString);
  });

  colorPicker.on("input:end", () => {
    launchAnimation();
  });

  applyColor(DEFAULT_COLOR);

  launchAnimation();

  colorValue?.addEventListener("input", () => {
    const validColor = normalizeHexColor(colorValue.value);

    if (!validColor) {
      colorValue.classList.add("is-invalid");

      return;
    }

    colorValue.classList.remove("is-invalid");

    if (colorPicker) {
      colorPicker.color.set(validColor);
    } else {
      applyColor(validColor);

      launchAnimation();
    }
  });

  colorValue?.addEventListener("blur", () => {
    const validColor = normalizeHexColor(colorValue.value);

    if (!validColor) {
      colorValue.value = currentColor.toUpperCase();

      colorValue.classList.remove("is-invalid");

      return;
    }

    colorValue.value = validColor;
  });

  colorValue?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      colorValue.blur();
    }
  });
}

/* =========================================================
   INTERACTIONS DE CLIC
========================================================= */

function bindClickInteractions(elements) {
  hoverFakeWeb(elements);

  elements.forEach((item) => {
    if (item.dataset.clickBound === "true") {
      return;
    }

    item.dataset.clickBound = "true";

    item.addEventListener("click", () => {
      const realIndex = Number(item.dataset.index);

      if (!Number.isFinite(realIndex)) {
        return;
      }

      addLigthBox(item, realIndex);
    });
  });
}

/* =========================================================
   BLOCAGE DU SCROLL
========================================================= */

function blockScroll() {
  const scrollY = window.scrollY;

  document.body.dataset.scrollY = String(scrollY);

  document.body.style.position = "fixed";

  document.body.style.top = `-${scrollY}px`;

  document.body.style.left = "0";

  document.body.style.width = "100%";
}

function restoreScroll() {
  const scrollY = document.body.dataset.scrollY || "0";

  document.body.style.position = "";

  document.body.style.top = "";

  document.body.style.left = "";

  document.body.style.width = "";

  delete document.body.dataset.scrollY;

  window.scrollTo(0, Number(scrollY));
}

/* =========================================================
   DONNÉES DU CARROUSEL
========================================================= */

const items = getDataAnim().map((item, index) => ({
  ...item,

  originalIndex: index,
}));

const ANIMATION_CAROUSEL_PAGE_SIZE = 3;
const ANIMATION_CAROUSEL_AUTOPLAY_DELAY = 8000;
const ANIMATION_CAROUSEL_TRANSITION_DURATION = 650;
const ANIMATION_CAROUSEL_EASING = "cubic-bezier(.22,1,.36,1)";

function buildAnimationPages(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  const pageCount = Math.ceil(data.length / ANIMATION_CAROUSEL_PAGE_SIZE);
  const pages = [];

  for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
    const page = [];

    for (let offset = 0; offset < ANIMATION_CAROUSEL_PAGE_SIZE; offset++) {
      const itemIndex =
        (pageIndex * ANIMATION_CAROUSEL_PAGE_SIZE + offset) % data.length;

      page.push(data[itemIndex]);
    }

    pages.push(page);
  }

  return pages;
}

const animationPages = buildAnimationPages(items);

let animationCarouselPageIndex = 0;
let animationCarouselAutoInterval = null;

/* =========================================================
   INTERVALLES DES APERÇUS
========================================================= */

function clearCarouselAnimationIntervals() {
  carouselAnimationIntervals.forEach((intervalId) => {
    clearInterval(intervalId);
  });

  carouselAnimationIntervals.clear();
}

function cleanupAnimationIntervalsInside(page) {
  if (!page) {
    return;
  }

  const intervalIds = page._carouselIntervalIds;

  if (!Array.isArray(intervalIds)) {
    return;
  }

  intervalIds.forEach((intervalId) => {
    clearInterval(intervalId);

    carouselAnimationIntervals.delete(intervalId);
  });

  page._carouselIntervalIds = [];
}

/* =========================================================
   CRÉATION D'UNE CARTE
========================================================= */

function createAnimationCardElement(item, pageElement) {
  const itemDiv = document.createElement("article");

  itemDiv.className = "demo-carousel__item demo-animation-card";

  itemDiv.dataset.index = String(item.originalIndex);

  itemDiv.tabIndex = 0;

  itemDiv.setAttribute("aria-label", "Voir cette animation interactive");

  const mediaContainer = document.createElement("div");

  mediaContainer.className = "demo-animation-card__media";

  const shine = document.createElement("span");

  shine.className = "demo-animation-card__shine";

  shine.setAttribute("aria-hidden", "true");

  mediaContainer.appendChild(shine);

  if (item.video) {
    const video = document.createElement("video");

    video.className = "demo-carousel__video";

    video.muted = true;

    video.defaultMuted = true;

    video.loop = true;

    video.playsInline = true;

    video.autoplay = false;

    video.preload = "auto";

    video.controls = false;

    video.setAttribute("muted", "");

    video.setAttribute("loop", "");

    video.setAttribute("playsinline", "");

    video.setAttribute("preload", "auto");

    video.setAttribute("aria-hidden", "true");

    video.setAttribute("tabindex", "-1");

    video.disablePictureInPicture = true;

    video.src = item.video;

    mediaContainer.insertBefore(video, shine);

    registerCarouselVideo(video);
  } else if (typeof item.anim === "function") {
    let previewText = null;

    function createFreshPreview() {
      const previousPreview = mediaContainer.querySelector(
        ".demo-carousel__previewText",
      );

      if (previousPreview) {
        previousPreview.remove();
      }

      previewText = document.createElement("h2");

      previewText.className = "demo-carousel__previewText";

      previewText.textContent =
        item.previewText || item.textContent || "ANIMATION";

      previewText.style.color =
        item.previewColor || "rgba(255, 255, 255, 0.85)";

      mediaContainer.insertBefore(previewText, shine);
    }

    function launchPreviewAnimation() {
      createFreshPreview();

      item.anim(previewText);
    }

    launchPreviewAnimation();

    const intervalId = window.setInterval(() => {
      if (
        document.hidden ||
        document.querySelector(".overlay") ||
        carouselIsSliding
      ) {
        return;
      }

      const rect = itemDiv.getBoundingClientRect();

      const isVisible =
        rect.bottom > 0 &&
        rect.top < window.innerHeight &&
        rect.right > 0 &&
        rect.left < window.innerWidth;

      if (isVisible) {
        launchPreviewAnimation();
      }
    }, 5000);

    carouselAnimationIntervals.add(intervalId);

    pageElement._carouselIntervalIds.push(intervalId);
  } else {
    mediaContainer.style.background = item.img || "#050609";
  }

  const actionButton = document.createElement("button");

  actionButton.className =
    "demo-animation-card__button shared-button shared-button--arrow";

  actionButton.type = "button";

  actionButton.setAttribute("aria-label", "Ouvrir cette animation");

  actionButton.innerHTML = `
      <span>
        VOIR L'ANIMATION
      </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path
          d="M5 12h13"
        ></path>

        <path
          d="m13 5 7 7-7 7"
        ></path>
      </svg>
    `;

  itemDiv.appendChild(mediaContainer);

  itemDiv.appendChild(actionButton);

  return itemDiv;
}

/* =========================================================
   CRÉATION D'UNE PAGE DE TROIS ANIMATIONS
========================================================= */

function createAnimationPageElement(pageData) {
  const pageDiv = document.createElement("div");

  pageDiv.className = "demo-carousel__page";

  pageDiv._carouselIntervalIds = [];

  pageData.forEach((item) => {
    const itemDiv = createAnimationCardElement(item, pageDiv);

    pageDiv.appendChild(itemDiv);
  });

  bindClickInteractions(pageDiv.querySelectorAll(".demo-carousel__item"));

  return pageDiv;
}

/* =========================================================
   NETTOYAGE D'UNE PAGE
========================================================= */

function cleanupAnimationPage(page) {
  if (!page) {
    return;
  }

  cleanupAnimationIntervalsInside(page);

  cleanupVideosInside(page);

  page.remove();
}

/* =========================================================
   POINTS DU CARROUSEL
========================================================= */

function getAnimationCarouselSection() {
  return track?.closest(".section__demo.animations") || null;
}

function updateAnimationCarouselDots() {
  const section = getAnimationCarouselSection();

  if (!section) {
    return;
  }

  const dots = section.querySelectorAll(".demo-carousel__dot");

  dots.forEach((dot, index) => {
    const isActive = index === animationCarouselPageIndex;

    dot.classList.toggle("is-active", isActive);

    dot.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

function createAnimationCarouselDots() {
  const section = getAnimationCarouselSection();

  if (!section) {
    return;
  }

  section.querySelector(".demo-carousel__dots")?.remove();

  if (animationPages.length <= 1) {
    return;
  }

  const dotsContainer = document.createElement("div");

  dotsContainer.className = "demo-carousel__dots";

  dotsContainer.setAttribute("aria-label", "Navigation des animations");

  animationPages.forEach((page, index) => {
    const dot = document.createElement("button");

    dot.className = "demo-carousel__dot";

    dot.type = "button";

    dot.dataset.pageIndex = String(index);

    dot.setAttribute(
      "aria-label",
      `Afficher les animations ${index * 3 + 1} à ${index * 3 + 3}`,
    );

    dot.addEventListener("click", () => {
      goToAnimationPage(index);

      restartAnimationCarouselAutoSlide();
    });

    dotsContainer.appendChild(dot);
  });

  const viewport = track?.closest(".demo-carousel__viewport");

  if (viewport) {
    viewport.insertAdjacentElement("afterend", dotsContainer);
  } else {
    section.appendChild(dotsContainer);
  }

  updateAnimationCarouselDots();
}

/* =========================================================
   DÉFILEMENT AUTOMATIQUE
========================================================= */

function stopAnimationCarouselAutoSlide() {
  if (animationCarouselAutoInterval !== null) {
    clearInterval(animationCarouselAutoInterval);

    animationCarouselAutoInterval = null;
  }
}

function startAnimationCarouselAutoSlide() {
  stopAnimationCarouselAutoSlide();

  if (animationPages.length <= 1) {
    return;
  }

  animationCarouselAutoInterval = window.setInterval(() => {
    if (
      document.hidden ||
      document.querySelector(".overlay") ||
      carouselIsSliding
    ) {
      return;
    }

    slideNext(false);
  }, ANIMATION_CAROUSEL_AUTOPLAY_DELAY);
}

function restartAnimationCarouselAutoSlide() {
  startAnimationCarouselAutoSlide();
}

/* =========================================================
   INITIALISATION DU CARROUSEL
========================================================= */

function initCarousel() {
  if (!track || animationPages.length === 0) {
    return;
  }

  carouselIsSliding = false;

  stopAnimationCarouselAutoSlide();

  clearCarouselAnimationIntervals();

  cleanupVideosInside(track);

  track.innerHTML = "";

  animationCarouselPageIndex =
    ((animationCarouselPageIndex % animationPages.length) +
      animationPages.length) %
    animationPages.length;

  const pageElement = createAnimationPageElement(
    animationPages[animationCarouselPageIndex],
  );

  track.appendChild(pageElement);

  track.style.transition = "none";

  track.style.transform = "translateX(0)";

  createAnimationCarouselDots();

  requestAnimationFrame(() => {
    restartVisibleCarouselVideosFromStart();
  });

  startAnimationCarouselAutoSlide();
}

/* =========================================================
   CHANGEMENT DE PAGE
========================================================= */

function slideToAnimationPage(targetIndex, direction = 1) {
  if (!track || carouselIsSliding || animationPages.length <= 1) {
    return;
  }

  const normalizedIndex =
    ((targetIndex % animationPages.length) + animationPages.length) %
    animationPages.length;

  if (normalizedIndex === animationCarouselPageIndex) {
    return;
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  carouselIsSliding = true;
  pauseAllCarouselVideos();

  const currentPage = track.firstElementChild;
  const newPage = createAnimationPageElement(animationPages[normalizedIndex]);

  if (reducedMotion) {
    cleanupAnimationPage(currentPage);

    track.appendChild(newPage);
    track.style.transition = "none";
    track.style.transform = "translate3d(0,0,0)";

    animationCarouselPageIndex = normalizedIndex;
    carouselIsSliding = false;

    updateAnimationCarouselDots();

    requestAnimationFrame(() => {
      restartVisibleCarouselVideosFromStart();
    });

    return;
  }

  let slideFinished = false;
  let fallbackTimeout = null;

  function finishSlide() {
    if (slideFinished) {
      return;
    }

    slideFinished = true;

    if (fallbackTimeout !== null) {
      clearTimeout(fallbackTimeout);
    }

    track.removeEventListener("transitionend", handleTransitionEnd);

    cleanupAnimationPage(currentPage);

    track.style.transition = "none";
    track.style.transform = "translate3d(0,0,0)";

    animationCarouselPageIndex = normalizedIndex;
    carouselIsSliding = false;

    updateAnimationCarouselDots();

    requestAnimationFrame(() => {
      restartVisibleCarouselVideosFromStart();
    });
  }

  function handleTransitionEnd(event) {
    if (event.target !== track || event.propertyName !== "transform") {
      return;
    }

    finishSlide();
  }

  track.addEventListener("transitionend", handleTransitionEnd);

  fallbackTimeout = window.setTimeout(
    finishSlide,
    ANIMATION_CAROUSEL_TRANSITION_DURATION + 180,
  );

  if (direction >= 0) {
    track.appendChild(newPage);

    track.style.transition = "none";
    track.style.transform = "translate3d(0,0,0)";

    void track.offsetWidth;

    track.style.transition = `transform ${ANIMATION_CAROUSEL_TRANSITION_DURATION}ms ${ANIMATION_CAROUSEL_EASING}`;

    requestAnimationFrame(() => {
      track.style.transform = "translate3d(-100%,0,0)";
    });

    return;
  }

  track.prepend(newPage);

  track.style.transition = "none";
  track.style.transform = "translate3d(-100%,0,0)";

  void track.offsetWidth;

  track.style.transition = `transform ${ANIMATION_CAROUSEL_TRANSITION_DURATION}ms ${ANIMATION_CAROUSEL_EASING}`;

  requestAnimationFrame(() => {
    track.style.transform = "translate3d(0,0,0)";
  });
}

/* =========================================================
   SLIDE SUIVANT
========================================================= */

function slideNext(restartAuto = true) {
  if (animationPages.length <= 1) {
    return;
  }

  slideToAnimationPage(animationCarouselPageIndex + 1, 1);

  if (restartAuto) {
    restartAnimationCarouselAutoSlide();
  }
}

/* =========================================================
   SLIDE PRÉCÉDENT
========================================================= */

function slidePrev(restartAuto = true) {
  if (animationPages.length <= 1) {
    return;
  }

  slideToAnimationPage(animationCarouselPageIndex - 1, -1);

  if (restartAuto) {
    restartAnimationCarouselAutoSlide();
  }
}

/* =========================================================
   ACCÈS DIRECT À UNE PAGE
========================================================= */

function goToAnimationPage(pageIndex) {
  if (
    !Number.isFinite(pageIndex) ||
    animationPages.length <= 1 ||
    pageIndex === animationCarouselPageIndex
  ) {
    return;
  }

  const forwardDistance =
    (pageIndex - animationCarouselPageIndex + animationPages.length) %
    animationPages.length;

  const backwardDistance =
    (animationCarouselPageIndex - pageIndex + animationPages.length) %
    animationPages.length;

  const direction = forwardDistance <= backwardDistance ? 1 : -1;

  slideToAnimationPage(pageIndex, direction);
}

/* =========================================================
   ÉCOUTE DU REDIMENSIONNEMENT
========================================================= */

window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);

  resizeTimeout = window.setTimeout(() => {
    updateVisibleCarouselVideos();
  }, 200);
});

/* =========================================================
   INITIALISATION DES SHOWCASES
========================================================= */

initializeUnifiedShowcases();

/* =========================================================
   INITIALISATION DU CARROUSEL
========================================================= */

initCarousel();
