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
      transition: opacity 800ms ease, transform 800ms ease;
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

    /* Animation du texte ligne par ligne */

    .reveal-line-word {
      display: inline-block;
      opacity: 0;
      will-change: opacity, transform;
      transition-property: opacity, transform;
      transition-timing-function: ease, cubic-bezier(0.22, 1, 0.36, 1);
    }

    .reveal-line-word.from-left {
      transform: translateX(-45px);
    }

    .reveal-line-word.from-right {
      transform: translateX(45px);
    }

    .reveal-line-word.is-visible {
      opacity: 1;
      transform: translateX(0);
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

function isSmartphone() {
  return window.matchMedia("(max-width: 600px)").matches;
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
      if (finished) {
        return;
      }

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
      if (finished) {
        return;
      }

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
// ANIMATION DU TEXTE LIGNE PAR LIGNE
// -----------------------------------------------------------------------------

export function revealTextLines(
  element,
  duration = 520,
  delayBetweenLines = 140,
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

    let lineTimeout = null;
    let resizeTimeout = null;

    let currentLineIndex = 0;
    let currentAnimationId = 0;

    /*
     * Si l'utilisateur est déjà passé sous cette carte,
     * on affiche immédiatement le texte.
     */
    if (isPassed(wrapper)) {
      element.innerHTML = originalHTML;
      element.style.opacity = "1";
      element.style.visibility = "visible";

      resolve();
      return;
    }

    element.style.opacity = "1";

    // -------------------------------------------------------------------------
    // DÉTERMINE LE CÔTÉ DEPUIS LEQUEL LE TEXTE DOIT ARRIVER
    // -------------------------------------------------------------------------

    function getRevealDirection() {
      const rect = element.getBoundingClientRect();

      const elementCenter = rect.left + rect.width / 2;

      const viewportCenter = window.innerWidth / 2;

      /*
       * Texte situé dans la moitié gauche :
       * arrivée depuis la gauche.
       *
       * Texte situé dans la moitié droite :
       * arrivée depuis la droite.
       */
      return elementCenter <= viewportCenter ? "from-left" : "from-right";
    }

    // -------------------------------------------------------------------------
    // TRANSFORME UNIQUEMENT LES MOTS EN ÉLÉMENTS MESURABLES
    // -------------------------------------------------------------------------

    function wrapTextNodesByWord() {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);

      const textNodes = [];

      while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
      }

      textNodes.forEach((textNode) => {
        const text = textNode.nodeValue;

        /*
         * On laisse tranquilles les nœuds qui ne contiennent
         * que des espaces ou des retours à la ligne HTML.
         */
        if (!text || !text.trim()) {
          return;
        }

        const fragment = document.createDocumentFragment();

        /*
         * Chaque mot devient un span.
         * Les espaces restent de vrais espaces.
         *
         * C'est beaucoup plus léger que de créer
         * un span pour chaque caractère.
         */
        const parts = text.match(/\s+|[^\s]+/g) || [];

        parts.forEach((part) => {
          if (/^\s+$/.test(part)) {
            fragment.appendChild(document.createTextNode(part));

            return;
          }

          const span = document.createElement("span");

          span.className = "reveal-line-word";

          span.textContent = part;

          fragment.appendChild(span);
        });

        textNode.replaceWith(fragment);
      });
    }

    // -------------------------------------------------------------------------
    // CALCULE LES VRAIES LIGNES CRÉÉES PAR LE NAVIGATEUR
    // -------------------------------------------------------------------------

    function getRenderedLines() {
      const words = [...element.querySelectorAll(".reveal-line-word")];

      const lines = [];

      /*
       * Quelques pixels de tolérance permettent d'éviter
       * qu'une différence minuscule soit prise
       * pour une nouvelle ligne.
       */
      const topTolerance = 3;

      words.forEach((word) => {
        const top = word.getBoundingClientRect().top;

        let line = lines.find((currentLine) => {
          return Math.abs(currentLine.top - top) <= topTolerance;
        });

        /*
         * Aucun mot précédent n'est sur cette hauteur :
         * le navigateur a donc créé une nouvelle ligne.
         */
        if (!line) {
          line = {
            top,
            words: [],
          };

          lines.push(line);
        }

        line.words.push(word);
      });

      /*
       * On remet les lignes dans leur ordre vertical réel.
       */
      lines.sort((lineA, lineB) => {
        return lineA.top - lineB.top;
      });

      return lines;
    }

    // -------------------------------------------------------------------------
    // PRÉPARE CHAQUE LIGNE AVEC LA BONNE DIRECTION
    // -------------------------------------------------------------------------

    function prepareLines(lines) {
      const direction = getRevealDirection();

      lines.forEach((line) => {
        line.words.forEach((word) => {
          word.classList.remove("from-left", "from-right", "is-visible");

          word.classList.add(direction);

          word.style.transitionDuration = `${duration}ms`;
        });
      });
    }

    // -------------------------------------------------------------------------
    // ARRÊTE UNIQUEMENT L'ANIMATION ACTUELLE
    // -------------------------------------------------------------------------

    function pauseCurrentAnimation() {
      clearTimeout(lineTimeout);

      lineTimeout = null;

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

      /*
       * Une fois l'animation terminée,
       * on remet exactement le HTML original.
       *
       * Il ne reste donc aucun span artificiel
       * autour des mots.
       */
      element.innerHTML = originalHTML;
      element.style.opacity = "1";
      element.style.visibility = "visible";

      resolve();
    }

    // -------------------------------------------------------------------------
    // RÉAFFICHE LES LIGNES DÉJÀ ANIMÉES APRÈS UN RESIZE
    // -------------------------------------------------------------------------

    function restoreVisibleLines(lines) {
      const visibleCount = Math.min(currentLineIndex, lines.length);

      for (let index = 0; index < visibleCount; index++) {
        lines[index].words.forEach((word) => {
          word.style.transition = "none";

          word.classList.add("is-visible");
        });
      }

      /*
       * Force le navigateur à appliquer l'état
       * avant de remettre les transitions.
       */
      void element.offsetWidth;

      for (let index = 0; index < visibleCount; index++) {
        lines[index].words.forEach((word) => {
          word.style.transition = "";

          word.style.transitionDuration = `${duration}ms`;
        });
      }

      currentLineIndex = visibleCount;
    }

    // -------------------------------------------------------------------------
    // RÉVÈLE UNE LIGNE ENTIÈRE À LA FOIS
    // -------------------------------------------------------------------------

    function revealNextLine(lines, animationId) {
      if (
        finished ||
        isResizing ||
        !animationRunning ||
        animationId !== currentAnimationId
      ) {
        return;
      }

      /*
       * Si pendant l'animation l'utilisateur
       * a déjà fait défiler la carte derrière le header,
       * on termine immédiatement.
       */
      if (isPassed(wrapper)) {
        finish();
        return;
      }

      /*
       * Toutes les lignes sont affichées.
       */
      if (currentLineIndex >= lines.length) {
        lineTimeout = setTimeout(finish, duration);

        return;
      }

      const line = lines[currentLineIndex];

      /*
       * Tous les mots de la même ligne
       * deviennent visibles exactement au même moment.
       *
       * Visuellement, c'est donc bien
       * la ligne entière qui entre.
       */
      line.words.forEach((word) => {
        word.classList.add("is-visible");
      });

      currentLineIndex += 1;

      /*
       * Lorsque la dernière ligne vient d'être lancée,
       * on attend simplement la fin de sa transition.
       */
      if (currentLineIndex >= lines.length) {
        lineTimeout = setTimeout(finish, duration);

        return;
      }

      /*
       * Puis on lance la ligne suivante
       * après un petit décalage.
       */
      lineTimeout = setTimeout(() => {
        revealNextLine(lines, animationId);
      }, delayBetweenLines);
    }

    // -------------------------------------------------------------------------
    // RECONSTRUIT LE TEXTE SELON LES VRAIES LIGNES DE L'ÉCRAN
    // -------------------------------------------------------------------------

    function resumeAnimation() {
      if (finished) {
        return;
      }

      pauseCurrentAnimation();

      /*
       * On cache brièvement le texte pendant
       * qu'on calcule ses vraies lignes.
       *
       * visibility:hidden conserve toutes
       * les dimensions nécessaires aux mesures.
       */
      element.style.visibility = "hidden";

      element.innerHTML = originalHTML;

      element.style.opacity = "1";

      /*
       * On crée seulement un span par mot.
       */
      wrapTextNodesByWord();

      const animationId = currentAnimationId;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (finished || isResizing || animationId !== currentAnimationId) {
            return;
          }

          /*
           * Le navigateur a désormais fait
           * ses vrais retours à la ligne.
           *
           * On récupère donc le nombre exact
           * de lignes correspondant à CET écran.
           */
          const lines = getRenderedLines();

          if (lines.length === 0) {
            finish();
            return;
          }

          /*
           * Toutes les lignes sont placées
           * dans leur état de départ.
           */
          prepareLines(lines);

          /*
           * Si un resize s'est produit pendant
           * l'animation, on conserve les lignes
           * déjà affichées.
           */
          restoreVisibleLines(lines);

          /*
           * Tout est prêt :
           * le texte peut maintenant être visible.
           */
          element.style.visibility = "visible";

          animationRunning = true;

          revealNextLine(lines, animationId);
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

      pauseCurrentAnimation();

      clearTimeout(resizeTimeout);

      /*
       * Lorsqu'on change la largeur de l'écran,
       * le nombre réel de lignes peut changer.
       *
       * On attend donc la fin du resize
       * puis on laisse le navigateur recalculer
       * entièrement les retours à la ligne.
       */
      resizeTimeout = setTimeout(() => {
        isResizing = false;

        resumeAnimation();
      }, 250);
    }

    window.addEventListener("resize", handleResize);

    /*
     * On attend si nécessaire que les polices
     * soient réellement chargées.
     *
     * Sinon le navigateur pourrait calculer
     * les lignes avec une police temporaire
     * puis modifier les retours à la ligne après.
     */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!finished) {
          resumeAnimation();
        }
      });
    } else {
      resumeAnimation();
    }
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
     * on attend que cette carte
     * entre dans le viewport.
     */
    await waitElementVisible(wrapper);

    /*
     * Étape 2 :
     * la carte complète remonte depuis le bas.
     */
    await revealProductCard(wrapper);

    /*
     * Petite pause permettant de distinguer clairement
     * l'apparition de la carte
     * de ses animations internes.
     */
    await new Promise((resolve) => {
      setTimeout(resolve, 180);
    });

    /*
     * On regarde quel enfant contient
     * le visuel.
     */
    const firstContainsVisual =
      first.matches(".img__products") ||
      first.querySelector("img") ||
      first.querySelector("#globe-container") ||
      first.querySelector("#circuit-container") ||
      first.querySelector("#robot-container") ||
      first.querySelector("canvas");

    /*
     * On récupère le visuel et le texte
     * indépendamment de leur ordre dans le HTML.
     */
    const visualElement = firstContainsVisual ? first : last;

    const textContainer = firstContainsVisual ? last : first;

    const textElement = textContainer.matches(".text__products")
      ? textContainer
      : textContainer.querySelector(".text__products");

    // -------------------------------------------------------------------------
    // SMARTPHONE
    // -------------------------------------------------------------------------

    /*
     * Sur smartphone :
     *
     * VISUEL TOUJOURS EN PREMIER.
     *
     * Peu importe que dans le HTML on ait :
     *
     * image → texte
     *
     * ou :
     *
     * texte → image
     *
     * l'animation sera toujours :
     *
     * carte
     * → image / globe / visuel
     * → texte ligne par ligne
     */
    if (isSmartphone()) {
      await revealVisual(visualElement);

      await revealTextLines(textElement);

      continue;
    }

    // -------------------------------------------------------------------------
    // DESKTOP / TABLETTE
    // -------------------------------------------------------------------------

    /*
     * Sur les écrans supérieurs à 600px,
     * on conserve ton fonctionnement :
     *
     * si le visuel est à gauche,
     * il apparaît avant le texte.
     *
     * si le texte est à gauche,
     * il apparaît avant le visuel.
     */

    if (firstContainsVisual) {
      /*
       * Exemple :
       *
       * IMAGE | TEXTE
       *
       * carte
       * → image
       * → texte ligne par ligne
       */
      await revealVisual(first);

      await revealTextLines(textElement);
    } else {
      /*
       * Exemple :
       *
       * TEXTE | IMAGE
       *
       * carte
       * → texte ligne par ligne
       * → image
       */
      await revealTextLines(textElement);

      await revealVisual(last);
    }
  }
}

// -----------------------------------------------------------------------------
// INITIALISATION PUBLIQUE
// -----------------------------------------------------------------------------

export function initAnimations() {
  /*
   * Empêche le lancement simultané
   * de plusieurs séquences
   * si initAnimations() est appelée
   * plusieurs fois.
   */
  if (animationAlreadyStarted) {
    return;
  }

  animationAlreadyStarted = true;

  /*
   * Pas de window.addEventListener("load") ici :
   * la fonction est appelée une fois que
   * le contenu principal est prêt.
   */
  setTimeout(() => {
    runAnimation().catch((error) => {
      console.error("Erreur pendant les animations produits :", error);

      animationAlreadyStarted = false;
    });
  }, 100);
}
