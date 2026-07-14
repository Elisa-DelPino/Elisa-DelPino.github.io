import { getDataDemoWeb3 } from "./dataDemoWeb3.js";

let pricePanier = 0;

// INJECT CSS

const style = document.createElement("style");

style.innerHTML = `

.header__nav__demo3 {
  width: 100%;
  height: clamp(40px, 5vw, 60px);
  display: flex;
  list-style: none;
  align-items: center;
  justify-content: right;
  gap: clamp(5px, 2vw, 20px);
  padding: clamp(5px, 1.5vw, 40px);
  background: white;
}

.header__nav__demo3__link {
  font-size: clamp(10px, 1.5vw, 20px);
  font-weight: 200;
  cursor: pointer;
}
  
.icon {
  width: clamp(15px, 2.5vw, 25px);
  height: clamp(15px, 2.5vw, 25px);
  stroke: black;
  background: white;
  cursor: pointer;
}

.header__nav__demo3__search {
  width: clamp(50px, 15vw, 150px);
  height: clamp(20px, 2vw, 30px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(2px, 0.5vw, 10px);
}

.header__nav__demo3__search input {
  width: 80%;
  height: 80%;
  padding: clamp(2px, 0.5vw, 10px);
}

/* PANIER + BADGE */
.cart-container {
  position: relative;
  width: clamp(15px, 2.5vw, 25px);
  height: clamp(15px, 2.5vw, 25px);
  flex-shrink: 0;
}

.cart-icon {
  width: 100%;
  height: 100%;
  color: black;
  cursor: pointer;
  display: block;
}

.cart-badge {
  position: absolute;
  top: -6px;
  right: -6px;

  width: clamp(10px, 1.4vw, 14px);
  height: clamp(10px, 1.4vw, 14px);

  background: #c2c5aa;
  color: black;

  font-size: clamp(6px, 0.8vw, 9px);
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  line-height: 1;
}

.body__demo3 {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.wrapper__demo3 {
  position: relative;
  width: 100%;  
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: clamp(10px, 2vw, 30px);
}

.overlay__demo3 {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 500;
  visibility: hidden;
  opacity: 0;
  transition: 0.3s;
}

.overlay__demo3.visible{
  visibility: visible;
  opacity: 1;
}

.panier__demo3 {
  width: 50%;
  height: 100%;
  background: lightgray;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(20px, 3vw, 40px) clamp(10px, 2vw, 20px);
  gap: clamp(20px, 3vw, 40px);
  transform: translateX(+100%); 
  transition: 0.4s all ease-in-out;
}

.panier__demo3.open {

  transform: translateX(0%);
  
}


.contentProductsPanier__demo3 {
  width: 100%;
  height: 78%;
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 2vw, 30px);
  text-align : center; 
}

.productPanier__demo3 {
  width: 100%;
  height: clamp(80px, 10vw, 150px);
  background: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: clamp(10px, 2vw, 30px);
  padding: clamp(10px, 2vw, 30px);
}

.productPanier__demo3__img {
  width: clamp(50px, 8vw, 100px);
  height: clamp(50px, 8vw, 100px);
  border-radius: 5px;
}

.productPanier__demo3__text {
  display: flex;
  height: clamp(50px, 8vw, 100px);
  flex-direction: column;
  align_items: center;
  justify-content: center; 
  gap: clamp(2px, 1vw, 10px);
  padding: 0 clamp(5px, 1.5vw, 20px);
}

.buttonPanier {
  width: 100%;
  height: clamp(20px, 4vw, 50px);
  cursor: pointer;
}

.productPanier__demo3 {
  position: relative;
}

.deleteProductPanier {
  position: absolute;
  top: 5px;
  right: 8px;
  cursor: pointer;
  font-size: 5px;
  font-weight: bold;
}
  
.demo3__content {
  width: 100%;
}

.demo3__hero__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}
  
.hero__demo3 {
  width: 100%;
  height: clamp(180px, 35vw, 450px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  }
  
.hero__demo3__text {
  width: 80%;
  height: 100%;
  z-index: 2;
  }
  
.wrapper__demo3__text {
  width: clamp(100px, 35vw, 500px); 
  height: 100%;
  gap: clamp(20px, 2vw, 30px); 
  display: flex;
  flex-direction: column; 
  padding-top: 15%;
  padding-right: 40px;
  font-size: clamp(8px, 1.5vw, 18px);
}

.wrapper__demo3__text h1 {
  font-size: clamp(15px, 3vw, 40px);
}
  

.btnShop {
  width: clamp(90px, 18vw, 200px);
  height: clamp(20px, 2vw, 40px);
  background: #c2c5aa;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  font-size: clamp(8px, 1.5vw, 15px);
}

.demo3__categories {
  width: 100%;    
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(10px, 2vw, 30px);
  } 
  
.demo3__categories h2 {
  font-size: clamp(12px, 3vw, 30px);
}  
    
.categories__list {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(10px, 2vw, 30px);
  }
  
.category__item {
  width: clamp(80px, 15vw, 250px);
  height: clamp(150px, 22vw, 350px);
  background: lightgray;
  border-radius: 5px;
  }

.demo3__fav__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
}  
    
.category__item__img {
  width: 100%;
  height: clamp(80px, 12vw, 200px);
  background: gray;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
}

.category__item__text {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(5px, 1.5vw, 20px);
  padding: clamp(5px, 1.5vw, 20px);
}
    
.category__item__text h3 {
    font-size: clamp(8px, 1vw, 20px);
}

.category__item__text p {
    font-size: clamp(6px, 0.8vw, 14px);
    text-align: center;
}

.category__item__text .btnShop {
    width: clamp(50px, 12vw, 150px); 
    height: clamp(10px, 2vw, 20px);
    cursor: pointer;
    font-size: clamp(8px, 1vw, 14px);
} 
    
.demo3__favorite {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: clamp(10px, 2vw, 30px);
    padding: clamp(10px, 2vw, 30px) 0;
} 
    
.demo3__favorite h2 {
    font-size: clamp(12px, 3vw, 30px);
}
    
.products__list {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(10px, 2vw, 30px);
}

.product__item {
    width: clamp(80px, 15vw, 200px);
    height: clamp(100px, 18vw, 200px);
    background: lightgray;
    border-radius: 5px;
}    

.product__item__img {
    width: 100%;
    height: 60%;
    background: gray;
    border-radius: 5px 5px 0 0;
    cursor: pointer;
}  
    
.product__item__text {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(5px, 1.5vw, 20px);
    flex-direction: column;
    gap: clamp(5px, 1.5vw, 10px);
    font-size: clamp(8px, 1vw, 14px);
}
    
.contentPageProduct__demo3 {
    width: 100%;
    height: clamp(400px, 50vw, 450px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}    
    
.imgPageProduct__demo3 {
    width: 100%;
    height: clamp(300px, 35vw, 400px);
    margin: 0 clamp(10px, 2vw, 30px);
}  
    
.textPageProduct__demo3 {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: clamp(10px, 2vw, 30px);
    padding: clamp(20px, 4vw, 40px);
    height: 100%; /* important */
}
    
.descriptionPageProduct__demo3 {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: clamp(10px, 2vw, 30px);
    padding: clamp(10px, 2vw, 30px) 0;
}

.btnaddProduct {
    width: 100%;
    height: clamp(40px, 5vw, 60px);
    margin-top: auto;
    cursor: pointer;
}
    
.gridProducts__demo3 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: clamp(10px, 2vw, 30px);
    padding: clamp(20px, 4vw, 40px) clamp(40px, 8vw, 80px);
}    
    
@media screen and (min-width: 1000px) {
  .contentPageProduct__demo3 {
    flex-direction: row;
  } 
} 

.divFilter__demo3 {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(5px, 1.5vw, 20px);
  padding-top : 5%;
}
  
.inputSearch__demo3 {
  width: clamp(50px, 15vw, 150px);
  height: clamp(10px, 2vw, 30px);
  padding: clamp(2px, 0.5vw, 10px);
  font-size: clamp(5px, 1.5vw, 12px);
}

.selectCategories__demo3 {
  width: clamp(50px, 15vw, 150px);
  height: clamp(10px, 2vw, 30px);
  font-size: clamp(5px, 1.5vw, 12px);
}

.descriptionPageProduct__demo3 p {
  font-size: clamp(10px, 1.5vw, 16px); 
}

.textPageProduct__demo3 h1 {
  font-size: clamp(15px, 3vw, 25px);
}

.textPageProduct__demo3 h2 {
  font-size: clamp(15px, 3vw, 20px);
}

.btnaddProduct {
  cursor: pointer;
  font-size: clamp(8px, 1.5vw, 15px);
}


`;

document.head.appendChild(style);

// INJECT HTML

export function addDemoWeb3(element) {
  if (!element) return;

  createHeader(element);
  createHomeHTML(element);
  addProductPanier();

  element.style.background = "#c2c5aa";
}

function createHeader(element) {
  element.innerHTML = `
    <nav class="header__demo3">
      <ul class="header__nav__demo3">
        <li class="header__nav__demo3__link">
          <span data-page="home">HOME</span>
        </li>

        <li class="header__nav__demo3__link">
          <span data-page="shop">SHOP</span>
        </li>

          <div class="cart-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="0.8"
              class="cart-icon"
            >
              <rect x="5" y="8" width="14" height="12" rx="1"/>
              <path d="M9 8V6a3 3 0 0 1 6 0v2"/>
            </svg>

            <span class="cart-badge"></span>
          </div>
        </div>
      </ul>
    </nav>

    <div class="body__demo3"> 

    <div class="overlay__demo3"></div>
    <div class="panier__demo3">
        <h2>Panier</h2>
        <div class="contentProductsPanier__demo3"></div>
        <button class="buttonPanier">button</button>   
    </div>
    <div class="wrapper__demo3"></div>
    </div>
    `;

  const buttonMenu = element.querySelectorAll(".header__nav__demo3__link span");
  buttonMenu.forEach((button) => {
    const page = button.dataset.page;

    button.addEventListener("click", () => {
      if (page === "home") {
        createHomeHTML(element);
        hidePanier();
      } else {
        createShopHTML();
        hidePanier();
      }
    });
  });

  const panier = element.querySelector(".cart-container");
  panier.addEventListener("click", () => {
    showPanier();
  });

  const overlay = element.querySelector(".overlay__demo3");
  overlay.addEventListener("click", () => {
    showPanier();
  });
}

function createHomeHTML(element) {
  const wrapper = element.querySelector(".wrapper__demo3");
  wrapper.innerHTML = `

        <div class="demo3__content">
            <div class="hero__demo3">
                <img class="demo3__hero__img" src="./img/heroDeco.png">
                <div class="hero__demo3__text">
                    <div class="wrapper__demo3__text">
                        <h1>Bienvenue sur notre boutique en ligne !</h1>
                        <p>Découvrez nos produits exclusifs et profitez de nos offres spéciales.</p>
                        <button class="btnShop">Voir les produits</button>
                    </div>    
                </div>      
            </div>
        </div>
        <div class="demo3__categories">
            <h2>Catégories</h2>
            <div class="categories__list">
                <div class="category__item">
                    <div class="category__item__img"><img class="demo3__fav__img" src="./img/catVase.png"></div>
                    <div class="category__item__text">
                        <h3>Vases</h3>
                        <p>Découvrez notre collection de bougies parfumées.</p>
                        <button class="btnShop">Shop -></button>
                    </div>
                </div>
                <div class="category__item">
                    <div class="category__item__img"><img class="demo3__fav__img" src="./img/catBougie.png"></div>
                    <div class="category__item__text">
                        <h3>Bougies</h3>
                        <p>Découvrez notre collection de bougies parfumées.</p>
                        <button class="btnShop">Shop -></button>
                    </div>
                </div>
                <div class="category__item">
                    <div class="category__item__img"><img class="demo3__fav__img" src="./img/catTextile.png"></div>
                    <div class="category__item__text">
                        <h3>Textiles</h3>
                        <p>Découvrez notre collection de bougies parfumées.</p>
                        <button class="btnShop">Shop -></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="demo3__favorite">
            <h2>Produits favoris</h2>
            <div class="products__list">
                <div class="product__item">
                    <div class="product__item__img"></div>
                    <div class="product__item__text">
                        <h3>Title</h3>
                        <h4>€</h4>
                    </div>
                </div>
                <div class="product__item">
                    <div class="product__item__img"></div>
                    <div class="product__item__text">
                        <h3>Title</h3>
                        <h4>€</h4>
                    </div>
                </div>
                <div class="product__item">
                    <div class="product__item__img"></div>
                    <div class="product__item__text">
                        <h3>Title</h3>
                        <h4>€</h4>
                    </div>
                </div>
                <div class="product__item">
                    <div class="product__item__img"></div>
                    <div class="product__item__text">
                        <h3>Title</h3>
                        <h4>€</h4>
                    </div>
                </div>
            </div>        
        </div>
    </div>  
  `;

  addEventListeners(element);
  const products = element.querySelectorAll(".product__item");
  products.forEach((product, index) => {
    const data = getDataDemoWeb3();
    addDataProducts(product, data[index]);
  });
}

function createShopHTML() {
  const wrapper = document.querySelector(".wrapper__demo3");
  wrapper.innerHTML = ``;

  wrapper.innerHTML = `
    <div class="divFilter__demo3">
      <input class="inputSearch__demo3" type="text" placeholder="Rechercher...">
      <select class="selectCategories__demo3">
        <option value="Category">Tout les produits</option>
        <option value="Bougies">Bougies</option>
        <option value="Textiles">Textiles</option>
        <option value="Vases">Vases</option>
      </select>
    </div>
    <div class="gridProducts__demo3"></div>

  `;

  createCardProduct();

  const selectCategory = wrapper.querySelector(".selectCategories__demo3");
  const inputSearch = wrapper.querySelector(".divFilter__demo3 input");

  selectCategory.addEventListener("change", () => {
    const categorySelected = selectCategory.value;
    const searchValue = inputSearch.value;

    const category = categorySelected === "Category" ? "all" : categorySelected;

    createCardProduct(category, searchValue);
  });

  inputSearch.addEventListener("input", () => {
    const categorySelected = selectCategory.value;
    const searchValue = inputSearch.value;

    const category = categorySelected === "Category" ? "all" : categorySelected;

    createCardProduct(category, searchValue);
  });
}

function createPageShop(objet) {
  const wrapper = document.querySelector(".wrapper__demo3");
  wrapper.innerHTML = ``;

  wrapper.innerHTML = `
    <div class="contentPageProduct__demo3">
      <div class="imgPageProduct__demo3"> </div>
      <div class="textPageProduct__demo3">
        <h1>${objet.title}</h1>
        <h2>${objet.price}</h2>
        <div class="descriptionPageProduct__demo3">
            <p>${objet.description}</p>
        </div>
        <button class="btnaddProduct">Ajouter au panier</button>
      </div>
    </div>    
    
  `;

  const imgPageProduct = wrapper.querySelector(".imgPageProduct__demo3");
  imgPageProduct.style.background = objet.img;

  const button = wrapper.querySelector(".btnaddProduct");
  button.addEventListener("click", () => {
    addProductPanier(objet);
  });
}

function addEventListeners(element) {
  const imagesProducts = element.querySelectorAll(".product__item__img");
  imagesProducts.forEach((imageProduct, index) => {
    imageProduct.addEventListener("click", () => {
      const products = getDataDemoWeb3();
      createPageShop(products[index]);
    });
  });
}

function addDataProducts(div, object) {
  const productImg = div.querySelector(".product__item__img");
  const productTitle = div.querySelector(".product__item__text h3");
  const productPrice = div.querySelector(".product__item__text h4");
  productImg.style.background = object.img;
  productTitle.textContent = object.title;
  productPrice.textContent = object.price;
}

function createCardProduct(category = "all", search = "") {
  const grid = document.querySelector(".gridProducts__demo3");
  const objets = filteredDataProducts(category, search);
  grid.innerHTML = ``;

  if (objets.length === 0) {
    grid.innerHTML = `<p>Aucun produit trouvé.</p>`;
    return;
  }

  grid.innerHTML = objets
    .map(
      (objet, index) => `
        <div class="product__item" data-index="${index}"> 
          <div class="product__item__img" style="background: ${objet.img};"></div>
          <div class="product__item__text">
            <h3>${objet.title}</h3>
            <h4>${objet.price}</h4>
          </div>
        </div>
      `,
    )
    .join("");

  const cards = grid.querySelectorAll(".product__item");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const index = Number(card.dataset.index);
      const product = objets[index];
      createPageShop(product);
    });
  });
}

function filteredDataProducts(category = "all", search = "") {
  const data = getDataDemoWeb3();

  return data.filter((product) => {
    // Vérifie la catégorie
    const matchCategory = category === "all" || product.category === category;

    // Vérifie la recherche dans le titre OU la catégorie
    const matchSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    // Retourne seulement les produits qui correspondent aux deux conditions
    return matchCategory && matchSearch;
  });
}

function showPanier() {
  const overlay = document.querySelector(".overlay__demo3");
  const panier = document.querySelector(".panier__demo3");

  panier.classList.toggle("open");
  overlay.classList.toggle("visible");
}

function hidePanier() {
  const overlay = document.querySelector(".overlay__demo3");
  const panier = document.querySelector(".panier__demo3");

  panier.classList.remove("open");
  overlay.classList.remove("visible");
}

function addProductPanier(product = null) {
  const divProducts = document.querySelector(".contentProductsPanier__demo3");
  const buttonPanier = document.querySelector(".buttonPanier");
  const qtePanier = document.querySelector(".cart-badge");

  if (product == null) {
    pricePanier = 0;
    qtePanier.textContent = "0";
    qtePanier.style.visibility = "hidden";

    divProducts.innerHTML = `
      <p class="textPanier">Votre panier est vide.</p>
    `;

    buttonPanier.textContent = "CONTINUER SHOPPING";

    buttonPanier.onclick = () => {
      createShopHTML();
      hidePanier();
    };

    return;
  }

  pricePanier += parseFloat(product.price);
  qtePanier.textContent = Number(qtePanier.textContent) + 1;
  qtePanier.style.visibility = "visible";

  const textProduct = divProducts.querySelector(".textPanier");
  if (textProduct) textProduct.remove();

  const productDiv = document.createElement("div");
  productDiv.classList.add("productPanier__demo3");

  productDiv.innerHTML = `
    <button class="deleteProductPanier" type="button">✕</button>

    <div 
      class="productPanier__demo3__img" 
      style="background: ${product.img};"
    ></div>

    <div class="productPanier__demo3__text">
      <h3>${product.title}</h3>
      <h4>${product.price}</h4>
      <h5>Qte : 1</h5>
    </div>
  `;

  divProducts.appendChild(productDiv);

  buttonPanier.textContent = `PAYER (${pricePanier.toFixed(2)} €)`;

  const deleteButton = productDiv.querySelector(".deleteProductPanier");

  deleteButton.addEventListener("click", () => {
    productDiv.remove();

    pricePanier -= parseFloat(product.price);
    qtePanier.textContent = Number(qtePanier.textContent) - 1;

    if (Number(qtePanier.textContent) <= 0) {
      addProductPanier(null);
      return;
    }

    buttonPanier.textContent = `PAYER (${pricePanier.toFixed(2)} €)`;
  });

  buttonPanier.onclick = () => {
    divProducts.innerHTML = `
      <p class="textPanier">
        Félicitation, votre panier d'un montant de ${pricePanier.toFixed(2)}€ a bien été validé !
      </p>
    `;

    buttonPanier.textContent = "CONTINUER SHOPPING";
    pricePanier = 0;
    qtePanier.textContent = "0";
    qtePanier.style.visibility = "hidden";

    buttonPanier.onclick = () => {
      createShopHTML();
      hidePanier();
      addProductPanier(null);
    };
  };
}
