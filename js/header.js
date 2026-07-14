import { autoWriteText } from "./animationHome.js";
import { autoDeleteText } from "./animationHome.js";

export function loadHeaderScriptDirect() {
  const existingHeader = document.querySelector(".header");
  if (existingHeader) return;

  if (!document.getElementById("headerStyle")) {
    const style = document.createElement("style");
    style.id = "headerStyle";

    style.innerHTML = `
      .header {
          background-color: black;
          width: 100%;
          height: 15vh;
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0px clamp(25px, 6vw, 35px);
          box-shadow: rgba(185, 185, 194, 0.35) 0px 13px 27px -5px, rgba(218, 203, 221, 0.53) 0px 8px 16px -8px;
          z-index: 999;
      }

      .header__logo img {
          max-width: clamp(45px, 5vw, 60px);
          max-height: clamp(45px, 5vw, 60px);
      }

      .header__nav__menu {
          padding: 0; 
          margin: 0;
          list-style: none;
          display: flex;
          align-items: center;
      }

      .header__nav__menu__link {
          margin-right: clamp(10px, 2vw, 25px);
      }

      .header__nav__menu__link:last-of-type {
          margin-right: initial;   
      }

      .header__nav__menu__link a {
          color: var(--text-color);
          font-family: monospace;
          font-size: clamp(5px, 2vw, 15px);
          font-weight: 600;
          text-decoration: none;
          position: relative;
      }

      .header__nav__menu__link a:after {
          content: "";
          height: 2px;
          background: var(--other-color);
          width: 0;
          position: absolute;
          bottom: -5px;
          right: 0;
          transition: 0.2s all ease-in-out;
      }

      .header__nav__menu__link a:hover:after {
          width: 100%;
          left: 0;
      }

      .header__nav__menu__link a.active:after {
          width: 100%;
          left: 0;
      }

      .header__burger {
          display: none;
      }

      .header__burger svg {
          stroke: var(--text-color);
          width: clamp(45px, 5vw, 80px);
          height: clamp(45px, 5vw, 80px);
          position: absolute;
          top: 28%;
          right: 3%;
      }

      .header__nav__close {
          display: none;
      }

      .header__title {
          width: 100px;
          height: 20px;
          color: var(--text-color);
          font-family: monospace;
          font-size: clamp(18px, 2vw, 25px);
          font-weight: 200;
          margin-left: 15%;
      }

      .header__title::after {
          content: "_";
          animation: blink 1s infinite;
      }
          
      @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
      }

      @media screen and (max-width: 1000px) {
          .header__burger {
              display: block;
              cursor: pointer;
          }

          .header__nav {
              position: fixed;
              top: 0;
              right: 0;
              width: clamp(200px, 30vw, 600px);
              height: 100%;
              background-color: black;
              align-items: center;
              justify-content: center;
              display: none;
          }

          .header__nav.open {
              display: flex;
              animation: transformMenu 300ms ease-in-out forwards;
          }

          @keyframes transformMenu {
              0% {
                  transform: translateX(100%);
              }

              100% {
                  transform: initial;
              }
          }

          .header.open .header__burger {
              display: none;
          }

          .header.open .header__nav__close {
              display: block;
          }

          .header__nav__menu {
              flex-direction: column;
              align-items: flex-start;
          }

          .header__nav__menu__link {
              margin-right: 0;
              margin-bottom: 25px;
          }

          .header__nav__menu__link a {
              font-size: clamp(18px, 2vw, 25px);
          }

          .header__nav__close {
              display: none;
              cursor: pointer;
          }

          .header__nav__close svg {
              stroke: var(--text-color);
              width: clamp(45px, 5vw, 80px);
              height: clamp(45px, 5vw, 80px);
              position: absolute;
              top: 28%;
              right: 3%;
          }

          .header__title {
              margin-left: 0%;
          }
      }
    `;

    document.head.appendChild(style);
  }

  const header = document.createElement("header");
  header.className = "header";

  header.innerHTML = `
    <div class="header__logo">
      <img src="./img/lightGreyLogo.png" alt="logo">
    </div>

    <div class="header__title"></div>    

    <nav class="header__nav">
      <ul class="header__nav__menu">
        <li class="header__nav__menu__link"><a href="index.html">HOME</a></li>
        <li class="header__nav__menu__link"><a href="index.html#products">PRODUCTS</a></li>
        <li class="header__nav__menu__link"><a href="demo.html">DEMO</a></li>
        <li class="header__nav__menu__link"><a href="contact.html">CONTACT</a></li>
      </ul>
    </nav>
            
    <div class="header__burger">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </div> 

    <div class="header__nav__close">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </div>
  `;

  document.body.prepend(header);

  const burger = header.querySelector(".header__burger");
  const closeBtn = header.querySelector(".header__nav__close");
  const nav = header.querySelector(".header__nav");
  const overlay = document.getElementById("overlay__menu__mobile");

  function openMenu() {
    header.classList.add("open");
    nav.classList.add("open");

    if (overlay) {
      overlay.classList.add("open");
    }
  }

  function closeMenu() {
    header.classList.remove("open");
    nav.classList.remove("open");

    if (overlay) {
      overlay.classList.remove("open");
    }
  }

  burger.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  const links = header.querySelectorAll(".header__nav__menu__link a");

  const homeLink = header.querySelector('a[href="index.html"]');
  const productsLink = header.querySelector('a[href="index.html#products"]');

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  function removeActiveLinks() {
    links.forEach((link) => {
      link.classList.remove("active");
    });
  }

  function setNormalPageActiveLink() {
    removeActiveLinks();

    links.forEach((link) => {
      const linkPage =
        new URL(link.getAttribute("href"), window.location.href).pathname
          .split("/")
          .pop() || "index.html";

      if (
        linkPage === currentPage &&
        !link.getAttribute("href").includes("#")
      ) {
        link.classList.add("active");
      }
    });
  }

  function updateActiveLinkOnScroll() {
    const productsSection = document.querySelector("#products");

    if (currentPage !== "index.html") {
      setNormalPageActiveLink();
      return;
    }

    removeActiveLinks();

    if (!productsSection) {
      homeLink.classList.add("active");
      return;
    }

    const headerHeight = header.offsetHeight;
    const rect = productsSection.getBoundingClientRect();

    if (rect.top <= headerHeight + 80) {
      productsLink.classList.add("active");
    } else {
      homeLink.classList.add("active");
    }
  }

  window.addEventListener("scroll", updateActiveLinkOnScroll);
  updateActiveLinkOnScroll();

  const titleElement = header.querySelector(".header__title");

  function loopTitleAnimation() {
    titleElement.textContent = "E-DEV";

    autoWriteText(titleElement, 200, 500, () => {
      setTimeout(() => {
        autoDeleteText(titleElement, 100, 300, () => {
          setTimeout(() => {
            loopTitleAnimation();
          }, 500);
        });
      }, 5000);
    });
  }

  loopTitleAnimation();
}
