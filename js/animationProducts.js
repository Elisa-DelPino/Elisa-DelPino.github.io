// animationProducts.js

let animationAlreadyStarted = false;

// -----------------------------------------------------------------------------
// INJECTION DU CSS
// -----------------------------------------------------------------------------

function injectProductsAnimationCSS() {
  if (document.getElementById("productsAnimationCSS")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "productsAnimationCSS";

  style.textContent = `
    /* Les images et le globe sont cachés avant leur animation */

    .img__products {
  opacity: 0;

  transition:
    opacity 800ms ease,
    transform 800ms ease;

  will-change: opacity, transform;
}

.img__products.left {
  transform: translateX(-100%);
}

.img__products.right,
.img__products.rigth {
  transform: translateX(100%);
}

.img__products img,
.img__products #globe-container,
.img__products canvas {
  opacity: 1;
  transform: none;
}

    /* Animation du texte */

    .reveal-letter {
  opacity: 0;
  transition: opacity 80ms linear;
}

.reveal-letter.is-visible {
  opacity: 1;
}
  `;

  document.head.appendChild(style);
}

injectProductsAnimationCSS();

// -----------------------------------------------------------------------------
// INFORMATIONS SUR LE HEADER ET LA POSITION DES ÉLÉMENTS
// -----------------------------------------------------------------------------

function getHeaderHeight() {
  const header = document.querySelector("header");

  return header ? header.offsetHeight : 0;
}

function isPassed(element) {
  if (!element) {
    return false;
  }

  const rect = element.getBoundingClientRect();
  const headerHeight = getHeaderHeight();

  return rect.bottom <= headerHeight;
}

function isReallyVisible(element) {
  if (!element) {
    return false;
  }

  const rect = element.getBoundingClientRect();
  const headerHeight = getHeaderHeight();

  return rect.bottom > headerHeight && rect.top < window.innerHeight;
}

// -----------------------------------------------------------------------------
// ATTEND QUE LE WRAPPER SOIT VISIBLE
// -----------------------------------------------------------------------------

function waitElementVisible(element) {
  return new Promise((resolve) => {
    if (!element) {
      resolve();
      return;
    }

    const headerHeight = getHeaderHeight();

    /*
     * Si le wrapper est déjà visible ou s’il est déjà passé
     * derrière le header, on ne crée pas d'observer.
     */
    if (isPassed(element) || isReallyVisible(element)) {
      resolve();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          observer.disconnect();
          resolve();
        }
      },
      {
        threshold: 0.18,
        rootMargin: `-${headerHeight}px 0px -6% 0px`,
      },
    );

    observer.observe(element);
  });
}

// -----------------------------------------------------------------------------
// APPARITION DE LA CARTE PRODUIT COMPLÈTE
// -----------------------------------------------------------------------------

function revealProductCard(wrapper, duration = 900) {
  return new Promise((resolve) => {
    if (!wrapper) {
      resolve();
      return;
    }

    /*
     * Empêche de rejouer l'animation
     * si la carte a déjà été affichée.
     */
    if (wrapper.classList.contains("is-card-visible")) {
      resolve();
      return;
    }

    /*
     * Si l'utilisateur est arrivé directement plus bas dans la page,
     * on affiche immédiatement la carte sans bloquer la séquence.
     */
    if (isPassed(wrapper)) {
      wrapper.classList.add("is-card-visible");
      resolve();
      return;
    }

    let finished = false;
    let timeoutId = null;

    function finish() {
      if (finished) return;

      finished = true;

      clearTimeout(timeoutId);

      wrapper.removeEventListener("transitionend", handleTransitionEnd);

      resolve();
    }

    function handleTransitionEnd(event) {
      if (event.target === wrapper && event.propertyName === "transform") {
        finish();
      }
    }

    wrapper.addEventListener("transitionend", handleTransitionEnd);

    /*
     * Le double requestAnimationFrame garantit que le navigateur
     * a bien enregistré l'état invisible avant d'appliquer
     * la classe visible.
     */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        wrapper.classList.add("is-card-visible");
      });
    });

    /*
     * Sécurité si transitionend n'est pas déclenché.
     */
    timeoutId = setTimeout(finish, duration + 150);
  });
}

// -----------------------------------------------------------------------------
// ANIMATION D'UNE IMAGE OU DU GLOBE THREE.JS
// -----------------------------------------------------------------------------

function revealVisual(element, duration = 800) {
  return new Promise((resolve) => {
    if (!element) {
      resolve();
      return;
    }

    const wrapper = element.closest(".wrapper__products") || element;

    const comesFromRight =
      element.classList.contains("right") ||
      element.classList.contains("rigth");

    /*
     * On anime maintenant le bloc .img__products lui-même,
     * et non le canvas ou #globe-container.
     */
    const visualContainer = element.matches(".img__products")
      ? element
      : element.closest(".img__products") || element;

    if (isPassed(wrapper)) {
      visualContainer.style.opacity = "1";
      visualContainer.style.transform = "translateX(0)";
      resolve();
      return;
    }

    visualContainer.style.opacity = "0";
    visualContainer.style.transform = comesFromRight
      ? "translateX(100%)"
      : "translateX(-100%)";

    visualContainer.style.transition = `
      opacity ${duration}ms ease,
      transform ${duration}ms ease
    `;

    let finished = false;
    let timeoutId = null;
    let intervalId = null;

    function finish() {
      if (finished) return;

      finished = true;

      clearTimeout(timeoutId);
      clearInterval(intervalId);

      visualContainer.style.opacity = "1";
      visualContainer.style.transform = "translateX(0)";

      resolve();
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        visualContainer.style.opacity = "1";
        visualContainer.style.transform = "translateX(0)";
      });
    });

    timeoutId = setTimeout(finish, duration);

    intervalId = setInterval(() => {
      if (isPassed(wrapper)) {
        finish();
      }
    }, 50);
  });
}

// -----------------------------------------------------------------------------
// ANIMATION D'ÉCRITURE DU TEXTE LIGNE PAR LIGNE
// -----------------------------------------------------------------------------

export function revealTextLines(
  element,
  duration = 20,
  delayBetweenLetters = 0.5,
) {
  return new Promise((resolve) => {
    if (!element) {
      resolve();
      return;
    }

    const originalHTML = element.innerHTML;

    const wrapper = element.closest(".wrapper__products") || element;

    let finished = false;
    let animationRunning = false;
    let isResizing = false;

    let letterTimeout = null;
    let resizeTimeout = null;

    let currentIndex = 0;
    let currentAnimationId = 0;

    if (isPassed(wrapper)) {
      element.innerHTML = originalHTML;
      element.style.opacity = "1";
      resolve();
      return;
    }

    element.style.opacity = "1";

    // -------------------------------------------------------------------------
    // TRANSFORME LE TEXTE EN LETTRES ANIMABLES
    // -------------------------------------------------------------------------

    function wrapTextNodesByLetter() {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);

      const textNodes = [];

      while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
      }

      textNodes.forEach((textNode) => {
        const text = textNode.nodeValue;

        if (!text) {
          return;
        }

        const fragment = document.createDocumentFragment();

        [...text].forEach((character) => {
          if (
            character === " " ||
            character === "\n" ||
            character === "\t" ||
            character === "\u00A0"
          ) {
            fragment.appendChild(document.createTextNode(character));

            return;
          }

          const span = document.createElement("span");

          span.className = "reveal-letter";
          span.textContent = character;

          fragment.appendChild(span);
        });

        textNode.replaceWith(fragment);
      });
    }

    // -------------------------------------------------------------------------
    // ARRÊTE UNIQUEMENT LE TIMER ACTUEL
    // -------------------------------------------------------------------------

    function pauseCurrentAnimation() {
      clearTimeout(letterTimeout);
      letterTimeout = null;

      animationRunning = false;

      /*
       * Invalide les anciens requestAnimationFrame
       * et callbacks encore programmés.
       */
      currentAnimationId += 1;
    }

    // -------------------------------------------------------------------------
    // NETTOYAGE FINAL
    // -------------------------------------------------------------------------

    function cleanup() {
      pauseCurrentAnimation();

      clearTimeout(resizeTimeout);
      resizeTimeout = null;

      window.removeEventListener("resize", handleResize);
    }

    function finish() {
      if (finished) {
        return;
      }

      finished = true;

      cleanup();

      element.innerHTML = originalHTML;
      element.style.opacity = "1";

      resolve();
    }

    // -------------------------------------------------------------------------
    // RÉVÉLATION LETTRE PAR LETTRE
    // -------------------------------------------------------------------------

    function revealNextLetter(letters, animationId) {
      if (
        finished ||
        isResizing ||
        !animationRunning ||
        animationId !== currentAnimationId
      ) {
        return;
      }

      if (isPassed(wrapper)) {
        finish();
        return;
      }

      if (currentIndex >= letters.length) {
        finish();
        return;
      }

      const letter = letters[currentIndex];

      letter.style.transitionDuration = `${duration}ms`;
      letter.classList.add("is-visible");

      currentIndex += 1;

      letterTimeout = setTimeout(() => {
        revealNextLetter(letters, animationId);
      }, delayBetweenLetters);
    }

    // -------------------------------------------------------------------------
    // RECONSTRUIT LE TEXTE ET REPREND AU BON ENDROIT
    // -------------------------------------------------------------------------

    function resumeAnimation() {
      if (finished) {
        return;
      }

      pauseCurrentAnimation();

      /*
       * Empêche l’affichage du texte complet durant
       * les quelques millisecondes de reconstruction.
       */
      element.style.visibility = "hidden";
      element.innerHTML = originalHTML;
      element.style.opacity = "1";

      wrapTextNodesByLetter();

      const animationId = currentAnimationId;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (finished || isResizing || animationId !== currentAnimationId) {
            return;
          }

          const letters = [...element.querySelectorAll(".reveal-letter")];

          /*
           * Réaffiche immédiatement les lettres qui étaient
           * déjà visibles avant le redimensionnement.
           */
          for (let i = 0; i < currentIndex && i < letters.length; i++) {
            letters[i].style.transition = "none";
            letters[i].classList.add("is-visible");
          }

          /*
           * Force l’application de l’état actuel
           * avant de réactiver les transitions.
           */
          void element.offsetWidth;

          for (let i = 0; i < currentIndex && i < letters.length; i++) {
            letters[i].style.transition = "";
          }

          /*
           * Le paragraphe ne redevient visible qu’une fois
           * sa structure correctement reconstruite.
           */
          element.style.visibility = "visible";

          animationRunning = true;

          revealNextLetter(letters, animationId);
        });
      });
    }

    // -------------------------------------------------------------------------
    // GESTION DU RESIZE
    // -------------------------------------------------------------------------

    function handleResize() {
      if (finished) {
        return;
      }

      isResizing = true;

      /*
       * On arrête uniquement la progression de l’écriture.
       * On ne touche pas au HTML actuel :
       * les lettres déjà visibles restent visibles,
       * les autres restent cachées.
       */
      pauseCurrentAnimation();

      clearTimeout(resizeTimeout);

      /*
       * Le délai est relancé à chaque événement resize.
       * La reconstruction n’a lieu qu’une fois
       * le redimensionnement réellement terminé.
       */
      resizeTimeout = setTimeout(() => {
        isResizing = false;
        resumeAnimation();
      }, 250);
    }

    window.addEventListener("resize", handleResize);

    resumeAnimation();
  });
}

// -----------------------------------------------------------------------------
// ENCHAÎNEMENT DES ANIMATIONS
// -----------------------------------------------------------------------------

async function runAnimation() {
  const wrappers = [...document.querySelectorAll(".wrapper__products")];

  for (const wrapper of wrappers) {
    const first = wrapper.firstElementChild;
    const last = wrapper.lastElementChild;

    if (!first || !last) {
      continue;
    }

    /*
     * Étape 1 :
     * on attend que cette carte entre dans le viewport.
     */
    await waitElementVisible(wrapper);

    /*
     * Étape 2 :
     * la carte complète remonte depuis le bas.
     */
    await revealProductCard(wrapper);

    /*
     * Petite pause permettant de distinguer clairement
     * l'apparition de la carte de ses animations internes.
     */
    await new Promise((resolve) => {
      setTimeout(resolve, 180);
    });

    const firstContainsVisual =
      first.matches(".img__products") ||
      first.querySelector("img") ||
      first.querySelector("#globe-container") ||
      first.querySelector("#circuit-container") ||
      first.querySelector("#robot-container") ||
      first.querySelector("canvas");

    if (firstContainsVisual) {
      /*
       * Produit 1 et produit 3 :
       *
       * carte
       * → visuel venant de gauche
       * → écriture du texte
       */
      await revealVisual(first);

      await revealTextLines(last.querySelector(".text__products"));
    } else {
      /*
       * Produit 2 :
       *
       * carte
       * → écriture du texte
       * → visuel venant de droite
       */
      await revealTextLines(first.querySelector(".text__products"));

      await revealVisual(last);
    }
  }
}

// -----------------------------------------------------------------------------
// INITIALISATION PUBLIQUE
// -----------------------------------------------------------------------------

export function initAnimations() {
  /*
   * Empêche le lancement simultané de plusieurs séquences
   * si initAnimations() est appelée plusieurs fois.
   */
  if (animationAlreadyStarted) {
    return;
  }

  animationAlreadyStarted = true;

  /*
   * Pas de window.addEventListener("load") ici :
   * la fonction est appelée après le loader, donc l'événement
   * load est parfois déjà terminé.
   */
  setTimeout(() => {
    runAnimation().catch((error) => {
      console.error("Erreur pendant les animations produits :", error);

      animationAlreadyStarted = false;
    });
  }, 100);
}
