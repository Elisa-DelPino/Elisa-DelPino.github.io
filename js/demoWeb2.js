import { startCakeCarousel, stopCakeCarousel } from "./cakeCarousel.js";
import { demo2Cakes } from "./dataDemo2.js";

let demo2RootElement = null;
let cakeAnimationModule = null;
let cakeAnimationModulePromise = null;
let cakeAnimationRequestId = 0;

/* =====================================================
   ANIMATION GÂTEAU
===================================================== */

async function loadCakeAnimationModule() {
  if (cakeAnimationModule) {
    return cakeAnimationModule;
  }

  if (!cakeAnimationModulePromise) {
    cakeAnimationModulePromise = import("./cakeAnimation.js");
  }

  cakeAnimationModule = await cakeAnimationModulePromise;

  return cakeAnimationModule;
}

async function startCakeAnimationFor(container) {
  if (!container) {
    return;
  }

  const requestId = ++cakeAnimationRequestId;

  try {
    const module = await loadCakeAnimationModule();

    if (requestId !== cakeAnimationRequestId || !container.isConnected) {
      return;
    }

    module.startCakeAnimation(container);
  } catch (error) {
    console.error("Impossible de charger l’animation du gâteau :", error);
  }
}

function stopCakeAnimationIfLoaded() {
  cakeAnimationRequestId += 1;

  cakeAnimationModule?.stopCakeAnimation?.();
}

/* =====================================================
   POLICES
===================================================== */

if (!document.getElementById("demo2Font")) {
  const font = document.createElement("link");

  font.id = "demo2Font";
  font.rel = "stylesheet";
  font.href =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Marcellus&display=swap";

  document.head.appendChild(font);
}

function getDemo2Width(element = demo2RootElement) {
  const site = element?.querySelector(".demo2__site");
  const target = site || element;
  const width = target?.getBoundingClientRect().width;

  return width || window.innerWidth;
}

function isGallerySmartphone(element = demo2RootElement) {
  return getDemo2Width(element) <= 600;
}

function scrollDemo2ToTop(element, behavior = "auto") {
  if (!element) {
    return;
  }

  requestAnimationFrame(() => {
    if (typeof element.scrollTo === "function") {
      element.scrollTo({
        top: 0,
        left: 0,
        behavior,
      });
    } else {
      element.scrollTop = 0;
      element.scrollLeft = 0;
    }
  });
}

/* =====================================================
   ARRÊT DES COMPOSANTS
===================================================== */

function stopDemo2Components(element) {
  stopCakeAnimationIfLoaded();

  const carousel = element?.querySelector(".cake-carousel");

  if (carousel) {
    stopCakeCarousel(carousel);
  }
}

/* =====================================================
   HEADER
===================================================== */

function createHeaderHTML() {
  return `

    <nav class="header__demo2">

      <ul class="header__nav__demo2">

        <li class="header__nav__demo2__link">

          <button
            type="button"
            class="header__nav__demo2__button"
            data-page="home"
          >
            ACCUEIL
          </button>

        </li>

        <li
          class="header__nav__demo2__logo"
          data-page="home-top"
          role="button"
          tabindex="0"
          aria-label="Retour en haut de l'accueil"
        >

          <img
            src="./img/logoPatisserie.svg"
            alt="Logo"
          >

        </li>

        <li class="header__nav__demo2__link">

          <button
            type="button"
            class="header__nav__demo2__button"
            data-page="gallery"
          >
            GALERIE
          </button>

        </li>

      </ul>

    </nav>

  `;
}

/* =====================================================
   CONNEXION HEADER
===================================================== */

function connectHeaderNavigation(element) {
  const homeButton = element.querySelector('[data-page="home"]');
  const galleryButton = element.querySelector('[data-page="gallery"]');
  const logoButton = element.querySelector('[data-page="home-top"]');

  homeButton?.addEventListener("click", () => {
    createHomeHTML(element);
    scrollDemo2ToTop(element);
  });

  galleryButton?.addEventListener("click", () => {
    createGalleryHTML(element);
    scrollDemo2ToTop(element);
  });

  function goHomeTop() {
    const homeIsAlreadyOpen = Boolean(element.querySelector(".demo2__hero"));

    if (!homeIsAlreadyOpen) {
      createHomeHTML(element);
    }

    scrollDemo2ToTop(element, "smooth");
  }

  logoButton?.addEventListener("click", goHomeTop);

  logoButton?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      goHomeTop();
    }
  });
}

/* =====================================================
   DÉMARRAGE DÉMO
===================================================== */

export function addDemoWeb2(element) {
  if (!element) {
    return;
  }

  demo2RootElement = element;

  element.style.background = "#fffdfa";

  createHomeHTML(element);
}

/* =====================================================
   PAGE ACCUEIL
===================================================== */

function createHomeHTML(element) {
  stopDemo2Components(element);

  element.innerHTML = `

    <div class="demo2__site">

      ${createHeaderHTML()}

      <main class="wrapper__demo2">

        <section class="demo2__hero">

          <div class="demo2__heroContent">

            <h1 class="demo2__heroTitle">

              DES CRÉATIONS

              <br>

              QUI ÉVEILLENT

              <span class="demo2__heroTitleItalic">
                vos sens
              </span>

            </h1>

          </div>

          <div class="demo2__heroVisual">

            <img
              src="./img/heroPatisserie.png"
              alt="Création pâtissière artisanale"
            >

          </div>

        </section>

        <section class="demo2__benefits">

          <div class="demo2__benefit">

            <span class="demo2__benefitIcon">
              ♧
            </span>

            <div class="demo2__benefitText">

              <span class="demo2__benefitTitle">
                INGRÉDIENTS
              </span>

              <span class="demo2__benefitSub">
                sélectionnés
              </span>

            </div>

          </div>

          <div class="demo2__benefit">

            <span class="demo2__benefitIcon">
              ♢
            </span>

            <div class="demo2__benefitText">

              <span class="demo2__benefitTitle">
                FAIT MAISON
              </span>

              <span class="demo2__benefitSub">
                avec passion
              </span>

            </div>

          </div>

          <div class="demo2__benefit">

            <span class="demo2__benefitIcon">
              ♧
            </span>

            <div class="demo2__benefitText">

              <span class="demo2__benefitTitle">
                LIVRAISON
              </span>

              <span class="demo2__benefitSub">
                rapide & soignée
              </span>

            </div>

          </div>

          <div class="demo2__benefit">

            <span class="demo2__benefitIcon">
              ♢
            </span>

            <div class="demo2__benefitText">

              <span class="demo2__benefitTitle">
                PAIEMENT
              </span>

              <span class="demo2__benefitSub">
                sécurisé
              </span>

            </div>

          </div>

        </section>

        <section class="demo2__creations">

          <div class="demo2__sectionHeading">

            <h2 class="demo2__sectionTitle">
              NOS CRÉATIONS GOURMANDES
            </h2>

            <div
              class="demo2__smallOrnament"
              aria-hidden="true"
            >
              <span></span>
            </div>

          </div>

          <div class="demo2__carouselArea">
            <div class="cake-carousel"></div>
          </div>

        </section>

        <section class="demo2__craft">

          <div class="demo2__craftContent">

            <p class="demo2__craftEyebrow">
              NOTRE SAVOIR-FAIRE
            </p>

            <h2 class="demo2__craftTitle">

              L'EXCELLENCE

              <br>

              À CHAQUE DÉTAIL

            </h2>

            <div class="demo2__craftSeparator"></div>

            <p class="demo2__craftParagraph">

              Chaque création est pensée comme une œuvre
              unique, pour transformer vos moments
              en souvenirs inoubliables.

            </p>

          </div>

          <div class="demo2__cakeArea">

            <div
              class="cake-animation demo2__cakeStage"
            ></div>

          </div>

        </section>

        <section class="demo2__universes">

          <div class="demo2__sectionHeading">

            <h2 class="demo2__sectionTitle">
              NOS COLLECTIONS
            </h2>

            <div
              class="demo2__smallOrnament"
              aria-hidden="true"
            >
              <span></span>
            </div>

          </div>

          <div class="demo2__universeGrid">

            <article class="demo2__universe">

              <div
                class="demo2__universeImage"
                data-gallery-link
                role="button"
                tabindex="0"
                aria-label="Voir la galerie de gâteaux"
              >

                <img
                  src="./img/gateaux1.png"
                  alt="Gâteaux"
                >

              </div>

              <h3 class="demo2__universeTitle">
                GÂTEAUX
              </h3>

              <span class="demo2__universeLink">
                DÉCOUVRIR
              </span>

            </article>

            <article class="demo2__universe">

              <div
                class="demo2__universeImage"
                data-gallery-link
                role="button"
                tabindex="0"
                aria-label="Voir la galerie de pâtisseries"
              >

                <img
                  src="./img/gateaux4.png"
                  alt="Pâtisserie"
                >

              </div>

              <h3 class="demo2__universeTitle">
                PÂTISSERIE
              </h3>

              <span class="demo2__universeLink">
                DÉCOUVRIR
              </span>

            </article>

            <article class="demo2__universe">

              <div
                class="demo2__universeImage"
                data-gallery-link
                role="button"
                tabindex="0"
                aria-label="Voir la galerie de macarons"
              >

                <img
                  src="./img/gateaux14.png"
                  alt="Macarons"
                >

              </div>

              <h3 class="demo2__universeTitle">
                MACARONS
              </h3>

              <span class="demo2__universeLink">
                DÉCOUVRIR
              </span>

            </article>

            <article class="demo2__universe">

              <div
                class="demo2__universeImage"
                data-gallery-link
                role="button"
                tabindex="0"
                aria-label="Voir la galerie de cupcakes"
              >

                <img
                  src="./img/gateaux5.png"
                  alt="Cupcakes"
                >

              </div>

              <h3 class="demo2__universeTitle">
                CUPCAKES
              </h3>

              <span class="demo2__universeLink">
                DÉCOUVRIR
              </span>

            </article>

          </div>

        </section>

      </main>

    </div>

  `;

  connectHeaderNavigation(element);

  const collectionGalleryLinks = element.querySelectorAll(
    "[data-gallery-link]",
  );

  collectionGalleryLinks.forEach((link) => {
    function openGallery() {
      createGalleryHTML(element);
      scrollDemo2ToTop(element);
    }

    link.addEventListener("click", openGallery);

    link.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        openGallery();
      }
    });
  });

  const carouselContainer = element.querySelector(".cake-carousel");

  startCakeCarousel(carouselContainer);

  carouselContainer?.addEventListener("click", (event) => {
    const item = event.target.closest(".cake-carousel__item");

    if (!item) {
      return;
    }

    createGalleryHTML(element);
    scrollDemo2ToTop(element);
  });

  const cakeContainer = element.querySelector(".cake-animation");

  startCakeAnimationFor(cakeContainer);
}

/* =====================================================
   PAGE GALERIE
===================================================== */

function createGalleryHTML(element) {
  stopDemo2Components(element);

  element.innerHTML = `

    <div class="demo2__site">

      ${createHeaderHTML()}

      <main class="wrapper__demo2">

        <section class="demo2__galleryPage">

          <div class="demo2__galleryHeader">

            <h1 class="demo2__galleryTitle">
              NOS CRÉATIONS
            </h1>

            <div
              class="demo2__smallOrnament"
              aria-hidden="true"
            >
              <span></span>
            </div>

          </div>

          <div class="demo2__galerie">

            <div class="demo2__galerie__item">

              ${demo2Cakes
                .map(
                  (cake, index) => `

                    <article
                      class="demo2__imgWrapper"
                      data-cake-index="${index}"
                    >

                      <button
                        type="button"
                        class="demo2__galleryTrigger"
                        aria-label="Voir les informations sur ${cake.name}"
                        aria-expanded="false"
                      >

                        <img
                          src="${cake.img}"
                          alt="${cake.name}"
                        >

                      </button>

                      <div class="demo2__cakeInfo">

                        <span class="demo2__cakeInfoLabel">
                          CRÉATION SIGNATURE
                        </span>

                        <h2 class="demo2__cakeInfoTitle">
                          ${cake.name}
                        </h2>

                        <div
                          class="demo2__cakeInfoSeparator"
                          aria-hidden="true"
                        ></div>

                        <p class="demo2__cakeInfoDescription">
                          ${cake.description}
                        </p>

                      </div>

                    </article>

                  `,
                )
                .join("")}

            </div>

          </div>

        </section>

      </main>

    </div>

  `;

  connectHeaderNavigation(element);

  const cakeItems = element.querySelectorAll(".demo2__imgWrapper");

  const mobileCakePositions = new WeakMap();

  function moveCakeToRowStart(item) {
    if (!item || !isGallerySmartphone(element)) {
      return;
    }

    const cakeIndex = Number(item.dataset.cakeIndex);

    const isRightColumn = cakeIndex % 2 === 1;

    if (!isRightColumn) {
      return;
    }

    if (mobileCakePositions.has(item)) {
      return;
    }

    const parent = item.parentElement;
    const leftCake = item.previousElementSibling;

    if (!parent || !leftCake) {
      return;
    }

    const placeholder = document.createComment(`position-cake-${cakeIndex}`);

    parent.insertBefore(placeholder, item);

    mobileCakePositions.set(item, placeholder);

    parent.insertBefore(item, leftCake);
  }

  function restoreCakePosition(item) {
    if (!item) {
      return;
    }

    const placeholder = mobileCakePositions.get(item);

    if (!placeholder) {
      return;
    }

    const parent = placeholder.parentNode;

    if (!parent) {
      mobileCakePositions.delete(item);

      return;
    }

    parent.insertBefore(item, placeholder);

    placeholder.remove();

    mobileCakePositions.delete(item);
  }

  function closeCakeCard(item) {
    if (!item) {
      return;
    }

    item.classList.remove("is-open");

    const trigger = item.querySelector(".demo2__galleryTrigger");

    trigger?.setAttribute("aria-expanded", "false");

    restoreCakePosition(item);
  }

  function closeAllCakeCards(exceptItem = null) {
    cakeItems.forEach((item) => {
      if (item === exceptItem) {
        return;
      }

      closeCakeCard(item);
    });
  }

  function openCakeCard(item) {
    if (!item) {
      return;
    }

    closeAllCakeCards(item);

    moveCakeToRowStart(item);

    item.classList.add("is-open");

    const trigger = item.querySelector(".demo2__galleryTrigger");

    trigger?.setAttribute("aria-expanded", "true");
  }

  function toggleCakeCard(item) {
    if (!item) {
      return;
    }

    const wasOpen = item.classList.contains("is-open");

    closeAllCakeCards();

    if (!wasOpen) {
      openCakeCard(item);
    }
  }

  cakeItems.forEach((item) => {
    const trigger = item.querySelector(".demo2__galleryTrigger");

    if (!trigger) {
      return;
    }

    item.addEventListener("pointerenter", (event) => {
      if (isGallerySmartphone(element) || event.pointerType === "touch") {
        return;
      }

      openCakeCard(item);
    });

    item.addEventListener("pointerleave", (event) => {
      if (isGallerySmartphone(element) || event.pointerType === "touch") {
        return;
      }

      closeCakeCard(item);
    });

    trigger.addEventListener("pointerup", (event) => {
      if (event.pointerType !== "touch") {
        return;
      }

      toggleCakeCard(item);
    });

    trigger.addEventListener("click", (event) => {
      if (event.detail !== 0) {
        return;
      }

      toggleCakeCard(item);
    });
  });

  const gallery = element.querySelector(".demo2__galleryPage");

  gallery?.addEventListener("pointerup", (event) => {
    const clickedCake = event.target.closest(".demo2__imgWrapper");

    if (clickedCake) {
      return;
    }

    closeAllCakeCards();
  });
}
