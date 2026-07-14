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

    .reveal-line-wrap {
      display: block;
      width: 100%;
    }

    .reveal-line {
      display: inline;

      color: transparent;
      -webkit-text-fill-color: transparent;

      background-repeat: no-repeat;
      background-size: 0% 100%;
      background-position: left center;

      -webkit-background-clip: text;
      background-clip: text;
    }

    .temp-word {
      display: inline-block;
      white-space: pre;
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
        threshold: 0.3,
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
      },
    );

    observer.observe(element);
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
  duration = 500,
  delayBetweenLines = 100,
) {
  return new Promise((resolve) => {
    if (!element) {
      resolve();
      return;
    }

    const originalHTML = element.innerHTML;
    const originalText = element.textContent.trim();
    const originalColor = getComputedStyle(element).color;

    const wrapper = element.closest(".wrapper__products") || element;

    /*
     * Si le wrapper est déjà derrière le header,
     * le texte est affiché directement.
     */
    if (isPassed(wrapper)) {
      element.innerHTML = originalHTML;
      element.style.opacity = "1";
      resolve();
      return;
    }

    let revealLines = [];
    let index = 0;

    let lineTimeout = null;
    let resizeTimeout = null;

    let finished = false;

    element.style.opacity = "1";

    function buildLines() {
      const words = originalText.split(/\s+/);

      /*
       * On place provisoirement chaque mot dans un span
       * pour déterminer sur quelle ligne il se trouve.
       */
      element.innerHTML = words
        .map((word) => {
          return `<span class="temp-word">${word}&nbsp;</span>`;
        })
        .join("");

      const tempWords = [...element.querySelectorAll(".temp-word")];

      if (tempWords.length === 0) {
        revealLines = [];
        return;
      }

      const lines = [];

      let currentTop = tempWords[0].offsetTop;
      let currentLine = [];

      for (const word of tempWords) {
        if (word.offsetTop !== currentTop) {
          lines.push(currentLine);

          currentLine = [];
          currentTop = word.offsetTop;
        }

        currentLine.push(word.textContent);
      }

      if (currentLine.length > 0) {
        lines.push(currentLine);
      }

      /*
       * On recrée ensuite le texte, ligne par ligne,
       * avec le gradient qui servira à révéler les lettres.
       */
      element.innerHTML = lines
        .map((line) => {
          const text = line.join("").trimEnd();

          return `
            <span class="reveal-line-wrap">
              <span
                class="reveal-line"
                style="
                  background-image:
                    linear-gradient(
                      to right,
                      ${originalColor},
                      ${originalColor}
                    );
                "
              >
                ${text}
              </span>
            </span>
          `;
        })
        .join("");

      revealLines = [...element.querySelectorAll(".reveal-line")];

      /*
       * En cas de redimensionnement pendant l'animation,
       * les lignes déjà affichées restent visibles.
       */
      for (let i = 0; i < index && i < revealLines.length; i++) {
        revealLines[i].style.backgroundSize = "100% 100%";
      }
    }

    function cleanup() {
      clearTimeout(lineTimeout);
      clearTimeout(resizeTimeout);

      window.removeEventListener("resize", handleResize);
    }

    function finish() {
      if (finished) {
        return;
      }

      finished = true;

      cleanup();

      /*
       * On restaure le HTML initial pour ne pas conserver
       * les spans utilisés uniquement pour l'animation.
       */
      element.innerHTML = originalHTML;
      element.style.opacity = "1";

      resolve();
    }

    function animateNextLine() {
      if (finished) {
        return;
      }

      /*
       * Si le wrapper passe sous le header pendant
       * l'animation, on affiche immédiatement le texte.
       */
      if (isPassed(wrapper)) {
        finish();
        return;
      }

      if (index >= revealLines.length) {
        finish();
        return;
      }

      const line = revealLines[index];

      line.style.transition = `background-size ${duration}ms ease-out`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          line.style.backgroundSize = "100% 100%";
        });
      });

      lineTimeout = setTimeout(() => {
        index += 1;

        lineTimeout = setTimeout(() => {
          animateNextLine();
        }, delayBetweenLines);
      }, duration);
    }

    function handleResize() {
      if (finished) {
        return;
      }

      clearTimeout(lineTimeout);
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        buildLines();
        animateNextLine();
      }, 120);
    }

    buildLines();

    window.addEventListener("resize", handleResize);

    animateNextLine();
  });
}

// -----------------------------------------------------------------------------
// ENCHAÎNEMENT DES ANIMATIONS
// -----------------------------------------------------------------------------

async function runAnimation() {
  const wrappers = document.querySelectorAll(".wrapper__products");

  for (const wrapper of wrappers) {
    const first = wrapper.firstElementChild;
    const last = wrapper.lastElementChild;

    if (!first || !last) {
      continue;
    }

    await waitElementVisible(wrapper);

    /*
     * On reconnaît maintenant :
     * - les images classiques ;
     * - le canvas Three.js ;
     * - le conteneur #globe-container ;
     * - les blocs .img__products.
     */
    const firstContainsVisual =
      first.matches(".img__products") ||
      first.querySelector("img") ||
      first.querySelector("#globe-container") ||
      first.querySelector("canvas");

    if (firstContainsVisual) {
      /*
       * Le visuel est à gauche :
       * arrivée du visuel, puis écriture du texte.
       */
      await revealVisual(first);

      await revealTextLines(last.querySelector(".text__products"));
    } else {
      /*
       * Le texte est à gauche :
       * écriture du texte, puis arrivée du visuel.
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
