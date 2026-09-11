/* =====================================================
   CARROUSEL PÂTISSERIE — MODULE INDÉPENDANT
===================================================== */

/* =====================================================
   IMAGES DU CARROUSEL
===================================================== */

const cakeCarouselImages = [
  "./img/gateaux1.png",
  "./img/gateaux2.png",
  "./img/gateaux14.png",
  "./img/gateaux4.png",
  "./img/gateaux5.png",
  "./img/gateaux6.png",
];

/* =====================================================
   CSS INJECTÉ
===================================================== */

if (!document.getElementById("cakeCarouselStyle")) {
  const style = document.createElement("style");

  style.id = "cakeCarouselStyle";

  style.innerHTML = `
    /* =====================================================
       CARROUSEL
    ===================================================== */

    .cake-carousel {
      width:100%;
      height:clamp(120px,20vw,300px);
      overflow:hidden;
      padding:2px;
      box-sizing:border-box;
    }

    .cake-carousel__track {
      width:300%;
      height:100%;
      display:flex;
      animation:cakeCarouselAnimation 18s linear infinite;
    }

    .cake-carousel__item {
      flex:0 0 calc(100% / 12);
      height:100%;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:1px;
      background:white;
      box-sizing:border-box;
    }

    .cake-carousel__item img {
      width:80%;
      height:80%;
      display:block;
      object-fit:cover;
    }

    /* =====================================================
       TABLETTE
    ===================================================== */

    @media screen and (max-width:900px) {
      .cake-carousel {
        height:clamp(120px,18vw,220px);
      }

      .cake-carousel__item {
        flex:0 0 calc(100% / 12);
      }

      .cake-carousel__item img {
        width:88%;
        height:88%;
        object-fit:contain;
      }
    }

    /* =====================================================
       TÉLÉPHONE
    ===================================================== */

    @media screen and (max-width:600px) {
      .cake-carousel {
        height:140px;
      }

      .cake-carousel__track {
        width:450%;
      }

      .cake-carousel__item {
        flex:0 0 calc(100% / 12);
        height:100%;
        padding:2px;
      }

      .cake-carousel__item img {
        width:95%;
        height:95%;
        display:block;
        object-fit:contain;
      }
    }

    /* =====================================================
       PETITS TÉLÉPHONES
    ===================================================== */

    @media screen and (max-width:380px) {
      .cake-carousel {
        height:125px;
      }

      .cake-carousel__item {
        flex:0 0 calc(100% / 12);
      }

      .cake-carousel__item img {
        width:95%;
        height:95%;
        object-fit:contain;
      }
    }

    /* =====================================================
       ANIMATION
    ===================================================== */

    @keyframes cakeCarouselAnimation {
      from {
        transform:translateX(0);
      }

      to {
        transform:translateX(-50%);
      }
    }
  `;

  document.head.appendChild(style);
}

/* =====================================================
   CRÉATION D'UNE IMAGE
===================================================== */

function createCarouselItem(imageSrc) {
  return `
    <div class="cake-carousel__item">
      <img
        src="${imageSrc}"
        alt="Création pâtissière"
      >
    </div>
  `;
}

/* =====================================================
   DÉMARRER LE CARROUSEL
===================================================== */

export function startCakeCarousel(container) {
  if (typeof container === "string") {
    container = document.querySelector(container);
  }

  if (!container) {
    console.warn("Cake carousel : conteneur introuvable.");

    return;
  }

  container.classList.add("cake-carousel");

  const firstLoop = cakeCarouselImages.map(createCarouselItem).join("");
  const secondLoop = cakeCarouselImages.map(createCarouselItem).join("");

  container.innerHTML = `
    <div class="cake-carousel__track">
      ${firstLoop}
      ${secondLoop}
    </div>
  `;
}

/* =====================================================
   SUPPRIMER LE CARROUSEL
===================================================== */

export function stopCakeCarousel(container) {
  if (typeof container === "string") {
    container = document.querySelector(container);
  }

  if (!container) {
    return;
  }

  container.innerHTML = "";
}
