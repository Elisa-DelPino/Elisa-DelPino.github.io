// INJECT FONT

if (!document.getElementById("demo2Font")) {
  const font = document.createElement("link");
  font.id = "demo2Font";
  font.rel = "stylesheet";
  font.href =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&display=swap";

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
  width: clamp(60px, 6vw, 100px);    
  height: clamp(60px, 6vw, 100px);
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
  font-weight: 500;
  cursor: pointer;
  color: black;
}

.demo2__content {
  width: 100%;  
  height: clamp(120px, 22vw, 320px);
  background: white;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.demo2__content__img {
  width: 98%;
  height: min(90%, 310px);
  object-fit: cover;
}

.demo2__text {
  width: 100%;
  min-height: clamp(200px, 20vw, 220px);
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(8px, 1.5vw, 20px);
  padding: clamp(15px, 1.8vw, 25px) clamp(20px, 5vw, 50px);
  box-sizing: border-box;
}

.demo2__text__title {
  font-size: clamp(15px, 2.2vw, 30px);
  font-weight: 500;
  text-align: center;
}

.demo2__text__paragraph {
  font-size: clamp(12px, 1.5vw, 18px);
  font-weight: 300;
  text-align: center;
  margin-top: clamp(5px, 1vw, 15px);
  line-height: 1.4;
}

/* ---------------- CAROUSSEL ---------------- */

.demo2__caroussel {
  width: 100%;      
  height: clamp(80px, 15vw, 200px);
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
          <span data-page="home">HOME</span>
        </li>

        <div class="header__nav__demo2__logo">
          <img src="./img/blackLogo.png" alt="Logo">
        </div>

        <li class="header__nav__demo2__link">
          <span data-page="prestation">GALERIE</span>
        </li>
      </ul>
    </nav>

    <div class="wrapper__demo2"> 

      <div class="demo2__content">
        <img class="demo2__content__img" src="./img/heroPatisserie.png">
      </div>

      <div class="demo2__text">
        <h1 class="demo2__text__title">L'Élégance au Service de la Gourmandise</h1>

        <p class="demo2__text__paragraph">
          Notre savoir-faire artisanal donne naissance à des créations raffinées conçues pour sublimer vos réceptions.
          Nos pièces montées majestueuses, assortiments de mignardises et desserts d'exception s'accordent à vos envies.
        </p>
      </div>

      <div class="demo2__caroussel"> 
        <div class="demo2__caroussel__track">

          <div class="demo2__caroussel__item"><img src="./img/gateaux1.png" alt=""></div>
          <div class="demo2__caroussel__item"><img src="./img/gateaux2.png" alt=""></div>
          <div class="demo2__caroussel__item"><img src="./img/gateaux3.png" alt=""></div>
          <div class="demo2__caroussel__item"><img src="./img/gateaux4.png" alt=""></div>
          <div class="demo2__caroussel__item"><img src="./img/gateaux5.png" alt=""></div>
          <div class="demo2__caroussel__item"><img src="./img/gateaux6.png" alt=""></div>

          <div class="demo2__caroussel__item"><img src="./img/gateaux1.png" alt=""></div>
          <div class="demo2__caroussel__item"><img src="./img/gateaux2.png" alt=""></div>
          <div class="demo2__caroussel__item"><img src="./img/gateaux3.png" alt=""></div>
          <div class="demo2__caroussel__item"><img src="./img/gateaux4.png" alt=""></div>
          <div class="demo2__caroussel__item"><img src="./img/gateaux5.png" alt=""></div>
          <div class="demo2__caroussel__item"><img src="./img/gateaux6.png" alt=""></div>

        </div>
      </div>

      <div class="demo2__favorite">
        <div class="demo2__favorite__text"></div>

        <div class="demo2__favorite__img">  
          <img src="./img/favPatisserie1.png" alt="Logo">
          <img src="./img/img2.png" alt="Logo">
          <img src="./img/favPatisserie2.png" alt="Logo">
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
}

function createGalerieHTML(element) {
  const wrapper = element.querySelector(".wrapper__demo2");

  wrapper.innerHTML = `
    <div class="demo2__galerie">
      <div class="demo2__galerie__item">

        <div class="demo2__imgWrapper"><img src="./img/img1.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/img2.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/img3.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/img4.png" alt="Logo"></div>

        <div class="demo2__imgWrapper"><img src="./img/img1.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/img2.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/img3.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/img4.png" alt="Logo"></div>

        <div class="demo2__imgWrapper"><img src="./img/img1.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/img2.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/img3.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/img4.png" alt="Logo"></div>

        <div class="demo2__imgWrapper"><img src="./img/img1.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/img2.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/img3.png" alt="Logo"></div>
        <div class="demo2__imgWrapper"><img src="./img/img4.png" alt="Logo"></div>

      </div>
    </div>
  `;
}
