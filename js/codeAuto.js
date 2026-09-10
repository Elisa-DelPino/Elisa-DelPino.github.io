// js/codeAuto.js

import { Create } from "./uiBuilder.js";
import { PicturesSystem } from "./uiBuilder.js";

export function initFakeVSCode(parentSelector) {
  const parent = document.querySelector(parentSelector);

  if (!parent) return;

  const namespace = "fakeCode";

  // --- CSS ISOLÉ ---

  if (!document.getElementById("fakeCodeCSS")) {
    const style = document.createElement("style");

    style.id = "fakeCodeCSS";

    style.innerHTML = `
      .${namespace}-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        font-family: "Consolas", monospace;
        color: #c9d1d9;
      }

      .${namespace}-editor {
        display: flex;
        flex: 1;
        overflow-x: hidden;
      }

      .${namespace}-lines {
        background: #161b22;
        padding: clamp(3px, 1vw, 10px) clamp(3px, 1vw, 10px);
        text-align: right;
        user-select: none;
        color: #6e7681;
        font-size: clamp(4.5px, 1vw, 10px);
      }

      .${namespace}-code {
        padding: clamp(3px, 1vw, 10px);
        white-space: pre;
        overflow: auto;
        flex: 1;
        font-size: clamp(4.5px, 1vw, 10px);
        line-height: 1.6;
        max-width: 90%;
        word-break: break-word;
      }

      .${namespace}-cursor {
        display: inline-block;
        width: 10px;
        background: #c9d1d9;
        margin-left: 2px;
        animation: blink 1s infinite;
      }

      @keyframes blink {
        50% {
          opacity: 0;
        }
      }

      .${namespace}-keyword {
        color: #ff7b72;
      }

      .${namespace}-string {
        color: #a5d6ff;
      }

      .${namespace}-function {
        color: #d2a8ff;
      }

      .${namespace}-comment {
        color: #6A9955;
        font-style: italic;
        opacity: 0.9;
      }

      .${namespace}-variable {
        color: #79c0ff;
      }

      .${namespace}-number {
        color: #ffb86c;
      }
    `;

    document.head.appendChild(style);
  }

  // --- CONTAINER ---

  const container = document.createElement("div");

  container.className = `${namespace}-container`;

  parent.appendChild(container);

  const editor = document.createElement("div");

  editor.className = `${namespace}-editor`;

  container.appendChild(editor);

  const linesElement = document.createElement("div");

  linesElement.className = `${namespace}-lines`;

  editor.appendChild(linesElement);

  const codeElement = document.createElement("div");

  codeElement.className = `${namespace}-code`;

  editor.appendChild(codeElement);

  // --- CODE À AFFICHER ---

  const rawCode = `
// =============================
// CREATE HOME-PAGE.HTML
// =============================

<!DOCTYPE html>

<body>

// ADD MENU NAVIGATION
CreateMenu();

<header>
    <ul>
        <li><a> Blog </a></li>
        <li><a> Pics </a></li>
    </ul>
</header>

// ADD PICTURES CONTENT
AddPictures();

<div class="grid-container">
    <div class="grid-item">
        <div class="div-children"></div>
    </div>
</div>


<div class="button">
    <button> ENTER </button>
</div>

// ADD BUTTON
AddButton();

</body>`;

  // --- VARIABLES DE TYPING ---

  const lines = rawCode.split("\n");

  let lineIndex = 0;
  let charIndex = 0;

  // --- ÉCHAPPEMENT HTML ---

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // --- COLORISATION ---

  function colorizeFragment(text) {
    const comments = [];

    let code = text.replace(/(\/\/.*)/g, (match) => {
      comments.push(match);

      return `___COMMENT_${comments.length - 1}___`;
    });

    code = escapeHtml(code);

    code = code
      .replace(/(".*?"|'.*?')/g, `<span class="${namespace}-string">$1</span>`)
      .replace(
        /\b(function|return|const|let|var|if|while|for)\b/g,
        `<span class="${namespace}-keyword">$1</span>`,
      )
      .replace(
        /\b(console|log|Math|Date|toLocaleTimeString|CreateMenu|AddStars|AddPictures|AddButton|initStars)\b/g,
        `<span class="${namespace}-function">$1</span>`,
      )
      .replace(/\b(\d+)\b/g, `<span class="${namespace}-number">$1</span>`)
      .replace(
        /\b(user|attempts|connected|sessionId|modules|data|item|name|index|status|retries|loaded)\b/g,
        `<span class="${namespace}-variable">$1</span>`,
      );

    code = code.replace(
      /___COMMENT_(\d+)___/g,
      (_, i) =>
        `<span class="${namespace}-comment">${escapeHtml(comments[i])}</span>`,
    );

    // --- BALISES HTML ---

    code = code.replace(
      /&lt;(\/?)div\b/g,
      `<span style="color:#bf4f51">&lt;$1div</span>`,
    );

    code = code.replace(
      /&lt;(\/?)header\b/g,
      `<span style="color:#0096c7">&lt;$1header</span>`,
    );

    code = code.replace(
      /&lt;(\/?)body\b/g,
      `<span style="color:#0096c7">&lt;$1body</span>`,
    );

    code = code.replace(
      /&lt;!DOCTYPE html&gt;/gi,
      `<span style="color:#fcbf49">&lt;!DOCTYPE html&gt;</span>`,
    );

    return code;
  }

  // --- NUMÉROTATION DES LIGNES ---

  const lineCount = lines.length;

  for (let j = 1; j <= lineCount; j++) {
    linesElement.innerHTML += j + "<br>";
  }

  // --- TYPING ---

  function type() {
    let visibleText = lines
      .slice(0, lineIndex)
      .map((l) => colorizeFragment(l) + "<br>")
      .join("");

    visibleText += colorizeFragment(
      lines[lineIndex]?.slice(0, charIndex) || "",
    );

    codeElement.innerHTML =
      visibleText + `<span class="${namespace}-cursor"></span>`;

    codeElement.scrollTop = codeElement.scrollHeight;

    const currentLine = lines[lineIndex] || "";

    // --- DÉCLENCHEURS APRÈS ÉCRITURE ---

    if (
      currentLine.includes("// ADD MENU NAVIGATION") &&
      charIndex === currentLine.length
    ) {
      const uiHeader = document.querySelector(".ui-header__nav");

      if (uiHeader) Create(uiHeader);
    }

    if (
      currentLine.includes("// ADD PICTURES CONTENT") &&
      charIndex === currentLine.length
    ) {
      PicturesSystem(true);
    }

    if (
      currentLine.includes("// ADD BUTTON") &&
      charIndex === currentLine.length
    ) {
      const uiButton = document.querySelector(".bottom-button");

      if (uiButton) Create(uiButton);
    }

    if (charIndex < currentLine.length) {
      charIndex++;

      setTimeout(type, 1 + Math.random() * 5);
    } else {
      lineIndex++;
      charIndex = 0;

      if (lineIndex < lines.length) {
        setTimeout(type, 50);
      } else {
        setTimeout(deleteCode, 1500);
      }
    }
  }

  // --- SUPPRESSION ---

  function deleteCode() {
    if (lineIndex >= 0) {
      if (charIndex > 0) {
        charIndex--;
      } else {
        lineIndex--;
        charIndex = lines[lineIndex]?.length || 0;
      }

      let visibleText = "";

      for (let i = 0; i <= lineIndex; i++) {
        visibleText +=
          i === lineIndex
            ? colorizeFragment(lines[i].slice(0, charIndex))
            : colorizeFragment(lines[i]) + "<br>";
      }

      codeElement.innerHTML =
        visibleText + `<span class="${namespace}-cursor"></span>`;

      codeElement.scrollTop = codeElement.scrollHeight;

      // --- DÉCLENCHEURS PENDANT LA SUPPRESSION ---

      const currentLine = lines[lineIndex] || "";

      if (currentLine.includes("// ADD MENU NAVIGATION")) {
        const uiHeader = document.querySelector(".ui-header__nav");

        if (uiHeader) Create(uiHeader);
      }

      if (currentLine.includes("// ADD PICTURES CONTENT")) {
        PicturesSystem(false);
      }

      if (currentLine.includes("// ADD BUTTON")) {
        const uiButton = document.querySelector(".bottom-button");

        if (uiButton) Create(uiButton);
      }

      setTimeout(deleteCode, 3 + Math.random() * 5);
    } else {
      lineIndex = 0;
      charIndex = 0;

      codeElement.innerHTML = `<span class="${namespace}-cursor"></span>`;

      setTimeout(type, 1500);
    }
  }

  type();
}

export function initSkillsFakeVSCode(parentSelector) {
  const parent = document.querySelector(parentSelector);

  if (!parent) return;

  const section = parent.closest(".section__code-skills");

  if (!section) return;

  const namespace = "skillsFakeCode";

  /* ============================================================
     CSS DU MINI VS CODE
  ============================================================ */

  if (!document.getElementById("skillsFakeCodeCSS")) {
    const style = document.createElement("style");

    style.id = "skillsFakeCodeCSS";

    style.innerHTML = `
      .${namespace}-container {
        width: 100%;
        height: 100%;
        min-width: 0;
        min-height: 0;
        display: flex;
        flex-direction: column;
        font-family: "Consolas", monospace;
        color: #c9d1d9;
        overflow: hidden;
      }

      .${namespace}-editor {
        width: 100%;
        height: 100%;
        min-width: 0;
        min-height: 0;
        display: flex;
        flex: 1 1 auto;
        overflow: hidden;
      }

      .${namespace}-lines {
        flex: 0 0 auto;
        height: 100%;
        line-height: 1.6;
        background: #161b22;
        padding: clamp(3px, 1vw, 10px);
        text-align: right;
        user-select: none;
        color: #6e7681;
        font-size: clamp(4.5px, 1vw, 10px);
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }

      .${namespace}-lines::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
      }

      .${namespace}-code {
        flex: 1 1 auto;
        width: 0;
        height: 100%;
        min-width: 0;
        min-height: 0;
        padding: clamp(3px, 1vw, 10px);
        white-space: pre;
        overflow-x: auto;
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        font-size: clamp(4.5px, 1vw, 10px);
        line-height: 1.6;
      }

      .${namespace}-lines span {
        display: block;
      }

      .${namespace}-code::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
      }

      .${namespace}-code::-webkit-scrollbar-track {
        background: transparent !important;
      }

      .${namespace}-code::-webkit-scrollbar-thumb {
        background: transparent !important;
        border: none !important;
      }

      .${namespace}-cursor {
        display: inline-block;
        width: 6px;
        height: 1em;
        margin-left: 2px;
        vertical-align: middle;
        background: #c9d1d9;
        animation: skillsFakeBlink 1s steps(1) infinite;
      }

      @keyframes skillsFakeBlink {
        50% {
          opacity: 0;
        }
      }

      .${namespace}-keyword {
        color: #ff7b72;
      }

      .${namespace}-string {
        color: #a5d6ff;
      }

      .${namespace}-function {
        color: #d2a8ff;
      }

      .${namespace}-comment {
        color: #6A9955;
        font-style: italic;
      }

      .${namespace}-number {
        color: #ffb86c;
      }

      @media screen and (max-width: 600px) {
        .${namespace}-lines {
          min-width: 18px;
          padding: 5px 3px;
          font-size: clamp(4px, 1.4vw, 6px);
        }

        .${namespace}-code {
          padding: 5px;
          font-size: clamp(4px, 1.45vw, 6px);
          line-height: 1.5;
        }
      }
    `;

    document.head.appendChild(style);
  }

  /* ============================================================
     CONSTRUCTION ÉDITEUR
  ============================================================ */

  parent.innerHTML = "";

  const container = document.createElement("div");

  container.className = `${namespace}-container`;

  parent.appendChild(container);

  const editor = document.createElement("div");

  editor.className = `${namespace}-editor`;

  container.appendChild(editor);

  const linesElement = document.createElement("div");

  linesElement.className = `${namespace}-lines`;

  editor.appendChild(linesElement);

  const codeElement = document.createElement("div");

  codeElement.className = `${namespace}-code`;

  editor.appendChild(codeElement);

  /* ============================================================
     SYNCHRONISATION DU SCROLL
  ============================================================ */

  codeElement.addEventListener("scroll", () => {
    linesElement.scrollTop = codeElement.scrollTop;
  });

  /* ============================================================
     CODE AFFICHÉ
  ============================================================ */

  const rawCode = `
// CREATE CARDS STRUCTURE
AddBorders(cards);

// ADD ICONS
AddIcons(cards);

// ADD TITLES
AddTitles(cards);

// ADD DESCRIPTIONS
AddDescriptions(cards);

// INTERFACE READY
Render(cards);
`;

  const lines = rawCode.split("\n");

  let lineIndex = 0;
  let charIndex = 0;

  /* ============================================================
     INDEX DES LIGNES DÉCLENCHEUSES
  ============================================================ */

  const triggerIndexes = {
    borders: lines.findIndex((line) => line.includes("AddBorders(cards)")),
    icons: lines.findIndex((line) => line.includes("AddIcons(cards)")),
    titles: lines.findIndex((line) => line.includes("AddTitles(cards)")),
    texts: lines.findIndex((line) => line.includes("AddDescriptions(cards)")),
  };

  /* ============================================================
     CARROUSEL RESPONSIVE
  ============================================================ */

  const preview = section.querySelector(".code-skills__preview");

  let secondPairVisible = false;

  const carouselDuration = 850;

  function showFirstPair() {
    if (!preview) return;

    preview.classList.add("no-carousel-transition");

    preview.classList.remove("show-second-pair");

    secondPairVisible = false;

    preview.offsetHeight;

    requestAnimationFrame(() => {
      preview.classList.remove("no-carousel-transition");
    });
  }

  function showSecondPair() {
    if (!preview) return;

    preview.classList.add("show-second-pair");

    secondPairVisible = true;
  }

  function rotateSkillsCarousel(callback) {
    if (window.innerWidth > 900 || !preview) {
      if (callback) callback();

      return;
    }

    showSecondPair();

    setTimeout(() => {
      if (callback) callback();
    }, carouselDuration);
  }

  /* ============================================================
     ÉCHAPPEMENT HTML
  ============================================================ */

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* ============================================================
     COLORISATION
  ============================================================ */

  function colorizeFragment(text) {
    const comments = [];

    let code = text.replace(/(\/\/.*)/g, (match) => {
      comments.push(match);

      return `___COMMENT_` + `${comments.length - 1}` + `___`;
    });

    code = escapeHtml(code);

    code = code
      .replace(/(".*?"|'.*?')/g, `<span class="${namespace}-string">$1</span>`)
      .replace(
        /\b(const|let|var|function|return|if|else)\b/g,
        `<span class="${namespace}-keyword">$1</span>`,
      )
      .replace(
        /\b(CreateCards|AddBorders|AddIcons|AddTitles|AddDescriptions|Render)\b/g,
        `<span class="${namespace}-function">$1</span>`,
      )
      .replace(/\b(\d+)\b/g, `<span class="${namespace}-number">$1</span>`);

    code = code.replace(
      /___COMMENT_(\d+)___/g,
      (_, index) =>
        `<span class="${namespace}-comment">` +
        `${escapeHtml(comments[index])}` +
        `</span>`,
    );

    return code;
  }

  /* ============================================================
     NUMÉROS DE LIGNES
  ============================================================ */

  lines.forEach((_, index) => {
    const line = document.createElement("span");

    line.textContent = index + 1;

    linesElement.appendChild(line);
  });

  /* ============================================================
     VÉRIFICATION DES LIGNES
  ============================================================ */

  function lineIsComplete(index) {
    if (index < 0) {
      return false;
    }

    if (lineIndex > index) {
      return true;
    }

    if (lineIndex === index && charIndex >= lines[index].length) {
      return true;
    }

    return false;
  }

  /* ============================================================
     SYNCHRONISATION INTERFACE ↔ CODE
  ============================================================ */

  function syncInterface() {
    section.classList.toggle(
      "show-borders",
      lineIsComplete(triggerIndexes.borders),
    );

    section.classList.toggle(
      "show-icons",
      lineIsComplete(triggerIndexes.icons),
    );

    section.classList.toggle(
      "show-titles",
      lineIsComplete(triggerIndexes.titles),
    );

    section.classList.toggle(
      "show-texts",
      lineIsComplete(triggerIndexes.texts),
    );
  }

  /* ============================================================
     RENDU DU TEXTE
  ============================================================ */

  function renderCode() {
    let html = "";

    for (let i = 0; i < lineIndex; i++) {
      html += colorizeFragment(lines[i]) + "<br>";
    }

    if (lineIndex < lines.length) {
      html += colorizeFragment(lines[lineIndex].slice(0, charIndex));
    }

    codeElement.innerHTML = html + `<span class="${namespace}-cursor"></span>`;

    codeElement.scrollTop = codeElement.scrollHeight;
    linesElement.scrollTop = codeElement.scrollTop;
  }

  /* ============================================================
     ÉCRITURE
  ============================================================ */

  function type() {
    const currentLine = lines[lineIndex] ?? "";

    if (charIndex < currentLine.length) {
      charIndex++;

      renderCode();

      syncInterface();

      setTimeout(type, 10 + Math.random() * 18);

      return;
    }

    syncInterface();

    lineIndex++;
    charIndex = 0;

    renderCode();

    if (lineIndex < lines.length) {
      setTimeout(type, 115);
    } else {
      setTimeout(() => {
        if (window.innerWidth > 900) {
          deleteCode();

          return;
        }

        rotateSkillsCarousel(() => {
          setTimeout(deleteCode, 900);
        });
      }, 1000);
    }
  }

  /* ============================================================
     SUPPRESSION
  ============================================================ */

  function deleteCode() {
    if (lineIndex <= 0 && charIndex <= 0) {
      lineIndex = 0;
      charIndex = 0;

      section.classList.remove(
        "show-borders",
        "show-icons",
        "show-titles",
        "show-texts",
      );

      showFirstPair();

      renderCode();

      setTimeout(type, 1300);

      return;
    }

    if (lineIndex >= lines.length) {
      lineIndex = lines.length - 1;

      charIndex = lines[lineIndex].length;
    }

    if (charIndex > 0) {
      charIndex--;
    } else {
      lineIndex--;

      if (lineIndex >= 0) {
        charIndex = lines[lineIndex].length;
      }
    }

    syncInterface();

    renderCode();

    setTimeout(deleteCode, 7 + Math.random() * 10);
  }

  /* ============================================================
     DÉMARRAGE
  ============================================================ */

  renderCode();

  syncInterface();

  type();
}
