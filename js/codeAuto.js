// js/codeAuto.js
import { Create } from "./uiBuilder.js";
import { PicturesSystem } from "./uiBuilder.js";

export function initFakeVSCode(parentSelector) {
  const parent = document.querySelector(parentSelector);
  if (!parent) return;

  const namespace = "fakeCode";

  // --- CSS isolé ---
  if (!document.getElementById("fakeCodeCSS")) {
    const style = document.createElement("style");
    style.id = "fakeCodeCSS";
    style.innerHTML = `
.${namespace}-container { height:100%; display:flex; flex-direction:column; font-family:"Consolas", monospace; color:#c9d1d9; }
.${namespace}-editor { display:flex; flex:1; overflow-x:hidden; }
.${namespace}-lines { background:#161b22; padding:clamp(3px,1vw,10px) clamp(3px,1vw,10px); text-align:right; user-select:none; color:#6e7681; font-size:clamp(4.5px,1vw,10px); }
.${namespace}-code { padding:clamp(3px,1vw,10px); white-space:pre; overflow:auto; flex:1; font-size:clamp(4.5px,1vw,10px); line-height:1.6; max-width:90%; word-break:break-word; }
.${namespace}-cursor { display:inline-block; width:10px; background:#c9d1d9; margin-left:2px; animation:blink 1s infinite; }
@keyframes blink { 50% { opacity:0; } }
.${namespace}-keyword { color:#ff7b72; }
.${namespace}-string { color:#a5d6ff; }
.${namespace}-function { color:#d2a8ff; }
.${namespace}-comment { color:#6A9955; font-style:italic; opacity:0.9; }
.${namespace}-variable { color:#79c0ff; }
.${namespace}-number { color:#ffb86c; }
        `;
    document.head.appendChild(style);
  }

  // --- Container ---
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

  // --- Code à afficher ---
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

  // --- Variables de typing ---
  const lines = rawCode.split("\n");
  let lineIndex = 0;
  let charIndex = 0;

  // --- Empeche le rowCode d'être executé comme du HTML ---
  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // --- Colorisation d'une portion de texte ---
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

    // --- Spécial balises HTML ---
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

  // --- Numérotation des lignes ---
  const lineCount = lines.length;
  for (let j = 1; j <= lineCount; j++) {
    linesElement.innerHTML += j + "<br>";
  }

  // --- Typing par lettre avec colorisation dynamique ---
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

    // --- Déclencheur spécifique après ligne tapée ---
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

      // 🔹 Déclencheurs spécifiques pendant suppression
      const currentLine = lines[lineIndex] || "";
      if (currentLine.includes("// ADD MENU NAVIGATION")) {
        const uiHeader = document.querySelector(".ui-header__nav");
        if (uiHeader) Create(uiHeader); // toggle affichage
      }

      if (currentLine.includes("// ADD PICTURES CONTENT")) {
        PicturesSystem(false); // on cache les éléments
      }

      if (currentLine.includes("// ADD BUTTON")) {
        const uiButton = document.querySelector(".bottom-button");
        if (uiButton) Create(uiButton); // toggle affichage
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
