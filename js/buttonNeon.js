// buttonNeon.js

let heroButtonsInitialized = false;

const activeTimeouts = new Set();
const activeAnimationFrames = new Set();

export function initHeroButtons() {
  if (heroButtonsInitialized) return;

  const neonHeroButtons = [...document.querySelectorAll(".hero__button")];

  if (neonHeroButtons.length === 0) {
    console.warn("Aucun bouton .hero__button trouvé.");
    return;
  }

  heroButtonsInitialized = true;

  // -----------------------------------------------------------------------
  // OUTILS
  // -----------------------------------------------------------------------

  function clearButtonsNeonState() {
    neonHeroButtons.forEach((button) => {
      button.classList.remove("neon-dim", "neon-off", "neon-flash");
    });
  }

  function setButtonsNeonState(stateClass = null) {
    clearButtonsNeonState();

    if (!stateClass) return;

    neonHeroButtons.forEach((button) => {
      button.classList.add(stateClass);
    });
  }

  function trackedTimeout(callback, delay) {
    const id = window.setTimeout(() => {
      activeTimeouts.delete(id);
      callback();
    }, delay);

    activeTimeouts.add(id);

    return id;
  }

  function trackedAnimationFrame(callback) {
    const id = requestAnimationFrame((time) => {
      activeAnimationFrames.delete(id);
      callback(time);
    });

    activeAnimationFrames.add(id);

    return id;
  }

  // -----------------------------------------------------------------------
  // PLANIFICATION DU PROCHAIN GRÉSILLEMENT
  // -----------------------------------------------------------------------

  function scheduleNextFlicker() {
    const delay = 1200 + Math.random() * 1800;

    trackedTimeout(() => {
      playSynchronizedFlicker();
    }, delay);
  }

  // -----------------------------------------------------------------------
  // GRÉSILLEMENT SYNCHRONISÉ
  // -----------------------------------------------------------------------

  function playSynchronizedFlicker() {
    const duration = 300 + Math.random() * 250;

    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;

      if (elapsed >= duration) {
        clearButtonsNeonState();
        scheduleNextFlicker();
        return;
      }

      const randomValue = Math.random();

      /*
       * Le même état est appliqué aux deux boutons
       * au même moment.
       */
      if (randomValue < 0.28) {
        setButtonsNeonState("neon-off");
      } else if (randomValue < 0.58) {
        setButtonsNeonState("neon-dim");
      } else if (randomValue < 0.7) {
        setButtonsNeonState("neon-flash");
      } else {
        clearButtonsNeonState();
      }

      trackedTimeout(
        () => {
          trackedAnimationFrame(step);
        },
        25 + Math.random() * 30,
      );
    }

    trackedAnimationFrame(step);
  }

  // -----------------------------------------------------------------------
  // INITIALISATION
  // -----------------------------------------------------------------------

  clearButtonsNeonState();
  scheduleNextFlicker();
}

// -----------------------------------------------------------------------
// NETTOYAGE
// -----------------------------------------------------------------------

export function destroyHeroButtons() {
  activeTimeouts.forEach((id) => {
    clearTimeout(id);
  });

  activeTimeouts.clear();

  activeAnimationFrames.forEach((id) => {
    cancelAnimationFrame(id);
  });

  activeAnimationFrames.clear();

  document.querySelectorAll(".hero__button").forEach((button) => {
    button.classList.remove("neon-dim", "neon-off", "neon-flash");
  });

  heroButtonsInitialized = false;
}
