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

  /*
   * Empêche une deuxième initialisation
   * si initProcedure() est appelée plusieurs fois.
   */
  if (section.dataset.procedureReady === "true") {
    return;
  }

  section.dataset.procedureReady = "true";

  injectProcedureCSS();

  createProcedureHTML(section);

  startProcedureAnimation(section);
}

/* =====================================================
   CSS
===================================================== */

function injectProcedureCSS() {
  if (document.getElementById("procedureStyle")) {
    return;
  }

  const style = document.createElement("style");

  style.id = "procedureStyle";

  style.textContent = `

    /* =====================================================
       SECTION COMPLÈTE
    ===================================================== */

    .procedure {
      position: relative;

      width: var(--w-container-size);
      height: auto;

      margin: 0 auto var(--section-gap);
      margin-bottom: calc(var(--section-gap) * 0.3);

      padding:
        0
        0
        clamp(40px, 4vw, 60px);

      background: black;

      overflow: visible;
    }


    .procedure__inner {
      width: 100%;
      height: auto;

      margin: 0 auto;
    }


    /* =====================================================
       TITRE DE SECTION
    ===================================================== */

    .procedure__heading {
      width: auto;

      margin:
        0
        calc(-1 * clamp(20px, 3vw, 42px))
        clamp(40px, 5vw, 65px);

      display: flex;

      align-items: center;
      justify-content: center;

      background: black;
    }


    .procedure__heading::before,
    .procedure__heading::after {
      content: "";

      flex: 1;

      height: 1.5px;

      background: var(--main-color);
    }


    .procedure__title {
      margin: 0;

      padding:
        0
        clamp(10px, 1.5vw, 22px);

      color: var(--text-color);

      font-family: inherit;

      font-size:
        clamp(
          15px,
          4.5vw,
          35px
        );

      font-weight: inherit;

      line-height: normal;

      letter-spacing: normal;

      text-align: center;

      white-space: nowrap;
    }


    /* =====================================================
       TIMELINE
    ===================================================== */

    .procedure__timeline {
      position: relative;

      width: 100%;

      height:
        clamp(
          500px,
          48vw,
          600px
        );

      overflow: visible;
    }


    /* =====================================================
       AXE HORIZONTAL
    ===================================================== */

    .procedure__axis {
      position: absolute;

      top: 50%;
      left: 2%;

      width: 96%;
      height: 3px;

      transform:
        translateY(-50%);

      z-index: 2;
    }


    /* =====================================================
       LIGNE BLANCHE DE BASE
    ===================================================== */

    .procedure__lineBase {
      position: absolute;

      inset: 0;

      background:
        rgba(
          255,
          255,
          255,
          0.82
        );

      box-shadow:
        0 0 4px
        rgba(
          255,
          255,
          255,
          0.18
        );
    }


    /* =====================================================
       LIGNE VIOLETTE
    ===================================================== */

    .procedure__lineProgress {
      position: absolute;

      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      background:
        #a240df;

      transform:
        scaleX(0);

      transform-origin:
        left center;

      box-shadow:
        0 0 4px
          rgba(
            196,
            92,
            255,
            1
          ),

        0 0 10px
          rgba(
            162,
            64,
            223,
            0.8
          ),

        0 0 20px
          rgba(
            162,
            64,
            223,
            0.35
          );

      will-change:
        transform;
    }


    /* =====================================================
       POINTE DE LA FLÈCHE
    ===================================================== */

    .procedure__arrow {
      position: absolute;

      top: 50%;
      right: -2px;

      width: 18px;
      height: 18px;

      border-top:
        3px solid
        rgba(
          255,
          255,
          255,
          0.82
        );

      border-right:
        3px solid
        rgba(
          255,
          255,
          255,
          0.82
        );

      transform:
        translateY(-50%)
        rotate(45deg);

      transition:
        border-color
        250ms ease,

        filter
        250ms ease;
    }


    .procedure__axis.is-complete
    .procedure__arrow {
      border-color:
        #c45cff;

      filter:
        drop-shadow(
          0 0 7px
          rgba(
            162,
            64,
            223,
            0.95
          )
        );
    }


    /* =====================================================
       ÉTAPES
    ===================================================== */

    .procedure__step {
      position: absolute;

      left:
        var(--step-x);

      width:
        clamp(
          215px,
          20vw,
          285px
        );

      transform:
        translateX(-50%)
        scale(1);

      z-index: 6;

      transition:
        transform
        450ms
        cubic-bezier(
          0.22,
          1,
          0.36,
          1
        );
    }


    /* =====================================================
       CARTES DU HAUT
    ===================================================== */

    .procedure__step--top {
      bottom:
        calc(
          50% +
          clamp(
            42px,
            4vw,
            58px
          )
        );
    }


    /* =====================================================
       CARTES DU BAS
    ===================================================== */

    .procedure__step--bottom {
      top:
        calc(
          50% +
          clamp(
            42px,
            4vw,
            58px
          )
        );
    }


    /* =====================================================
       CARTE
    ===================================================== */

    .procedure__card {
      position: relative;

      width: 100%;

      /*
       * Toutes les cartes ont exactement
       * la même hauteur.
       */
      height:
        clamp(
          150px,
          15vw,
          200px
        );

      padding:
        clamp(
          17px,
          1.8vw,
          25px
        );

      display: flex;

      flex-direction: column;

      justify-content: center;

      background:
        radial-gradient(
          circle at 50% 0%,
          rgba(
            255,
            255,
            255,
            0.035
          ),
          transparent 45%
        ),
        #050507;

      border:
        1px solid
        rgba(
          255,
          255,
          255,
          0.55
        );

      border-radius:
        clamp(
          6px,
          0.7vw,
          10px
        );

      box-shadow:
        0 0 6px
          rgba(
            255,
            255,
            255,
            0.05
          ),

        inset 0 0 18px
          rgba(
            255,
            255,
            255,
            0.015
          );

      overflow: hidden;

      transition:
        border-color
        400ms ease,

        box-shadow
        400ms ease,

        background
        400ms ease;
    }


    /* =====================================================
       REFLET DE LA CARTE
    ===================================================== */

    .procedure__card::before {
      content: "";

      position: absolute;

      top: -45%;
      left: -70%;

      width: 65%;
      height: 190%;

      background:
        linear-gradient(
          105deg,
          transparent,
          rgba(
            196,
            92,
            255,
            0.16
          ),
          transparent
        );

      transform:
        skewX(-18deg);

      opacity: 0;

      pointer-events: none;
    }


    /* =====================================================
       CARTE ACTIVE
    ===================================================== */

    .procedure__step.is-active {
      transform:
        translateX(-50%)
        scale(1.045);
    }


    .procedure__step.is-active
    .procedure__card {
      border-color:
        rgba(
          196,
          92,
          255,
          1
        );

      background:
        radial-gradient(
          circle at 50% 0%,
          rgba(
            162,
            64,
            223,
            0.15
          ),
          transparent 50%
        ),
        #07070a;

      box-shadow:
        0 0 6px
          rgba(
            196,
            92,
            255,
            0.95
          ),

        0 0 18px
          rgba(
            162,
            64,
            223,
            0.42
          ),

        0 0 34px
          rgba(
            162,
            64,
            223,
            0.13
          ),

        inset 0 0 23px
          rgba(
            162,
            64,
            223,
            0.09
          );
    }


    .procedure__step.is-active
    .procedure__card::before {
      opacity: 1;

      animation:
        procedureCardSweep
        700ms
        ease
        forwards;
    }


    @keyframes procedureCardSweep {

      from {
        left: -70%;
      }

      to {
        left: 135%;
      }

    }


    /* =====================================================
       SVG + TITRE
       DANS LE MÊME BLOC
    ===================================================== */

    .procedure__cardHeader {
      width: 100%;

      margin-bottom:
        clamp(
          13px,
          1.5vw,
          19px
        );

      display: flex;

      align-items: center;
      justify-content: center;

      gap:
        clamp(
          10px,
          1.2vw,
          15px
        );
    }


    /* =====================================================
       ICÔNE
    ===================================================== */

    .procedure__icon {
      width:
        clamp(
          38px,
          3.8vw,
          50px
        );

      height:
        clamp(
          38px,
          3.8vw,
          50px
        );

      flex-shrink: 0;

      display: flex;

      align-items: center;
      justify-content: center;

      border:
        1px solid
        rgba(
          162,
          64,
          223,
          0.7
        );

      border-radius: 50%;

      color:
        rgba(
          255,
          255,
          255,
          0.88
        );

      box-shadow:
        0 0 7px
        rgba(
          162,
          64,
          223,
          0.18
        );

      transition:
        color
        350ms ease,

        border-color
        350ms ease,

        box-shadow
        350ms ease;
    }


    .procedure__step.is-active
    .procedure__icon {
      color:
        #c45cff;

      border-color:
        #c45cff;

      box-shadow:
        0 0 7px
          rgba(
            196,
            92,
            255,
            0.8
          ),

        0 0 15px
          rgba(
            162,
            64,
            223,
            0.35
          );
    }


    .procedure__icon svg {
      width: 52%;
      height: 52%;

      fill: none;

      stroke:
        currentColor;

      stroke-width: 1.7;

      stroke-linecap:
        round;

      stroke-linejoin:
        round;
    }


    /* =====================================================
       TITRE DES CARTES
    ===================================================== */

    .procedure__cardTitle {
      min-width: 0;

      margin: 0;

      color:
        rgba(
          255,
          255,
          255,
          0.94
        );

      font-family:
        "Montserrat",
        Arial,
        sans-serif;

      font-size:
        clamp(
          13px,
          1.4vw,
          19px
        );

      font-weight: 650;

      line-height: 1.2;

      text-align: left;
    }


    /* =====================================================
       DESCRIPTION
    ===================================================== */

    .procedure__cardText {
      width: 100%;

      margin: 0;

      color:
        rgba(
          255,
          255,
          255,
          0.67
        );

      font-family:
        "Montserrat",
        Arial,
        sans-serif;

      font-size:
        clamp(
          8px,
          0.95vw,
          12px
        );

      font-weight: 400;

      line-height: 1.55;

      text-align: left;
    }


    /* =====================================================
       CONNECTEURS
    ===================================================== */

    .procedure__connector {
      position: absolute;

      left: 50%;

      width: 1px;

      height:
        clamp(
          42px,
          4vw,
          58px
        );

      background:
        rgba(
          255,
          255,
          255,
          0.48
        );

      transform:
        translateX(-50%);

      transition:
        background
        300ms ease,

        box-shadow
        300ms ease;
    }


    .procedure__step--top
    .procedure__connector {
      top: 100%;
    }


    .procedure__step--bottom
    .procedure__connector {
      bottom: 100%;
    }


    /* =====================================================
       POINT DE CHAQUE ÉTAPE
    ===================================================== */

    .procedure__marker {
      position: absolute;

      left: 50%;

      width: 14px;
      height: 14px;

      border:
        2px solid
        rgba(
          255,
          255,
          255,
          0.84
        );

      border-radius: 50%;

      background: black;

      transform:
        translateX(-50%);

      transition:
        border-color
        300ms ease,

        box-shadow
        300ms ease,

        transform
        300ms ease;
    }


    .procedure__step--top
    .procedure__marker {
      top:
        calc(
          100% +
          clamp(
            42px,
            4vw,
            58px
          ) -
          7px
        );
    }


    .procedure__step--bottom
    .procedure__marker {
      bottom:
        calc(
          100% +
          clamp(
            42px,
            4vw,
            58px
          ) -
          7px
        );
    }


    /* =====================================================
       ÉTAT ACTIF DU CONNECTEUR
    ===================================================== */

    .procedure__step.is-active
    .procedure__connector {
      background:
        #a240df;

      box-shadow:
        0 0 8px
        rgba(
          162,
          64,
          223,
          0.75
        );
    }


    .procedure__step.is-active
    .procedure__marker {
      border-color:
        #c45cff;

      transform:
        translateX(-50%)
        scale(1.15);

      box-shadow:
        0 0 5px
          rgba(
            196,
            92,
            255,
            1
          ),

        0 0 14px
          rgba(
            162,
            64,
            223,
            0.75
          );
    }


    /* =====================================================
       DÉLAIS
    ===================================================== */

    .procedure__delay {
      position: absolute;

      top: 50%;
      left:
        var(--delay-x);

      transform:
        translate(
          -50%,
          -50%
        );

      z-index: 8;

      padding:
        7px
        12px;

      background: black;

      border:
        1px solid
        rgba(
          255,
          255,
          255,
          0.32
        );

      border-radius: 999px;

      color:
        rgba(
          255,
          255,
          255,
          0.8
        );

      font-family:
        "Montserrat",
        Arial,
        sans-serif;

      font-size:
        clamp(
          7px,
          0.82vw,
          11px
        );

      font-weight: 550;

      white-space: nowrap;

      box-shadow:
        0 0 6px
        rgba(
          0,
          0,
          0,
          0.9
        );
    }


    .procedure__delay--large {
      display: flex;

      flex-direction: column;

      align-items: center;

      gap: 3px;

      padding:
        7px
        13px;
    }


    .procedure__delaySecondary {
      color:
        rgba(
          255,
          255,
          255,
          0.5
        );

      font-size:
        clamp(
          6px,
          0.7vw,
          9px
        );

      font-weight: 400;
    }


    /* =====================================================
       HOVER MANUEL
    ===================================================== */

    @media (hover: hover) and (pointer: fine) {

      .procedure__step:hover {
        transform:
          translateX(-50%)
          scale(1.045);
      }


      .procedure__step:hover
      .procedure__card {
        border-color:
          rgba(
            196,
            92,
            255,
            1
          );

        box-shadow:
          0 0 6px
            rgba(
              196,
              92,
              255,
              0.9
            ),

          0 0 18px
            rgba(
              162,
              64,
              223,
              0.38
            ),

          inset 0 0 22px
            rgba(
              162,
              64,
              223,
              0.08
            );
      }

    }


    /* =====================================================
       VERSION VERTICALE
       1000PX ET MOINS
    ===================================================== */

    @media screen and (max-width: 1000px) {

      .procedure {
        width: var(--w-container-size);
        height: auto;

        padding:
          clamp(45px, 7vw, 65px)
          clamp(12px, 3vw, 25px)
          clamp(40px, 7vw, 60px);

        overflow: hidden;
      }


      .procedure__inner {
        width: 100%;
        height: auto;

        margin: 0 auto;
      }


      /* ==================================================
         TITRE
      ================================================== */

      .procedure__heading {
        margin:
          0
          calc(-1 * clamp(12px, 3vw, 25px))
          clamp(35px, 7vw, 55px);
      }


      .procedure__title {
        font-size:
          clamp(
            15px,
            4vw,
            27px
          );

        white-space: normal;
      }


      /* ==================================================
         TIMELINE VERTICALE
      ================================================== */

      .procedure__timeline {
        position: relative;

        width: 100%;

        height:
          clamp(
            950px,
            135vw,
            1250px
          );

        overflow: visible;
      }


      /* ==================================================
         AXE VERTICAL
      ================================================== */

      .procedure__axis {
        top: 2%;
        left: 50%;

        width: 3px;
        height: 96%;

        transform:
          translateX(-50%);
      }


      .procedure__lineBase {
        width: 100%;
        height: 100%;
      }


      .procedure__lineProgress {
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        transform:
          scaleY(0);

        transform-origin:
          center top;
      }


      /* ==================================================
         FLÈCHE VERS LE BAS
      ================================================== */

      .procedure__arrow {
        top: auto;

        right: auto;
        bottom: -2px;
        left: 50%;

        width: 18px;
        height: 18px;

        border-top: none;

        border-right:
          3px solid
          rgba(
            255,
            255,
            255,
            0.82
          );

        border-bottom:
          3px solid
          rgba(
            255,
            255,
            255,
            0.82
          );

        transform:
          translateX(-50%)
          rotate(45deg);
      }


      .procedure__axis.is-complete
      .procedure__arrow {
        border-right-color:
          #c45cff;

        border-bottom-color:
          #c45cff;
      }


      /* ==================================================
         CARTES
      ================================================== */

      .procedure__step {
        top:
          var(--step-x);

        bottom: auto;

        width:
          calc(
            50% -
            clamp(
              30px,
              5vw,
              55px
            )
          );

        transform:
          translateY(-50%)
          scale(1);
      }


      /* ==================================================
         ANCIENNES CARTES DU HAUT
         → GAUCHE
      ================================================== */

      .procedure__step--top {
        top:
          var(--step-x);

        right: auto;
        bottom: auto;
        left: 0;
      }


      /* ==================================================
         ANCIENNES CARTES DU BAS
         → DROITE
      ================================================== */

      .procedure__step--bottom {
        top:
          var(--step-x);

        right: 0;
        bottom: auto;
        left: auto;
      }


      /* ==================================================
         CARTE ACTIVE
      ================================================== */

      .procedure__step.is-active {
        transform:
          translateY(-50%)
          scale(1.045);
      }


      /* ==================================================
         HOVER VERSION VERTICALE
      ================================================== */

      @media (hover: hover) and (pointer: fine) {

        .procedure__step:hover {
          transform:
            translateY(-50%)
            scale(1.045);
        }

      }


      /* ==================================================
         TAILLE DES CARTES
      ================================================== */

      .procedure__card {
        width: 100%;

        height:
          clamp(
            170px,
            25vw,
            220px
          );

        padding:
          clamp(
            13px,
            2.5vw,
            22px
          );
      }


      /* ==================================================
         SVG + TITRE
      ================================================== */

      .procedure__cardHeader {
        gap:
          clamp(
            7px,
            1.8vw,
            13px
          );

        margin-bottom:
          clamp(
            9px,
            2vw,
            15px
          );
      }


      .procedure__icon {
        width:
          clamp(
            30px,
            5vw,
            44px
          );

        height:
          clamp(
            30px,
            5vw,
            44px
          );
      }


      .procedure__cardTitle {
        font-size:
          clamp(
            10px,
            2.3vw,
            16px
          );
      }


      .procedure__cardText {
        font-size:
          clamp(
            7px,
            1.8vw,
            11px
          );

        line-height: 1.45;
      }


      /* ==================================================
         CONNECTEURS HORIZONTAUX
      ================================================== */

      .procedure__connector {
        top: 50%;

        width:
          clamp(
            30px,
            5vw,
            55px
          );

        height: 1px;

        transform:
          translateY(-50%);
      }


      /* ==================================================
         CARTE GAUCHE
         TRAIT VERS LA DROITE
      ================================================== */

      .procedure__step--top
      .procedure__connector {
        top: 50%;

        right: auto;
        bottom: auto;

        left: 100%;
      }


      /* ==================================================
         CARTE DROITE
         TRAIT VERS LA GAUCHE
      ================================================== */

      .procedure__step--bottom
      .procedure__connector {
        top: 50%;

        right: 100%;
        bottom: auto;

        left: auto;
      }


      /* ==================================================
         BILLES FIXES
      ================================================== */

      .procedure__marker {
        top: 50%;

        bottom: auto;

        width: 14px;
        height: 14px;
      }


      /* ==================================================
         BILLE CARTE GAUCHE
      ================================================== */

      .procedure__step--top
      .procedure__marker {
        top: 50%;

        right: auto;
        bottom: auto;

        left:
          calc(
            100% +
            clamp(
              30px,
              5vw,
              55px
            )
          );

        transform:
          translate(
            -50%,
            -50%
          );
      }


      /* ==================================================
         BILLE CARTE DROITE
      ================================================== */

      .procedure__step--bottom
      .procedure__marker {
        top: 50%;

        bottom: auto;

        left: auto;

        right:
          calc(
            100% +
            clamp(
              30px,
              5vw,
              55px
            )
          );

        transform:
          translate(
            50%,
            -50%
          );
      }


      /* ==================================================
         BILLE ACTIVE GAUCHE
      ================================================== */

      .procedure__step--top.is-active
      .procedure__marker {
        transform:
          translate(
            -50%,
            -50%
          )
          scale(1.15);
      }


      /* ==================================================
         BILLE ACTIVE DROITE
      ================================================== */

      .procedure__step--bottom.is-active
      .procedure__marker {
        transform:
          translate(
            50%,
            -50%
          )
          scale(1.15);
      }


      /* ==================================================
         DÉLAIS
      ================================================== */

      .procedure__delay {
        top:
          var(--delay-x);

        left: 50%;

        transform:
          translate(
            -50%,
            -50%
          );

        padding:
          6px
          clamp(
            7px,
            1.5vw,
            11px
          );

        font-size:
          clamp(
            6px,
            1.6vw,
            10px
          );
      }


      .procedure__delay--large {
        width:
          max-content;

        max-width:
          clamp(
            160px,
            30vw,
            250px
          );

        text-align: center;
      }


      .procedure__delaySecondary {
        font-size:
          clamp(
            5px,
            1.3vw,
            8px
          );

        white-space: normal;

        text-align: center;
      }

    }


    /* =====================================================
       RÉDUCTION DES ANIMATIONS
    ===================================================== */

    @media (prefers-reduced-motion: reduce) {

      .procedure__step {
        transition: none;
      }

    }

  `;

  document.head.appendChild(style);
}

/* =====================================================
   HTML
===================================================== */

function createProcedureHTML(section) {
  section.innerHTML = `

    <div class="procedure__inner">


      <!-- ==================================================
           TITRE
      =================================================== -->

      <div class="procedure__heading">

        <h2 class="procedure__title">
          VOTRE PROJET, ÉTAPE PAR ÉTAPE
        </h2>

      </div>


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

                <svg
                  viewBox="0 0 24 24"
                >

                  <path
                    d="M21 15a4 4 0 0 1-4 4H9l-5 3v-5a7 7 0 0 1-2-5c0-4 4-7 9-7s10 3 10 10Z"
                  ></path>

                  <path
                    d="M8 12h.01"
                  ></path>

                  <path
                    d="M12 12h.01"
                  ></path>

                  <path
                    d="M16 12h.01"
                  ></path>

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

                <svg
                  viewBox="0 0 24 24"
                >

                  <path
                    d="M7 3h7l4 4v13H7Z"
                  ></path>

                  <path
                    d="M14 3v5h5"
                  ></path>

                  <path
                    d="m9.5 14 2 2 4-4"
                  ></path>

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

                <svg
                  viewBox="0 0 24 24"
                >

                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="16"
                    rx="2"
                  ></rect>

                  <path
                    d="M3 8h18"
                  ></path>

                  <path
                    d="m7 15 3-3 2 2 2-2 3 3"
                  ></path>

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

                <svg
                  viewBox="0 0 24 24"
                >

                  <path
                    d="M14 4c3-2 6-2 6-2s0 3-2 6l-5 5-4-4Z"
                  ></path>

                  <path
                    d="m9 9-4 1-3 3 6 1"
                  ></path>

                  <path
                    d="m13 13 1 6 3-3 1-4"
                  ></path>

                  <path
                    d="M7 17c-2 0-3 1-3 3 2 0 3-1 3-3Z"
                  ></path>

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
    return window.matchMedia("(max-width: 1000px)").matches;
  }

  /* =====================================================
     ACCESSIBILITÉ
  ===================================================== */

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

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

  /*
   * Temps total de déplacement
   * sans compter les pauses.
   */
  const fullTravelDuration = 8000;

  /*
   * Arrêt sur chaque carte.
   */
  const cardPauseDuration = 3000;

  /*
   * Pause lorsque le violet
   * atteint la fin de la flèche.
   */
  const endPauseDuration = 900;

  /*
   * Petite distance pendant laquelle
   * la carte reste encore éclairée
   * juste après le redémarrage.
   */
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

  /*
   * Après la dernière carte,
   * la ligne continue jusqu'à la flèche.
   */
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

  let isVisible = false;

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
    /*
     * Au-dessus de 1000px :
     * progression horizontale.
     */
    if (!isVerticalProcedure()) {
      progressLine.style.transform = `scaleX(${progress})`;
    } else {
      /*
       * À 1000px et moins :
       * progression verticale.
       */
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

      /*
       * Pendant l'arrêt de trois secondes,
       * la carte concernée reste éclairée.
       */
      const isPausedCard = pausedStepIndex === index;

      /*
       * Lorsque la ligne redémarre,
       * elle reste illuminée quelques instants
       * jusqu'à ce que le violet l'ait dépassée.
       */
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
     DÉPLACEMENT
  ===================================================== */

  function updateMovement(now) {
    const target = targets[targetIndex];

    if (!target) {
      return;
    }

    const targetProgress = target.progress;

    const distance = targetProgress - segmentStartProgress;

    /*
     * La durée dépend de la distance,
     * ce qui conserve une vitesse globale cohérente.
     */
    const segmentDuration = Math.max(300, fullTravelDuration * distance);

    const elapsed = now - segmentStartTime;

    const rawProgress = Math.min(elapsed / segmentDuration, 1);

    const easedProgress = easeInOutCubic(rawProgress);

    progress = segmentStartProgress + distance * easedProgress;

    updateLine();

    updateStepStates();

    /*
     * Le prochain checkpoint est atteint.
     */
    if (rawProgress >= 1) {
      progress = targetProgress;

      updateLine();

      /*
       * CHECKPOINT D'UNE CARTE
       */
      if (target.stepIndex !== null) {
        pausedStepIndex = target.stepIndex;

        animationState = "card-pause";

        pauseStartTime = now;

        updateStepStates();

        return;
      }

      /*
       * FIN DE LA FLÈCHE
       */
      animationState = "end-pause";

      endPauseStartTime = now;
    }
  }

  /* =====================================================
     PAUSE DE 3 SECONDES
  ===================================================== */

  function updateCardPause(now) {
    /*
     * Pendant cette phase,
     * progress ne change pas.
     */
    updateLine();

    updateStepStates();

    if (pauseStartTime === null) {
      pauseStartTime = now;
    }

    const elapsed = now - pauseStartTime;

    if (elapsed < cardPauseDuration) {
      return;
    }

    /*
     * Les trois secondes sont terminées.
     */
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

    /*
     * Retour instantané à zéro
     * puis nouveau cycle.
     */
    resetCycle(now);
  }

  /* =====================================================
     BOUCLE PRINCIPALE
  ===================================================== */

  function render(now) {
    if (!isVisible) {
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
    if (isVisible) {
      return;
    }

    isVisible = true;

    /*
     * Lorsque la section entre dans le viewport,
     * on recommence depuis le début.
     */
    resetCycle(performance.now());

    if (procedureAnimationFrame === null) {
      procedureAnimationFrame = requestAnimationFrame(render);
    }
  }

  /* =====================================================
     ARRÊT
  ===================================================== */

  function stop() {
    isVisible = false;

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
      /*
       * Si l'écran passe par exemple de :
       *
       * 1200px → 900px
       *
       * scaleX devient immédiatement scaleY.
       *
       * L'avancement actuel de l'animation
       * est conservé.
       */
      updateLine();
    },
    {
      passive: true,
    },
  );

  /* =====================================================
     OBSERVER
  ===================================================== */

  procedureObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        start();
      } else {
        stop();
      }
    },
    {
      threshold: 0.15,
    },
  );

  procedureObserver.observe(section);
}
