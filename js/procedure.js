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

  const progressLine = section.querySelector(".procedure__lineProgress");
  const axis = section.querySelector(".procedure__axis");
  const steps = section.querySelectorAll(".procedure__step");

  if (!progressLine || !axis || steps.length === 0) {
    console.warn("La structure HTML de la procédure est incomplète.");

    return;
  }

  section.dataset.procedureReady = "true";

  startProcedureAnimation(section);
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
