export function anim1(textElement) {
  if (!textElement) return;

  const style = document.createElement("style");

  style.innerHTML = `

  .title {
   text-transform: uppercase;
   font-family: "Oswald"; 
  }

  .title .ltr {
    display: inline-block;
    transform: translateY(1em);
      opacity: 0;
    animation: fade-in 500ms ease-in-out var(--delay);
  }

  @keyframes fade-in {
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

    .title .ltr.show {
      transform: translateY(0);
      opacity: 1;
    }

`;

  document.head.appendChild(style);

  textElement.classList.add("title");

  textElement.innerHTML = textElement.innerText
    .split("")
    .map((ltr, idx) => {
      return `<span class="ltr" style="--delay: ${idx * 250}ms" >${ltr}</span>`;
    })
    .join("");

  const ltrs = document.querySelectorAll(".title .ltr");

  ltrs.forEach((ltr) => {
    ltr.addEventListener("animationend", () => {
      ltr.classList.add("show");
    });
  });
}

export function anim2(textElement) {
  if (!textElement) return;

  const initialColor = getComputedStyle(textElement).color;
  const content = textElement.textContent;

  const isWhite =
    initialColor === "white" || initialColor.toLowerCase() === "black";

  const backGroundColor = isWhite ? "#383d52" : "white";

  textElement.dataset.text = content;

  // Nettoyage des anciennes classes
  textElement.classList.remove("text2");
  void textElement.offsetWidth;
  textElement.classList.add("text2");

  let style = document.getElementById("anim2-style");

  if (!style) {
    style = document.createElement("style");
    style.id = "anim2-style";
    document.head.appendChild(style);
  }

  style.innerHTML = `
    .text2 {
      position: relative;
      display: inline-block;
      color: ${backGroundColor};
      -webkit-text-stroke: 0.05vw #383d52;
      text-transform: uppercase;
    }

    .text2::before {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      color: ${initialColor};
      -webkit-text-stroke: 0;
      border-right: 2px solid ${initialColor};
      overflow: hidden;
      white-space: nowrap;
      animation: animate 6s linear;
    }

    @keyframes animate {
      0%, 10%, 100% {
        width: 0;
      }

      70%, 90% {
        width: 100%;
      }
    }
  `;

  textElement.style.color = backGroundColor;
}

export function anim3(textElement) {
  if (!textElement) return;

  const initialColor = getComputedStyle(textElement).color;
  const text = textElement.textContent;

  textElement.innerHTML = `<span class="anim3__text">${text}</span>`;
  textElement.classList.add("anim3");

  const style = document.createElement("style");

  style.innerHTML = `
    .anim3 {
      position: relative;
      display: inline-block;
      color: transparent;
    }

    .anim3__text {
      position: relative;
      display: inline-block;
      color: transparent;
      animation: anim3ShowText 0.4s ease forwards;
      animation-delay: 1.2s;
    }

    .anim3::before,
    .anim3::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: 0;
      height: 2px;
      background: ${initialColor};
      transform: translate(-50%, -50%);
      animation:
        anim3LineGrow 0.8s ease forwards,
        anim3LineSplit 0.5s ease forwards 0.8s;
    }

    .anim3::before {
      --moveY: -0.65em;
    }

    .anim3::after {
      --moveY: 0.65em;
    }

    @keyframes anim3LineGrow {
      from {
        width: 0;
      }

      to {
        width: 100%;
      }
    }

    @keyframes anim3LineSplit {
      from {
        transform: translate(-50%, -50%);
      }

      to {
        transform: translate(-50%, var(--moveY));
      }
    }

    @keyframes anim3ShowText {
      from {
        color: transparent;
      }

      to {
        color: white;
      }
    }
  `;

  document.head.appendChild(style);
}

export function anim4(textElement) {
  if (!textElement) return;

  const initialColor = getComputedStyle(textElement).color;

  let style = document.getElementById("anim4-style");

  if (!style) {
    style = document.createElement("style");
    style.id = "anim4-style";
    document.head.appendChild(style);
  }

  style.innerHTML = `
    .anim4 {
      display: inline-block;

      --bg-size: 250%;

      color: transparent;
      -webkit-text-fill-color: transparent;

      background-image: linear-gradient(
        90deg,
        white 0%,
        ${initialColor} 25%,
        white 50%,
        ${initialColor} 75%,
        white 100%
      );

      background-size: var(--bg-size) 100%;
      background-position: 0% center;

      -webkit-background-clip: text;
      background-clip: text;

      animation: anim4Move 2s linear infinite;
    }

    @keyframes anim4Move {
      from {
        background-position: 0% center;
      }

      to {
        background-position: var(--bg-size) center;
      }
    }
  `;

  textElement.classList.remove("anim4");
  void textElement.offsetWidth; // force le redémarrage de l'animation
  textElement.classList.add("anim4");
}

export function anim5(textElement) {
  if (!textElement) return;

  const initialColor = getComputedStyle(textElement).color;
  const text = textElement.textContent.trim();

  const middle = Math.ceil(text.length / 2);
  const firstPart = text.slice(0, middle);
  const secondPart = text.slice(middle);

  textElement.innerHTML = `
    <span class="anim5__wrapper">
      <span class="anim5__part anim5__part--left">${firstPart}</span>
      <span class="anim5__part anim5__part--right">${secondPart}</span>
      <span class="anim5__flash"></span>
    </span>
  `;

  let style = document.getElementById("anim5-style");

  if (!style) {
    style = document.createElement("style");
    style.id = "anim5-style";
    document.head.appendChild(style);
  }

  style.innerHTML = `
    .anim5__wrapper {
      position: relative;
      display: inline-flex;
      overflow: hidden;
      color: ${initialColor};
    }

    .anim5__part {
      display: inline-block;
      color: ${initialColor};
      opacity: 0;
      animation: anim5Join 1.4s ease forwards;
    }

    .anim5__part--left {
      transform: translate(-120%, 0.6em);
    }

    .anim5__part--right {
      transform: translate(120%, -0.6em);
    }

    .anim5__part--right {
      animation-name: anim5JoinRight;
    }

    .anim5__flash {
      position: absolute;
      top: 0;
      left: -40%;
      width: 35%;
      height: 100%;
      background: linear-gradient(
        120deg,
        transparent,
        white,
        transparent
      );
      opacity: 0;
      transform: skewX(-20deg);
      animation: anim5Flash 0.45s ease forwards;
      animation-delay: 1.35s;
      pointer-events: none;
    }

    @keyframes anim5Join {
      0% {
        opacity: 0;
        transform: translate(-120%, 0.6em);
      }

      55% {
        opacity: 1;
        transform: translate(-12%, 0.6em);
      }

      75% {
        transform: translate(-12%, 0);
      }

      100% {
        opacity: 1;
        transform: translate(0, 0);
      }
    }

    @keyframes anim5JoinRight {
      0% {
        opacity: 0;
        transform: translate(120%, -0.6em);
      }

      55% {
        opacity: 1;
        transform: translate(12%, -0.6em);
      }

      75% {
        transform: translate(12%, 0);
      }

      100% {
        opacity: 1;
        transform: translate(0, 0);
      }
    }

    @keyframes anim5Flash {
      0% {
        opacity: 0;
        left: -40%;
      }

      20% {
        opacity: 1;
      }

      100% {
        opacity: 0;
        left: 110%;
      }
    }
  `;
}

export function anim6(textElement) {
  if (!textElement) return;

  const initialColor = getComputedStyle(textElement).color;
  const text = textElement.textContent.trim();
  textElement.style.letterSpacing = "-0.1em";

  textElement.innerHTML = text
    .split("")
    .map((letter, index) => {
      const content = letter === " " ? "&nbsp;" : letter;

      return `
        <span 
          class="anim6__letter" 
          style="animation-delay: ${index * 0.15}s"
        >
          ${content}
        </span>
      `;
    })
    .join("");

  let style = document.getElementById("anim6-style");

  if (!style) {
    style = document.createElement("style");
    style.id = "anim6-style";
    document.head.appendChild(style);
  }

  style.innerHTML = `
    .anim6__letter {
      display: inline-block;
      color: ${initialColor};
      transform-style: preserve-3d;
      backface-visibility: visible;
      animation: anim6Rotate 0.6s ease forwards;
    }

    @keyframes anim6Rotate {
      0% {
        transform: rotateY(0deg);
      }

      100% {
        transform: rotateY(360deg);
      }
    }
  `;
}

export function anim7(textElement) {
  if (!textElement) return;

  const initialColor = getComputedStyle(textElement).color;
  const text = textElement.textContent.trim();
  textElement.style.letterSpacing = "-0.1em";

  textElement.innerHTML = text
    .split("")
    .map((letter) => {
      const content = letter === " " ? "&nbsp;" : letter;

      return `
        <span class="anim7__letter">
          ${content}
        </span>
      `;
    })
    .join("");

  let style = document.getElementById("anim7-style");

  if (!style) {
    style = document.createElement("style");
    style.id = "anim7-style";
    document.head.appendChild(style);
  }

  style.innerHTML = `
    .anim7__letter {
      display: inline-block;
      color: ${initialColor};
      will-change: transform;
    }
  `;

  const letters = textElement.querySelectorAll(".anim7__letter");

  const amplitude = 28;
  const frequency = 0.9;
  const duration = 1200;
  const numberOfWaves = 2;

  const startTime = performance.now();

  function animateWave(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const phase = progress * Math.PI * 2 * numberOfWaves;
    const damping = 1 - progress;

    letters.forEach((letter, index) => {
      const wave = Math.sin(index * frequency + phase) * amplitude * damping;

      letter.style.transform = `translateY(${wave}px)`;
    });

    if (progress < 1) {
      requestAnimationFrame(animateWave);
    } else {
      letters.forEach((letter) => {
        letter.style.transform = "translateY(0)";
      });
    }
  }

  requestAnimationFrame(animateWave);
}

export function anim8(textElement) {
  if (!textElement) return;

  const initialColor = getComputedStyle(textElement).color;
  const text = textElement.textContent.trim();

  textElement.innerHTML = `
    <span class="anim8__base">${text}</span>
    <span class="anim8__wave">${text}</span>
  `;

  let style = document.getElementById("anim8-style");

  if (!style) {
    style = document.createElement("style");
    style.id = "anim8-style";
    document.head.appendChild(style);
  }

  style.innerHTML = `
    .anim8 {
      position: relative;
      display: inline-block;
      color: transparent;
    }

    .anim8__base,
    .anim8__wave {
      display: inline-block;
      font: inherit;
      letter-spacing: inherit;
    }

    .anim8__base {
      color: white;
    }

    .anim8__wave {
      position: absolute;
      inset: 0;
      color: ${initialColor};
      -webkit-text-fill-color: ${initialColor};
      overflow: hidden;
      animation: anim8Water 2.5s ease-in-out infinite;
    }

    @keyframes anim8Water {
      0% {
        clip-path: polygon(
          0% 46%,
          8% 36%,
          16% 48%,
          24% 60%,
          32% 46%,
          40% 34%,
          48% 48%,
          56% 60%,
          64% 46%,
          72% 34%,
          80% 48%,
          88% 60%,
          100% 46%,
          100% 100%,
          0% 100%
        );
      }

      25% {
        clip-path: polygon(
          0% 56%,
          8% 46%,
          16% 34%,
          24% 46%,
          32% 58%,
          40% 46%,
          48% 34%,
          56% 46%,
          64% 58%,
          72% 46%,
          80% 34%,
          88% 46%,
          100% 56%,
          100% 100%,
          0% 100%
        );
      }

      50% {
        clip-path: polygon(
          0% 42%,
          8% 58%,
          16% 46%,
          24% 34%,
          32% 42%,
          40% 58%,
          48% 46%,
          56% 34%,
          64% 42%,
          72% 58%,
          80% 46%,
          88% 34%,
          100% 42%,
          100% 100%,
          0% 100%
        );
      }

      75% {
        clip-path: polygon(
          0% 56%,
          8% 46%,
          16% 34%,
          24% 46%,
          32% 58%,
          40% 46%,
          48% 34%,
          56% 46%,
          64% 58%,
          72% 46%,
          80% 34%,
          88% 46%,
          100% 56%,
          100% 100%,
          0% 100%
        );
      }

      100% {
        clip-path: polygon(
          0% 46%,
          8% 36%,
          16% 48%,
          24% 60%,
          32% 46%,
          40% 34%,
          48% 48%,
          56% 60%,
          64% 46%,
          72% 34%,
          80% 48%,
          88% 60%,
          100% 46%,
          100% 100%,
          0% 100%
        );
      }
    }
  `;

  textElement.classList.remove("anim8");
  void textElement.offsetWidth;
  textElement.classList.add("anim8");
}
