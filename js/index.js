import { startImprimedCircuit } from "./imprimedCircuit.js";
import { AddLoader } from "./loadingPage.js";
import { initTextRotator } from "./animationHome.js";
import { revealTextLines } from "./animationProducts.js";

function getHeaderHeight() {
  const header = document.querySelector("header");
  return header ? header.offsetHeight : 0;
}

function isPassed(element) {
  const rect = element.getBoundingClientRect();
  const headerHeight = getHeaderHeight();
  return rect.bottom <= headerHeight;
}

function isReallyVisible(element) {
  const rect = element.getBoundingClientRect();
  const headerHeight = getHeaderHeight();

  return rect.bottom > headerHeight && rect.top < window.innerHeight;
}

// Attend que l'élément soit visible sous le header OU déjà passé derrière le header
function waitElementVisible(element) {
  return new Promise((resolve) => {
    const headerHeight = getHeaderHeight();

    if (isPassed(element) || isReallyVisible(element)) {
      resolve();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          resolve();
        }
      },
      {
        threshold: 0.5,
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
      },
    );

    observer.observe(element);
  });
}

function revealImage(element, duration = 800) {
  return new Promise((resolve) => {
    const img = element.querySelector("img");

    if (!img) {
      resolve();
      return;
    }

    const wrapper = element.closest(".wrapper__products") || element;

    // Si le wrapper est déjà passé derrière le header, on skip direct
    if (isPassed(wrapper)) {
      img.style.opacity = "1";
      img.style.transform = "translateX(0%)";
      resolve();
      return;
    }

    requestAnimationFrame(() => {
      img.style.opacity = "1";
      img.style.transform = "translateX(0%)";
    });

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      resolve();
    }, duration);

    // Si pendant l'animation le wrapper passe derrière le header, on stoppe direct
    const intervalId = setInterval(() => {
      if (isPassed(wrapper)) {
        img.style.opacity = "1";
        img.style.transform = "translateX(0%)";
        clearTimeout(timeoutId);
        clearInterval(intervalId);
        resolve();
      }
    }, 50);
  });
}

async function runAnimation() {
  const wrappers = document.querySelectorAll(".wrapper__products");

  for (const wrapper of wrappers) {
    const first = wrapper.firstElementChild;
    const last = wrapper.lastElementChild;

    await waitElementVisible(wrapper);

    if (first.querySelector("img")) {
      await revealImage(first);
      await revealTextLines(last.querySelector("p"));
    } else {
      await revealTextLines(first.querySelector("p"));
      await revealImage(last);
    }
  }
}

// Launch animations
export function initAnimations() {
  if (document.readyState === "complete") {
    setTimeout(() => {
      runAnimation();
    }, 100);
  } else {
    window.addEventListener("load", () => {
      setTimeout(() => {
        runAnimation();
      }, 100);
    });
  }
}

const children = document.querySelectorAll(".children__other");

children.forEach((child, index) => {
  child.addEventListener("click", () => {
    const wrapper = document.getElementById(`wrapper__${index}`);

    if (wrapper) {
      const header = document.querySelector(".header");
      const headerHeight = header ? header.offsetHeight : 0;

      const top =
        wrapper.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  });
});

// Add circuitImprimed
startImprimedCircuit(window.imprimedCircuitConfig);

// Add Loader
AddLoader();

// Add textRotator
initTextRotator(".text-rotator", 2500);
