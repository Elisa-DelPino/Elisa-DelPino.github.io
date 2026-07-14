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
        height: 1.2em;
        overflow: hidden;
        vertical-align: baseline;
        margin-left: 0.1em;
        top: 5px;
        transition: width 0.25s ease;
      }

      .text-rotator span {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transform: translateY(100%);
        transition: transform 0.5s ease, opacity 0.5s ease;
        color: var(--other-color);
        font-weight: 700;
        font-size: clamp(10px, 2.1vw, 25px);
        line-height: 1.2;
        white-space: nowrap;
      }

      .text-rotator span.active {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  }

  const containers = document.querySelectorAll(selector);

  containers.forEach((container) => {
    const items = container.querySelectorAll("span");
    let index = 0;

    if (items.length === 0) return;

    const measure = document.createElement("span");
    measure.style.position = "absolute";
    measure.style.visibility = "hidden";
    measure.style.pointerEvents = "none";
    measure.style.whiteSpace = "nowrap";
    document.body.appendChild(measure);

    function copyTextStyles() {
      const computed = getComputedStyle(container);
      measure.style.fontFamily = computed.fontFamily;
      measure.style.fontSize = computed.fontSize;
      measure.style.fontWeight = "700";
      measure.style.lineHeight = computed.lineHeight;
      measure.style.letterSpacing = computed.letterSpacing;
    }

    function setWidthFromText(text) {
      copyTextStyles();
      measure.textContent = text;
      const width = Math.ceil(measure.getBoundingClientRect().width);
      container.style.width = `${width + 8}px`;
    }

    items.forEach((el) => el.classList.remove("active"));
    items[0].classList.add("active");
    setWidthFromText(items[0].textContent);

    setInterval(() => {
      items[index].classList.remove("active");
      index = (index + 1) % items.length;
      items[index].classList.add("active");
      setWidthFromText(items[index].textContent);
    }, interval);

    window.addEventListener("resize", () => {
      setWidthFromText(items[index].textContent);
    });
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
