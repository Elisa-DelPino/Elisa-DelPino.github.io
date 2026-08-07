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

.demo3__burgerButton {
  width: 25px;
  height: 22px;

  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding: 3px 0;

  border: none;
  background: transparent;

  cursor: pointer;
}

.demo3__burgerButton span {
  width: 100%;
  height: 1.5px;

  display: block;

  background: #454a41;

  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}

.demo3__mobileMenu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 49;

  width: min(75%, 320px);

  display: flex;
  flex-direction: column;

  padding: 25px 30px;

  background: #f8f6f1;

  box-shadow:
    0 18px 35px
    rgba(45, 49, 42, 0.12);

  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  transform: translateY(-12px);

  transition:
    opacity 0.25s ease,
    transform 0.25s ease,
    visibility 0.25s ease;
}

.demo3__mobileMenu.open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;

  transform: translateY(0);
}

.demo3__mobileMenu button {
  padding: 16px 0;

  border: none;
  border-bottom:
    1px solid
    rgba(100, 108, 94, 0.13);

  background: transparent;
  color: #454a41;

  font-family: "Montserrat", Arial, sans-serif;
  font-size: 11px;
  font-weight: 500;

  letter-spacing: 0.12em;
  text-align: left;

  cursor: pointer;
}

.demo3__mobileMenu button:last-child {
  border-bottom: none;
}

.demo3__burgerButton.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.demo3__burgerButton.open span:nth-child(2) {
  opacity: 0;
}

.demo3__burgerButton.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* =========================================================
   PANIER
========================================================= */

.panier__demo3 {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;

  width: min(80%, 800px);
  height: clamp(150px, 50vw, 450px);

  display: flex;
  flex-direction: column;
  align-items: stretch;

  padding: 0;

  overflow-y: auto;
  overflow-x: hidden;

  background:
    linear-gradient(
      145deg,
      #fbfaf7 0%,
      #f7f5ef 100%
    );

  box-shadow:
    -22px 0 55px
    rgba(45, 49, 42, 0.14);

  transform: translateX(105%);

  transition:
    transform 0.45s
    cubic-bezier(0.22, 1, 0.36, 1);
}

.panier__demo3.open {
  transform: translateX(0);
}

.heroShop__demo3{
    width:100%;
    margin-bottom:45px;
}

.heroCategory{

    position:relative;

    width:100%;
    height:450px;

    overflow:hidden;

    background:#ece8df;

}

.heroCategory img{

    width:100%;
    height:100%;

    object-fit:cover;
    object-position: center bottom;

}

.heroCategory__overlay{

    position:absolute;
    inset:0;

    display:flex;
    justify-content:center;
    flex-direction:column;

    width:42%;

    padding-left:8%;

    background:linear-gradient(
        90deg,
        rgba(248,246,241,.98) 0%,
        rgba(248,246,241,.93) 25%,
        rgba(248,246,241,.72) 42%,
        rgba(248,246,241,.35) 58%,
        rgba(248,246,241,.05) 78%,
        transparent 100%
    );

}  

    .heroCategory__subtitle{

    font-family:"Montserrat",sans-serif;
    font-size:11px;
    font-weight:500;

    letter-spacing:.35em;
    text-transform:uppercase;

    color:#7a8372;

}

.heroCategory__line{

    width:55px;
    height:1px;

    margin:22px 0 30px;

    background:#808875;

}

.heroCategory h1{

    margin:0;

    font-family:"Cormorant Garamond",serif;
    font-size:78px;
    font-weight:500;

    line-height:.9;

    color:#30352d;

}


/* ---------------------------------------------------------
   CROIX DE FERMETURE
--------------------------------------------------------- */

.demo3__closeCart {
  position: absolute;
  top: 24px;
  right: 27px;
  z-index: 10;

  width: 34px;
  height: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: none;

  background: transparent;
  color: #454b42;

  cursor: pointer;
}

.demo3__closeCart svg {
  width: 100%;
  height: 100%;

  fill: none;
  stroke: currentColor;
  stroke-width: 1.1;
}


/* ---------------------------------------------------------
   TITRE DU PANIER
--------------------------------------------------------- */

.demo3__cartHeader {
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 19px;

  padding:
    clamp(28px, 4vw, 45px)
    50px
    15px;
}

.demo3__cartHeader h2 {
  margin: 0;

  color: #555c50;

  font-family:
    "Cormorant Garamond",
    Georgia,
    serif;

  font-size:
    clamp(12px, 1.5vw, 18px);

  font-weight: 500;

  letter-spacing: 0.08em;
}

.demo3__cartHeader > span {
  width: 125px;
  height: 1px;

  background:
    rgba(104, 113, 97, 0.24);
}


/* ---------------------------------------------------------
   CONTENU
--------------------------------------------------------- */

.contentProductsPanier__demo3 {
  width: 100%;
  height: auto;
  min-height: 0;

  display: flex;
  flex: 1;
  flex-direction: column;

  gap: 20px;

  padding:
    0
    clamp(30px, 5vw, 75px);

  text-align: center;
}


/* =========================================================
   ÉTAT VIDE
========================================================= */

.demo3__emptyCart {
    width: 100%;
    height: 100%;

    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    padding: 5px 0 0;
}


/* Illustration */

.demo3__emptyCartIllustration {
  width: clamp(80px, 12vw, 100px);

  margin-top:
    clamp(8px, 1.5vw, 20px);

  color: #747d6b;

  animation:
    demo3EmptyCartFloat
    5s
    ease-in-out
    infinite;
}

.demo3__emptyCartIllustration svg {
  width: 100%;
  height: auto;

  display: block;
}

.demo3__shoppingBag {
  fill: rgba(251, 250, 247, 0.74);
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linejoin: round;
}

.demo3__bagLogo {
  fill: none;
  stroke: #74806a;
  stroke-width: 1.65;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.demo3__bagBranch {
  fill: rgba(121, 132, 112, 0.08);
  stroke: rgba(121, 132, 112, 0.16);
  stroke-width: 1.2;
}

.demo3__bagShadow {
  fill: rgba(67, 72, 63, 0.08);
}

@keyframes demo3EmptyCartFloat {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
}


/* Texte */

.demo3__emptyCartText {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 14px;

  margin-top: -8px;
}

.demo3__emptyCartText h3 {
  margin: 5px;

  color: #565d52;

  font-family:
    "Cormorant Garamond",
    Georgia,
    serif;

  font-size:
    clamp(10px, 1.5vw, 15px);

  font-weight: 500;

  letter-spacing: 0.13em;
}

.demo3__emptyCartLine {
  width: 38px;
  height: 1px;

  background:
    rgba(112, 122, 102, 0.27);
}

.demo3__emptyCartText p {
  margin: 0;

  color: #858a81;

  font-family:
    "Montserrat",
    Arial,
    sans-serif;

  font-size:
    clamp(10px, 0.9vw, 14px);

  line-height: 1.75;
}


/* Bouton */

.demo3__emptyCartButton {
  min-width:
    clamp(230px, 26vw, 330px);

    margin-top: 18px;

  padding:
    17px
    28px;

  border: 1px solid #77826d;
  border-radius: 1px;

  background: #77826d;
  color: white;

  font-family:
    "Montserrat",
    Arial,
    sans-serif;

  font-size:
    clamp(9px, 0.8vw, 12px);

  font-weight: 500;

  letter-spacing: 0.15em;

  cursor: pointer;

  transition:
    background 0.25s ease,
    transform 0.25s ease;
}

.demo3__emptyCartButton:hover {
  background: #65715c;
  transform: translateY(-2px);
}


/* ---------------------------------------------------------
   GARANTIES
--------------------------------------------------------- */

.demo3__emptyCartGuarantees {
  width: calc(
    100% +
    clamp(60px, 10vw, 150px)
  );

  display: grid;
  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  margin-top: auto;

  border-top:
    1px solid
    rgba(101, 110, 94, 0.14);

  background:
    rgba(248, 246, 241, 0.46);
}

.demo3__emptyCartGuarantee {
  min-width: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 6px;

  padding:
    clamp(15px, 1.5vw, 25px)
    12px;

  border-right:
    1px solid
    rgba(101, 110, 94, 0.13);

  text-align: center;
}

.demo3__emptyCartGuarantee:last-child {
  border-right: none;
}

.demo3__emptyCartGuarantee svg {
  width: 18px;
  height: 18px;

  margin-bottom: 5px;

  fill: none;
  stroke: #77836d;
  stroke-width: 1.2;
}

.demo3__emptyCartGuarantee strong {
  color: #596055;

  font-family:
    "Cormorant Garamond",
    Georgia,
    serif;

  font-size:
    clamp(8px, 1vw, 10px);

  font-weight: 500;

  letter-spacing: 0.04em;
}

.demo3__emptyCartGuarantee span {
  color: #989c95;

  font-family:
    "Montserrat",
    Arial,
    sans-serif;

  font-size:
    clamp(7px, 0.68vw, 10px);
}


/* ---------------------------------------------------------
   CONTENU DU PANIER REMPLI
--------------------------------------------------------- */

.panier__demo3.has-products .contentProductsPanier__demo3 {
  display: flex;
  flex-direction: column;

  gap: clamp(14px, 1.5vw, 22px);

  padding:
    0
    clamp(28px, 4vw, 55px);

  overflow-y: auto;
  overflow-x: hidden;

  text-align: left;
}


/* ---------------------------------------------------------
   CARTE PRODUIT
--------------------------------------------------------- */

.productPanier__demo3{
    position:relative;

    display:flex;
    gap:22px;

    padding:22px;

    border:1px solid rgba(103,112,96,.15);
    border-radius:10px;

    background:rgba(255,255,255,.65);
    box-shadow:0 10px 30px rgba(62,67,57,.03);
}


/* Image */

.productPanier__demo3__img{
    width:120px;
    height:120px;

    flex-shrink:0;

    border-radius:10px;
}

.productPanier__demo3__content {
  min-width: 0;
  flex: 1;

  display: flex;
  flex-direction: column;
}


/* Informations */

.productPanier__demo3__text{

    flex:1;

    display:flex;
    flex-direction:column;

    min-width:0;
}

.productPanier__demo3__text h3 {
  margin: 0;

  color: #4b5148;

  font-family:
    "Cormorant Garamond",
    Georgia,
    serif;

  font-size:
    clamp(17px, 1.8vw, 26px);

  font-weight: 600;
}

.productPanier__demo3__text h4 {
  margin: 0;

  color: #363b34;

  font-family:
    "Cormorant Garamond",
    Georgia,
    serif;

  font-size:
    clamp(16px, 1.5vw, 22px);

  font-weight: 500;
}

.productPanier__demo3__text h5 {
  margin: 3px 0 0;

  color: #686e65;

  font-family:
    "Montserrat",
    Arial,
    sans-serif;

  font-size:
    clamp(8px, 0.75vw, 11px);

  font-weight: 400;
}


/* ---------------------------------------------------------
   QUANTITÉ DU PRODUIT
--------------------------------------------------------- */

.demo3__cartProductActions{

    display:flex;
    align-items:center;
    justify-content:space-between;

    margin-top:auto;
    padding-top:15px;

    gap:20px;
}

.demo3__cartQuantity{

    width:120px;
    height:42px;

    display:grid;

    grid-template-columns:repeat(3,1fr);

    border-radius:7px;

    border:1px solid rgba(84,92,79,.22);

    background:#fff;
}

.demo3__cartQuantity button,
.demo3__cartQuantity span {
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo3__cartQuantity button {
  width: 35px;
  height: 35px;

  padding: 0;

  border: none;

  background: transparent;
  color: #4f574c;

  font-size: 19px;

  cursor: pointer;
}

.demo3__cartQuantityValue {
    min-width: 30px;
    text-align: center;
}

.demo3__cartQuantity span {
  color: #42483f;

  font-family:
    "Montserrat",
    Arial,
    sans-serif;

  font-size: clamp(8px, 2vw, 12px);
}

.demo3__cartLinePrice{

    font-family:"Cormorant Garamond",serif;

    font-size:34px;

    font-weight:600;

    white-space:nowrap;
}


/* Croix de suppression */

.deleteProductPanier {
  position: absolute;
  top: 12px;
  right: 13px;

  width: 25px;
  height: 25px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: none;

  background: transparent;
  color: #596056;

  font-family: Arial, sans-serif;
  font-size: 20px;
  font-weight: 300;

  cursor: pointer;

  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.deleteProductPanier:hover {
  color: #252a24;
  transform: rotate(90deg);
}


/* =========================================================
   RÉCAPITULATIF
========================================================= */

.demo3__cartSummary {
  width: 100%;

  display: flex;
  flex-direction: column;

  margin-top: 2px;

  border-top:
    1px solid
    rgba(103, 112, 96, 0.17);
}

.demo3__cartSummaryRow {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-top: 12px;

  color: #5e645b;

  font-family:
    "Cormorant Garamond",
    Georgia,
    serif;

  font-size:
    clamp(14px, 1.45vw, 20px);
}

.demo3__cartSummaryRow span:last-child {
  text-align: right;
}

.demo3__cartSummaryTotal {
  margin-top: 13px;
  padding:
    15px
    0
    0;

  border-top:
    1px solid
    rgba(103, 112, 96, 0.17);

  color: #3d433b;

  font-size:
    clamp(18px, 1.8vw, 25px);

  font-weight: 600;
}


/* =========================================================
   BOUTON DE COMMANDE
========================================================= */

.buttonPanier {
  width: calc(
    100% -
    clamp(56px, 8vw, 110px)
  );

  min-height:
    clamp(52px, 5vw, 66px);

  flex-shrink: 0;

  margin:
    clamp(18px, 2vw, 27px)
    auto
    0;

  padding:
    14px
    20px;

  border:
    1px solid
    #74806a;

  border-radius: 3px;

  background: #74806a;
  color: white;

  font-family:
    "Montserrat",
    Arial,
    sans-serif;

  font-size:
    clamp(9px, 0.9vw, 13px);

  font-weight: 500;

  letter-spacing: 0.12em;

  cursor: pointer;

  transition:
    background 0.25s ease,
    transform 0.25s ease;
}

.buttonPanier:hover {
  background: #626f59;
  transform: translateY(-2px);
}


/* ---------------------------------------------------------
   CONTINUER LES ACHATS
--------------------------------------------------------- */

.demo3__continueShopping {
  display: none;

  align-items: center;
  justify-content: center;

  gap: 10px;

  flex-shrink: 0;

  margin:
    15px
    auto
    clamp(18px, 2vw, 28px);

  padding: 7px 12px;

  border: none;

  background: transparent;
  color: #687461;

  font-family:
    "Montserrat",
    Arial,
    sans-serif;

  font-size:
    clamp(8px, 0.75vw, 11px);

  font-weight: 500;

  letter-spacing: 0.12em;

  cursor: pointer;
}

.panier__demo3.has-products .demo3__continueShopping {
  display: flex;
}

.demo3__continueShopping span {
  font-size: 18px;
} 
    
.gridProducts__demo3 {
    width: min(100%, 1500px);

    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));

    gap: clamp(20px, 2vw, 35px);

    margin: 0 auto;
    padding: clamp(20px, 4vw, 40px) clamp(40px, 6vw, 80px);
}
    
.product__item {
    width: 100%;
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




/* =========================================================
NOUVELLE IDENTITÉ VISUELLE — MAISON VERT
========================================================= */

.demo3__site,
.demo3__site * {
  box-sizing: border-box;
  }
  
  .body__demo3 {
    color: #30352d;
    background: #f8f6f1;
    }
    
    .wrapper__demo3 {
      width: 100%;
      display: block;
      background: #f8f6f1;
      }
      
      .demo3__home {
        width: 100%;
        overflow: hidden;
        background: #f8f6f1;
        }
        
        .demo3__home h1,
        .demo3__home h2,
        .demo3__home h3 {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-weight: 500;
          }
          
          .demo3__home p,
          .demo3__home span,
          .demo3__home button,
          .demo3__home a {
            font-family: "Montserrat", Arial, sans-serif;
            }
            
            .demo3__cartConfirmation {
              width: 100%;
              
              display: flex;
              flex: 1;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              
              gap: 17px;
              
              padding: 40px 20px;
              
              text-align: center;
              }
              
              .demo3__cartConfirmation h3 {
                margin: 0;
                
                color: #555d51;
                
                font-family:
                "Cormorant Garamond",
                Georgia,
                serif;
                
                font-size:
                clamp(20px, 2.3vw, 34px);
                
                font-weight: 500;
                
                letter-spacing: 0.1em;
                }
                
                .demo3__cartConfirmation > span {
                  width: 45px;
                  height: 1px;
                  
                  background:
                  rgba(112, 122, 102, 0.3);
                  }
                  
                  .demo3__cartConfirmation p {
                    max-width: 430px;
                    
                    margin: 0;
                    
                    color: #7b8178;
                    
                    font-family:
                    "Montserrat",
                    Arial,
                    sans-serif;
                    
                    font-size:
                    clamp(10px, 0.9vw, 13px);
                    
                    line-height: 1.7;
                    }
                    
                    .demo3__cartConfirmation strong {
                      color: #596153;
                      }
                      
                      
                      /* =========================================================
                      HEADER
                      ========================================================= */
                      
                      .header__demo3 {
                        position: relative;
                        z-index: 50;
                        
                        width: 100%;
                        
                        background: rgba(248, 246, 241, 0.96);
                        }
                        
                        .header__nav__demo3 {
  width: 100%;
  height: clamp(58px, 6vw, 82px);
  
  display: grid;
  grid-template-columns: minmax(150px, 1fr) auto minmax(150px, 1fr);
  align-items: center;
  
  gap: clamp(15px, 3vw, 45px);
  
  margin: 0;
  padding: 0 clamp(22px, 5vw, 75px);
  
  list-style: none;
  
  background: rgba(248, 246, 241, 0.98);
  }
  
  .demo3__brand {
    justify-self: start;
    
    display: flex;
    align-items: center;
    gap: 11px;
    
    cursor: pointer;
    }
    
    .demo3__brandIcon {
      width: 29px;
      height: 29px;
      
      display: flex;
      align-items: center;
      justify-content: center;
      }
      
      .demo3__brandIcon svg {
        width: 100%;
        height: 100%;
        
        stroke: #66715e;
        stroke-width: 1.3;
        fill: none;
        }
        
        .demo3__navigation {
          display: flex;
          align-items: center;
          justify-content: center;
          
          gap: clamp(18px, 3vw, 46px);
          }
          
          .header__nav__demo3__link {
            color: #454a41;
            
            font-family: "Montserrat", Arial, sans-serif;
            font-size: clamp(8px, 0.75vw, 11px);
            font-weight: 500;
            
            letter-spacing: 0.12em;
            
            cursor: pointer;
            
            transition: color 0.25s ease;
            }
            
            .header__nav__demo3__link:hover {
              color: #7f8c72;
              }
              
              .demo3__headerActions {
                justify-self: end;
                
                display: flex;
                align-items: center;
                
                gap: clamp(13px, 1.8vw, 22px);
                }
                
                .cart-container {
  position: relative;
  
  width: 22px;
  height: 22px;
  }
  
  .cart-icon {
    width: 100%;
    height: 100%;
    
    color: #343831;
    }
    
    .cart-badge {
      top: -8px;
      right: -9px;
      
      width: 15px;
      height: 15px;
      
      background: #78856c;
      color: white;
      
      font-size: 8px;
      }
      
      
      /* =========================================================
      HERO
      ========================================================= */
      
      .hero__demo3 {
        position: relative;
        
        width: 100%;
        height: clamp(380px, 48vw, 650px);
        
        display: flex;
        align-items: center;
        
        overflow: hidden;
        
        background: #e8e6de;
        }
        
        .demo3__hero__img {
          position: absolute;
          inset: 0;
          
          width: 100%;
          height: 100%;
          
          object-fit: cover;
          object-position: center;
          }
          
          .hero__demo3::after {
            content: "";
            
            position: absolute;
            inset: 0;
            
            background:
            linear-gradient(
              90deg,
              rgba(244, 242, 236, 0.98) 0%,
              rgba(244, 242, 236, 0.92) 28%,
              rgba(244, 242, 236, 0.28) 57%,
              rgba(244, 242, 236, 0.02) 100%
              );
              
              z-index: 2;
              
              pointer-events: none;
              }
              
              .hero__demo3__text {
                position: relative;
                z-index: 3;
                
                width: min(90%, 1400px);
                height: auto;
                
                margin: 0 auto;
                }
                
                .wrapper__demo3__text {
                  width: min(46%, 560px);
                  height: auto;
                  
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  
                  gap: clamp(16px, 1.8vw, 25px);
                  
                  padding: 0;
                  }
                  
                  .demo3__eyebrow {
                    color: #727d69;
                    
                    font-size: clamp(8px, 0.75vw, 11px);
                    font-weight: 500;
                    
                    letter-spacing: 0.3em;
                    }
                    
                    .wrapper__demo3__text h1 {
  max-width: 570px;
  
  margin: 0;
  
  color: #30352d;
  
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(43px, 5vw, 74px);
  font-weight: 500;
  
  line-height: 0.95;
  }
  
  .wrapper__demo3__text p {
    max-width: 420px;
    
    margin: 0;
    
    color: #62675f;
    
    font-size: clamp(11px, 1vw, 15px);
    line-height: 1.8;
    }
    
    .demo3__primaryButton {
      min-width: clamp(190px, 18vw, 245px);
      
      margin-top: clamp(5px, 1vw, 12px);
      padding: clamp(14px, 1.3vw, 18px) 26px;
      
      border: 1px solid #738069;
      border-radius: 2px;
      
      background: #738069;
      color: #fff;
      
      font-size: clamp(8px, 0.75vw, 11px);
      font-weight: 500;
      
      letter-spacing: 0.16em;
      
      cursor: pointer;
      
      transition:
      background 0.25s ease,
      color 0.25s ease,
      transform 0.25s ease;
      }
      
      .demo3__primaryButton:hover {
        background: #626f59;
        transform: translateY(-2px);
        }
        
        
        /* =========================================================
        AVANTAGES
        ========================================================= */
        
        .demo3__benefits {
          width: 100%;
          
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          
          padding:
          clamp(20px, 2.5vw, 35px)
          clamp(35px, 7vw, 110px);
          
          border-bottom: 1px solid rgba(110, 117, 103, 0.12);
          
          background: #f8f6f1;
          }
          
          .demo3__benefit {
            display: flex;
            align-items: center;
            justify-content: center;
            
            gap: 13px;
            
            padding: 5px clamp(10px, 2vw, 28px);
            
            border-right: 1px solid rgba(110, 117, 103, 0.16);
            }
            
            .demo3__benefit:last-child {
              border-right: none;
              }
              
              .demo3__benefitIcon {
                width: 27px;
                height: 27px;
                
                flex-shrink: 0;
                
                color: #7d8972;
                }
                
                .demo3__benefitIcon svg {
  width: 100%;
  height: 100%;
  
  fill: none;
  stroke: currentColor;
  stroke-width: 1.2;
  }
  
  .demo3__benefitText {
    display: flex;
    flex-direction: column;
    gap: 3px;
    }
    
    .demo3__benefitText strong {
      color: #4d534a;
      
      font-size: clamp(7px, 0.7vw, 10px);
      font-weight: 600;
      
      letter-spacing: 0.08em;
      }
      
      .demo3__benefitText span {
  color: #8a8f85;
  
  font-size: clamp(6px, 0.6vw, 9px);
  }
  
  
  /* =========================================================
  TITRES DES SECTIONS
  ========================================================= */
  
  .demo3__sectionHeader {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    gap: 11px;
    
    margin-bottom: clamp(28px, 4vw, 50px);
    
    text-align: center;
    }
    
    .demo3__sectionHeader h2 {
      margin: 0;
      
      color: #373c34;
      
      font-size: clamp(27px, 3vw, 43px);
      font-weight: 500;
      
      letter-spacing: 0.08em;
      }
      
      .demo3__sectionLine {
        width: 28px;
        height: 1px;
        
        background: #7d8972;
        }
        
        /* =========================================================
        BANDEAU NOUVEAUTÉS
        ========================================================= */
        
        .demo3__feature {
          width: 100%;
          
          display: grid;
          grid-template-columns: minmax(280px, 0.72fr) minmax(0, 1.28fr);
          
          min-height: clamp(350px, 38vw, 550px);
          
          background: #ebe8df;
          }
          
          .demo3__featureText {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  
  gap: clamp(14px, 1.8vw, 24px);
  
  padding:
  clamp(45px, 6vw, 90px)
  clamp(40px, 8vw, 120px);
  }
  
  .demo3__featureText span {
    color: #798373;
    
    font-size: clamp(8px, 0.7vw, 11px);
    font-weight: 500;
    
    letter-spacing: 0.25em;
    }
    
    .demo3__featureText h2 {
  max-width: 410px;
  
  margin: 0;
  
  color: #383e35;
  
  font-size: clamp(37px, 4vw, 60px);
  line-height: 0.98;
  }
  
  .demo3__featureText p {
    max-width: 350px;
    
    margin: 0;
    
    color: #73776f;
    
    font-size: clamp(10px, 0.9vw, 14px);
    line-height: 1.8;
    }
    
    .demo3__featureImage {
      min-height: 100%;
      
      overflow: hidden;
      }
      
      .demo3__featureImage img {
        width: 100%;
        height: 100%;
        
        display: block;
        
        object-fit: cover;
        }
        
        
        /* =========================================================
        PRODUITS POPULAIRES
        ========================================================= */
        
        .demo3__favorite {
          width: 100%;
          display: block;
          
          padding:
          clamp(55px, 7vw, 100px)
          clamp(35px, 7vw, 110px);
          
          background: #f7f5ef;
          }
          
          .products__list {
            width: min(100%, 1400px);
            
            display: grid;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            
            gap: clamp(18px, 2.2vw, 32px);
            
            margin: 0 auto;
            }
            
            .product__item {
  width: 100%;
  height: auto;
  min-width: 0;
  
  overflow: hidden;
  
  border: 1px solid rgba(106, 113, 100, 0.08);
  border-radius: 3px;
  
  background: #f4f1eb;
  
  cursor: pointer;
  
  transition:
  transform 0.3s ease,
  box-shadow 0.3s ease;
  }
  
  .product__item__text {
    width: 100%;
    
    display: flex;
    flex-direction: column; /* à ajouter */
    align-items: flex-start;
    justify-content: center;
    
    gap: 8px;
    padding: clamp(15px, 1.5vw, 22px);
    
    text-align: left;
    }
    
    .product__item:hover {
      transform: translateY(-4px);
      
      box-shadow:
      0 18px 42px
      rgba(71, 73, 65, 0.07);
      }
      
      .product__item__img {
        width: 100%;
        height: clamp(170px, 18vw, 275px);
        
        border-radius: 0;
        
        background-color: #ebe7de;
        background-position: center !important;
        background-size: cover !important;
        background-repeat: no-repeat !important;
        }
        
        .product__item__text h3,
        .product__item__text h4 {
          margin: 0;
          }
          
          .product__item__text h3 {
  color: #4b5148;
  
  font-size: clamp(9px, 0.8vw, 12px);
  font-weight: 400;
  }
  
  .product__item__text h4 {
    color: #30352d;
    
    font-size: clamp(9px, 0.78vw, 12px);
    font-weight: 500;
    }
    
    .demo3__rating {
  color: #a58d5c;
  
  font-size: 10px;
  letter-spacing: 2px;
  }
  
  .demo3__allProducts {
    display: block;
    
    width: fit-content;
    
    margin:
    clamp(30px, 4vw, 52px)
    auto
    0;
    }
    
    /* =========================================================
    PAGE PRODUIT
    ========================================================= */
    
    .demo3__productPage {
      width: 100%;
      min-height: 100vh;
      
      padding:
      clamp(30px, 4vw, 65px)
      clamp(25px, 5vw, 85px)
      clamp(60px, 8vw, 110px);
      
      background: #fbfaf7;
      color: #34382f;
      }
      
      
      /* =========================================================
      PREMIÈRE LIGNE : GALERIE + INFORMATIONS
      ========================================================= */
      
      .demo3__productTop {
        width: min(100%, 1500px);
        min-height: clamp(460px, 30vw, 500px);
        
        display: grid;
        grid-template-columns:
        minmax(0, 1.05fr)
        minmax(380px, 0.95fr);
        
        align-items: stretch;
        
        gap: clamp(35px, 5vw, 80px);
        
        margin: 0 auto;
        }
        
        
        /* =========================================================
        GALERIE
        ========================================================= */
        
        .demo3__productGallery {
          width: 100%;
          height: 100%;
          min-width: 0;
          min-height: 0;
          
          display: grid;
          grid-template-columns:
          clamp(55px, 5vw, 78px)
          minmax(0, 1fr);
          
          gap: clamp(10px, 1.2vw, 18px);
          }
          
          .demo3__productThumbnails {
  width: 100%;
  height: 100%;
  min-height: 0;
  
  display: grid;
  grid-template-rows: repeat(4, minmax(0, 1fr));
  
  gap: clamp(8px, 1vw, 13px);
  }
  
  .demo3__productThumbnail {
    width: 100%;
    height: 100%;
    min-height: 0;
    
    padding: 0;
    
    border: 1px solid rgba(92, 100, 84, 0.16);
    border-radius: 2px;
    
    background-color: #e8e5dc;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    
    cursor: pointer;
    
    transition:
    border-color 0.25s ease,
    opacity 0.25s ease;
    }
    
    .demo3__productThumbnail:hover {
      border-color: rgba(114, 125, 102, 0.65);
      }
      
      .demo3__productThumbnail.is-active {
  border-color: #727d66;
  }
  
  .demo3__productVisual {
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    
    overflow: hidden;
    
    border-radius: 2px;
    
    background-color: #e8e5dc;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    }
    
    
    /* =========================================================
    INFORMATIONS PRODUIT
    ========================================================= */
    
    .demo3__productInformation {
      width: 100%;
      height: 100%;
      min-width: 0;
      min-height: 0;
      
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      }
      
      .demo3__breadcrumb {
        margin: 0 0 clamp(25px, 3vw, 45px);
        
        color: #858a80;
        
        font-family: "Montserrat", Arial, sans-serif;
        font-size: clamp(8px, 0.75vw, 11px);
        font-weight: 400;
        
        letter-spacing: 0.04em;
        }
        
        .demo3__productTitle {
  margin: 0;
  
  color: #34382f;
  
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(36px, 4vw, 59px);
  font-weight: 500;
  
  line-height: 1;
  text-transform: uppercase;
  }
  
  .demo3__productPrice {
    margin:
    clamp(16px, 2vw, 27px)
    0
    0;
    
    color: #34382f;
    
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: clamp(26px, 2.3vw, 36px);
    font-weight: 500;
    }
    
    .demo3__productDescription {
      width: 100%;
      
      margin-top: clamp(30px, 4vw, 55px);
      padding-bottom: clamp(25px, 3vw, 38px);
      
      border-bottom: 1px solid rgba(96, 103, 90, 0.17);
      }
      
      .demo3__productDescription p {
  max-width: 620px;
  
  margin: 0;
  
  color: #62675f;
  
  font-family: "Montserrat", Arial, sans-serif;
  font-size: clamp(11px, 0.95vw, 14px);
  
  line-height: 1.8;
  }
  
  
  /* =========================================================
  QUANTITÉ + AJOUT AU PANIER
  ========================================================= */
  
  .demo3__productActions {
    width: 100%;
    
    display: grid;
    grid-template-columns:
    clamp(130px, 12vw, 175px)
    minmax(210px, 1fr)
    55px;
    
    align-items: stretch;
    
    gap: 15px;
    
    /*
    * Le bloc est poussé au bas de la colonne droite.
    * Le bas du bouton correspond donc au bas de la galerie.
    */
   margin-top: auto;
  padding-top: clamp(25px, 3vw, 42px);
  }
  
  .demo3__quantity {
    min-height: 58px;
    
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    
    border: 1px solid rgba(83, 90, 77, 0.28);
    }
    
    .demo3__quantity button,
    .demo3__quantity span {
      display: flex;
      align-items: center;
      justify-content: center;
      }
      
      .demo3__quantity button {
  padding: 0;
  
  border: none;
  
  background: transparent;
  color: #4b5147;
  
  font-size: 22px;
  
  cursor: pointer;
  }
  
  .demo3__quantity span {
    color: #34382f;
    
    font-family: "Montserrat", Arial, sans-serif;
    font-size: 13px;
    }
    
    .btnaddProduct {
      min-height: 58px;
      
      padding: 15px 25px;
      
      border: 1px solid #727d66;
      border-radius: 0;
      
      background: #727d66;
      color: white;
      
      font-family: "Montserrat", Arial, sans-serif;
      font-size: clamp(9px, 0.75vw, 12px);
      font-weight: 500;
      
      letter-spacing: 0.12em;
      
      cursor: pointer;
      
      transition:
      background 0.25s ease,
      transform 0.25s ease;
      }
      
      .btnaddProduct:hover {
        background: #606b56;
        transform: translateY(-2px);
        }
        
        .btnaddProduct:disabled {
  opacity: 0.75;
  cursor: default;
}

.demo3__favoriteProduct {
  min-height: 58px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  padding: 0;
  
  border: none;
  
  background: transparent;
  color: #4f554c;
  
  cursor: pointer;
  }
  
  .demo3__favoriteProduct svg {
    width: 29px;
    height: 29px;
    
    fill: none;
    stroke: currentColor;
    stroke-width: 1.25;
    }
    
    
    /* =========================================================
    DEUXIÈME LIGNE
    ========================================================= */
    
    .demo3__productBottom {
  width: min(100%, 1500px);
  
  display: grid;
  grid-template-columns:
  minmax(0, 1.05fr)
  minmax(380px, 0.95fr);
  
  align-items: stretch;
  
  gap: clamp(35px, 5vw, 80px);
  
  margin:
  clamp(35px, 4vw, 60px)
  auto
  0;
  }
  
  
  /* =========================================================
  VOUS AIMEREZ AUSSI
  ========================================================= */
  
  .demo3__related {
    width: 100%;
    min-width: 0;
    }
    
    .demo3__relatedTitle {
  margin:
  0
  0
  clamp(18px, 2vw, 28px);
  
  color: #34382f;
  
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(25px, 2.2vw, 35px);
  font-weight: 500;
  }
  
  .demo3__relatedList {
    width: 100%;
    
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    
    gap: clamp(10px, 1.3vw, 20px);
    }
    
    .demo3__relatedCard {
      width: 100%;
      min-width: 0;
      
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      
      padding: 0;
      
      border: none;
      
      background: transparent;
      
      text-align: left;
      
      cursor: pointer;
      }
      
      .demo3__relatedImage {
        width: 100%;
        aspect-ratio: 1;
        
        background-color: #e6e3da;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        }
        
        .demo3__relatedCard h3 {
  margin: 13px 0 5px;
  
  color: #4d5349;
  
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(14px, 1.2vw, 19px);
  font-weight: 500;
  
  line-height: 1.15;
  }
  
  .demo3__relatedCard p {
  margin: 0;
  
  color: #353a32;
  
  font-family: "Montserrat", Arial, sans-serif;
  font-size: clamp(8px, 0.7vw, 11px);
  }
  
  
  /* =========================================================
  LIVRAISON / RETOURS / PAIEMENT
  ========================================================= */
  
  .demo3__productReassurance {
    width: 100%;
    
    /*
    * Cette marge correspond à la hauteur du titre
    * « Vous aimerez aussi » et à son espace inférieur.
    * Les garanties commencent donc face aux photos.
    */
   margin-top: clamp(48px, 5vw, 63px);

   display: grid;
   grid-template-columns: repeat(3, minmax(0, 1fr));
   
   align-self: stretch;
   align-items: stretch;
   
   padding: 0;
   
   
   }
   
   .demo3__productReassuranceItem {
    min-width: 0;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    gap: 10px;
    
    padding: clamp(12px, 1.5vw, 22px);
    
    border-right: 1px solid rgba(96, 103, 90, 0.14);
    
    text-align: center;
    }
    
    .demo3__productReassuranceItem:last-child {
      border-right: none;
      }
      
      .demo3__productReassuranceItem svg {
  width: clamp(23px, 2vw, 29px);
  height: clamp(23px, 2vw, 29px);

  flex-shrink: 0;
  
  fill: none;
  stroke: #707a66;
  stroke-width: 1.2;
  }
  
  .demo3__productReassuranceItem div {
    min-width: 0;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    
    gap: 4px;
    }
    
    .demo3__productReassuranceItem strong {
  color: #4f554c;
  
  font-family: "Montserrat", Arial, sans-serif;
  font-size: clamp(7px, 0.65vw, 10px);
  font-weight: 500;
  
  white-space: nowrap;
  }
  
  .demo3__productReassuranceItem span {
  color: #8b8f87;
  
  font-family: "Montserrat", Arial, sans-serif;
  font-size: clamp(6px, 0.55vw, 9px);
  
  white-space: nowrap;
  }
  
  /* =========================================================
  RESPONSIVE PAGE PRODUIT
  ========================================================= */
  
  /* ---------------------------------------------------------
  TABLETTE
  --------------------------------------------------------- */
  
  @media screen and (max-width: 1050px) {
    
  .demo3__productPage {
    padding:
      35px
      30px
      75px;
      }
      
      /* La première ligne passe sur une seule colonne */
      
      .demo3__productTop {
    grid-template-columns: 1fr;
    
    min-height: 0;
    
    gap: 40px;
    }
    
    /* La galerie possède sa propre hauteur sur tablette */
    
    .demo3__productGallery {
    height: clamp(360px, 52vw, 520px);
    }

    /* La colonne d’informations ne dépend plus de la galerie */
    
    .demo3__productInformation {
    height: auto;
    }

    /* Les actions restent sous la description */
    
    .demo3__productActions {
    margin-top: 0;
    
    padding-top: 30px;
    }
    
    /* La deuxième ligne passe également sur une colonne */
    
    .demo3__productBottom {
    grid-template-columns: 1fr;
    
    gap: 45px;
    
    margin-top: 50px;
    }
    
    /* Les garanties restent horizontales */
    
    .demo3__productReassurance {
    width: 100%;
    height: auto;

    margin-top: 0;
    
    min-height: 180px;
    }
    }
    
    @media (max-width: 800px){

    .demo3__productGallery{
      
      grid-template-columns:
      clamp(90px, 24vw, 125px)
      minmax(0, 1fr);
      
      height:380px;
      }
      
      }
      
      /* ---------------------------------------------------------
      PETITE TABLETTE / GRAND TÉLÉPHONE
      --------------------------------------------------------- */
      
      @media screen and (max-width: 700px) {

      .demo3__productGallery {
        width: 100%;
        height: 340px;
        
        display: grid;
        
        /* Miniatures plus larges, grande image légèrement réduite */
        grid-template-columns:
        clamp(60px, 12vw, 125px)
        minmax(0, 1fr);
        
        gap: 12px;
        }
        
        .demo3__productThumbnails {
    width: 100%;
    height: 340px;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, minmax(0, 1fr));
    
    gap: 8px;
    }
    
    .demo3__productThumbnail {
    width: 100%;
    height: 100%;

    min-width: 0;
    min-height: 0;
    
    /* Supprime le carré imposé */
    aspect-ratio: auto;
    }
    
    .demo3__productVisual {
    width: 100%;
    height: 340px;

    min-width: 0;
    min-height: 0;
    }
    }
    
    
    /* ---------------------------------------------------------
    PETIT TÉLÉPHONE
    --------------------------------------------------------- */
    
    @media screen and (max-width: 430px) {

    .demo3__productPage {
      padding:
      20px
      14px
      50px;
      }
      
      .demo3__productVisual {
    height: 320px;
    }

    .demo3__productThumbnails {
    gap: 7px;
    }

    .demo3__productActions {
    grid-template-columns: 1fr;
    }

    .demo3__quantity {
    min-height: 54px;
    }

    .btnaddProduct {
    min-height: 54px;
  }
  
  .demo3__favoriteProduct {
    grid-column: auto;
  }
  
  .demo3__relatedTitle {
    font-size: 30px;
  }
  
  .demo3__relatedList {
    gap: 14px;
    }
    
    .demo3__relatedCard h3 {
    font-size: 16px;
    }
}


/* =========================================================
FOOTER SIMPLE DE L’ACCUEIL
========================================================= */

.demo3__homeFooter {
  width: 100%;
  
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  
  padding:
  clamp(20px, 2.5vw, 34px)
  clamp(35px, 7vw, 110px);
  
  background: #f8f6f1;
  }
  
  .demo3__footerValue {
    display: flex;
    align-items: center;
    justify-content: center;
    
    gap: 12px;
    
    color: #767d72;
    }
    
    .demo3__footerValue strong {
  display: block;
  
  color: #51574d;
  
  font-size: clamp(7px, 0.65vw, 9px);
  font-weight: 600;
  
  letter-spacing: 0.08em;
  }
  
  .demo3__footerValue span {
  font-size: clamp(6px, 0.58vw, 8px);
  }

  
  /* =========================================================
  RESPONSIVE
  ========================================================= */
  
  @media screen and (max-width: 1050px) {

    /* =========================
       HEADER
    ========================= */

    .header__nav__demo3{
        grid-template-columns: 1fr auto;
        padding: 0 22px;
    }

    .demo3__navigation{
        display: none;
    }

    .demo3__burgerButton{
        display: flex;
    }

    .demo3__headerActions{
        display: flex;
        align-items: center;
        gap: 18px;
        justify-self: end;
    }

    .demo3__mobileMenu{
        display: flex;
    }

    /* =========================
       HERO
    ========================= */

    .hero__demo3{
        height: 560px;
    }

    .hero__demo3::after{
        background: linear-gradient(
            180deg,
            rgba(248,246,241,.92) 0%,
            rgba(248,246,241,.82) 45%,
            rgba(248,246,241,.18) 100%
        );
    }

    .hero__demo3__text{
        width:100%;
        padding:0 45px;
    }

    .wrapper__demo3__text{
        width:100%;
        max-width:550px;
    }

    /* =========================
       BENEFICES
    ========================= */

    .demo3__benefits{
        grid-template-columns:repeat(2,1fr);
    }

    /* =========================
       FEATURE
    ========================= */

    .demo3__feature{
        grid-template-columns:1fr;
    }

    .demo3__featureImage{
        min-height:350px;
    }

    /* =========================
       LISTE PRODUITS
    ========================= */

    .gridProducts__demo3{
        grid-template-columns:repeat(3,minmax(0,1fr));
        gap:22px;
        padding:30px;
    }

    .product__item__img{
        height:220px;
    }

    /* =========================
       PAGE PRODUIT
    ========================= */

    .demo3__productTop{
        grid-template-columns:1fr;
    }

    .demo3__productBottom{
        grid-template-columns:1fr;
    }

    .demo3__relatedList{
        grid-template-columns:repeat(2,1fr);
    }

    /* =========================
       PANIER
    ========================= */

    .productPanier__demo3{
        gap:18px;
    }

    .productPanier__demo3__img{
        width:100px;
        height:100px;
    }

    .demo3__cartQuantity{
        width:110px;
        height:40px;
    }

    .demo3__cartQuantity button{
        font-size:18px;
    }

    .demo3__cartLinePrice{
        font-size:28px;
    }

    .heroCategory{

    height:300px;
}

.heroCategory__overlay{

    width:70%;
}

.heroCategory h1{

    font-size:42px;
}
}
    
    @media (max-width: 700px) {
      .panier__demo3 {
        width: min(80%, 300px);
        height: clamp(400px, 55vw, 500px);
      }
    
      .panier__demo3.has-products
      .contentProductsPanier__demo3 {
        padding: 0 14px;
      }
    
      .productPanier__demo3 {
        gap: 14px;
        padding: 14px;
      }
    
      .productPanier__demo3__img {
        width: 75px;
        height: 75px;
      }
    
      .demo3__cartProductActions {
        gap: 10px;
        padding-top: 10px;
      }
    
      .demo3__cartQuantity {
        width: 90px;
        height: 38px;
      }
    
      .demo3__cartQuantity button {
        width: auto;
        height: 100%;
    
        font-size: 16px;
      }
    
      .demo3__cartLinePrice {
        margin: 0;
    
        font-size: 21px;
      }
    
      .gridProducts__demo3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 18px;

    padding:
      25px
      20px;
  }

  .product__item__img {
    height: clamp(140px, 38vw, 210px);
  }

  .heroCategory{

    height:240px;
}

.heroCategory__overlay{

    width:100%;

    padding: 35px;
}

.heroCategory h1{

    font-size:34px;
}

.heroCategory p{

    font-size:13px;
}
  }

  @media screen and (max-width: 560px) {
  
    .hero__demo3 {
      height: 520px;
    }
  
    .demo3__hero__img {
      object-position: 65% center;
    }
  
    .wrapper__demo3__text {
      width: 100%;
  
      padding-right: 35px;
    }
  
    .wrapper__demo3__text h1 {
      font-size: clamp(42px, 13vw, 58px);
    }
  
    .demo3__benefits {
      grid-template-columns: 1fr;
    }
  
    .demo3__benefit {
      justify-content: flex-start;
  
      border-right: none;
    }
  
    .products__list {
      grid-template-columns: 1fr;
    }
  
    .demo3__featureText {
      padding:
        50px
        27px;
    }
  
    .demo3__homeFooter {
      grid-template-columns: 1fr;
  
      padding:
        28px
        25px;
    }

    .heroCategory h1{

    font-size:25px;
}
  }
    
    @media screen and (max-width: 480px) {
      .demo3__emptyCartGuarantees {
        grid-template-columns: 1fr;
    
        margin-top: 35px;
      }
    
      .demo3__emptyCartGuarantee {
        flex-direction: row;
        justify-content: flex-start;
    
        padding:
          17px
          30px;
    
        border-right: none;
        border-bottom:
          1px solid
          rgba(101, 110, 94, 0.13);
    
        text-align: left;
      }
    
      .demo3__emptyCartGuarantee:last-child {
        border-bottom: none;
      }
    
      .demo3__emptyCartGuarantee svg {
        flex-shrink: 0;
    
        margin:
          0
          10px
          0
          0;
      }
    
      .gridProducts__demo3 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
  
    }
    


`;

document.head.appendChild(style);

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
