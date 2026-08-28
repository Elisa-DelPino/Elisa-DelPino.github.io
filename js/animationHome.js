// --------------------------------------------------------- AUTO WHRITE ----------------------------------------------------------------------------------

export function autoWriteText(
  element,
  minDelay = 150,
  maxDelay = 200,
  callback,
) {
  const content = element.innerHTML;

  element.innerHTML = "";

  let index = 0;

  function writeNext() {
    if (index < content.length) {
      element.innerHTML += content.charAt(index);

      index++;

      const delay =
        Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

      setTimeout(writeNext, delay);
    } else if (callback) {
      callback();
    }
  }

  writeNext();
}

export function autoDeleteText(
  element,
  minDelay = 150,
  maxDelay = 200,
  callback,
) {
  let content = element.innerHTML;

  function deleteNext() {
    if (content.length > 0) {
      content = content.slice(0, -1);

      element.innerHTML = content;

      const delay =
        Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

      setTimeout(deleteNext, delay);
    } else if (callback) {
      callback();
    }
  }

  deleteNext();
}

// ---------------------------------------------------------- TEXT ROTATOR ---------------------------------------------------------------------------------------

export function initTextRotator(selector, interval = 1500) {
  if (!document.getElementById("textRotatorCSS")) {
    const style = document.createElement("style");
    style.id = "textRotatorCSS";

    style.textContent = `
  .text-rotator {
    position: relative;

    display: inline-block;

    width: clamp(210px, 36vw, 560px);
    max-width: 100%;

    height: 1em;

    margin: 0;

    overflow: hidden;
    vertical-align: top;
  }

  .text-rotator > span {
    position: absolute;
    inset: 0 auto auto 0;

    display: block;

    width: max-content;
    max-width: 100%;

    opacity: 0;
    visibility: hidden;

    transform: translateY(65%);

    transition:
      transform 0.5s ease,
      opacity 0.5s ease,
      visibility 0s linear 0.5s;

    color: var(--other-color);

    font: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    letter-spacing: inherit;

    white-space: nowrap;
  }

  .text-rotator > span.active {
    opacity: 1;
    visibility: visible;

    transform: translateY(0);

    transition:
      transform 0.5s ease,
      opacity 0.5s ease,
      visibility 0s;
  }
`;

    document.head.appendChild(style);
  }

  const containers = document.querySelectorAll(selector);

  containers.forEach((container) => {
    /*
     * Évite deux intervalles sur le même rotateur.
     */
    if (container.dataset.rotatorInitialized === "true") {
      return;
    }

    const items = [...container.querySelectorAll(":scope > span")];

    if (items.length === 0) {
      return;
    }

    container.dataset.rotatorInitialized = "true";

    let index = 0;

    items.forEach((item) => {
      item.classList.remove("active");
    });

    items[index].classList.add("active");

    window.setInterval(() => {
      items[index].classList.remove("active");

      index = (index + 1) % items.length;

      items[index].classList.add("active");
    }, interval);
  });
}

// ----------------------------------------------------------- DECODE TEXT -----------------------------------------------------------------------------------------

export function initDecodeText(element, color, options = {}) {
  if (!element) return;

  if (!element.dataset.text) {
    element.dataset.text = element.textContent.trim();
  }

  const finalText = element.dataset.text;
  const chars = options.chars || "0123456789▓▒░█<>/%#@$£€-~";
  const frameDuration = options.frameDuration || 45;
  const minIterations = options.minIterations || 6;
  const maxIterations = options.maxIterations || 14;
  const startDelay = options.startDelay || 0;

  if (!document.getElementById("textDecodeCSS")) {
    const style = document.createElement("style");
    style.id = "textDecodeCSS";
    style.textContent = `
      .char.fake {
        color: var(--other-color);
      }

      .char.real {
        color: var(--main-color);
      }
    `;
    document.head.appendChild(style);
  }

  clearTimeout(element._decodeStartTimeout);
  clearTimeout(element._decodeTickTimeout);

  const states = finalText.split("").map((char) => {
    if (char === " ") {
      return {
        finalChar: " ",
        currentChar: " ",
        iterationsLeft: 0,
        done: true,
      };
    }

    return {
      finalChar: char,
      currentChar: randomChar(chars),
      iterationsLeft:
        Math.floor(Math.random() * (maxIterations - minIterations + 1)) +
        minIterations,
      done: false,
    };
  });

  function randomChar(pool) {
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function render() {
    element.innerHTML = states
      .map((state) => {
        const className = state.done ? "real" : "fake";
        return `<span class="char ${className}">${state.currentChar}</span>`;
      })
      .join("");
  }

  function tick() {
    let allDone = true;

    states.forEach((state) => {
      if (state.done) return;

      allDone = false;
      state.iterationsLeft--;

      if (state.iterationsLeft <= 0) {
        state.currentChar = state.finalChar;
        state.done = true;
      } else {
        state.currentChar = randomChar(chars);
      }
    });

    render();

    if (!allDone) {
      element._decodeTickTimeout = setTimeout(tick, frameDuration);
    }
  }

  element._decodeStartTimeout = setTimeout(() => {
    render();
    tick();
  }, startDelay);
}

export function stopAllDecodeAnimations() {
  const elements = document.querySelectorAll(".decodeText");

  elements.forEach((element) => {
    clearTimeout(element._decodeStartTimeout);
    clearTimeout(element._decodeTickTimeout);
    element._decodeStartTimeout = null;
    element._decodeTickTimeout = null;
  });
}

export function resetDecodeTexts() {
  const elements = document.querySelectorAll(".decodeText");

  elements.forEach((element) => {
    const finalText = element.dataset.text || element.textContent.trim();
    element.textContent = finalText;
  });
}

// ---------------------------------------------------------- DECODE LOOP ---------------------------------------------------------------------------------------

let decodeLoopTimeout = null;
let decodeStartTimeout = null;
let decodeIndex = 0;
let decodeDirection = 1;
let decodeRunning = false;

function getDecodeElements() {
  return document.querySelectorAll(".decodeText");
}

function clearDecodeLoopTimeouts() {
  clearTimeout(decodeLoopTimeout);
  clearTimeout(decodeStartTimeout);
  decodeLoopTimeout = null;
  decodeStartTimeout = null;
}

function loopDecode() {
  if (!decodeRunning) return;

  const elements = getDecodeElements();
  if (!elements.length) return;

  const el = elements[decodeIndex];
  if (!el) return;

  initDecodeText(el, {
    chars: "▓▒░█<>_-~▓▒░",
    frameDuration: 150,
    minIterations: 5,
    maxIterations: 12,
  });

  if (decodeIndex === elements.length - 1) {
    decodeDirection = -1;
  } else if (decodeIndex === 0) {
    decodeDirection = 1;
  }

  decodeIndex += decodeDirection;

  decodeLoopTimeout = setTimeout(loopDecode, 2000);
}

export function addDecodeText() {
  const elements = getDecodeElements();
  if (!elements.length) return;

  elements.forEach((el) => {
    if (!el.dataset.text) {
      el.dataset.text = el.textContent.trim();
    }
  });

  clearDecodeLoopTimeouts();
  stopAllDecodeAnimations();
  resetDecodeTexts();

  decodeIndex = 0;
  decodeDirection = 1;
  decodeRunning = true;

  decodeStartTimeout = setTimeout(() => {
    loopDecode();
  }, 1500);
}

export function stopDecodeText() {
  decodeRunning = false;
  clearDecodeLoopTimeouts();
  stopAllDecodeAnimations();
  resetDecodeTexts();
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopDecodeText();
  } else {
    addDecodeText();
  }
});

const heroSliderTrack = document.querySelector(".hero-slider__track");

if (heroSliderTrack) {
  const heroSlides = heroSliderTrack.querySelectorAll(".hero-slider__img");

  let heroSlideIndex = 0;

  const slideDuration = 700;
  const pauseDuration = 3000;

  function nextHeroSlide() {
    heroSlideIndex++;

    heroSliderTrack.style.transition = `transform ${slideDuration}ms ease-in-out`;

    heroSliderTrack.style.transform = `translateX(${heroSlideIndex * 100}%)`;

    if (heroSlideIndex === heroSlides.length - 1) {
      setTimeout(() => {
        heroSliderTrack.style.transition = "none";

        heroSlideIndex = 0;

        heroSliderTrack.style.transform = "translateX(0)";
      }, slideDuration);
    }
  }

  setInterval(nextHeroSlide, pauseDuration + slideDuration);
}

export function initSkillsCarousel() {
  const preview = document.querySelector(".code-skills__preview");

  if (!preview) return;

  const cards = preview.querySelectorAll(".code-skill-card");

  if (cards.length < 4) return;

  let secondPairVisible = false;

  let running = false;

  let timeout = null;

  const pauseDuration = 2000;
  const rotationDuration = 850;

  function showFirstPair() {
    if (!preview) return;

    /*
     * On coupe la transition.
     * Les cartes sont invisibles à ce moment-là.
     */

    preview.classList.add("no-carousel-transition");

    preview.classList.remove("show-second-pair");

    secondPairVisible = false;

    /*
     * Force le navigateur à appliquer
     * immédiatement la position.
     */

    preview.offsetHeight;

    /*
     * On réactive la transition
     * pour le prochain passage.
     */

    requestAnimationFrame(() => {
      preview.classList.remove("no-carousel-transition");
    });
  }

  function showSecondPair() {
    preview.classList.add("show-second-pair");
  }

  function rotateCarousel() {
    if (window.innerWidth > 900 || running) {
      return;
    }

    running = true;

    secondPairVisible = !secondPairVisible;

    if (secondPairVisible) {
      showSecondPair();
    } else {
      showFirstPair();
    }

    /*
     * On attend la fin réelle
     * de la rotation.
     */
    timeout = setTimeout(() => {
      running = false;

      /*
       * Pause une fois les cartes
       * parfaitement face caméra.
       */
      timeout = setTimeout(rotateCarousel, pauseDuration);
    }, rotationDuration);
  }

  function start() {
    clearTimeout(timeout);

    if (window.innerWidth <= 900) {
      timeout = setTimeout(rotateCarousel, pauseDuration);
    } else {
      secondPairVisible = false;

      showFirstPair();
    }
  }

  start();

  window.addEventListener("resize", start);
}
