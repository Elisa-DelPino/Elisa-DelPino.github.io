document.documentElement.classList.add("js");

const reduceMotion = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
const revealItems = [...document.querySelectorAll(".reveal")];

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-in"));
}

const stepsList = document.getElementById("svcSteps");
const stepItems = stepsList ? [...stepsList.querySelectorAll(".svc-step")] : [];
const mobileQuery = window.matchMedia("(max-width:600px)");
let stepTimer = null;
let current = 0;
let visible = false;
let paused = false;
let frame = 0;

function setRatio(value) {
  stepsList.style.setProperty("--svc-ratio", Math.min(1, Math.max(0, value)).toFixed(4));
}

function setStates(index) {
  stepItems.forEach((item, i) => {
    item.classList.toggle("is-active", i === index);
    item.classList.toggle("is-done", i < index);
  });
}

function setActiveStep(index) {
  setStates(index);

  const vertical = mobileQuery.matches;
  const total = vertical ? stepsList.offsetHeight : stepsList.offsetWidth;
  const position = vertical
    ? stepItems[index].offsetTop + 32
    : stepItems[index].offsetLeft;

  setRatio(position / total);
  current = index;
}

function stopTimer() {
  window.clearInterval(stepTimer);
  stepTimer = null;
}

function startTimer() {
  if (stepTimer || !visible || paused || mobileQuery.matches || reduceMotion) {
    return;
  }

  stepTimer = window.setInterval(() => {
    setActiveStep((current + 1) % stepItems.length);
  }, 4000);
}

function updateScroll() {
  frame = 0;

  if (!mobileQuery.matches || reduceMotion) {
    return;
  }

  const box = stepsList.getBoundingClientRect();
  const reference = window.innerHeight * 0.55 - box.top;
  let active = 0;

  stepItems.forEach((item, i) => {
    if (item.offsetTop + 32 <= reference) {
      active = i;
    }
  });

  setStates(active);
  setRatio((reference - 6) / (box.height - 6));
}

function requestScroll() {
  if (!frame && visible) {
    frame = window.requestAnimationFrame(updateScroll);
  }
}

function applyMode() {
  stopTimer();

  if (reduceMotion) {
    setActiveStep(stepItems.length - 1);

    return;
  }

  if (mobileQuery.matches) {
    updateScroll();

    return;
  }

  setActiveStep(current);
  startTimer();
}

if (stepsList && stepItems.length) {
  stepItems.forEach((item, i) => {
    const take = () => {
      if (mobileQuery.matches || reduceMotion) {
        return;
      }

      paused = true;
      stopTimer();
      setActiveStep(i);
    };
    const release = () => {
      paused = false;
      startTimer();
    };

    item.addEventListener("mouseenter", take);
    item.addEventListener("focusin", take);
    item.addEventListener("mouseleave", release);
    item.addEventListener("focusout", release);
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);

        if (visible) {
          if (mobileQuery.matches) {
            updateScroll();
          } else {
            startTimer();
          }
        } else {
          stopTimer();
        }
      },
      { threshold: 0, rootMargin: "-10% 0px -10% 0px" },
    ).observe(stepsList);
  } else {
    visible = true;
  }

  window.addEventListener("scroll", requestScroll, { passive: true });
  window.addEventListener("resize", () => {
    applyMode();
    requestScroll();
  }, { passive: true });
  mobileQuery.addEventListener("change", applyMode);
  setActiveStep(0);
  applyMode();
}

window.svcSetStep = (index) => {
  stopTimer();
  paused = true;
  setActiveStep(index);
};

function prepareHeaderLogo() {
  const logo = document.querySelector(".header__logo a");

  if (!logo) {
    return false;
  }

  logo.setAttribute("href", "#top");
  logo.setAttribute("aria-label", "Remonter en haut de la page");

  return true;
}

document.addEventListener("click", (event) => {
  const logo = event.target.closest(".header__logo a");

  if (!logo) {
    return;
  }

  event.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: reduceMotion ? "auto" : "smooth",
  });
});

if (!prepareHeaderLogo()) {
  const headerObserver = new MutationObserver(() => {
    if (prepareHeaderLogo()) {
      headerObserver.disconnect();
    }
  });

  headerObserver.observe(document.body, { childList: true, subtree: true });
}
