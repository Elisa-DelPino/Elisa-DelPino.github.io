// INJECT FONT

if (!document.getElementById("demo2Font")) {
  const font = document.createElement("link");
  font.id = "demo2Font";
  font.rel = "stylesheet";
  font.href =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&display=swap";
  ("https://fonts.googleapis.com/css2?family=Marcellus&display=swap");

  document.head.appendChild(font);
}

// INJECT CSS

const style = document.createElement("style");

style.innerHTML = `

.demo2__site,
.demo2__site * {
  font-family: "Cormorant Garamond", serif;
}

.header__demo2 {
  position: sticky;
  top: 0;
  z-index: 9999;
}

.header__nav__demo2 {
  width: 100%;
  height: clamp(40px, 5vw, 60px);
  display: flex;
  list-style: none;
  align-items: center;
  justify-content: center;
  gap: clamp(5px, 2vw, 20px);
  background: #ffe5ec;
}

.header__nav__demo2__logo {
  width: clamp(60px, 8vw, 150px);    
  height: clamp(60px, 8vw, 150px);
  background: #ffe5ec;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 50%;
  transform: translateY(20%);
  z-index: 999;
}

.header__nav__demo2__logo img {
  width: 80%;
  height: 80%;
  object-fit: cover;
}

.header__nav__demo2__link {
  font-size: clamp(13px, 1.7vw, 23px);
  cursor: pointer;
  color: black;

  font-family: "Marcellus", serif;
letter-spacing: 1px;
font-weight: 600;
}

/* =====================================================
   HERO PÂTISSERIE
===================================================== */

.demo2__content {
  position: relative;

  width: 100%;
  height: clamp(280px, 35vw, 520px);

  display: flex;
  align-items: center;
  justify-content: center;

  background: #fff;

  overflow: hidden;
}

.demo2__content__img {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;
  object-position: center bottom;
}

/* Texte superposé au centre */

.demo2__heroText {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  z-index: 2;

  width: min(50%, 650px);

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: clamp(10px, 1.5vw, 20px);

  padding-top: clamp(35px, 6.5vw, 120px);

  text-align: center;
}

.demo2__heroSubtitle {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: clamp(15px, 2.5vw, 35px);

  color: #c7936e;

  font-family: Arial, sans-serif;
  font-size: clamp(8px, 0.85vw, 13px);
  font-weight: 500;

  letter-spacing: clamp(2px, 0.4vw, 5px);
}

.demo2__heroSubtitle::before,
.demo2__heroSubtitle::after {
  content: "";

  flex: 1;

  max-width: 150px;
  height: 1px;

  background: rgba(199, 147, 110, 0.7);
}

.demo2__heroTitle {
  max-width: 800px;

  margin: 0;

  color: #3c2c28;

  font-size: clamp(25px, 3vw, 50px);
  font-weight: 400;

  line-height: 0.98;

  text-align: center;
}


/* =====================================================
   TITRE SOUS LE HERO
===================================================== */

.demo2__text {
  width: 100%;
  min-height: clamp(180px, 20vw, 290px);

  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: clamp(13px, 1.8vw, 24px);

  padding:
    clamp(15px, 2vw, 20px)
    clamp(20px, 8vw, 130px);

  background: #fff;

  text-align: center;
  box-sizing: border-box;
}

.demo2__text__subtitle {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: min(100%, 620px);

  gap: clamp(15px, 3vw, 42px);

  color: #c7936e;

  font-family: Arial, sans-serif;
  font-size: clamp(8px, 0.9vw, 13px);
  font-weight: 500;

  letter-spacing: clamp(2px, 0.4vw, 5px);
}

.demo2__text__subtitle::before,
.demo2__text__subtitle::after {
  content: "";

  flex: 1;

  max-width: 170px;
  height: 1px;

  background: rgba(199, 147, 110, 0.65);
}

.demo2__text__title {
  max-width: 850px;

  margin: 0;

  color: #3c2c28;

  font-size: clamp(31px, 4.2vw, 67px);
  font-weight: 400;

  line-height: 0.98;

  text-align: center;
}


/* =====================================================
   BANDEAU ROSE : TEXTE + BOUTON
===================================================== */

.demo2__intro {
  position: relative;

  width: 100%;
  min-height: clamp(260px, 23vw, 360px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: clamp(30px, 3vw, 45px);

  padding:
    clamp(50px,5vw,70px)
    clamp(30px,8vw,140px);

  overflow: hidden;

  background:
      #ffe5ec
      url("./img/macarons.png")
      center
      center
      /cover
      no-repeat;

  text-align:center;
}

.demo2__intro__paragraph{

    width:min(850px,100%);
    padding:0 clamp(5px, 18vw, 100px);

    color:black;

    font-size:clamp(16px,1.45vw,22px);

    line-height:1.8;

    margin:0;

    font-weight:300;

    z-index:2;
}

.demo2__intro__separator{

    display:flex;
    align-items:center;
    gap:20px;

    z-index:2;
}

.demo2__intro__separator::before,
.demo2__intro__separator::after{

    content:"";

    width:90px;
    height:1px;

    background:#d8aab7;
}

.demo2__intro__separator span{

    width:7px;
    height:7px;

    background:#d8aab7;

    border-radius:50%;
}

.demo2__intro__button{

    padding:18px 55px;

    border:none;

    background:white;

    color:black;

    cursor:pointer;

    letter-spacing:4px;

    font-size:13px;

    transition:.35s;

    box-shadow:
        0 15px 30px rgba(207,135,159,.18);

    z-index:2;
}

.demo2__intro__button:hover{

    transform:translateY(-4px);

    background:#bc6f89;
    color: white;

    box-shadow:
        0 20px 35px rgba(207,135,159,.28);
}

/* ---------------- CAROUSSEL ---------------- */

.demo2__caroussel {
  width: 100%;      
  height: clamp(120px, 20vw, 300px);
  overflow: hidden;
  padding: 2px;
}

.demo2__caroussel__track {
  width: 300%;
  height: 100%;
  display: flex;
  animation: demo2Carousel 18s linear infinite;
}

.demo2__caroussel__item {
  flex: 0 0 calc(100% / 12);
  height: 100%;
  background: white;
  padding: 1px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo2__caroussel__item img {
  width: 80%;
  height: 80%;
  object-fit: cover;
}

@keyframes demo2Carousel {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}
  
.demo2__favorite {
  width: 100%;
  background: #ffe5ec;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.demo2__favorite__text {
  width: 100%;  
  height: clamp(50px, 8vw, 100px);
  background: #ffe5ec;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
} 
  
.demo2__favorite__img {
  width: 100%;  
  height: clamp(80px, 15vw, 200px); 
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(5px, 2vw, 20px);
}

.demo2__favorite__img img {
  width: clamp(60px, 12vw, 150px);
  height: clamp(60px, 12vw, 150px);
  object-fit: cover;
}

/* ---------------- GALERIE ---------------- */

.demo2__galerie {
  width: 100%;
  padding: clamp(20px, 10vw, 80px) clamp(20px, 8vw, 50px);
}

.demo2__galerie__item {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(5px, 2vw, 20px);
}

.demo2__imgWrapper {
  width: clamp(100px, 15vw, 180px);
  height: clamp(100px, 15vw, 180px);
  overflow: hidden;
}

.demo2__imgWrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.demo2__imgWrapper:hover img {
  transform: scale(1.15);
}

@media screen and (max-width: 650px) {

  .demo2__content {
    height: clamp(170px, 53vw, 300px);
  }

  .demo2__content__img {
    object-position: center;
  }

  .demo2__text {
    min-height: 190px;

    padding:
      35px
      20px;

    gap: 17px;
  }

  .demo2__text__subtitle {
    width: 100%;

    gap: 12px;

    font-size: 9px;
    letter-spacing: 2.5px;
  }

  .demo2__text__subtitle::before,
  .demo2__text__subtitle::after {
    max-width: 55px;
  }

  .demo2__text__title {
    font-size: clamp(32px, 10vw, 48px);
    line-height: 0.98;
  }

  .demo2__intro {
    min-height: 230px;

    padding:
      38px
      25px;

    gap: 27px;
  }

  .demo2__intro__paragraph {
    font-size: clamp(14px, 4vw, 17px);
    line-height: 1.55;
  }

  .demo2__intro__button {
    width: min(100%, 310px);
    min-width: 0;

    padding:
      14px
      20px;
  }

.demo2__intro {
  background: #ffe5ec;
}
  

.demo2__intro__paragraph{
  padding:0 clamp(10px, 5vw, 20px);
}
}    

`;

document.head.appendChild(style);

export function addDemoWeb2(element) {
  if (!element) return;

  createHomeHTML(element);

  element.style.background = "white";
}

function createHomeHTML(element) {
  element.innerHTML = ` 
  <div class="demo2__site">

    <nav class="header__demo2">
      <ul class="header__nav__demo2">
        <li class="header__nav__demo2__link">
          <span data-page="home">ACCUEIL</span>
        </li>

        <div class="header__nav__demo2__logo">
          <img src="./img/logoPatisserie.png" alt="Logo">
        </div>

        <li class="header__nav__demo2__link">
          <span data-page="prestation">GALERIE</span>
        </li>
      </ul>
    </nav>

    <div class="wrapper__demo2"> 

   <div class="demo2__content">

  <img
    class="demo2__content__img"
    src="./img/heroPatisserie.png"
    alt="Créations de pâtisserie et pièces montées"
  >

  <div class="demo2__heroText">

    <span class="demo2__heroSubtitle">
      L’ART DU GOÛT
    </span>

    <h1 class="demo2__heroTitle">
      L’Élégance au Service<br>
      de la Gourmandise
    </h1>

  </div>

</div>

<div class="demo2__intro">

    <p class="demo2__intro__paragraph">
        Notre savoir-faire artisanal donne naissance à des créations raffinées
        conçues pour sublimer vos réceptions. <br> Nos pièces montées majestueuses,
        assortiments de mignardises et desserts d'exception s'accordent à vos envies.
    </p>

    <div class="demo2__intro__separator">
        <span></span>
    </div>

    <button
        type="button"
        class="demo2__intro__button">
        DÉCOUVRIR NOS CRÉATIONS
    </button>

</div>

      <div class="demo2__caroussel"> 
        <div class="demo2__caroussel__track">

          <div class="demo2__caroussel__item"><img src="./img/gateaux1.png" alt=""></div>
          <div class="demo2__caroussel__item"><img src="./img/gateaux2.png" alt=""></div>
          <div class="demo2__caroussel__item"><img src="./img/gateaux14.png" alt=""></div>
          <div class="demo2__caroussel__item"><img src="./img/gateaux4.png" alt=""></div>
          <div class="demo2__caroussel__item"><img src="./img/gateaux5.png" alt=""></div>
          <div class="demo2__caroussel__item"><img src="./img/gateaux6.png" alt=""></div>

          <div class="demo2__caroussel__item"><img src="./img/gateaux1.png" alt=""></div>
          <div class="demo2__caroussel__item"><img src="./img/gateaux2.png" alt=""></div>
          <div class="demo2__caroussel__item"><img src="./img/gateaux14.png" alt=""></div>
          <div class="demo2__caroussel__item"><img src="./img/gateaux4.png" alt=""></div>
          <div class="demo2__caroussel__item"><img src="./img/gateaux5.png" alt=""></div>
          <div class="demo2__caroussel__item"><img src="./img/gateaux6.png" alt=""></div>

        </div>
      </div>
    </div>

  </div>
  `;

  const buttonMenu = element.querySelectorAll(".header__nav__demo2__link span");

  buttonMenu.forEach((button) => {
    const page = button.dataset.page;

    button.addEventListener("click", () => {
      if (page === "home") {
        createHomeHTML(element);
      } else {
        createGalerieHTML(element);
      }
    });
  });

  const galleryButton = element.querySelector(".demo2__intro__button");

  galleryButton?.addEventListener("click", () => {
    createGalerieHTML(element);
  });
}

function createGalerieHTML(element) {
  const wrapper = element.querySelector(".wrapper__demo2");

  wrapper.innerHTML = `
    <div class="demo2__galerie">
      <div class="demo2__galerie__item">

        <div class="demo2__imgWrapper"><img src="./img/gateaux1.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/gateaux2.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/gateaux4.png" alt="Logo"></div>

        <div class="demo2__imgWrapper"><img src="./img/gateaux5.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/gateaux6.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/gateaux8.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/gateaux7.png" alt="Logo"></div>

        <div class="demo2__imgWrapper"><img src="./img/gateaux9.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/gateaux10.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/gateaux11.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/gateaux12.png" alt="Logo"></div>

        <div class="demo2__imgWrapper"><img src="./img/gateaux13.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/gateaux14.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/gateaux15.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/gateaux16.png" alt="Logo"></div>

      </div>
    </div>
  `;
}
