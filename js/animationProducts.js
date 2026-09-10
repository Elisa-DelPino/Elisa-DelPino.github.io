let animationAlreadyStarted = false;

// -----------------------------------------------------------------------------
// OUTILS
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

function waitElementVisible(element) {
  return new Promise((resolve) => {
    if (!element) {
      resolve();
      return;
    }

    const headerHeight = getHeaderHeight();

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
        threshold: 0.18,
        rootMargin: `-${headerHeight}px 0px -8% 0px`,
      },
    );

    observer.observe(element);
  });
}

function revealProductCard(wrapper, duration = 900) {
  return new Promise((resolve) => {
    if (!wrapper) {
      resolve();
      return;
    }

    if (wrapper.classList.contains("is-card-visible")) {
      resolve();
      return;
    }

    if (isPassed(wrapper)) {
      wrapper.classList.add("is-card-visible");
      resolve();
      return;
    }

    let finished = false;
    let timeoutId = null;

    function finish() {
      if (finished) {
        return;
      }

      finished = true;
      clearTimeout(timeoutId);
      wrapper.removeEventListener("transitionend", handleTransitionEnd);
      resolve();
    }

    function handleTransitionEnd(event) {
      if (event.target === wrapper && event.propertyName === "transform") {
        finish();
      }
    }

    wrapper.addEventListener("transitionend", handleTransitionEnd);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        wrapper.classList.add("is-card-visible");
      });
    });

    timeoutId = setTimeout(finish, duration + 150);
  });
}

// -----------------------------------------------------------------------------
// DIRECTIONS
// -----------------------------------------------------------------------------

function applyRevealDirections() {
  const wrappers = [...document.querySelectorAll(".wrapper__products")];

  wrappers.forEach((wrapper, index) => {
    if (
      wrapper.dataset.reveal !== "left" &&
      wrapper.dataset.reveal !== "right"
    ) {
      wrapper.dataset.reveal = index % 2 === 0 ? "left" : "right";
    }
  });
}

// -----------------------------------------------------------------------------
// ANIMATION
// -----------------------------------------------------------------------------

async function runAnimation() {
  const wrappers = [...document.querySelectorAll(".wrapper__products")];

  for (const wrapper of wrappers) {
    await waitElementVisible(wrapper);
    await revealProductCard(wrapper);
    await new Promise((resolve) => {
      setTimeout(resolve, 170);
    });
  }
}

// -----------------------------------------------------------------------------
// INITIALISATION PUBLIQUE
// -----------------------------------------------------------------------------

export function initAnimations() {
  if (animationAlreadyStarted) {
    return;
  }

  animationAlreadyStarted = true;

  applyRevealDirections();

  setTimeout(() => {
    runAnimation().catch((error) => {
      console.error("Erreur pendant les animations produits :", error);
      animationAlreadyStarted = false;
    });
  }, 100);
}
