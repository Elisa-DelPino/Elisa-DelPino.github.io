import { startCakeAnimation, stopCakeAnimation } from "./cakeAnimation.js";
import { startCakeCarousel, stopCakeCarousel } from "./cakeCarousel.js";
import { demo2Cakes } from "./dataDemo2.js";

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

/* =====================================================
   GALERIE MOBILE — AGRANDISSEMENT D'UN GÂTEAU
===================================================== */

function injectGalleryMobileExpansionCSS() {
  if (document.getElementById("demo2GalleryMobileExpansionStyle")) {
    return;
  }

  const style = document.createElement("style");

  style.id = "demo2GalleryMobileExpansionStyle";

  style.textContent = `
    @media screen and (max-width: 600px) {
      /*
       * La galerie reste sur 2 colonnes.
       * Une carte ouverte prend toute la largeur.
       *
       * Comme la carte reste carrée, elle devient
       * environ 2 fois plus large et 2 fois plus haute :
       * elle occupe donc visuellement la surface
       * de 4 petites cartes.
       */
      .demo2__galleryPage .demo2__galerie__item {
        grid-auto-flow: row;
        align-items: start;
      }

      .demo2__galleryPage .demo2__imgWrapper {
        width: 100%;
        min-width: 0;
        aspect-ratio: 1 / 1;
      }

      .demo2__galleryPage .demo2__imgWrapper.is-open {
        grid-column: 1 / -1;
        width: 100%;
        aspect-ratio: 1 / 1;
        z-index: 80;
      }

      .demo2__galleryPage .demo2__imgWrapper.is-open .demo2__galleryTrigger {
        width: 100%;
        height: 100%;
      }

      /*
       * On écrase les positions desktop / tablette
       * lorsque la carte est ouverte sur smartphone.
       */
      .demo2__galleryPage .demo2__imgWrapper.is-open .demo2__cakeInfo,
      .demo2__galleryPage .demo2__imgWrapper:nth-child(3n).is-open .demo2__cakeInfo,
      .demo2__galleryPage .demo2__imgWrapper:nth-child(4n).is-open .demo2__cakeInfo {
        position: absolute;
        top: 50%;
        left: 50%;
        right: auto;
        bottom: auto;

        width: 84%;
        height: auto;
        min-height: 70%;
        max-height: 84%;

        padding: clamp(16px, 5vw, 24px);

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        opacity: 1;
        visibility: visible;
        pointer-events: none;

        transform: translate(-50%, -50%) scale(1);

        overflow: hidden;
      }

      .demo2__galleryPage .demo2__imgWrapper.is-open .demo2__cakeInfoLabel {
        margin-bottom: clamp(5px, 1.7vw, 8px);

        font-size: clamp(7px, 2.2vw, 10px);
        letter-spacing: 0.11em;
      }

      .demo2__galleryPage .demo2__imgWrapper.is-open .demo2__cakeInfoTitle {
        margin-bottom: clamp(8px, 2.5vw, 13px);

        font-size: clamp(21px, 7vw, 30px);
        line-height: 1.05;
      }

      .demo2__galleryPage .demo2__imgWrapper.is-open .demo2__cakeInfoSeparator {
        width: clamp(38px, 12vw, 55px);

        margin-bottom: clamp(9px, 2.8vw, 14px);
      }

      .demo2__galleryPage .demo2__imgWrapper.is-open .demo2__cakeInfoDescription {
        font-size: clamp(11px, 3.4vw, 15px);
        line-height: 1.4;
      }
    }

    @media screen and (max-width: 380px) {
      .demo2__galleryPage .demo2__imgWrapper.is-open .demo2__cakeInfo,
      .demo2__galleryPage .demo2__imgWrapper:nth-child(3n).is-open .demo2__cakeInfo,
      .demo2__galleryPage .demo2__imgWrapper:nth-child(4n).is-open .demo2__cakeInfo {
        width: 86%;
        min-height: 72%;
        max-height: 88%;

        padding: 14px;
      }

      .demo2__galleryPage .demo2__imgWrapper.is-open .demo2__cakeInfoTitle {
        font-size: clamp(19px, 7vw, 25px);
      }

      .demo2__galleryPage .demo2__imgWrapper.is-open .demo2__cakeInfoDescription {
        font-size: clamp(10px, 3.5vw, 13px);
        line-height: 1.35;
      }
    }
  `;

  document.head.appendChild(style);
}

injectGalleryMobileExpansionCSS();

function isGallerySmartphone() {
  return window.matchMedia("(max-width: 600px)").matches;
}

/* =====================================================
   ARRÊT DES COMPOSANTS
===================================================== */

function stopDemo2Components(element) {
  stopCakeAnimation();

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
  });

  galleryButton?.addEventListener("click", () => {
    createGalleryHTML(element);
  });

  function goHomeTop() {
    const homeIsAlreadyOpen = Boolean(element.querySelector(".demo2__hero"));

    if (!homeIsAlreadyOpen) {
      createHomeHTML(element);
    }

    requestAnimationFrame(() => {
      if (typeof element.scrollTo === "function") {
        element.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        element.scrollTop = 0;
      }
    });
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


        <!-- ==================================================
             HERO
        =================================================== -->

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


        <!-- ==================================================
             AVANTAGES
        =================================================== -->

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


        <!-- ==================================================
             CARROUSEL
        =================================================== -->

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


        <!-- ==================================================
             SAVOIR-FAIRE
        =================================================== -->

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


        <!-- ==================================================
             COLLECTIONS
        =================================================== -->

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


            <!-- GÂTEAUX -->

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


            <!-- PÂTISSERIE -->

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


            <!-- MACARONS -->

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


            <!-- CUPCAKES -->

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

  /* =====================================================
     HEADER
  ===================================================== */

  connectHeaderNavigation(element);

  /* =====================================================
     COLLECTIONS → GALERIE
  ===================================================== */

  const collectionGalleryLinks = element.querySelectorAll(
    "[data-gallery-link]",
  );

  collectionGalleryLinks.forEach((link) => {
    function openGallery() {
      createGalleryHTML(element);
    }

    link.addEventListener("click", openGallery);

    link.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        openGallery();
      }
    });
  });

  /* =====================================================
     CARROUSEL
  ===================================================== */

  const carouselContainer = element.querySelector(".cake-carousel");

  startCakeCarousel(carouselContainer);

  /* =====================================================
     CLIC CARROUSEL
     → GALERIE
  ===================================================== */

  carouselContainer?.addEventListener("click", (event) => {
    const item = event.target.closest(".cake-carousel__item");

    if (!item) {
      return;
    }

    createGalleryHTML(element);
  });

  /* =====================================================
     GÂTEAU THREE.JS
  ===================================================== */

  const cakeContainer = element.querySelector(".cake-animation");

  startCakeAnimation(cakeContainer);
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


          <!-- ==================================================
               TITRE
          =================================================== -->

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


          <!-- ==================================================
               GALERIE
          =================================================== -->

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


                      <div
                        class="demo2__cakeInfo"
                      >


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

  /* =====================================================
     HEADER
  ===================================================== */

  connectHeaderNavigation(element);

  /* =====================================================
     CARTES GALERIE
  ===================================================== */

  const cakeItems = element.querySelectorAll(".demo2__imgWrapper");

  /*
   * Sur smartphone, une carte située dans la colonne de droite
   * doit être déplacée temporairement au début de sa rangée
   * avant de pouvoir prendre les deux colonnes sans laisser de trou.
   *
   * On garde un marqueur invisible à sa position d'origine
   * afin de pouvoir la remettre exactement à sa place
   * lorsqu'elle se referme.
   */
  const mobileCakePositions = new WeakMap();

  /* =====================================================
     SMARTPHONE
     DÉPLACER UN GÂTEAU DE DROITE À GAUCHE
  ===================================================== */

  function moveCakeToRowStart(item) {
    if (!item || !isGallerySmartphone()) {
      return;
    }

    const cakeIndex = Number(item.dataset.cakeIndex);

    /*
     * Index d'origine :
     *
     * 0 = gauche
     * 1 = droite
     * 2 = gauche
     * 3 = droite
     * etc.
     */
    const isRightColumn = cakeIndex % 2 === 1;

    if (!isRightColumn) {
      return;
    }

    /*
     * Si la carte a déjà été déplacée,
     * on ne la déplace pas une deuxième fois.
     */
    if (mobileCakePositions.has(item)) {
      return;
    }

    const parent = item.parentElement;

    const leftCake = item.previousElementSibling;

    if (!parent || !leftCake) {
      return;
    }

    /*
     * Marqueur invisible placé exactement
     * à l'ancienne position de la carte.
     */
    const placeholder = document.createComment(`position-cake-${cakeIndex}`);

    parent.insertBefore(placeholder, item);

    mobileCakePositions.set(item, placeholder);

    /*
     * La carte de droite passe juste avant
     * la carte qui était à sa gauche.
     *
     * Elle devient donc le premier élément
     * de cette rangée et peut ensuite prendre
     * les deux colonnes sans créer de trou.
     */
    parent.insertBefore(item, leftCake);
  }

  /* =====================================================
     SMARTPHONE
     REMETTRE LE GÂTEAU À SA POSITION D'ORIGINE
  ===================================================== */

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

    /*
     * On replace la carte exactement
     * à l'endroit mémorisé.
     */
    parent.insertBefore(item, placeholder);

    placeholder.remove();

    mobileCakePositions.delete(item);
  }

  /* =====================================================
     FERMER UNE CARTE
  ===================================================== */

  function closeCakeCard(item) {
    if (!item) {
      return;
    }

    item.classList.remove("is-open");

    const trigger = item.querySelector(".demo2__galleryTrigger");

    trigger?.setAttribute("aria-expanded", "false");

    /*
     * Si la carte avait été déplacée depuis la colonne de droite,
     * elle reprend maintenant sa position d'origine.
     */
    restoreCakePosition(item);
  }

  /* =====================================================
     FERMER TOUTES LES CARTES
  ===================================================== */

  function closeAllCakeCards(exceptItem = null) {
    cakeItems.forEach((item) => {
      if (item === exceptItem) {
        return;
      }

      closeCakeCard(item);
    });
  }

  /* =====================================================
     OUVRIR UNE CARTE

     IMPORTANT :
     avant chaque ouverture,
     toutes les autres sont fermées.
  ===================================================== */

  function openCakeCard(item) {
    if (!item) {
      return;
    }

    /*
     * Ferme d'abord la carte éventuellement ouverte.
     * Si elle avait été déplacée sur smartphone,
     * elle est également remise à sa place d'origine.
     */
    closeAllCakeCards(item);

    /*
     * Sur smartphone, si cette carte appartient
     * à la colonne de droite dans l'ordre d'origine,
     * on la déplace temporairement au début de sa rangée.
     */
    moveCakeToRowStart(item);

    /*
     * Elle peut maintenant prendre les deux colonnes
     * sans laisser de case vide.
     */
    item.classList.add("is-open");

    const trigger = item.querySelector(".demo2__galleryTrigger");

    trigger?.setAttribute("aria-expanded", "true");
  }

  /* =====================================================
     TOGGLE D'UNE CARTE
  ===================================================== */

  function toggleCakeCard(item) {
    if (!item) {
      return;
    }

    const wasOpen = item.classList.contains("is-open");

    /*
     * Toujours tout fermer avant.
     */

    closeAllCakeCards();

    /*
     * Si elle était fermée,
     * on la rouvre.
     *
     * Si elle était ouverte,
     * elle reste fermée.
     */

    if (!wasOpen) {
      openCakeCard(item);
    }
  }

  /* =====================================================
     ÉVÉNEMENTS
  ===================================================== */

  cakeItems.forEach((item) => {
    const trigger = item.querySelector(".demo2__galleryTrigger");

    if (!trigger) {
      return;
    }

    /* =================================================
         SURVOL

         Sur ordinateur / tablette :
         le survol continue d'ouvrir la fiche.

         Sur smartphone :
         on désactive volontairement le survol
         pour réserver l'ouverture au tap.
      ================================================= */

    item.addEventListener("pointerenter", (event) => {
      /*
       * Sur smartphone, l'ouverture se fait uniquement
       * au tap / clic afin de déclencher l'agrandissement.
       *
       * Sur les écrans plus grands, on garde le survol.
       */

      if (isGallerySmartphone() || event.pointerType === "touch") {
        return;
      }

      openCakeCard(item);
    });

    /* =================================================
         FIN DU SURVOL
      ================================================= */

    item.addEventListener("pointerleave", (event) => {
      /*
       * Sur smartphone, on ne ferme pas au déplacement
       * du pointeur : seul un nouveau tap referme la carte.
       */

      if (isGallerySmartphone() || event.pointerType === "touch") {
        return;
      }

      closeCakeCard(item);
    });

    /* =================================================
         TAP SMARTPHONE / TABLETTE

         pointerup permet de connaître
         précisément le type de pointeur.
      ================================================= */

    trigger.addEventListener("pointerup", (event) => {
      /*
       * Seul le doigt utilise ce toggle.
       *
       * Souris et stylet sont déjà
       * gérés par le hover.
       */

      if (event.pointerType !== "touch") {
        return;
      }

      toggleCakeCard(item);
    });

    /* =================================================
         CLAVIER

         Enter / espace sur le bouton.
      ================================================= */

    trigger.addEventListener("click", (event) => {
      /*
       * event.detail === 0
       * correspond à une activation clavier.
       *
       * Cela évite un deuxième toggle
       * après le pointerup tactile.
       */

      if (event.detail !== 0) {
        return;
      }

      toggleCakeCard(item);
    });
  });

  /* =====================================================
     CLIC / TAP EN DEHORS
     → FERME TOUTES LES CARTES
  ===================================================== */

  const gallery = element.querySelector(".demo2__galleryPage");

  gallery?.addEventListener("pointerup", (event) => {
    /*
     * Si on a touché un gâteau,
     * son propre événement s'en charge.
     */

    const clickedCake = event.target.closest(".demo2__imgWrapper");

    if (clickedCake) {
      return;
    }

    closeAllCakeCards();
  });
}
