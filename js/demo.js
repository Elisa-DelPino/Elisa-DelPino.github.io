import { getDataWeb, getDataAnim } from "./dataDemo.js";

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

// -----------------------------------------------------------------------------
// INJECTION DU CSS
// -----------------------------------------------------------------------------

if (!document.getElementById("cssStyle")) {
  const style = document.createElement("style");
  style.id = "cssStyle";

  style.textContent = `
    .big {
      transform: scale(1.05);
      opacity: 1;
    }

    .little {
      opacity: 0.5;
      transform: scale(0.95);
    }

    /* ---------------------------------------------------------
   FOND DE LA LIGHTBOX
---------------------------------------------------------- */

.overlay {
  position: fixed;
  inset: 0;

  z-index: 9998;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: clamp(18px, 3vw, 46px);

  /*
   * Fond nettement plus opaque :
   * on ne distingue quasiment plus le site situé derrière.
   */
  background: rgba(0, 0, 0, 0.96);

  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
}

/* ---------------------------------------------------------
   GRAND CADRE NOIR
---------------------------------------------------------- */

.lightbox__frame {
  position: relative;

  width: min(94vw, 1500px);
  height: min(92vh, 930px);

  display: flex;
  flex-direction: column;

  padding:
    clamp(20px, 2.5vw, 38px)
    clamp(18px, 2.8vw, 44px)
    clamp(70px, 5vw, 75px);

  background:
    radial-gradient(
      circle at 50% 100%,
      rgba(162, 64, 223, 0.09),
      transparent 28%
    ),
    #050608;

  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 6px;

  box-shadow:
    0 0 30px rgba(0, 0, 0, 0.9),
    inset 0 0 32px rgba(255, 255, 255, 0.012);

  overflow: hidden;
}

/* ---------------------------------------------------------
   BARRE SUPÉRIEURE
---------------------------------------------------------- */

.lightbox__topbar {
  width: 100%;
  min-height: clamp(36px, 4vw, 54px);

  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  flex-shrink: 0;
}

.lightbox__label {
  display: inline-flex;
  align-items: center;

  gap: clamp(8px, 0.8vw, 12px);

  color: rgba(255, 255, 255, 0.78);

  font-family:
    "Montserrat",
    Arial,
    sans-serif;

  font-size: clamp(8px, 0.95vw, 13px);
  font-weight: 500;

  letter-spacing: clamp(2px, 0.28vw, 4px);
}

.lightbox__label-dot {
  width: 8px;
  height: 8px;

  flex-shrink: 0;

  border-radius: 50%;

  background: var(--other-color);

  box-shadow:
    0 0 5px rgba(162, 64, 223, 1),
    0 0 13px rgba(162, 64, 223, 0.7);
}

/* ---------------------------------------------------------
   CROIX
---------------------------------------------------------- */

.closeButton {
  width: clamp(32px, 3.2vw, 47px);
  height: clamp(32px, 3.2vw, 47px);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: 0;
  background: transparent;

  color: rgba(255, 255, 255, 0.78);

  cursor: pointer;

  transition:
    color 220ms ease,
    transform 220ms ease;
}

.closeButton svg {
  width: 100%;
  height: 100%;
}

.closeButton:hover {
  color: white;
  transform: rotate(90deg);
}

/* ---------------------------------------------------------
   CONTENU CENTRAL
---------------------------------------------------------- */

.containerLigthBox {
  position: relative;

  width: 100%;
  min-height: 0;

  flex: 1;

  display: grid;
  grid-template-columns:
    clamp(34px, 4vw, 52px)
    minmax(0, 1fr)
    clamp(34px, 4vw, 52px);

  align-items: center;

  gap: clamp(10px, 1.5vw, 22px);
}

/* ---------------------------------------------------------
   SITE SCROLLABLE
---------------------------------------------------------- */

.divImg {
  position: relative;

  width: 100%;
  height: 100%;
  min-height: 0;

  overflow: auto;

  background: white;

  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 4px;

  overscroll-behavior: contain;

  box-shadow:
    0 0 14px rgba(255, 255, 255, 0.07),
    0 0 34px rgba(0, 0, 0, 0.75);

  scrollbar-width: thin;
  scrollbar-color:
    rgba(255, 255, 255, 0.34)
    rgba(0, 0, 0, 0.15);
}

/* ---------------------------------------------------------
   FLÈCHES LATÉRALES
---------------------------------------------------------- */

.arrow {
  width: 100%;
  height: clamp(48px, 6vw, 72px);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 2px;

  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.035),
      rgba(0, 0, 0, 0.98)
    );

  color: rgba(255, 255, 255, 0.78);

  font-size: clamp(24px, 3vw, 38px);

  cursor: pointer;

  transition:
    border-color 220ms ease,
    color 220ms ease,
    background 220ms ease,
    transform 220ms ease;
}

.arrow:hover {
  color: white;

  border-color: rgba(255, 255, 255, 0.85);

  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.09),
      black
    );

  transform: scale(1.04);
}

/* ---------------------------------------------------------
   INDICATEUR DE SCROLL
---------------------------------------------------------- */

.scrollIndicator {
  position: absolute;

  left: 50%;
  bottom: 0;
  padding-top: clamp(10px, 1.5vw, 20px);

  transform: translateX(-50%);

  width: clamp(48px, 6vw, 75px);
  height: clamp(48px, 6vw, 75px);

  display: flex;
  align-items: center;
  justify-content: center;

  pointer-events: none;

  opacity: 1;

  z-index: 20;

  transition: opacity 450ms ease;
}

.scrollIndicator svg {
  width: clamp(28px, 3.2vw, 45px);
  height: clamp(28px, 3.2vw, 45px);

  color: rgba(255, 255, 255, 0.88);

  filter:
    drop-shadow(0 0 4px rgba(162, 64, 223, 0.9))
    drop-shadow(0 0 11px rgba(162, 64, 223, 0.55));

  animation:
    lightboxScrollIndicator 1.8s ease-in-out infinite;
}


@keyframes lightboxScrollIndicator {
  0%,
  100% {
    transform: translateY(-5px);
    opacity: 0.45;
  }

  50% {
    transform: translateY(7px);
    opacity: 1;
  }
}

/*
 * Les animations personnalisables gardent leur panneau
 * latéral, mais n'affichent ni le label ni la flèche basse.
 */

.overlay--animation .scrollIndicator {
  display: none;
}

.overlay--animation .lightbox__frame {
  width: min(94vw, 1450px);
}

/* ---------------------------------------------------------
   RESPONSIVE
---------------------------------------------------------- */

@media screen and (max-width: 700px) {
  .overlay {
    padding: 8px;
  }

  .lightbox__frame {
    width: 100%;
    height: 96vh;

    padding:
      15px
      9px
      12px;
  }

  .containerLigthBox {
    grid-template-columns:
      28px
      minmax(0, 1fr)
      28px;

    gap: 5px;
  }

  .arrow {
    height: 48px;
    font-size: 22px;
  }

  .lightbox__label {
    font-size: 7px;
    letter-spacing: 1.5px;
  }

  .scrollIndicator {
    height: 48px;
  }
}


    .h1__ligthBox {
      color: var(--text-color);
    }

    

    #colorPicker {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .colorValue {
  width: clamp(95px, 8vw, 125px);
  height: clamp(34px, 3.5vw, 44px);

  padding: 0 clamp(10px, 1vw, 14px);

  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 4px;

  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.025),
      rgba(0, 0, 0, 0.9)
    );

  color: rgba(255, 255, 255, 0.88);

  font-family: monospace;
  font-size: clamp(9px, 1vw, 14px);

  text-align: center;
  text-transform: uppercase;

  outline: none;

  transition:
    border-color 220ms ease,
    box-shadow 220ms ease,
    color 220ms ease;
}

.colorValue:focus {
  border-color: var(--animation-accent);

  box-shadow:
    0 0 7px
      color-mix(
        in srgb,
        var(--animation-accent) 38%,
        transparent
      );
}

.colorValue.is-invalid {
  border-color: #ff5c5c;
  color: #ff8a8a;

  box-shadow:
    0 0 7px rgba(255, 92, 92, 0.28);
}


    .text__ligthBox {
      color: var(--text-color);
      font-size: clamp(8px, 2.2vw, 18px);
    }

    .demo-carousel__item {
      position: relative;
      overflow: hidden;
      contain: layout paint;
    }

    .demo-carousel__previewText {
      position: relative;
      z-index: 2;
      display: inline-block;
      max-width: 90%;
      margin: 0;
      color: #a240df;
      font-family: Arial, sans-serif;
      font-size: clamp(10px, 2vw, 24px);
      line-height: 1;
      text-align: center;
      white-space: nowrap;
    }

    .demo-carousel__video {
      position: absolute;
      inset: 0;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
      transform: translateZ(0);
      backface-visibility: hidden;
    }

    @media screen and (max-width: 1000px) {
      .overlay {
        flex-direction: column;
        gap: 5%;
      }

      .containerLigthBox {
        width: 80%;
      }

      .divTexte {
        width: 80%;
        height: 20%;
      }

      .div-title__ligthBox {
        justify-content: left;
      }

      .button__ligthBox {
        height: 10%;
        width: 20%;
      }
    }

    .section__demo.animations .demo-carousel__item {
  transition:
    transform 300ms ease-out,
    opacity 300ms ease,
    filter 300ms ease,
    border-color 300ms ease,
    box-shadow 300ms ease,
    background 300ms ease;
    border: var(--border);
}

.section__demo.animations .demo-carousel__item.little {
  opacity: 0.65;

  filter:
    grayscale(1)
    brightness(0.55);

  transform: scale(0.97);
}

.section__demo.animations .demo-carousel__item.big {
  opacity: 1;
  filter: none;

  transform: translateY(-7px);
  border: var(--border);
}

  .scrollIndicator{
    position:absolute;

    left:50%;
    bottom:30px;

    transform:translateX(-50%);

    width:50px;
    height:50px;

    display:flex;
    justify-content:center;
    align-items:center;

    pointer-events:none;
}

.scrollIndicator svg{

    width:40px;
    height:40px;

    color:white;

    filter:
        drop-shadow(0 0 6px #a240df)
        drop-shadow(0 0 15px #a240df);

    animation:scrollArrow 1.4s infinite;
}
    @keyframes scrollArrow{

    0%{
        transform:translateY(0);
        opacity:0;
    }

    20%{
        opacity:1;
    }

    60%{
        transform:translateY(12px);
        opacity:1;
    }

    100%{
        transform:translateY(18px);
        opacity:0;
    }

}

/* =========================================================
   LIGHTBOX DES ANIMATIONS
========================================================= */

/* ---------------------------------------------------------
   CADRE GÉNÉRAL
---------------------------------------------------------- */

.overlay--animation {
  --animation-accent: #a240df;
}

.overlay--animation .lightbox__frame {
  width: min(94vw, 1500px);
  height: min(92vh, 930px);

  padding:
    clamp(20px, 2.5vw, 38px)
    clamp(18px, 2.8vw, 44px)
    clamp(22px, 2.5vw, 36px);

  background:
    radial-gradient(
      circle at 50% 105%,
      color-mix(
        in srgb,
        var(--animation-accent) 16%,
        transparent
      ),
      transparent 31%
    ),
    #050608;

  overflow: visible;
}

/*
 * Le titre reste visible pour la lightbox animation.
 */
.overlay--animation .lightbox__label {
  display: inline-flex;
}

.overlay--animation .scrollIndicator {
  display: none;
}

/* ---------------------------------------------------------
   DISPOSITION PRINCIPALE
---------------------------------------------------------- */


.overlay--animation .arrow.left {
  grid-area: left;
  align-self: center;
}

.overlay--animation .arrow.right {
  grid-area: right;
  align-self: center;
}

.overlay--animation .animation-preview {
  grid-area: preview;
}

.overlay--animation .animation-controls {
  grid-area: controls;
}

/* ---------------------------------------------------------
   PRÉVISUALISATION
---------------------------------------------------------- */

.animation-preview {
  position: relative;

  width: 100%;
  height: 100%;
  min-height: 0;

  display: flex !important;
  align-items: center !important;
  justify-content: center !important;

  overflow: hidden !important;

  background:
    radial-gradient(
      circle at center,
      color-mix(
        in srgb,
        var(--animation-accent) 13%,
        transparent
      ),
      transparent 34%
    ),
    radial-gradient(
      ellipse at 50% 115%,
      color-mix(
        in srgb,
        var(--animation-accent) 19%,
        transparent
      ),
      transparent 50%
    ),
    #010105 !important;

  border:
    1px solid rgba(255, 255, 255, 0.2) !important;

  border-radius: 6px;

  box-shadow:
    inset 0 0 60px rgba(0, 0, 0, 0.78),
    0 0 26px rgba(0, 0, 0, 0.55);
}

/* ---------------------------------------------------------
   CERCLE CENTRAL
---------------------------------------------------------- */

.animation-preview__content {
  position: relative;
  z-index: 5;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
}

.animation-preview__title {
  font-Size: clamp(18px, 6vw, 60px);
  letter-spacing: 3px;
}

/* ---------------------------------------------------------
   PARTICULES ET VAGUES
---------------------------------------------------------- */

.animation-preview__particles,
.animation-preview__stars {
  position: absolute;
  inset: 0;

  pointer-events: none;
}

.animation-preview__particles {
  z-index: 2;

  overflow: hidden;
}

.animation-preview__stars {
  opacity: 0.72;

  background-image:
    radial-gradient(
      circle,
      var(--animation-accent) 0 1px,
      transparent 1.5px
    ),
    radial-gradient(
      circle,
      var(--animation-accent) 0 1px,
      transparent 1.5px
    ),
    radial-gradient(
      circle,
      rgba(255, 255, 255, 0.7) 0 0.7px,
      transparent 1.2px
    );

  background-size:
    67px 79px,
    103px 91px,
    137px 121px;

  background-position:
    5px 13px,
    31px 51px,
    77px 19px;

  animation:
    animationStarsMove
    16s linear infinite;
}


@keyframes animationStarsMove {
  from {
    background-position:
      5px 13px,
      31px 51px,
      77px 19px;
  }

  to {
    background-position:
      72px 92px,
      -72px 142px,
      214px 140px;
  }
}

/* ---------------------------------------------------------
   PANNEAU DE PERSONNALISATION
---------------------------------------------------------- */

.animation-controls {
  width: 100%;
  height: 100%;

  display: flex !important;
  flex-direction: column;

  gap: clamp(24px, 2.7vw, 40px);

  padding:
    clamp(22px, 2.4vw, 36px)
    clamp(18px, 2vw, 30px);

  background:
    linear-gradient(
      150deg,
      rgba(162, 64, 223, 0.035),
      rgba(4, 5, 9, 0.99) 38%
    );

  border:
    1px solid
    color-mix(
      in srgb,
      var(--animation-accent) 38%,
      rgba(255, 255, 255, 0.12)
    );

  border-radius: 6px;

  box-shadow:
    inset 0 0 26px rgba(255, 255, 255, 0.012);

  overflow-y: auto;
}

.animation-control-group {
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: clamp(12px, 1.3vw, 18px);
}

.animation-control-label {
  color:
    color-mix(
      in srgb,
      var(--animation-accent) 55%,
      white
    );

  font-family:
    "Montserrat",
    Arial,
    sans-serif;

  font-size: clamp(9px, 1vw, 14px);
  font-weight: 500;

  letter-spacing: clamp(1px, 0.2vw, 3px);
}

/* ---------------------------------------------------------
   CHAMP TEXTE
---------------------------------------------------------- */

.input__ligthBox__text {
  width: 100%;
  height: clamp(46px, 5vw, 65px);

  padding:
    0
    clamp(14px, 1.4vw, 20px);

  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 4px;

  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.025),
      rgba(0, 0, 0, 0.9)
    );

  color: rgba(255, 255, 255, 0.92);

  font-family:
    "Montserrat",
    Arial,
    sans-serif;

  font-size: clamp(10px, 1.1vw, 15px);
  letter-spacing: 1.5px;

  outline: none;

  transition:
    border-color 220ms ease,
    box-shadow 220ms ease;
}

.input__ligthBox__text:focus {
  border-color: var(--animation-accent);

  box-shadow:
    0 0 7px
      color-mix(
        in srgb,
        var(--animation-accent) 38%,
        transparent
      );
}

/* ---------------------------------------------------------
   COLOR PICKER
---------------------------------------------------------- */

#colorPicker {
  width: 100%;

  display: flex;
  justify-content: center;
}

#colorPicker > div,
#colorPicker canvas {
  max-width: 100%;
}

.animation-color-value {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: clamp(10px, 1vw, 14px);
}

.animation-color-swatch {
  width: clamp(25px, 2.5vw, 38px);
  height: clamp(25px, 2.5vw, 38px);

  flex-shrink: 0;

  border-radius: 50%;

  background: var(--animation-accent);

  box-shadow:
    0 0 9px
      color-mix(
        in srgb,
        var(--animation-accent) 52%,
        transparent
      );
}

.colorValue {
  color: rgba(255, 255, 255, 0.73);

  font-family: monospace;
  font-size: clamp(9px, 1vw, 14px);

  text-transform: uppercase;
}

/* ---------------------------------------------------------
   BOUTON RÉINITIALISER
---------------------------------------------------------- */

.animation-reset-button {
  width: 100%;
  min-height: clamp(42px, 4.5vw, 58px);

  margin: auto 0 0;
  padding: 10px 15px;

  transform: none;

  border:
    1px solid
    color-mix(
      in srgb,
      var(--animation-accent) 55%,
      rgba(255, 255, 255, 0.15)
    );

  border-radius: 3px;

  background:
    linear-gradient(
      145deg,
      color-mix(
        in srgb,
        var(--animation-accent) 5%,
        transparent
      ),
      rgba(0, 0, 0, 0.92)
    );

  color:
    color-mix(
      in srgb,
      var(--animation-accent) 62%,
      white
    );

  font-family:
    "Montserrat",
    Arial,
    sans-serif;

  font-size: clamp(9px, 1vw, 14px);
  font-weight: 600;

  letter-spacing: clamp(1px, 0.17vw, 2.5px);

  cursor: pointer;

  transition:
    border-color 220ms ease,
    color 220ms ease,
    box-shadow 220ms ease,
    background 220ms ease;
}

.animation-reset-button:hover {
  color: white;

  border-color: var(--animation-accent);

  background:
    color-mix(
      in srgb,
      var(--animation-accent) 12%,
      black
    );

  box-shadow:
    0 0 10px
      color-mix(
        in srgb,
        var(--animation-accent) 22%,
        transparent
      );
}

/* =========================================================
 CORRECTION PRIORITAIRE — LIGHTBOX ANIMATION
========================================================= */

.overlay--animation .lightbox__frame {
width: min(94vw, 1500px);
height: min(92vh, 930px);

display: flex;
flex-direction: column;

overflow: hidden;
}

.overlay--animation .containerLigthBox {
width: 100% !important;
height: auto !important;
min-height: 0;

flex: 1 1 auto !important;

display: grid !important;

grid-template-columns:
  clamp(36px, 4vw, 52px)
  minmax(0, 3fr)
  minmax(270px, 0.95fr)
  clamp(36px, 4vw, 52px) !important;

grid-template-rows: minmax(0, 1fr) !important;

grid-template-areas:
  "left preview controls right" !important;

align-items: stretch !important;

gap: clamp(12px, 1.5vw, 22px) !important;

overflow: hidden;
}

/* Flèche gauche */

.overlay--animation .arrow.left {
grid-area: left;

align-self: center;
}

/* Flèche droite */

.overlay--animation .arrow.right {
grid-area: right;

align-self: center;
}

/* Grande prévisualisation à gauche */

.overlay--animation .divImg.animation-preview {
grid-area: preview;

width: 100% !important;
height: 100% !important;
min-width: 0;
min-height: 0;

margin: 0 !important;
}

/* Petit panneau à droite */

.overlay--animation .divTexte.animation-controls {
grid-area: controls;

width: 100% !important;
height: 100% !important;
min-width: 0;
min-height: 0;

margin: 0 !important;

display: flex !important;
flex-direction: column !important;

overflow-y: auto;
}

/* Le color picker reste contenu dans le panneau */

.overlay--animation #colorPicker {
width: 100% !important;
max-width: 100%;

display: flex;
justify-content: center;
}

.overlay--animation #colorPicker > div {
max-width: 100% !important;
}

/* La flèche de scroll appartient uniquement aux sites */

.overlay--animation .scrollIndicator {
display: none !important;
}

.overlay--web .divTexte {
display: none !important;
}

.div-fakeWeb__demo.web-demo-card {
  position: relative;

  width: 100%;
  height: 100% !important;

  display: grid;

  grid-template-rows:
    auto
    auto
    auto
    auto;

  align-content: start;
  justify-items: center;

  padding: clamp(12px, 1.5vw, 22px);

  overflow: hidden;

  background:
    radial-gradient(
      circle at 50% 100%,
      rgba(162, 64, 223, 0.07),
      transparent 30%
    ),
    #050608;

  border: 1px solid var(--other-color);
  border-radius: 8px;

  box-sizing: border-box;

  cursor: pointer;

  transition:
    transform 300ms ease,
    opacity 300ms ease,
    border-color 300ms ease,
    box-shadow 300ms ease;
}

.web-demo-card__preview {
  width: 100%;

  aspect-ratio: 10 / 10;

  display: flex;
  align-items: center;
  justify-content: center;

  justify-self: center;

  overflow: hidden;

  border-radius: 4px;

  background: black;
}

.web-demo-card__preview img {
  width: 100%;
  height: 100%;

  display: block;

  margin: 0 auto;

  padding: 10px 0;

  object-fit: contain;
  object-position: top center;
}

.web-demo-card__identity {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 16px 8px 10px;
}

.web-demo-card__title {
  width: 100%;

  margin: 0;

  color: rgba(255, 245, 238, 0.88);

  font-family:
    "Cormorant Garamond",
    Georgia,
    serif;

  font-size: clamp(16px, 1.45vw, 24px);
  font-weight: 400;

  line-height: 1.15;

  text-align: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.web-demo-card__features {
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 14px 8px 8px;
}

.web-demo-card__features-title {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;

  margin-bottom: 15px;

  color: rgba(193, 129, 234, 0.9);

  font-family:
    "Montserrat",
    Arial,
    sans-serif;

  font-size: clamp(8px, 0.8vw, 11px);
  font-weight: 400;

  letter-spacing: 3px;

  text-align: center;
  text-transform: uppercase;
}

.web-demo-card__features-title::before,
.web-demo-card__features-title::after {
  content: "";

  width: clamp(26px, 4vw, 60px);
  height: 1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(162, 64, 223, 0.5)
    );
}

.web-demo-card__features-title::after {
  transform: scaleX(-1);
}

.web-demo-card__features-list {
  width: min(100%, 400px);

  min-height: 35px;

  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 1fr;
}

.web-demo-card__feature {
  min-width: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  gap: 8px;

  padding: 0 10px;

  color: rgba(255, 255, 255, 0.85);

  text-align: center;
}

.web-demo-card__feature + .web-demo-card__feature {
  border-left: 1px solid rgba(162, 64, 223, 0.24);
}

.web-demo-card__icon {
  width: 44px;
  height: 44px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid rgba(182, 108, 240, 0.72);
  border-radius: 50%;

  color: #bd7ce7;

  box-shadow:
    0 0 10px rgba(162, 64, 223, 0.08);
}

.web-demo-card__icon svg {
  width: 35%;
  height: 35%;

  fill: none;

  stroke: currentColor;
  stroke-width: 1.5;

  stroke-linecap: round;
  stroke-linejoin: round;
}

.web-demo-card__feature-name {
  min-height: 20px;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  color: rgba(255, 255, 255, 0.88);

  font-family:
    "Montserrat",
    Arial,
    sans-serif;

  font-size: clamp(9px, 0.95vw, 11px);
  font-weight: 400;

  line-height: 1.25;

  text-align: center;
}

.web-demo-card__button {
  width: calc(100% - 24px);
  max-width: 430px;

  min-height: 40px;

  justify-self: center;

  margin:
    5px
    auto;

  display: grid;

  grid-template-columns:
    1fr
    auto
    1fr;

  align-items: center;

  padding: 0 18px;

  border: 1px solid rgba(182, 108, 240, 0.6);
  border-radius: 4px;

  background:
    linear-gradient(
      90deg,
      rgba(162, 64, 223, 0.025),
      rgba(162, 64, 223, 0.09),
      rgba(162, 64, 223, 0.025)
    );

  color: rgba(255, 255, 255, 0.92);

  font-family:
    "Montserrat",
    Arial,
    sans-serif;

  font-size: clamp(9px, 0.95vw, 13px);
  font-weight: 400;

  letter-spacing: 3px;

  text-transform: uppercase;

  pointer-events: none;

  box-shadow:
    0 0 12px rgba(162, 64, 223, 0.06);

  transition:
    background 250ms ease,
    border-color 250ms ease,
    box-shadow 250ms ease;
}

.web-demo-card__button-text {
  grid-column: 2;

  justify-self: center;
}

.web-demo-card__button-arrow {
  grid-column: 3;

  justify-self: end;

  font-size: 20px;
  font-weight: 200;

  line-height: 1;
}

.web-demo-card:hover .web-demo-card__button {
  border-color: rgba(182, 108, 240, 0.95);

  background:
    linear-gradient(
      90deg,
      rgba(162, 64, 223, 0.035),
      rgba(162, 64, 223, 0.15),
      rgba(162, 64, 223, 0.035)
    );

  box-shadow:
    0 0 16px rgba(162, 64, 223, 0.14);
}

@media screen and (max-width: 650px) {

  .web-demo-card__title {
    font-size: 19px;
  }

  .web-demo-card__features-title {
    font-size: 10px;
    letter-spacing: 2.2px;
  }

  .web-demo-card__icon {
    width: 40px;
    height: 40px;
  }

  .web-demo-card__icon svg {
    width: 42%;
    height: 42%;
  }

  .web-demo-card__feature-name {
    font-size: 11px;
  }

  .web-demo-card__button {
    font-size: 9px;
    letter-spacing: 2px;
  }

  .web-demo-card__button-arrow {
    font-size: 20px;
  }
}

/* ---------------------------------------------------------
   TABLETTE
---------------------------------------------------------- */

@media screen and (max-width: 1000px) {

.animation-controls {
  padding: 18px 14px;
  gap: 22px;
  }
  }

/* ---------------------------------------------------------
   MOBILE
---------------------------------------------------------- */

/* =========================================================
   MOBILE — ANIMATION AU-DESSUS / PERSONNALISATION EN DESSOUS
========================================================= */

@media screen and (max-width: 850px) {

  .overlay--animation {
    padding: 6px;
  }

  .overlay--animation .lightbox__frame {
    width: 100%;
    height: 98dvh;

    padding:
      10px
      7px
      8px;

    overflow: hidden;
  }

  .overlay--animation .lightbox__topbar {
    min-height: 46px;
  }

  .overlay--animation .containerLigthBox {
    width: 100% !important;
    height: 100% !important;
    min-height: 0 !important;

    display: grid !important;

    grid-template-columns:
      32px
      minmax(0, 1fr)
      32px !important;

    grid-template-rows: 1fr 9fr;

    grid-template-areas:
      "left preview right"
      ". controls ." !important;

    gap: 8px !important;

    align-items: stretch !important;

    overflow: hidden;
  }

  /* Animation : moitié supérieure */

  .overlay--animation .divImg.animation-preview {
    grid-area: preview;

    width: 100% !important;
    height: 100% !important;
    min-width: 0;
    min-height: 0;

    margin: 0 !important;

    overflow: hidden !important;
  }

  /* Personnalisation : moitié inférieure */

  .overlay--animation .divTexte.animation-controls {
    grid-area: controls;

    width: 100% !important;
    height: 100% !important;
    min-width: 0;
    min-height: 0;

    margin: 0 !important;
    padding: 14px 12px;

    gap: 15px;

    overflow-y: auto;
    overflow-x: hidden;
  }

  /* Flèches autour de l’animation uniquement */

  .overlay--animation .arrow.left {
    grid-area: left;
    align-self: center;
  }

  .overlay--animation .arrow.right {
    grid-area: right;
    align-self: center;
  }

  .overlay--animation .arrow {
    width: 100%;
    height: 46px;

    font-size: 22px;
  }

  /* Éléments du panneau plus compacts */

  .overlay--animation .input__ligthBox__text {
    height: 46px;
  }

  .overlay--animation .animation-controls {
    scrollbar-width: thin;
  }

  .overlay--animation .animation-reset-button {
    min-height: 46px;
    margin-top: 10px;
  }

  .overlay--animation .animation-preview__title {
    font-size: clamp(18px, 7vw, 36px);
  }

  .animation-control-label {
    display: none; 
  }
}
  `;

  document.head.appendChild(style);
}

// -----------------------------------------------------------------------------
// ÉLÉMENTS DE LA PAGE
// -----------------------------------------------------------------------------

const fakeWeb = document.querySelectorAll(".div-fakeWeb__demo");

const track = document.getElementById("demoTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

/* =========================================================
   CONTENU DES CARTES DE DÉMOS WEB
========================================================= */

/*
 * Ici tu définis uniquement les informations
 * propres à chaque démo.
 *
 * L'ordre doit correspondre à l'ordre de tes
 * .div-fakeWeb__demo dans ton HTML.
 */

const webDemoCardsData = [
  /* =======================================================
     1 — SALON DE COIFFURE
  ======================================================= */

  {
    title: "Salon de coiffure",
    features: [
      {
        name: "Prise de rendez-vous",
        icon: "calendar",
      },
      {
        name: "Prestations",
        icon: "scissors",
      },
    ],
  },

  /* =======================================================
     2 — PÂTISSERIE
     
     Tu pourras modifier les deux fonctionnalités
     comme tu veux.
  ======================================================= */

  {
    title: "Pâtisserie",
    features: [
      {
        name: "Galerie des créations",
        icon: "gallery",
      },
      {
        name: "Animation",
        icon: "animation",
      },
    ],
  },

  /* =======================================================
     3 — E-COMMERCE DÉCO
  ======================================================= */

  {
    title: "E-commerce décoration",
    features: [
      {
        name: "Catalogue produits",
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
   ICÔNES
========================================================= */

function getWebDemoFeatureIcon(icon) {
  if (icon === "calendar") {
    return `
      <svg
        viewBox="0 0 24 24"
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
        aria-hidden="true"
      >
        <circle cx="6" cy="7" r="3"></circle>
        <circle cx="6" cy="17" r="3"></circle>

        <path d="m8.7 8.4 11.3 7.1"></path>
        <path d="M8.7 15.6 20 8.5"></path>
      </svg>
    `;
  }

  if (icon === "gallery") {
    return `
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="16"
          rx="2"
        ></rect>

        <circle cx="9" cy="9" r="1.5"></circle>

        <path d="m4 17 5-5 4 4 2-2 5 5"></path>
      </svg>
    `;
  }

  if (icon === "cart") {
    return `
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M3 4h2l2.3 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.5L21 7H6"></path>

        <circle cx="10" cy="20" r="1"></circle>
        <circle cx="18" cy="20" r="1"></circle>
      </svg>
    `;
  }

  if (icon === "animation") {
    return `
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M4 12h4"></path>
      <path d="M16 12h4"></path>
      <path d="M12 4v4"></path>
      <path d="M12 16v4"></path>

      <circle cx="12" cy="12" r="3"></circle>

      <path d="M6.5 6.5l2.2 2.2"></path>
      <path d="M15.3 15.3l2.2 2.2"></path>
      <path d="M17.5 6.5l-2.2 2.2"></path>
      <path d="M8.7 15.3l-2.2 2.2"></path>
    </svg>
  `;
  }

  return "";
}

/* =========================================================
   CONSTRUCTION DES CARTES
========================================================= */

function createWebDemoCards() {
  fakeWeb.forEach((item, index) => {
    const data = webDemoCardsData[index];

    if (!data) return;

    /*
     * IMPORTANT :
     *
     * On récupère l'image que ta carte possède DÉJÀ.
     * Donc tu n'as pas besoin de changer le chemin
     * de tes captures de sites.
     */
    const currentImage = item.querySelector("img");

    const previewSrc = currentImage?.getAttribute("src") || "";

    const previewAlt =
      currentImage?.getAttribute("alt") || `Aperçu ${data.title}`;

    /*
     * Nouvelle classe.
     */
    item.classList.add("web-demo-card");

    /*
     * On garde ton tabindex actuel.
     *
     * Sécurité au cas où il manquerait.
     */
    if (!item.hasAttribute("tabindex")) {
      item.setAttribute("tabindex", "0");
    }

    /*
     * On recrée uniquement L'INTÉRIEUR
     * de ta carte.
     *
     * La div-fakeWeb__demo elle-même
     * n'est jamais supprimée.
     *
     * Donc ton système de lightbox actuel
     * continue de fonctionner.
     */
    item.innerHTML = `

      <!-- ===============================
           IMAGE DU SITE
      ================================ -->

      <div class="web-demo-card__preview">

        ${
          previewSrc
            ? `
              <img
                src="${previewSrc}"
                alt="${previewAlt}"
                loading="lazy"
              >
            `
            : ""
        }

      </div>


      <!-- ===============================
           TITRE + LOGO
      ================================ -->

      <div class="web-demo-card__identity">

        <h3 class="web-demo-card__title">
          ${data.title}
        </h3>

      </div>


      <!-- ===============================
           FONCTIONNALITÉS
      ================================ -->

      <div class="web-demo-card__features">

        <div class="web-demo-card__features-title">
          Fonctionnalités
        </div>


        <div class="web-demo-card__features-list">

          ${data.features
            .map(
              (feature) => `
                <div class="web-demo-card__feature">

                  <div class="web-demo-card__icon">
                    ${getWebDemoFeatureIcon(feature.icon)}
                  </div>

                  <span class="web-demo-card__feature-name">
                    ${feature.name}
                  </span>

                </div>
              `,
            )
            .join("")}

        </div>

      </div>


      <!-- ===============================
           BOUTON
      ================================ -->

      <div
        class="web-demo-card__button"
        aria-hidden="true"
      >

        <span class="web-demo-card__button-text">
          Tester la démo
        </span>

        <span class="web-demo-card__button-arrow">
          →
        </span>

      </div>

    `;
  });
}

/*
 * Construction au chargement.
 */
createWebDemoCards();

// -----------------------------------------------------------------------------
// GESTION OPTIMISÉE DES VIDÉOS
// -----------------------------------------------------------------------------

function pauseVideo(video) {
  if (!video) return;

  try {
    video.pause();
  } catch (error) {
    console.warn("Impossible de mettre la vidéo en pause :", error);
  }
}

function playVideo(video) {
  if (!video) return;

  if (document.hidden || document.querySelector(".overlay")) {
    pauseVideo(video);
    return;
  }

  const playPromise = video.play();

  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // L'autoplay peut être temporairement bloqué par le navigateur.
    });
  }
}

function isVideoVisible(video) {
  if (!video) return false;

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
  if (!video) return;

  managedCarouselVideos.add(video);
  createVideoObserver().observe(video);
}

function unregisterCarouselVideo(video) {
  if (!video) return;

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

function cleanupVideosInside(element) {
  if (!element) return;

  const videos = element.querySelectorAll(".demo-carousel__video");

  videos.forEach((video) => {
    unregisterCarouselVideo(video);

    video.removeAttribute("src");

    try {
      video.load();
    } catch {
      // Aucun traitement nécessaire.
    }
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

// -----------------------------------------------------------------------------
// HOVER
// -----------------------------------------------------------------------------

function hoverFakeWeb(elements) {
  elements.forEach((element) => {
    if (element.dataset.hoverBound === "true") return;

    element.dataset.hoverBound = "true";

    element.addEventListener("mouseenter", () => {
      /*
       * Pour les animations du carrousel, on récupère toutes
       * les cartes actuellement présentes dans le track,
       * et pas seulement celles de la même colonne.
       */
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

// -----------------------------------------------------------------------------
// LIGHTBOX
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// PETIT MOUVEMENT AUTOMATIQUE DE LA DÉMO WEB
// -----------------------------------------------------------------------------

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
  if (!overlay) return;

  const scrollContainer = overlay.querySelector(".divImg");

  const stopAutoScroll = () => {
    lightboxAutoScrollCancelled = true;
    clearLightboxScrollAnimation();
  };

  // Molette / trackpad
  scrollContainer?.addEventListener("wheel", stopAutoScroll, {
    passive: true,
    capture: true,
  });

  // Téléphone / tablette
  scrollContainer?.addEventListener("touchstart", stopAutoScroll, {
    passive: true,
    capture: true,
  });

  // Clic / pression souris
  scrollContainer?.addEventListener("pointerdown", stopAutoScroll, {
    passive: true,
    capture: true,
  });
}

function lightboxTimeout(callback, delay) {
  const timeoutId = window.setTimeout(() => {
    lightboxScrollTimeouts.delete(timeoutId);

    if (lightboxAutoScrollCancelled) return;

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
      // IMPORTANT :
      // on vérifie l'annulation À CHAQUE FRAME
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
  // On nettoie l'ancienne animation
  clearLightboxScrollAnimation();

  if (!scrollContainer) return;

  // Nouvelle animation autorisée
  lightboxAutoScrollCancelled = false;

  scrollContainer.scrollTop = 0;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion) return;

  lightboxTimeout(async () => {
    if (lightboxAutoScrollCancelled) return;

    const maximumScroll =
      scrollContainer.scrollHeight - scrollContainer.clientHeight;

    const targetScroll = Math.min(300, maximumScroll);

    if (targetScroll <= 0) return;

    // DESCENTE
    const completed = await animateLightboxScroll(
      scrollContainer,
      targetScroll,
      1600,
    );

    // L'utilisateur a repris la main :
    // on arrête TOUT ici.
    if (!completed || lightboxAutoScrollCancelled) {
      return;
    }

    // RETOUR EN HAUT
    lightboxTimeout(async () => {
      if (lightboxAutoScrollCancelled) return;

      await animateLightboxScroll(scrollContainer, 0, 2100);
    }, 550);
  }, 900);
}

function addLigthBox(item, index) {
  if (document.querySelector(".overlay")) return;

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
    <!-- =====================================================
         LIGHTBOX DES SITES WEB
    ====================================================== -->

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
          <path d="m6 7 6 6 6-6"></path>
          <path d="m6 13 6 6 6-6"></path>
        </svg>
      </div>

      <!-- Conservé pour webData(), mais masqué -->
      <div class="divTexte"></div>
    </div>
  `
    : `
    <!-- =====================================================
         LIGHTBOX DES ANIMATIONS
    ====================================================== -->

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

        <!-- Grande prévisualisation à gauche -->
        <div class="divImg"></div>

        <!-- Panneau de personnalisation à droite -->
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

  // Si c'est une démo de site,
  // toute interaction utilisateur annule le scroll automatique.
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

  if (!currentData) return;

  const overlay = document.querySelector(".overlay");

  if (!overlay) return;

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

  if (!overlay) return;

  const divText = overlay.querySelector(".divTexte");
  const divImg = overlay.querySelector(".divImg");
  const containerLigthBox = overlay.querySelector(".containerLigthBox");
  const scrollIndicator = overlay.querySelector(".scrollIndicator");

  divText.style.display = "none";

  containerLigthBox.style.width = "100%";

  if (!divImg) return;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      launchWebPreviewNudge(divImg);
    });
  });
}

function animData(currentData) {
  const overlay = document.querySelector(".overlay");

  if (!overlay) return;

  const divImg = overlay.querySelector(".divImg");
  const divText = overlay.querySelector(".divTexte");
  const containerLightbox = overlay.querySelector(".containerLigthBox");

  if (!divImg || !divText || !containerLightbox) return;

  const DEFAULT_TEXT = "ANIMATION";
  const DEFAULT_COLOR = "#a240df";

  let currentText = DEFAULT_TEXT;
  let currentColor = DEFAULT_COLOR;

  let h1 = null;
  let colorPicker = null;

  overlay.style.setProperty("--animation-accent", currentColor);

  /*
   * Classe spécifique permettant de ne pas toucher
   * à la lightbox des sites.
   */
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
    <span class="animation-preview__stars"></span>
  </div>

  <div class="animation-preview__content">
    <h1
      class="h1__ligthBox animation-preview__title"
    ></h1>
  </div>
`;

  /*
   * Panneau de personnalisation.
   */
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
      class="button__ligthBox animation-reset-button"
      type="button"
    >
      RÉINITIALISER
    </button>
  `;

  function createFreshH1() {
    const content = divImg.querySelector(".animation-preview__content");

    if (!content) return;

    const previousTitle = content.querySelector(".animation-preview__title");

    if (previousTitle) {
      previousTitle.remove();
    }

    h1 = document.createElement("h1");

    h1.className = "h1__ligthBox animation-preview__title";

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

    /*
     * Permet d’écrire A240DF sans #.
     */
    if (!hex.startsWith("#")) {
      hex = `#${hex}`;
    }

    /*
     * Accepte :
     * #FFF
     * #FFFFFF
     */
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

  colorPicker = new iro.ColorPicker("#colorPicker", {
    width: 150,
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

// -----------------------------------------------------------------------------
// INTERACTIONS DE CLIC
// -----------------------------------------------------------------------------

function bindClickInteractions(elements) {
  hoverFakeWeb(elements);

  elements.forEach((item) => {
    if (item.dataset.clickBound === "true") return;

    item.dataset.clickBound = "true";

    item.addEventListener("click", () => {
      const realIndex = Number(item.dataset.index);

      if (!Number.isFinite(realIndex)) return;

      addLigthBox(item, realIndex);
    });
  });
}

// -----------------------------------------------------------------------------
// BLOCAGE DU SCROLL
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// DONNÉES DU CARROUSEL
// -----------------------------------------------------------------------------

const items = getDataAnim().map((item, index) => ({
  ...item,
  originalIndex: index,
}));

function getVisibleColumnCount() {
  if (window.innerWidth <= 600) {
    return 2;
  }

  return 3;
}

function buildColumns(data) {
  const columns = [];

  for (let i = 0; i < data.length; i += 2) {
    const topItem = data[i];
    const bottomItem = data[(i + 1) % data.length];

    columns.push([topItem, bottomItem]);
  }

  return columns;
}

const columns = buildColumns(items);

let startIndex = 0;
let lastVisibleColumnCount = getVisibleColumnCount();

// -----------------------------------------------------------------------------
// INTERVALLES DES APERÇUS ANIMÉS
// -----------------------------------------------------------------------------

function clearCarouselAnimationIntervals() {
  carouselAnimationIntervals.forEach((intervalId) => {
    clearInterval(intervalId);
  });

  carouselAnimationIntervals.clear();
}

function cleanupAnimationIntervalsInside(column) {
  if (!column) return;

  const intervalIds = column._carouselIntervalIds;

  if (!Array.isArray(intervalIds)) return;

  intervalIds.forEach((intervalId) => {
    clearInterval(intervalId);
    carouselAnimationIntervals.delete(intervalId);
  });

  column._carouselIntervalIds = [];
}

// -----------------------------------------------------------------------------
// CRÉATION D'UNE COLONNE
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// CRÉATION D'UNE COLONNE
// -----------------------------------------------------------------------------

function createColumnElement(columnData) {
  const columnDiv = document.createElement("div");

  columnDiv.className = "demo-carousel__column";

  /*
   * LARGEUR DES COLONNES
   *
   * + de 600px :
   * 3 colonnes visibles
   * = 6 animations
   *
   * 600px et moins :
   * 2 colonnes visibles
   * = 4 animations
   */
  if (window.innerWidth <= 600) {
    columnDiv.style.flex = "0 0 calc((100% - 10px) / 2)";
  } else if (window.innerWidth <= 900) {
    columnDiv.style.flex =
      "0 0 calc((100% - (clamp(10px, 1.5vw, 17px) * 2)) / 3)";
  } else {
    columnDiv.style.flex =
      "0 0 calc((100% - (clamp(12px, 1.8vw, 24px) * 2)) / 3)";
  }

  columnDiv._carouselIntervalIds = [];

  columnData.forEach((item) => {
    // -----------------------------------------------------------------------
    // CARTE
    // -----------------------------------------------------------------------

    const itemDiv = document.createElement("article");

    itemDiv.className = "demo-carousel__item demo-animation-card";

    if (window.innerWidth <= 600) {
      itemDiv.style.height = "clamp(250px, 30vw, 300px)";
    }

    itemDiv.dataset.index = String(item.originalIndex);

    itemDiv.tabIndex = 0;

    itemDiv.setAttribute("aria-label", "Voir cette animation interactive");

    // -----------------------------------------------------------------------
    // ZONE VISUELLE
    // -----------------------------------------------------------------------

    const mediaContainer = document.createElement("div");

    mediaContainer.className = "demo-animation-card__media";

    /*
     * Reflet traversant la carte au survol.
     */
    const shine = document.createElement("span");

    shine.className = "demo-animation-card__shine";

    shine.setAttribute("aria-hidden", "true");

    mediaContainer.appendChild(shine);

    // -----------------------------------------------------------------------
    // VIDÉO
    // -----------------------------------------------------------------------

    if (item.video) {
      const video = document.createElement("video");

      video.className = "demo-carousel__video";

      /*
       * Nécessaire pour que l'autoplay fonctionne dans les navigateurs.
       */
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;
      video.autoplay = true;
      video.preload = "metadata";
      video.controls = false;

      video.setAttribute("muted", "");

      video.setAttribute("loop", "");

      video.setAttribute("autoplay", "");

      video.setAttribute("playsinline", "");

      video.setAttribute("preload", "metadata");

      video.setAttribute("aria-hidden", "true");

      video.setAttribute("tabindex", "-1");

      video.disablePictureInPicture = true;

      video.src = item.video;

      /*
       * Le reflet reste au-dessus de la vidéo.
       */
      mediaContainer.insertBefore(video, shine);

      registerCarouselVideo(video);
    }

    // -----------------------------------------------------------------------
    // ANIMATION JAVASCRIPT SANS FICHIER VIDÉO
    // -----------------------------------------------------------------------
    else if (typeof item.anim === "function") {
      let previewText = null;

      function createFreshPreview() {
        /*
         * On ne vide plus toute la carte, sinon le bouton disparaîtrait.
         * On retire uniquement l'ancienne prévisualisation.
         */
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

      columnDiv._carouselIntervalIds.push(intervalId);
    }

    // -----------------------------------------------------------------------
    // FOND SIMPLE DE SECOURS
    // -----------------------------------------------------------------------
    else {
      mediaContainer.style.background = item.img || "#050609";
    }

    // -----------------------------------------------------------------------
    // BOUTON VOIR L'ANIMATION
    // -----------------------------------------------------------------------

    const actionButton = document.createElement("button");

    actionButton.className = "demo-animation-card__button";

    actionButton.type = "button";

    actionButton.setAttribute("aria-label", "Ouvrir cette animation");

    actionButton.innerHTML = `
      <span>VOIR L'ANIMATION</span>

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
    `;

    actionButton.style.border = "var(--border)";

    itemDiv.appendChild(mediaContainer);

    itemDiv.appendChild(actionButton);

    columnDiv.appendChild(itemDiv);
  });

  /*
   * Ton système actuel ouvre la lightbox au clic.
   * Le bouton étant dans la carte, son clic remonte naturellement
   * jusqu'à celle-ci.
   */
  bindClickInteractions(columnDiv.querySelectorAll(".demo-carousel__item"));

  return columnDiv;
}

// -----------------------------------------------------------------------------
// NETTOYAGE D'UNE COLONNE
// -----------------------------------------------------------------------------

function cleanupColumn(column) {
  if (!column) return;

  cleanupAnimationIntervalsInside(column);
  cleanupVideosInside(column);

  column.remove();
}

// -----------------------------------------------------------------------------
// INITIALISATION DU CARROUSEL
// -----------------------------------------------------------------------------

function initCarousel() {
  if (!track || columns.length === 0) return;

  carouselIsSliding = false;

  clearCarouselAnimationIntervals();
  cleanupVideosInside(track);

  track.innerHTML = "";

  const visibleCount = getVisibleColumnCount();

  lastVisibleColumnCount = visibleCount;

  for (let i = 0; i < visibleCount; i++) {
    const columnIndex = (startIndex + i) % columns.length;

    const columnElement = createColumnElement(columns[columnIndex]);

    track.appendChild(columnElement);
  }

  track.style.transition = "none";
  track.style.transform = "translateX(0)";

  requestAnimationFrame(() => {
    updateVisibleCarouselVideos();
  });
}

// ------------------------------- FIN PARTIE 3 ----------------------------------

// ------------------------------ DÉBUT PARTIE 4 ---------------------------------

// -----------------------------------------------------------------------------
// SLIDE SUIVANT
// -----------------------------------------------------------------------------

function slideNext() {
  if (!track || carouselIsSliding || columns.length === 0) {
    return;
  }

  carouselIsSliding = true;

  pauseAllCarouselVideos();

  const visibleCount = getVisibleColumnCount();
  const shift = 100 / visibleCount;

  const newColumnIndex = (startIndex + visibleCount) % columns.length;

  const newColumnElement = createColumnElement(columns[newColumnIndex]);

  track.appendChild(newColumnElement);

  requestAnimationFrame(() => {
    track.style.transition = "transform 0.4s ease";
    track.style.transform = `translateX(-${shift}%)`;

    window.setTimeout(() => {
      const firstColumn = track.firstElementChild;

      cleanupColumn(firstColumn);

      track.style.transition = "none";
      track.style.transform = "translateX(0)";

      startIndex = (startIndex + 1) % columns.length;

      carouselIsSliding = false;

      requestAnimationFrame(() => {
        updateVisibleCarouselVideos();
      });
    }, 400);
  });
}

// -----------------------------------------------------------------------------
// SLIDE PRÉCÉDENT
// -----------------------------------------------------------------------------

function slidePrev() {
  if (!track || carouselIsSliding || columns.length === 0) {
    return;
  }

  carouselIsSliding = true;

  pauseAllCarouselVideos();

  const visibleCount = getVisibleColumnCount();
  const shift = 100 / visibleCount;

  const newColumnIndex = (startIndex - 1 + columns.length) % columns.length;

  const newColumnElement = createColumnElement(columns[newColumnIndex]);

  track.style.transition = "none";
  track.prepend(newColumnElement);
  track.style.transform = `translateX(-${shift}%)`;

  requestAnimationFrame(() => {
    track.style.transition = "transform 0.4s ease";
    track.style.transform = "translateX(0)";

    window.setTimeout(() => {
      const lastColumn = track.lastElementChild;

      cleanupColumn(lastColumn);

      startIndex = (startIndex - 1 + columns.length) % columns.length;

      carouselIsSliding = false;

      requestAnimationFrame(() => {
        updateVisibleCarouselVideos();
      });
    }, 400);
  });
}

// -----------------------------------------------------------------------------
// LISTENERS DU CARROUSEL
// -----------------------------------------------------------------------------

if (nextBtn) {
  nextBtn.addEventListener("click", slideNext);
}

if (prevBtn) {
  prevBtn.addEventListener("click", slidePrev);
}

window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);

  resizeTimeout = window.setTimeout(() => {
    const newVisibleColumnCount = getVisibleColumnCount();

    if (newVisibleColumnCount !== lastVisibleColumnCount) {
      initCarousel();
    } else {
      updateVisibleCarouselVideos();
    }
  }, 200);
});

// -----------------------------------------------------------------------------
// INITIALISATION DES FAUX SITES
// -----------------------------------------------------------------------------

fakeWeb.forEach((item, index) => {
  item.dataset.index = String(index);

  /*
   * La carte possède tabindex="0" dans le HTML.
   * Elle peut donc être ouverte au clavier.
   */
  item.addEventListener("keydown", (event) => {
    const isActivationKey = event.key === "Enter" || event.key === " ";

    if (!isActivationKey) {
      return;
    }

    event.preventDefault();

    const realIndex = Number(item.dataset.index);

    if (!Number.isFinite(realIndex)) {
      return;
    }

    addLigthBox(item, realIndex);
  });
});

bindClickInteractions(fakeWeb);

// -----------------------------------------------------------------------------
// INITIALISATION DU CARROUSEL
// -----------------------------------------------------------------------------

initCarousel();
