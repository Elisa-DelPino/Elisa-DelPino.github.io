import { getDataDemoWeb3 } from "./dataDemoWeb3.js";

let cartItems = [];
let demo3Element = null;
let pricePanier = 0;

if (!document.getElementById("demo3Fonts")) {
  const font = document.createElement("link");

  font.id = "demo3Fonts";
  font.rel = "stylesheet";
  font.href =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Montserrat:wght@300;400;500;600&display=swap";

  document.head.appendChild(font);
}

// INJECT HTML

export function addDemoWeb3(element) {
  if (!element) return;

  demo3Element = element;

  createHeader(element);
  createHomeHTML(element);
  addProductPanier();

  element.style.background = "#c2c5aa";
}

function createHeader(element) {
  element.innerHTML = `
    <div class="demo3__site">

      <nav class="header__demo3">

        <ul class="header__nav__demo3">

          <li
            class="demo3__brand"
            data-page="accueil"
          >
            <span class="demo3__brandIcon">
              <svg viewBox="0 0 40 40" aria-hidden="true">
                <path d="M20 35V13"></path>
                <path d="M20 19C13 18 9 13 9 7C15 8 20 12 20 19Z"></path>
                <path d="M20 25C27 24 31 19 31 13C25 14 20 18 20 25Z"></path>
                <path d="M20 30C14 30 10 27 8 22C14 22 18 25 20 30Z"></path>
              </svg>
            </span>

          </li>

          <div class="demo3__navigation">

          <li class="header__nav__demo3__link">
          <span
            data-page="accueil"
            data-category="Accueil"
          >
            ACCUEIL
          </span>
          </li>        

            <li class="header__nav__demo3__link">
            <span 
              data-page="shop"
              data-category="all"
            >
              BOUTIQUE
            </span>
          </li>

          <li class="header__nav__demo3__link">
            <span
              data-page="shop"
              data-category="Vases"
            >
              VASES
            </span>
          </li>

          <li class="header__nav__demo3__link">
            <span
              data-page="shop"
              data-category="Bougies"
            >
              BOUGIES
            </span>
          </li>

          <li class="header__nav__demo3__link">
            <span
              data-page="shop"
              data-category="Encens"
            >
              ENCENS
            </span>
          </li>

        </div>

          <nav class="demo3__mobileMenu">
  <button
    type="button"
    data-page="accueil"
  >
    ACCUEIL
  </button>

  <button
    type="button"
    data-page="shop"
    data-category="all"
  >
    BOUTIQUE
  </button>

  <button
    type="button"
    data-page="shop"
    data-category="Vases"
  >
    VASES
  </button>

  <button
    type="button"
    data-page="shop"
    data-category="Bougies"
  >
    BOUGIES
  </button>

  <button
    type="button"
    data-page="shop"
    data-category="Encens"
  >
    ENCENS
  </button>
</nav>

          <div class="demo3__headerActions">

            <div
              class="cart-container"
              role="button"
              tabindex="0"
              aria-label="Ouvrir le panier"
            >
              <svg
                viewBox="0 0 24 24"
                class="cart-icon"
              >
                <rect
                  x="5"
                  y="8"
                  width="14"
                  height="12"
                  rx="1"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.2"
                ></rect>

                <path
                  d="M9 8V6a3 3 0 0 1 6 0v2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.2"
                ></path>
              </svg>

              <span class="cart-badge"></span>
            </div>

            <button
  type="button"
  class="demo3__burgerButton"
  aria-label="Ouvrir le menu"
  aria-expanded="false"
>
  <span></span>
  <span></span>
  <span></span>
</button>

          </div>

        </ul>

      </nav>

      <div class="body__demo3">

        <div class="overlay__demo3"></div>

      <aside class="panier__demo3">

  <button
    type="button"
    class="demo3__closeCart"
    aria-label="Fermer le panier"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5L19 19"></path>
      <path d="M19 5L5 19"></path>
    </svg>
  </button>

  <header class="demo3__cartHeader">
    <h2>VOTRE PANIER</h2>
    <span></span>
  </header>

  <div class="contentProductsPanier__demo3"></div>

  <button
    type="button"
    class="buttonPanier"
  >
    CONTINUER
  </button>

  <button
  type="button"
  class="demo3__continueShopping"
>
  <span>←</span>
  CONTINUER VOS ACHATS
</button>

</aside> 

        <main class="wrapper__demo3"></main>

      </div>

    </div>
  `;

  const buttonsMenu = element.querySelectorAll("[data-page]");

  buttonsMenu.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.dataset.page;
      const category = button.dataset.category ?? "all";

      if (page === "accueil") {
        createHomeHTML(element);
      } else if (page === "shop") {
        createShopHTML(category);
      }

      hidePanier();
      scrollTopDemo(element);
    });
  });

  const panier = element.querySelector(".cart-container");

  panier.addEventListener("click", () => {
    showPanier();
  });

  const overlay = element.querySelector(".overlay__demo3");

  overlay.addEventListener("click", () => {
    hidePanier();
  });

  const closeCartButton = element.querySelector(".demo3__closeCart");

  closeCartButton?.addEventListener("click", () => {
    hidePanier();
  });

  initDemo3BurgerMenu();
}

function createHomeHTML(element) {
  const wrapper = demo3Element?.querySelector(".wrapper__demo3");

  if (!wrapper) return;

  const products = getDataDemoWeb3().slice(0, 5);

  wrapper.innerHTML = `
    <div class="demo3__home">

      <!-- HERO -->

      <section class="hero__demo3">

        <img
          class="demo3__hero__img"
          src="./img/heroDeco.png"
          alt="Décoration intérieure naturelle"
        >

        <div class="hero__demo3__text">

          <div class="wrapper__demo3__text">

            <span class="demo3__eyebrow">
              L’ART DE VIVRE NATURELLEMENT
            </span>

            <h1>
              Sublimez votre<br>
              intérieur naturellement
            </h1>

            <p>
              Des pièces choisies avec soin pour créer
              un intérieur harmonieux, authentique et intemporel.
            </p>

            <button
              type="button"
              class="demo3__primaryButton js-open-shop"
            >
              DÉCOUVRIR LA COLLECTION
            </button>

          </div>

        </div>

      </section>


      <!-- AVANTAGES -->

      <section class="demo3__benefits">

        <div class="demo3__benefit">

          <span class="demo3__benefitIcon">
            <svg viewBox="0 0 24 24">
              <path d="M3 7h11v10H3z"></path>
              <path d="M14 10h4l3 3v4h-7z"></path>
              <circle cx="7" cy="18" r="2"></circle>
              <circle cx="18" cy="18" r="2"></circle>
            </svg>
          </span>

          <span class="demo3__benefitText">
            <strong>LIVRAISON OFFERTE</strong>
            <span>Dès 80 € d’achat</span>
          </span>

        </div>

        <div class="demo3__benefit">

          <span class="demo3__benefitIcon">
            <svg viewBox="0 0 24 24">
              <rect x="5" y="10" width="14" height="10" rx="1"></rect>
              <path d="M8 10V7a4 4 0 0 1 8 0v3"></path>
            </svg>
          </span>

          <span class="demo3__benefitText">
            <strong>PAIEMENT SÉCURISÉ</strong>
            <span>Transactions protégées</span>
          </span>

        </div>

        <div class="demo3__benefit">

          <span class="demo3__benefitIcon">
            <svg viewBox="0 0 24 24">
              <path d="M5 7v5h5"></path>
              <path d="M6 12a7 7 0 1 0 2-5"></path>
            </svg>
          </span>

          <span class="demo3__benefitText">
            <strong>RETOURS FACILES</strong>
            <span>14 jours pour changer d’avis</span>
          </span>

        </div>

        <div class="demo3__benefit">

          <span class="demo3__benefitIcon">
            <svg viewBox="0 0 24 24">
              <path d="M5 13v-2a7 7 0 0 1 14 0v2"></path>
              <path d="M5 13H3v5h4v-5z"></path>
              <path d="M19 13h2v5h-4v-5z"></path>
            </svg>
          </span>

          <span class="demo3__benefitText">
            <strong>SERVICE CLIENT</strong>
            <span>À votre écoute</span>
          </span>

        </div>

      </section>

      
      <!-- PRODUITS -->

      <section class="demo3__favorite">

        <div class="demo3__sectionHeader">

          <h2>PRODUITS POPULAIRES</h2>

          <span class="demo3__sectionLine"></span>

        </div>

        <div class="products__list">

          ${products
            .map(
              (product, index) => `
                <article
                  class="product__item"
                  data-product-index="${index}"
                >

                  <div
                    class="product__item__img"
                    style="
                      background-image:url('${product.img}');
                      background-size:cover;
                      background-position:center;
                    "
                  ></div>

                  <div class="product__item__text">

                    <h3>${product.title}</h3>

                    <h4>${product.price}</h4>

                    <span class="demo3__rating">
                      ★★★★★
                    </span>

                  </div>

                </article>
              `,
            )
            .join("")}

        </div>

        <button
          type="button"
          class="demo3__primaryButton demo3__allProducts js-open-shop"
        >
          VOIR TOUS LES PRODUITS
        </button>

      </section>

      <!-- NOUVEAUTÉS -->

      <section class="demo3__feature">

        <div class="demo3__featureText">

          <span>NOUVEAUTÉS</span>

          <h2>
            La beauté des<br>
            matières brutes
          </h2>

          <p>
            Découvrez nos dernières créations pour un intérieur
            plein de caractère.
          </p>

          <button
            type="button"
            class="demo3__primaryButton js-open-shop"
          >
            DÉCOUVRIR
          </button>

        </div>

        <div class="demo3__featureImage">

          <img
            src="./img/decoNouveaute.png"
            alt="Vase vert et décoration naturelle"
          >

        </div>

      </section>


      <!-- FOOTER VISUEL -->

      <footer class="demo3__homeFooter">

        <div class="demo3__footerValue">
          <div>
            <strong>MATIÈRES NATURELLES</strong>
            <span>Sélectionnées avec exigence</span>
          </div>
        </div>

        <div class="demo3__footerValue">
          <div>
            <strong>DESIGN INTEMPOREL</strong>
            <span>Pensé pour durer</span>
          </div>
        </div>

        <div class="demo3__footerValue">
          <div>
            <strong>MARQUES ENGAGÉES</strong>
            <span>Pour un intérieur responsable</span>
          </div>
        </div>

        <div class="demo3__footerValue">
          <div>
            <strong>BESOIN D’AIDE ?</strong>
            <span>FAQ et contact</span>
          </div>
        </div>

      </footer>

    </div>
  `;

  /* Tous les boutons conduisant au shop */

  wrapper.querySelectorAll(".js-open-shop").forEach((button) => {
    button.addEventListener("click", () => {
      createShopHTML();

      scrollTopDemo(element);
    });
  });

  /* Ouverture des fiches produit */

  wrapper.querySelectorAll("[data-product-index]").forEach((card) => {
    card.addEventListener("click", () => {
      const index = Number(card.dataset.productIndex);

      const product = products[index];

      if (!product) return;

      createPageShop(product);

      scrollTopDemo(element);
    });
  });
}

function afficherHeroShop(category = "all") {
  const hero = demo3Element?.querySelector(".heroShop__demo3");

  if (!hero) return;

  const heroes = {
    all: {
      image: "./img/heroBoutique.png",
      title: "Notre <br> collection",
      texte:
        "Découvrez notre sélection de créations pensées pour transformer chaque intérieur en un véritable cocon. Des matières nobles, des lignes épurées et des parfums délicats pour sublimer votre quotidien.",
    },

    Bougies: {
      image: "./img/heroBougies.png",
      title: "Bougies <br> parfumées",
      texte:
        "Découvrez notre sélection de créations pensées pour transformer chaque intérieur en un véritable cocon. Des matières nobles, des lignes épurées et des parfums délicats pour sublimer votre quotidien.",
    },

    Vases: {
      image: "./img/heroVases.png",
      title: "Vases <br> décoratifs",
      texte:
        "Découvrez notre sélection de créations pensées pour transformer chaque intérieur en un véritable cocon. Des matières nobles, des lignes épurées et des parfums délicats pour sublimer votre quotidien.",
    },

    Encens: {
      image: "./img/heroEncens.png",
      title: "Encens <br> & senteurs",
      texte:
        "Découvrez notre sélection de créations pensées pour transformer chaque intérieur en un véritable cocon. Des matières nobles, des lignes épurées et des parfums délicats pour sublimer votre quotidien.",
    },
  };

  const currentHero = heroes[category] ?? heroes.all;

  hero.innerHTML = `
    <section class="heroCategory">

      <img
        src="${currentHero.image}"
        alt="${currentHero.title}"
      >

      <div class="heroCategory__overlay">

        <span class="heroCategory__subtitle">
          COLLECTION MAISON
        </span>

        <div class="heroCategory__line"></div>

        <h1>
          ${currentHero.title}
        </h1>

      </div>

    </section>
  `;
}

function createShopHTML(category = "all") {
  const wrapper = demo3Element?.querySelector(".wrapper__demo3");

  if (!wrapper) return;

  wrapper.innerHTML = `
    <div class="heroShop__demo3"></div>

    <div class="divFilter__demo3">
      <input
        class="inputSearch__demo3"
        type="text"
        placeholder="Rechercher..."
      >

      <select class="selectCategories__demo3">
        <option value="all">Tous les produits</option>
        <option value="Bougies">Bougies</option>
        <option value="Encens">Encens</option>
        <option value="Vases">Vases</option>
      </select>
    </div>

    <div class="gridProducts__demo3"></div>
  `;

  const selectCategory = wrapper.querySelector(".selectCategories__demo3");

  const inputSearch = wrapper.querySelector(".inputSearch__demo3");

  if (selectCategory) {
    selectCategory.value = category;
  }

  createCardProduct(category);

  selectCategory?.addEventListener("change", () => {
    createCardProduct(selectCategory.value, inputSearch?.value ?? "");
  });

  inputSearch?.addEventListener("input", () => {
    createCardProduct(selectCategory?.value ?? "all", inputSearch.value);
  });
}

function createPageShop(objet) {
  const wrapper = demo3Element.querySelector(".wrapper__demo3");

  if (!wrapper || !objet) return;

  const allProducts = getDataDemoWeb3();

  /*
   * On retire le produit actuellement affiché
   * et on sélectionne quatre recommandations.
   */
  const relatedProducts = allProducts
    .filter((product) => product !== objet)
    .slice(0, 4);

  const images = [
    objet.img,
    objet.img1,
    objet.img2,
    objet.img3,
    objet.img4,
  ].filter(Boolean);

  if (images.length === 0 && objet.img) {
    images.push(objet.img);
  }

  wrapper.innerHTML = `
  <section class="demo3__productPage">

    <!-- ==================================================
         PREMIÈRE LIGNE : GALERIE + INFORMATIONS
    =================================================== -->

    <div class="demo3__productTop">

      <!-- COLONNE GAUCHE : GALERIE -->

      <div class="demo3__productGallery">

        <div class="demo3__productThumbnails">

          ${images
            .map(
              (image, index) => `
      <button
        type="button"
        class="demo3__productThumbnail ${index === 0 ? "is-active" : ""}"
        data-image="${image}"
        aria-label="Vue ${index + 1}"
        style="background-image:url('${image}')"
      ></button>
    `,
            )
            .join("")}

        </div>

        <div
          class="demo3__productVisual"
          style="background-image:url('${images[0]}')"
          role="img"
          aria-label="${objet.title}"
        ></div>

      </div>


      <!-- COLONNE DROITE : INFORMATIONS -->

      <div class="demo3__productInformation">

        <div class="demo3__breadcrumb">
          Accueil
          &nbsp;›&nbsp;
          ${objet.category || "Boutique"}
          &nbsp;›&nbsp;
          ${objet.title}
        </div>

        <h1 class="demo3__productTitle">
          ${objet.title}
        </h1>

        <p class="demo3__productPrice">
          ${objet.price}
        </p>

        <div class="demo3__productDescription">
          <p>
            ${objet.description}
          </p>
        </div>


        <!-- ACTIONS EN BAS DE LA COLONNE -->

        <div class="demo3__productActions">

          <div class="demo3__quantity">

            <button
              type="button"
              class="demo3__quantityMinus"
              aria-label="Réduire la quantité"
            >
              −
            </button>

            <span class="demo3__quantityValue">
              1
            </span>

            <button
              type="button"
              class="demo3__quantityPlus"
              aria-label="Augmenter la quantité"
            >
              +
            </button>

          </div>

          <button
            type="button"
            class="btnaddProduct"
          >
            AJOUTER AU PANIER
          </button>

          <button
            type="button"
            class="demo3__favoriteProduct"
            aria-label="Ajouter aux favoris"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M20.8 4.8a5.4 5.4 0 0 0-7.6 0L12 6l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.6a5.4 5.4 0 0 0 0-7.6Z"
              ></path>
            </svg>
          </button>

        </div>

      </div>

    </div>


    <!-- ==================================================
         DEUXIÈME LIGNE : RECOMMANDATIONS + GARANTIES
    =================================================== -->

    <div class="demo3__productBottom">

      <!-- COLONNE GAUCHE : VOUS AIMEREZ AUSSI -->

      <aside class="demo3__related">

        <h2 class="demo3__relatedTitle">
          VOUS AIMEREZ AUSSI
        </h2>

        <div class="demo3__relatedList">

          ${relatedProducts
            .map(
              (product, index) => `
                <button
                  type="button"
                  class="demo3__relatedCard"
                  data-related-index="${index}"
                  aria-label="Afficher ${product.title}"
                >

                  <div
                    class="demo3__relatedImage"
                    style="background-image:url('${product.img}')"
                  ></div>

                  <h3>${product.title}</h3>

                  <p>${product.price}</p>

                </button>
              `,
            )
            .join("")}

        </div>

      </aside>


      <!-- COLONNE DROITE : GARANTIES -->

      <div class="demo3__productReassurance">

        <div class="demo3__productReassuranceItem">

          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 7h11v10H3z"></path>
            <path d="M14 10h4l3 3v4h-7z"></path>
            <circle cx="7" cy="18" r="2"></circle>
            <circle cx="18" cy="18" r="2"></circle>
          </svg>

          <div>
            <strong>Livraison offerte</strong>
            <span>Dès 80 € d’achat</span>
          </div>

        </div>

        <div class="demo3__productReassuranceItem">

          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 7v5h5"></path>
            <path d="M6 12a7 7 0 1 0 2-5"></path>
          </svg>

          <div>
            <strong>Retours gratuits</strong>
            <span>Sous 30 jours</span>
          </div>

        </div>

        <div class="demo3__productReassuranceItem">

          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect
              x="5"
              y="9"
              width="14"
              height="11"
              rx="1"
            ></rect>

            <path d="M8 9V6a4 4 0 0 1 8 0v3"></path>
          </svg>

          <div>
            <strong>Paiement sécurisé</strong>
            <span>Transactions protégées</span>
          </div>

        </div>

      </div>

    </div>

  </section>
`;

  /* =======================================================
     MINIATURES
  ======================================================= */

  const thumbnails = wrapper.querySelectorAll(".demo3__productThumbnail");

  const mainVisual = wrapper.querySelector(".demo3__productVisual");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      thumbnails.forEach((item) => item.classList.remove("is-active"));

      thumbnail.classList.add("is-active");

      mainVisual.style.backgroundImage = `url("${thumbnail.dataset.image}")`;
    });
  });

  /* =======================================================
     QUANTITÉ
  ======================================================= */

  let quantity = 1;

  const quantityValue = wrapper.querySelector(".demo3__quantityValue");

  const minusButton = wrapper.querySelector(".demo3__quantityMinus");

  const plusButton = wrapper.querySelector(".demo3__quantityPlus");

  minusButton.addEventListener("click", () => {
    if (quantity <= 1) return;

    quantity -= 1;
    quantityValue.textContent = quantity;
  });

  plusButton.addEventListener("click", () => {
    quantity += 1;
    quantityValue.textContent = quantity;
  });

  /* =======================================================
   AJOUT AU PANIER
======================================================= */

  const addButton = wrapper.querySelector(".btnaddProduct");

  addButton.addEventListener("click", () => {
    addProductPanier(objet, quantity);

    addButton.textContent = "AJOUTÉ AU PANIER";
    addButton.disabled = true;

    window.setTimeout(() => {
      addButton.textContent = "AJOUTER AU PANIER";
      addButton.disabled = false;
    }, 1200);
  });

  /* =======================================================
     PRODUITS RECOMMANDÉS
  ======================================================= */

  wrapper.querySelectorAll("[data-related-index]").forEach((card) => {
    card.addEventListener("click", () => {
      const index = Number(card.dataset.relatedIndex);

      const selectedProduct = relatedProducts[index];

      if (!selectedProduct) return;

      createPageShop(selectedProduct);
    });
  });
}

function createCardProduct(category = "all", search = "") {
  afficherHeroShop(category);

  const grid = demo3Element?.querySelector(".gridProducts__demo3");

  if (!grid) return;

  const objets = filteredDataProducts(category, search);

  grid.innerHTML = "";

  if (objets.length === 0) {
    grid.innerHTML = `
      <p class="demo3__noProducts">
        Aucun produit trouvé.
      </p>
    `;

    return;
  }

  grid.innerHTML = objets
    .map(
      (objet, index) => `
        <div
          class="product__item"
          data-index="${index}"
        >
          <div
            class="product__item__img"
            style="
              background-image:url('${objet.img}');
              background-size:cover;
              background-position:center;
            "
          ></div>

          <div class="product__item__text">
            <h3>${objet.title}</h3>
            <h4>${objet.price}</h4>
          </div>
        </div>
      `,
    )
    .join("");

  grid.querySelectorAll(".product__item").forEach((card) => {
    card.addEventListener("click", () => {
      const index = Number(card.dataset.index);
      const product = objets[index];

      if (!product) return;

      createPageShop(product);
    });
  });
}

function filteredDataProducts(category = "all", search = "") {
  const normalizedSearch = search.trim().toLowerCase();

  return getDataDemoWeb3().filter((product) => {
    const matchCategory = category === "all" || product.category === category;

    const matchSearch =
      product.title.toLowerCase().includes(normalizedSearch) ||
      product.category.toLowerCase().includes(normalizedSearch);

    return matchCategory && matchSearch;
  });
}

function showPanier() {
  const overlay = demo3Element?.querySelector(".overlay__demo3");

  const panier = demo3Element?.querySelector(".panier__demo3");

  if (!overlay || !panier) return;

  panier.classList.add("open");
  overlay.classList.add("visible");
}

function hidePanier() {
  const overlay = demo3Element?.querySelector(".overlay__demo3");

  const panier = demo3Element?.querySelector(".panier__demo3");

  if (!overlay || !panier) return;

  panier.classList.remove("open");
  overlay.classList.remove("visible");
}

/* =========================================================
   IDENTIFIANT UNIQUE D’UN PRODUIT
========================================================= */

function getCartProductKey(product) {
  return [product.category, product.title, product.price]
    .map((value) =>
      String(value ?? "")
        .trim()
        .toLowerCase(),
    )
    .join("|");
}

/* =========================================================
   CONVERSION DU PRIX EN NOMBRE
========================================================= */

function getNumericProductPrice(price) {
  const numericPrice = Number.parseFloat(
    String(price)
      .replace(",", ".")
      .replace(/[^\d.]/g, ""),
  );

  return Number.isFinite(numericPrice) ? numericPrice : 0;
}

/* =========================================================
   PANIER VIDE
========================================================= */

function resetEmptyCart() {
  const divProducts = demo3Element?.querySelector(
    ".contentProductsPanier__demo3",
  );

  const buttonPanier = demo3Element?.querySelector(".buttonPanier");

  const continueShoppingButton = demo3Element?.querySelector(
    ".demo3__continueShopping",
  );

  const qtePanier = demo3Element?.querySelector(".cart-badge");

  const panierContainer = demo3Element?.querySelector(".panier__demo3");

  if (!divProducts || !buttonPanier || !qtePanier) {
    return;
  }

  cartItems = [];
  pricePanier = 0;

  qtePanier.textContent = "0";
  qtePanier.style.visibility = "hidden";

  buttonPanier.style.display = "none";

  panierContainer?.classList.remove("has-products");

  if (continueShoppingButton) {
    continueShoppingButton.style.display = "none";
  }

  divProducts.innerHTML = `
    <div class="demo3__emptyCart">

      <div class="demo3__emptyCartIllustration">

        <svg
          viewBox="0 0 360 280"
          role="img"
          aria-label="Sac Maison Vert"
        >

          <ellipse
            cx="174"
            cy="249"
            rx="105"
            ry="12"
            class="demo3__bagShadow"
          ></ellipse>

          <g class="demo3__bagBranch">

            <path d="M213 225C240 190 264 151 273 105"></path>

            <path d="M257 146C278 144 294 132 301 113"></path>

            <path d="M266 119C286 116 299 104 305 87"></path>

            <path d="M244 174C224 168 211 155 207 138"></path>

            <path d="M257 145C240 137 231 125 229 109"></path>

            <ellipse
              cx="292"
              cy="111"
              rx="18"
              ry="7"
              transform="rotate(-32 292 111)"
            ></ellipse>

            <ellipse
              cx="299"
              cy="85"
              rx="17"
              ry="7"
              transform="rotate(-42 299 85)"
            ></ellipse>

            <ellipse
              cx="211"
              cy="137"
              rx="7"
              ry="18"
              transform="rotate(-43 211 137)"
            ></ellipse>

            <ellipse
              cx="231"
              cy="108"
              rx="7"
              ry="17"
              transform="rotate(-30 231 108)"
            ></ellipse>

            <ellipse
              cx="273"
              cy="89"
              rx="7"
              ry="18"
              transform="rotate(8 273 89)"
            ></ellipse>

          </g>

          <g class="demo3__shoppingBag">

            <path
              d="
                M78 103
                H219
                L229 241
                H68
                Z
              "
            ></path>

            <path
              d="
                M111 103
                V73
                C111 35 128 17 149 17
                C170 17 187 35 187 73
                V103
              "
            ></path>

            <path
              d="
                M123 103
                V76
                C123 48 134 33 149 33
                C164 33 175 48 175 76
                V103
              "
            ></path>

          </g>

          <g class="demo3__bagLogo">

            <path d="M149 194V137"></path>

            <path
              d="
                M149 153
                C130 151 117 139 116 121
                C133 123 147 135 149 153
                Z
              "
            ></path>

            <path
              d="
                M149 169
                C168 166 181 153 182 136
                C165 139 152 151 149 169
                Z
              "
            ></path>

            <path
              d="
                M149 184
                C133 184 121 176 116 163
                C132 162 145 170 149 184
                Z
              "
            ></path>

          </g>

        </svg>

      </div>

      <div class="demo3__emptyCartText">

        <h3>VOTRE PANIER EST VIDE</h3>

        <span class="demo3__emptyCartLine"></span>

      </div>

      <button
        type="button"
        class="demo3__emptyCartButton"
      >
        DÉCOUVRIR LA BOUTIQUE
      </button>

      <div class="demo3__emptyCartGuarantees">

        <div class="demo3__emptyCartGuarantee">

          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 7h11v10H3z"></path>
            <path d="M14 10h4l3 3v4h-7z"></path>
            <circle cx="7" cy="18" r="2"></circle>
            <circle cx="18" cy="18" r="2"></circle>
          </svg>

          <strong>LIVRAISON OFFERTE</strong>
          <span>Dès 80 € d’achat</span>

        </div>

        <div class="demo3__emptyCartGuarantee">

          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 7v5h5"></path>
            <path d="M6 12a7 7 0 1 0 2-5"></path>
          </svg>

          <strong>RETOURS GRATUITS</strong>
          <span>Sous 30 jours</span>

        </div>

        <div class="demo3__emptyCartGuarantee">

          <svg viewBox="0 0 24 24" aria-hidden="true">

            <rect
              x="5"
              y="9"
              width="14"
              height="11"
              rx="1"
            ></rect>

            <path d="M8 9V6a4 4 0 0 1 8 0v3"></path>

          </svg>

          <strong>PAIEMENT SÉCURISÉ</strong>
          <span>Transactions protégées</span>

        </div>

      </div>

    </div>
  `;

  const emptyCartButton = divProducts.querySelector(".demo3__emptyCartButton");

  emptyCartButton?.addEventListener("click", () => {
    createShopHTML();
    hidePanier();
  });
}

/* =========================================================
   AJOUT D’UN PRODUIT
========================================================= */

function addProductPanier(product = null, quantityToAdd = 1) {
  if (!product) {
    resetEmptyCart();
    return;
  }

  const safeQuantity = Math.max(1, Number.parseInt(quantityToAdd, 10) || 1);

  const productKey = getCartProductKey(product);

  const existingProduct = cartItems.find((item) => item.key === productKey);

  /*
   * Si le produit existe déjà, on augmente seulement
   * sa quantité.
   */
  if (existingProduct) {
    existingProduct.quantity += safeQuantity;
  } else {
    /*
     * Sinon, on crée une seule nouvelle entrée.
     */
    cartItems.push({
      key: productKey,
      product,
      unitPrice: getNumericProductPrice(product.price),
      quantity: safeQuantity,
    });
  }

  renderFilledCart();
}

/* =========================================================
   AFFICHAGE DU PANIER REMPLI
========================================================= */

function renderFilledCart() {
  const divProducts = demo3Element?.querySelector(
    ".contentProductsPanier__demo3",
  );

  const buttonPanier = demo3Element?.querySelector(".buttonPanier");

  const continueShoppingButton = demo3Element?.querySelector(
    ".demo3__continueShopping",
  );

  const qtePanier = demo3Element?.querySelector(".cart-badge");

  const panierContainer = demo3Element?.querySelector(".panier__demo3");

  if (!divProducts || !buttonPanier || !qtePanier) {
    return;
  }

  panierContainer?.classList.add("has-products");

  buttonPanier.style.display = "block";

  if (continueShoppingButton) {
    continueShoppingButton.style.display = "flex";
  }

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  pricePanier = cartItems.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );

  qtePanier.textContent = String(totalQuantity);

  qtePanier.style.visibility = "visible";

  const productsHTML = cartItems
    .map((item) => {
      const { key, product, unitPrice, quantity } = item;

      const linePrice = unitPrice * quantity;

      return `
        <article
          class="productPanier__demo3"
          data-cart-key="${encodeURIComponent(key)}"
        >

          <button
            type="button"
            class="deleteProductPanier"
            data-cart-action="delete"
            aria-label="Supprimer ${product.title} du panier"
          >
            ×
          </button>

          <div
            class="productPanier__demo3__img"
            style="
              background-image:url('${product.img}');
              background-size:cover;
              background-position:center;
            "
            role="img"
            aria-label="${product.title}"
          ></div>

          <div class="productPanier__demo3__content">

  <div class="productPanier__demo3__text">

    <h3>${product.title}</h3>

    <h4>
      ${unitPrice.toFixed(2)} €
    </h4>

    <h5 class="demo3__cartProductQuantityText">
      Qté : ${quantity}
    </h5>

  </div>

  <div class="demo3__cartProductActions">

    <div class="demo3__cartQuantity">

      <button
        type="button"
        data-cart-action="minus"
        aria-label="Réduire la quantité"
      >
        −
      </button>

      <span class="demo3__cartQuantityValue">
        ${quantity}
      </span>

      <button
        type="button"
        data-cart-action="plus"
        aria-label="Augmenter la quantité"
      >
        +
      </button>

    </div>

    <p class="demo3__cartLinePrice">
      ${linePrice.toFixed(2)} €
    </p>

  </div>

</div>

        </article>
      `;
    })
    .join("");

  divProducts.innerHTML = `
    ${productsHTML}

    <div class="demo3__cartSummary">

      <div class="demo3__cartSummaryRow">

        <span>Sous-total</span>

        <span>
          ${pricePanier.toFixed(2)} €
        </span>

      </div>

      <div class="demo3__cartSummaryRow">

        <span>Livraison</span>

        <span>Offerte</span>

      </div>

      <div
        class="
          demo3__cartSummaryRow
          demo3__cartSummaryTotal
        "
      >

        <span>Total</span>

        <span>
          ${pricePanier.toFixed(2)} €
        </span>

      </div>

    </div>
  `;

  buttonPanier.textContent = `PASSER COMMANDE (${pricePanier.toFixed(2)} €)`;

  addCartProductEvents();

  if (continueShoppingButton) {
    continueShoppingButton.onclick = () => {
      hidePanier();
    };
  }

  buttonPanier.onclick = validateCart;
}

/* =========================================================
   ÉVÉNEMENTS DES PRODUITS DU PANIER
========================================================= */

function addCartProductEvents() {
  const divProducts = demo3Element?.querySelector(
    ".contentProductsPanier__demo3",
  );

  if (!divProducts) return;

  divProducts
    .querySelectorAll(".productPanier__demo3")
    .forEach((productCard) => {
      const encodedKey = productCard.dataset.cartKey;

      const productKey = decodeURIComponent(encodedKey || "");

      const minusButton = productCard.querySelector(
        '[data-cart-action="minus"]',
      );

      const plusButton = productCard.querySelector('[data-cart-action="plus"]');

      const deleteButton = productCard.querySelector(
        '[data-cart-action="delete"]',
      );

      minusButton?.addEventListener("click", () => {
        const cartProduct = cartItems.find((item) => item.key === productKey);

        if (!cartProduct) return;

        /*
         * À 1, le bouton moins ne descend pas
         * automatiquement à zéro.
         */
        if (cartProduct.quantity <= 1) {
          return;
        }

        cartProduct.quantity -= 1;

        renderFilledCart();
      });

      plusButton?.addEventListener("click", () => {
        const cartProduct = cartItems.find((item) => item.key === productKey);

        if (!cartProduct) return;

        cartProduct.quantity += 1;

        renderFilledCart();
      });

      deleteButton?.addEventListener("click", () => {
        cartItems = cartItems.filter((item) => item.key !== productKey);

        renderFilledCart();
      });
    });
}

/* =========================================================
   VALIDATION DE LA COMMANDE
========================================================= */

function validateCart() {
  const divProducts = demo3Element?.querySelector(
    ".contentProductsPanier__demo3",
  );

  const buttonPanier = demo3Element?.querySelector(".buttonPanier");

  const continueShoppingButton = demo3Element?.querySelector(
    ".demo3__continueShopping",
  );

  const qtePanier = demo3Element?.querySelector(".cart-badge");

  const panierContainer = demo3Element?.querySelector(".panier__demo3");

  if (!divProducts || !buttonPanier || !qtePanier) {
    return;
  }

  const validatedTotal = pricePanier.toFixed(2);

  divProducts.innerHTML = `
    <div class="demo3__cartConfirmation">

      <h3>MERCI POUR VOTRE COMMANDE</h3>

      <span></span>

      <p>
        Votre commande d’un montant de
        <strong>
          ${validatedTotal} €
        </strong>
        a bien été validée.
      </p>

    </div>
  `;

  cartItems = [];
  pricePanier = 0;

  qtePanier.textContent = "0";
  qtePanier.style.visibility = "hidden";

  if (continueShoppingButton) {
    continueShoppingButton.style.display = "none";
  }

  buttonPanier.textContent = "CONTINUER MES ACHATS";

  buttonPanier.onclick = () => {
    panierContainer?.classList.remove("has-products");

    createShopHTML();
    hidePanier();
    resetEmptyCart();
  };
}

function initDemo3BurgerMenu() {
  const burgerButton = demo3Element?.querySelector(".demo3__burgerButton");

  const mobileMenu = demo3Element?.querySelector(".demo3__mobileMenu");

  if (!burgerButton || !mobileMenu) return;

  burgerButton.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");

    burgerButton.classList.toggle("open", isOpen);

    burgerButton.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      burgerButton.classList.remove("open");

      burgerButton.setAttribute("aria-expanded", "false");
    });
  });
}

function scrollTopDemo(element) {
  requestAnimationFrame(() => {
    element.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
