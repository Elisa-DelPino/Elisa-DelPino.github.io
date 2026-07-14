// loadingPage.js

import { autoWriteText } from "./animationHome.js";
import { initFakeVSCode } from "./codeAuto.js";
import { initUiBuilder } from "./uiBuilder.js";
import { addDecodeText } from "./animationHome.js";
import { loadHeaderScriptDirect } from "./header.js";
import { initAnimations } from "./animationProducts.js";
import { initGlobe } from "./globe3d.js";
import { initCircuit3D } from "./circuit3d.js";
import { initRobot3D } from "./robot3d.js";

function initPageContent() {
  const main = document.getElementById("main-content");
  if (main) {
    main.style.display = "block";

    loadHeaderScriptDirect();

    initFakeVSCode(".diagonal.left");
    initUiBuilder(".diagonal.right");
    showDiagonals();
    addDecodeText();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initGlobe();
        initCircuit3D();
        initRobot3D();

        /*
         * On laisse ensuite à Three.js le temps
         * de créer le canvas et de calculer ses dimensions.
         */
        requestAnimationFrame(() => {
          initAnimations();
        });
      });
    });
  }
}

export function AddLoader() {
  const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");

  // Si le loader a déjà été vu dans cette session
  if (hasSeenLoader) {
    initPageContent();
    return;
  }

  // ---------------------------------------------------------------------- INJECT CSS -----------------------------------------------------------------------------

  if (!document.getElementById("cssStyle")) {
    const style = document.createElement("style");
    style.id = "cssStyle";

    style.textContent = `
        * {
            margin: 0;
        }

        .loading {
            position: fixed;
            height: 100%;
            width: 100%;
            transition: 0.6s;
            z-index: 9999;
            background: rgba(0, 0, 0, 0.5);
        }

        .loading-container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -70%);
            font-family: 'Franklin Gothic Heavy';
            color: var(--text-color);
            font-size: clamp(30px, 4vw, 40px);
            text-align: center;
            text-shadow: 2px 2px 5px rgba(0,0,0,0.3),
                         5px 5px 70px rgba(255,255,255,0.5);
        }

        .logo img {
            margin: 0 auto;
            margin-bottom: 20px;
            width: clamp(80px, 10vw, 100px);
        }

        #bar {
            left: 50%;
            width: clamp(150px, 40vw, 400px);
            height: clamp(10px, 2vw, 20px);
            border: 1px solid white;
            margin-top: 20px;
            box-shadow: 2px 2px 5px rgba(0,0,0,0.3),
                        5px 5px 70px rgba(255,255,255,0.5);
        }

        #progress {
            background: linear-gradient(90deg, white, grey);
            width: 0%;
            height: 100%;
        }
    `;

    document.head.appendChild(style);
  }

  // ------------------------------------------------------------------------- INJECT HTML ------------------------------------------------------------------------

  const loading = document.createElement("div");
  loading.className = "loading";

  loading.innerHTML = `
        <div class="loading-container">
            <div class="logo">
                <img src="./img/lightGreyLogo.png" alt="logo">
            </div>
            <div class="number">
                <span id="loadingText">Loading....</span>
            </div>
            <div id="bar">
                <div id="progress"></div>
            </div>
        </div>
    `;
  document.body.appendChild(loading);

  // -------------------------------------------------------------------------- LOGIC JS ---------------------------------------------------------------------------

  const loadingTextSpan = loading.querySelector("#loadingText");
  autoWriteText(loadingTextSpan, 150, 200);

  let progress = loading.querySelector("#progress");
  let count = 0;

  function animateLoading() {
    if (count <= 100) {
      progress.style.width = count + "%";

      let speed = count < 60 ? 10 : 30;
      count++;

      setTimeout(animateLoading, speed);
    } else {
      finishLoading();
    }
  }

  function finishLoading() {
    loading.style.opacity = 0;

    setTimeout(() => {
      loading.remove();

      // On enregistre que le loader a déjà été vu
      sessionStorage.setItem("hasSeenLoader", "true");

      initPageContent();
    }, 600);
  }

  animateLoading();
}

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
