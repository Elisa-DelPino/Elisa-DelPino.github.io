// procedure.js
let procedureAnimationFrame = null;
let procedureObserver = null;

/* =====================================================
   INITIALISATION
===================================================== */

export function initProcedure() {
  const section = document.getElementById("procedure");

  if (!section) {
    return;
  }

  if (section.dataset.procedureReady === "true") {
    return;
  }

  section.dataset.procedureReady = "true";

  createProcedureHTML(section);
  startProcedureAnimation(section);
}

/* =====================================================
   HTML
===================================================== */

function createProcedureHTML(section) {
  section.innerHTML = `

    <div class="div-title__demo section-title">
      <h2 class="h2__demo">VOTRE PROJET, ÉTAPE PAR ÉTAPE</h2>
    </div>

    <div class="procedure__inner">

      <!-- ==================================================
           TIMELINE
      =================================================== -->

      <div class="procedure__timeline">

        <!-- ==================================================
             AXE PRINCIPAL
        =================================================== -->

        <div class="procedure__axis">
          <div class="procedure__lineBase"></div>
          <div class="procedure__lineProgress"></div>
          <div class="procedure__arrow"></div>
        </div>

        <!-- ==================================================
             ÉTAPE 1
        =================================================== -->

        <article
          class="procedure__step procedure__step--top"
          data-step-progress="0.12"
          style="--step-x: 12%;"
        >

          <div class="procedure__card">

            <div class="procedure__cardHeader">

              <div
                class="procedure__icon"
                aria-hidden="true"
              >

                <svg viewBox="0 0 24 24">

                  <path
                    d="M21 15a4 4 0 0 1-4 4H9l-5 3v-5a7 7 0 0 1-2-5c0-4 4-7 9-7s10 3 10 10Z"
                  ></path>

                  <path d="M8 12h.01"></path>
                  <path d="M12 12h.01"></path>
                  <path d="M16 12h.01"></path>

                </svg>

              </div>

              <h3 class="procedure__cardTitle">
                Demande de devis
              </h3>

            </div>

            <p class="procedure__cardText">
              Vous me partagez vos besoins via le formulaire ou par échange direct.
            </p>

          </div>

          <span class="procedure__connector"></span>
          <span class="procedure__marker"></span>

        </article>

        <!-- ==================================================
             ÉTAPE 2
        =================================================== -->

        <article
          class="procedure__step procedure__step--bottom"
          data-step-progress="0.38"
          style="--step-x: 38%;"
        >

          <div class="procedure__card">

            <div class="procedure__cardHeader">

              <div
                class="procedure__icon"
                aria-hidden="true"
              >

                <svg viewBox="0 0 24 24">

                  <path d="M7 3h7l4 4v13H7Z"></path>
                  <path d="M14 3v5h5"></path>
                  <path d="m9.5 14 2 2 4-4"></path>

                </svg>

              </div>

              <h3 class="procedure__cardTitle">
                Proposition de devis
              </h3>

            </div>

            <p class="procedure__cardText">
              Je vous envoie une proposition claire, détaillée et adaptée à votre projet.
            </p>

          </div>

          <span class="procedure__connector"></span>
          <span class="procedure__marker"></span>

        </article>

        <!-- ==================================================
             ÉTAPE 3
        =================================================== -->

        <article
          class="procedure__step procedure__step--top"
          data-step-progress="0.63"
          style="--step-x: 63%;"
        >

          <div class="procedure__card">

            <div class="procedure__cardHeader">

              <div
                class="procedure__icon"
                aria-hidden="true"
              >

                <svg viewBox="0 0 24 24">

                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="16"
                    rx="2"
                  ></rect>

                  <path d="M3 8h18"></path>
                  <path d="m7 15 3-3 2 2 2-2 3 3"></path>

                </svg>

              </div>

              <h3 class="procedure__cardTitle">
                Réalisation de la maquette
              </h3>

            </div>

            <p class="procedure__cardText">
              Je conçois votre maquette sur mesure. Deux modifications sont incluses pour ajuster chaque détail.
            </p>

          </div>

          <span class="procedure__connector"></span>
          <span class="procedure__marker"></span>

        </article>

        <!-- ==================================================
             ÉTAPE 4
        =================================================== -->

        <article
          class="procedure__step procedure__step--bottom"
          data-step-progress="0.88"
          style="--step-x: 88%;"
        >

          <div class="procedure__card">

            <div class="procedure__cardHeader">

              <div
                class="procedure__icon"
                aria-hidden="true"
              >

                <svg viewBox="0 0 24 24">

                  <path
                    d="M14 4c3-2 6-2 6-2s0 3-2 6l-5 5-4-4Z"
                  ></path>

                  <path d="m9 9-4 1-3 3 6 1"></path>
                  <path d="m13 13 1 6 3-3 1-4"></path>
                  <path d="M7 17c-2 0-3 1-3 3 2 0 3-1 3-3Z"></path>

                </svg>

              </div>

              <h3 class="procedure__cardTitle">
                Livraison du site
              </h3>

            </div>

            <p class="procedure__cardText">
              Votre site est livré, optimisé et prêt à être mis en ligne. Deux modifications restent offertes après livraison.
            </p>

          </div>

          <span class="procedure__connector"></span>
          <span class="procedure__marker"></span>

        </article>

        <!-- ==================================================
             DÉLAI 1
        =================================================== -->

        <div
          class="procedure__delay"
          style="--delay-x: 25%;"
        >
          Sous 48 heures
        </div>

        <!-- ==================================================
             DÉLAI 2
        =================================================== -->

        <div
          class="procedure__delay"
          style="--delay-x: 50.5%;"
        >
          Sous 3 jours
        </div>

        <!-- ==================================================
             DÉLAI 3
        =================================================== -->

        <div
          class="procedure__delay procedure__delay--large"
          style="--delay-x: 75.5%;"
        >

          <span>
            Temps variable selon le projet
          </span>

          <span class="procedure__delaySecondary">
            Exemple : 1 semaine pour un site vitrine 3 pages
          </span>

        </div>

      </div>

    </div>

  `;
}

/* =====================================================
   ANIMATION
===================================================== */

function startProcedureAnimation(section) {
  const progressLine = section.querySelector(".procedure__lineProgress");
  const axis = section.querySelector(".procedure__axis");
  const steps = [...section.querySelectorAll(".procedure__step")];

  if (!progressLine || !axis || steps.length === 0) {
    return;
  }

  /* =====================================================
     ORIENTATION
  ===================================================== */

  function isVerticalProcedure() {
    return window.matchMedia("(max-width:1000px)").matches;
  }

  /* =====================================================
     ACCESSIBILITÉ
  ===================================================== */

  const reducedMotion = window.matchMedia("(prefers-reduced-motion:reduce)");

  if (reducedMotion.matches) {
    if (isVerticalProcedure()) {
      progressLine.style.transform = "scaleY(1)";
    } else {
      progressLine.style.transform = "scaleX(1)";
    }

    axis.classList.add("is-complete");

    return;
  }

  /* =====================================================
     RÉGLAGES DE L'ANIMATION
  ===================================================== */

  const fullTravelDuration = 8000;
  const cardPauseDuration = 3000;
  const endPauseDuration = 900;
  const activeAfterMarker = 0.025;

  /* =====================================================
     CHECKPOINTS
  ===================================================== */

  const checkpoints = steps
    .map((step, index) => {
      return {
        progress: Number(step.dataset.stepProgress),
        stepIndex: index,
      };
    })
    .filter((checkpoint) => {
      return Number.isFinite(checkpoint.progress);
    })
    .sort((checkpointA, checkpointB) => {
      return checkpointA.progress - checkpointB.progress;
    });

  const targets = [
    ...checkpoints,
    {
      progress: 1,
      stepIndex: null,
    },
  ];

  /* =====================================================
     ÉTAT DE L'ANIMATION
  ===================================================== */

  let isSectionVisible = false;
  let isRunning = false;
  let hasStarted = false;
  let pausedAt = null;

  let progress = 0;
  let targetIndex = 0;
  let segmentStartProgress = 0;
  let segmentStartTime = null;
  let pauseStartTime = null;
  let endPauseStartTime = null;
  let pausedStepIndex = null;
  let animationState = "moving";

  /* =====================================================
     EASING
  ===================================================== */

  function easeInOutCubic(value) {
    if (value < 0.5) {
      return 4 * value * value * value;
    }

    return 1 - Math.pow(-2 * value + 2, 3) / 2;
  }

  /* =====================================================
     AFFICHAGE DE LA LIGNE
  ===================================================== */

  function updateLine() {
    if (!isVerticalProcedure()) {
      progressLine.style.transform = `scaleX(${progress})`;
    } else {
      progressLine.style.transform = `scaleY(${progress})`;
    }

    axis.classList.toggle("is-complete", progress >= 0.995);
  }

  /* =====================================================
     ÉTAT VISUEL DES CARTES
  ===================================================== */

  function updateStepStates() {
    steps.forEach((step, index) => {
      const stepProgress = Number(step.dataset.stepProgress);

      if (!Number.isFinite(stepProgress)) {
        return;
      }

      const isPausedCard = pausedStepIndex === index;

      const isJustPassed =
        progress >= stepProgress &&
        progress <= stepProgress + activeAfterMarker;

      const isActive = isPausedCard || isJustPassed;

      step.classList.toggle("is-active", isActive);
    });
  }

  /* =====================================================
     RESET DU CYCLE
  ===================================================== */

  function resetCycle(now = performance.now()) {
    progress = 0;
    targetIndex = 0;
    segmentStartProgress = 0;
    segmentStartTime = now;
    pauseStartTime = null;
    endPauseStartTime = null;
    pausedStepIndex = null;
    animationState = "moving";

    updateLine();
    updateStepStates();
  }

  /* =====================================================
     DÉCALAGE DES TEMPS APRÈS UNE PAUSE
  ===================================================== */

  function shiftAnimationTimes(pausedDuration) {
    if (segmentStartTime !== null) {
      segmentStartTime += pausedDuration;
    }

    if (pauseStartTime !== null) {
      pauseStartTime += pausedDuration;
    }

    if (endPauseStartTime !== null) {
      endPauseStartTime += pausedDuration;
    }
  }

  /* =====================================================
     DÉPLACEMENT
  ===================================================== */

  function updateMovement(now) {
    const target = targets[targetIndex];

    if (!target) {
      return;
    }

    const targetProgress = target.progress;
    const distance = targetProgress - segmentStartProgress;
    const segmentDuration = Math.max(300, fullTravelDuration * distance);
    const elapsed = now - segmentStartTime;
    const rawProgress = Math.min(elapsed / segmentDuration, 1);
    const easedProgress = easeInOutCubic(rawProgress);

    progress = segmentStartProgress + distance * easedProgress;

    updateLine();
    updateStepStates();

    if (rawProgress >= 1) {
      progress = targetProgress;

      updateLine();

      if (target.stepIndex !== null) {
        pausedStepIndex = target.stepIndex;
        animationState = "card-pause";
        pauseStartTime = now;

        updateStepStates();

        return;
      }

      animationState = "end-pause";
      endPauseStartTime = now;
    }
  }

  /* =====================================================
     PAUSE DE 3 SECONDES
  ===================================================== */

  function updateCardPause(now) {
    updateLine();
    updateStepStates();

    if (pauseStartTime === null) {
      pauseStartTime = now;
    }

    const elapsed = now - pauseStartTime;

    if (elapsed < cardPauseDuration) {
      return;
    }

    segmentStartProgress = progress;
    segmentStartTime = now;
    pauseStartTime = null;
    pausedStepIndex = null;
    targetIndex += 1;
    animationState = "moving";

    updateStepStates();
  }

  /* =====================================================
     PAUSE À LA FIN
  ===================================================== */

  function updateEndPause(now) {
    progress = 1;

    updateLine();
    updateStepStates();

    if (endPauseStartTime === null) {
      endPauseStartTime = now;
    }

    if (now - endPauseStartTime < endPauseDuration) {
      return;
    }

    resetCycle(now);
  }

  /* =====================================================
     BOUCLE PRINCIPALE
  ===================================================== */

  function render(now) {
    if (!isRunning) {
      procedureAnimationFrame = null;

      return;
    }

    if (segmentStartTime === null) {
      segmentStartTime = now;
    }

    if (animationState === "moving") {
      updateMovement(now);
    } else if (animationState === "card-pause") {
      updateCardPause(now);
    } else if (animationState === "end-pause") {
      updateEndPause(now);
    }

    procedureAnimationFrame = requestAnimationFrame(render);
  }

  /* =====================================================
     DÉMARRAGE
  ===================================================== */

  function start() {
    if (!isSectionVisible || document.hidden || isRunning) {
      return;
    }

    const now = performance.now();

    if (!hasStarted) {
      resetCycle(now);
      hasStarted = true;
    } else if (pausedAt !== null) {
      shiftAnimationTimes(now - pausedAt);
    }

    pausedAt = null;
    isRunning = true;

    if (procedureAnimationFrame === null) {
      procedureAnimationFrame = requestAnimationFrame(render);
    }
  }

  /* =====================================================
     ARRÊT
  ===================================================== */

  function stop() {
    if (!isRunning) {
      return;
    }

    isRunning = false;
    pausedAt = performance.now();

    if (procedureAnimationFrame !== null) {
      cancelAnimationFrame(procedureAnimationFrame);

      procedureAnimationFrame = null;
    }
  }

  /* =====================================================
     CHANGEMENT D'ORIENTATION AU RESIZE
  ===================================================== */

  window.addEventListener(
    "resize",
    () => {
      updateLine();
    },
    {
      passive: true,
    },
  );

  /* =====================================================
     VISIBILITÉ DE L'ONGLET
  ===================================================== */

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stop();

      return;
    }

    start();
  });

  /* =====================================================
     OBSERVER
  ===================================================== */

  procedureObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];

      isSectionVisible = Boolean(
        entry?.isIntersecting && entry.intersectionRatio >= 0.15,
      );

      if (isSectionVisible) {
        start();
      } else {
        stop();
      }
    },
    {
      threshold: [0, 0.15],
    },
  );

  procedureObserver.observe(section);
}
