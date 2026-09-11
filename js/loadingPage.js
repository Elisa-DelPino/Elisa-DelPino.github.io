// loadingPage.js

import { addDecodeText } from "./animationHome.js";
import { loadHeaderScriptDirect } from "./header.js";
import { initAnimations } from "./animationProducts.js";
import { initGlobe } from "./globe3d.js";
import { initHorloge } from "./horloge.js";
import { initCircuit3D } from "./circuit3d.js";
import { initHeroButtons } from "./buttonNeon.js";
import { initContactAnimation } from "./animationContact.js";
import { initAboutAnimation } from "./animationAbout.js";
import { initProcedure } from "./procedure.js";
import { initLogicielStock } from "./logicielStock.js";
import { initLogicielDevis } from "./logicielDevis.js";

/* =====================================================
   INITIALISATION DU CONTENU
===================================================== */

function initPageContent() {
  /* =====================================================
     HEADER
  ===================================================== */

  loadHeaderScriptDirect();

  /* =====================================================
     ANIMATIONS HOME
  ===================================================== */

  showDiagonals();

  addDecodeText();

  /* =====================================================
     ANIMATIONS PRINCIPALES
  ===================================================== */

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      initGlobe();

      initHorloge();

      initCircuit3D();

      initHeroButtons();

      initContactAnimation();

      initAboutAnimation();

      initProcedure();

      initLogicielStock();

      initLogicielDevis();

      /* =================================================
         ANIMATIONS SERVICES / PRODUITS
      ================================================= */

      requestAnimationFrame(() => {
        initAnimations();

        window.dispatchEvent(new CustomEvent("pageContentReady"));
      });
    });
  });
}

/* =====================================================
   LANCEMENT DU SITE
===================================================== */

export function AddLoader() {
  initPageContent();
}

/* =====================================================
   ANIMATION DES DIAGONALES
===================================================== */

function showDiagonals() {
  const diagonals = [
    ...document.querySelectorAll(".section__home .diagonal"),
  ].reverse();

  diagonals.forEach((diagonal, index) => {
    setTimeout(() => {
      diagonal.classList.add("show");
    }, index * 1500);
  });
}
