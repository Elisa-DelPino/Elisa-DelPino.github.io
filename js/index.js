// index.js

import { AddLoader } from "./loadingPage.js";
import { initTextRotator } from "./animationHome.js";
import { initSkillsFakeVSCode } from "./codeAuto.js";

// -----------------------------------------------------------------------------
// NAVIGATION VERS LES PRESTATIONS
// -----------------------------------------------------------------------------

function getHeaderHeight() {
  const header =
    document.querySelector(".header") || document.querySelector("header");

  return header ? header.offsetHeight : 0;
}

function initProductsNavigation() {
  const children = document.querySelectorAll(".children__other");

  children.forEach((child, index) => {
    /*
     * Évite d'ajouter plusieurs fois le même listener
     * si le script est relancé accidentellement.
     */
    if (child.dataset.productNavigationBound === "true") {
      return;
    }

    child.dataset.productNavigationBound = "true";

    child.addEventListener("click", () => {
      const wrapper = document.getElementById(`wrapper__${index}`);

      if (!wrapper) {
        return;
      }

      const headerHeight = getHeaderHeight();

      const top =
        wrapper.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    });
  });
}

// -----------------------------------------------------------------------------
// LOADER ET INITIALISATION DU CONTENU
// -----------------------------------------------------------------------------

AddLoader();

// -----------------------------------------------------------------------------
// ROTATION DU TEXTE DE L'ACCUEIL
// -----------------------------------------------------------------------------

initTextRotator(".text-rotator", 2500);

// -----------------------------------------------------------------------------
// NAVIGATION
// -----------------------------------------------------------------------------

initProductsNavigation();

initSkillsFakeVSCode("#skills-code-editor");
