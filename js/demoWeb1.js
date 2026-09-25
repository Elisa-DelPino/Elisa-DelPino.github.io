export function addDemoWeb1(element) {
  if (!element) return;

  createHomeHTML(element);

  element.style.background = "#f5ebe0";
}

function scrollDemo1ToTop(element, behavior = "smooth") {
  if (!element) return;

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

function scrollDemo1ToPrestationSection(element, sectionIndex) {
  if (!element) return;

  requestAnimationFrame(() => {
    const sections = element.querySelectorAll(".prestationCategory__demo1");
    const targetSection = sections[sectionIndex];

    if (!targetSection) return;

    const elementRect = element.getBoundingClientRect();
    const sectionRect = targetSection.getBoundingClientRect();

    const targetTop =
      element.scrollTop + sectionRect.top - elementRect.top - 20;

    element.scrollTo({
      top: Math.max(0, targetTop),
      left: 0,
      behavior: "smooth",
    });
  });
}

function scrollDemo1ToResponse(element, responseValidate) {
  if (!element || !responseValidate) {
    return;
  }

  const scrollToCard = () => {
    const responseCard =
      responseValidate.querySelector(".responseCard") || responseValidate;

    const elementRect = element.getBoundingClientRect();
    const cardRect = responseCard.getBoundingClientRect();

    const viewportHeight = element.clientHeight;
    const cardHeight = cardRect.height;

    const visibleCardHeight = Math.min(cardHeight, viewportHeight - 40);

    const desiredTop = Math.max(20, (viewportHeight - visibleCardHeight) / 2);

    const targetTop =
      element.scrollTop + cardRect.top - elementRect.top - desiredTop;

    element.scrollTo({
      top: Math.max(0, targetTop),
      left: 0,
      behavior: "smooth",
    });
  };

  requestAnimationFrame(() => {
    setTimeout(scrollToCard, 600);
  });
}

function createHomeHTML(element) {
  element.innerHTML = `
    <div class="demo1__site">

      <nav class="header__demo1">
        <ul class="header__nav__demo1">
          <li class="header__nav__demo1__link"><span data-page="home">ACCUEIL</span></li>
          <li class="header__nav__demo1__link"><span data-page="prestation">PRESTATION</span></li>
          <li class="header__nav__demo1__link"><span data-page="rdv">RDV</span></li>
        </ul>
      </nav>

      <div class="wrapper__demo1">

        <div class="hero__demo1">
          <img class="img__hero" src="./img/hero-coiffure.png" alt="Intérieur du salon de coiffure">
          <img class="logo__hero__demo1" src="./img/logoSalonCoiffure.png" alt="UMA Salon de coiffure">
        </div>

        <div class="contentService__demo1">

          <div class="divService__demo1">
            <img class="img__coiffure" src="./img/coiffure1.png" alt="Coiffure femme">
            <div class="divTextService__demo1">FEMME</div>
          </div>

          <div class="divService__demo1">
            <img class="img__coiffure" src="./img/coiffure3.png" alt="Coiffure homme">
            <div class="divTextService__demo1">HOMME</div>
          </div>

          <div class="divService__demo1">
            <img class="img__coiffure" src="./img/coiffure2.png" alt="Coiffure événementielle">
            <div class="divTextService__demo1">EVENEMENT</div>
          </div>

        </div>

        <div class="contentSuite__demo1">

          <div class="textContentSuite__demo1">

            <span class="subtitleSuite">
              NOTRE SALON
            </span>

            <h2 class="titleSuite">
              Un salon dédié à votre beauté
            </h2>

            <div class="imgContentSuite__demo1 imgContentSuite__demo1--mobile">
              <img
                class="img-contentSuite"
                src="./img/salon-coiffure.png"
                alt="Intérieur du salon de coiffure"
              >
            </div>

            <p class="textSuite">
              Depuis plusieurs années, nous mettons notre savoir-faire au service
              de votre beauté. Notre équipe vous accueille dans un espace élégant,
              chaleureux et entièrement pensé pour vous offrir un véritable moment
              de détente.
            </p>

            <p class="textSuite">
              Coupe, coloration, coiffure événementielle ou soins personnalisés :
              chaque prestation est réalisée avec passion, des produits
              professionnels et une attention particulière portée à chaque détail.
            </p>

            <button class="buttonSuite">
              EN SAVOIR PLUS
            </button>

          </div>

          <div class="imgContentSuite__demo1 imgContentSuite__demo1--desktop">
            <img
              class="img-contentSuite"
              src="./img/salon-coiffure.png"
              alt="Intérieur du salon de coiffure"
            >
          </div>

        </div>

        <div class="contentPhoto__demo1">

          <div class="divImgContentPhoto__demo1">
            <img class="img__favorite__coiffure" src="./img/favorite-coiffure2.png" alt="Coiffure">
          </div>

          <div class="divImgContentPhoto__demo1">
            <img class="img__favorite__coiffure" src="./img/favorite-coiffure4.png" alt="Coiffure">
          </div>

          <div class="divImgContentPhoto__demo1">
            <img class="img__favorite__coiffure" src="./img/favorite-coiffure3.png" alt="Coiffure">
          </div>

          <div class="divImgContentPhoto__demo1">
            <img class="img__favorite__coiffure" src="./img/favorite-coiffure1.png" alt="Coiffure">
          </div>

        </div>

        <div class="lastContent__demo1">

          <div class="rdvLastContent__demo1">

            <span class="rdv-subtitle">
              VOTRE MOMENT BEAUTÉ
            </span>

            <p class="rdv-text">
              Un instant rien que pour vous.<br>
              Réservez votre prestation en ligne.
            </p>

            <button class="rdv-button" type="button">
              PRENDRE RENDEZ-VOUS
            </button>

          </div>

        </div>

      </div>

    </div>
  `;

  const serviceCards = element.querySelectorAll(".divService__demo1");

  serviceCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      createPrestationHTML(element);
      scrollDemo1ToPrestationSection(element, index);
    });
  });

  element.querySelector(".buttonSuite")?.addEventListener("click", () => {
    createPrestationHTML(element);
    scrollDemo1ToTop(element);
  });

  const rdvButton = element.querySelector(".rdv-button");

  rdvButton?.addEventListener("click", () => {
    createRdvHTML(element);
  });

  const buttonMenu = element.querySelectorAll(".header__nav__demo1__link span");

  buttonMenu.forEach((button) => {
    const page = button.dataset.page;

    button.addEventListener("click", () => {
      if (page === "home") {
        createHomeHTML(element);
        scrollDemo1ToTop(element);
      } else if (page === "prestation") {
        createPrestationHTML(element);
        scrollDemo1ToTop(element);
      } else {
        createRdvHTML(element);
      }
    });
  });
}

function createPrestationHTML(element) {
  const wrapper = element.querySelector(".wrapper__demo1");

  if (!wrapper) return;

  wrapper.innerHTML = `
    <div class="hero__demo1">
      <img class="img__hero" src="./img/hero-coiffure.png" alt="Intérieur du salon de coiffure">
      <img class="logo__hero__demo1" src="./img/logoSalonCoiffure.png" alt="UMA Salon de coiffure">
    </div>

    <div class="contentPrestation__demo1">

      <section class="prestationCategory__demo1">

        <div class="prestationImage__demo1">
          <img
            src="./img/coiffure1.png"
            alt="Coiffure femme"
          >
        </div>

        <div class="prestationText__demo1">

          <span class="prestationSubtitle__demo1">
            L'ÉLÉGANCE AU QUOTIDIEN
          </span>

          <h2 class="prestationTitle__demo1">
            FEMMES
          </h2>

          <p>
            Coupe, brushing, coloration ou soin profond : chaque prestation
            est pensée pour révéler votre style tout en respectant la nature
            de vos cheveux.
          </p>

          <p>
            Notre équipe vous accompagne avec attention afin de créer une
            coiffure personnalisée, élégante et facile à porter au quotidien.
          </p>

          <button
            type="button"
            class="prestationButton__demo1"
            data-page="rdv"
          >
            PRENDRE RENDEZ-VOUS
          </button>

        </div>

      </section>

      <section class="prestationCategory__demo1 prestationCategory__demo1--reverse">

        <div class="prestationImage__demo1">
          <img
            src="./img/coiffure3.png"
            alt="Coiffure homme"
          >
        </div>

        <div class="prestationText__demo1">

          <span class="prestationSubtitle__demo1">
            STYLE & PRÉCISION
          </span>

          <h2 class="prestationTitle__demo1">
            HOMMES
          </h2>

          <p>
            Coupe classique, dégradé moderne ou entretien de la barbe :
            profitez d'un service précis, soigné et adapté à votre personnalité.
          </p>

          <p>
            Chaque détail est travaillé pour vous offrir un résultat net,
            harmonieux et simple à entretenir entre deux rendez-vous.
          </p>

          <button
            type="button"
            class="prestationButton__demo1"
            data-page="rdv"
          >
            PRENDRE RENDEZ-VOUS
          </button>

        </div>

      </section>

      <section class="prestationCategory__demo1">

        <div class="prestationImage__demo1">
          <img
            src="./img/coiffure2.png"
            alt="Coiffure événementielle"
          >
        </div>

        <div class="prestationText__demo1">

          <span class="prestationSubtitle__demo1">
            POUR VOS PLUS BEAUX MOMENTS
          </span>

          <h2 class="prestationTitle__demo1">
            ÉVÉNEMENTS
          </h2>

          <p>
            Mariage, cérémonie ou soirée particulière : nous imaginons une
            coiffure sur mesure qui sublime votre tenue et reflète pleinement
            votre personnalité.
          </p>

          <p>
            Chignon élégant, attaches délicates ou coiffure naturelle :
            chaque création est réalisée avec soin pour vous accompagner
            durant ce moment unique.
          </p>

          <button
            type="button"
            class="prestationButton__demo1"
            data-page="rdv"
          >
            PRENDRE RENDEZ-VOUS
          </button>

        </div>

      </section>

    </div>

    <div class="divPrestationImage__demo1"></div>

    <div class="lastContent__demo1">

      <div class="rdvLastContent__demo1">

        <span class="rdv-subtitle">
          VOTRE MOMENT BEAUTÉ
        </span>

        <p class="rdv-text">
          Un instant rien que pour vous.<br>
          Réservez votre prestation en ligne.
        </p>

        <button class="rdv-button" type="button">
          PRENDRE RENDEZ-VOUS
        </button>

      </div>

    </div>
  `;

  element.querySelectorAll(".rdv-button").forEach((button) => {
    button.addEventListener("click", () => {
      createRdvHTML(element);
    });
  });

  const prestationButtons = element.querySelectorAll(
    ".prestationButton__demo1",
  );

  prestationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      createRdvHTML(element);
    });
  });
}

function createRdvHTML(element) {
  const wrapper = element.querySelector(".wrapper__demo1");

  if (!wrapper) return;

  scrollDemo1ToTop(element);

  wrapper.innerHTML = `
    <div class="hero__demo1">
      <img class="img__hero" src="./img/hero-coiffure.png" alt="Intérieur du salon de coiffure">
      <img class="logo__hero__demo1" src="./img/logoSalonCoiffure.png" alt="UMA Salon de coiffure">
    </div>

    <div class="contentRdv__demo1">

      <div class="divContentRdv__demo1">

        <div class="leftRdv">

          <div class="divInput__demo1">
            <input
              id="inputName"
              class="inputName"
              type="text"
              placeholder="Votre nom"
            >
          </div>

          <div class="divInput__demo1">

            <select
              id="selectPrestation"
              class="selectPrestation"
            >
              <option value="">
                Choisissez votre prestation
              </option>

              <option value="Coupe femme">
                Coupe femme
              </option>

              <option value="Brushing">
                Brushing
              </option>

              <option value="Coloration">
                Coloration
              </option>

              <option value="Soin capillaire">
                Soin capillaire
              </option>

              <option value="Coupe homme">
                Coupe homme
              </option>

              <option value="Barbe et moustache">
                Barbe et moustache
              </option>

              <option value="Coiffure événementielle">
                Coiffure événementielle
              </option>
            </select>

          </div>

          <div class="divInput__demo1">

            <select
              id="selectCollaborator"
              class="selectCollaborator"
            >
              <option value="">
                Choisissez votre collaborateur
              </option>

              <option value="Natacha">
                Natacha
              </option>

              <option value="Pauline">
                Pauline
              </option>

              <option value="Damien">
                Damien
              </option>

              <option value="Stéphane">
                Stéphane
              </option>
            </select>

          </div>

          <div class="divInput__demo1">

            <textarea
              id="textareaNote"
              class="textareaNote"
              placeholder="Ajoutez une demande particulière..."
            ></textarea>

          </div>

          <button
            class="buttonValidate"
            type="button"
          >
            VALIDER MON RENDEZ-VOUS
          </button>

          <div class="responseValidate" aria-live="polite">
            <div class="responseCard"></div>
          </div>

        </div>

        <div class="rightRdv">

          <div class="divCalendar__demo1">

            <div class="divMonth">

              <button
                class="arrowCalendar left"
                type="button"
                aria-label="Mois précédent"
              >
                &#10094;
              </button>

              <span>MOIS</span>

              <button
                class="arrowCalendar right"
                type="button"
                aria-label="Mois suivant"
              >
                &#10095;
              </button>

            </div>

            <div class="divWeek">
              <span>LUN</span>
              <span>MAR</span>
              <span>MER</span>
              <span>JEU</span>
              <span>VEN</span>
              <span>SAM</span>
              <span>DIM</span>
            </div>

            <div class="divDay"></div>

          </div>

          <div class="hoursTitle">
            CHOISISSEZ UN HORAIRE DISPONIBLE
          </div>

          <div class="contentHours">

            <div class="divHours">
              <span class="hourSpan">09:00</span>
            </div>

            <div class="divHours">
              <span class="hourSpan">10:00</span>
            </div>

            <div class="divHours">
              <span class="hourSpan">11:00</span>
            </div>

            <div class="divHours">
              <span class="hourSpan">12:00</span>
            </div>

            <div class="divHours">
              <span class="hourSpan">14:00</span>
            </div>

            <div class="divHours">
              <span class="hourSpan">15:00</span>
            </div>

            <div class="divHours">
              <span class="hourSpan">16:00</span>
            </div>

            <div class="divHours">
              <span class="hourSpan">17:00</span>
            </div>

          </div>

          <div class="durationBox">

            <span class="durationTitle">
              DURÉE ESTIMÉE
            </span>

            <span class="durationText">
              Environ 1h
            </span>

          </div>

        </div>

      </div>

    </div>
  `;

  const buttonValidate = element.querySelector(".buttonValidate");

  buttonValidate?.addEventListener("click", () => {
    validateRdv(element);
  });

  initCalendar(element);
  choiceDate(element);
}

function initCalendar(element) {
  const monthSpan = element.querySelector(".divMonth span");
  const divDay = element.querySelector(".divDay");
  const arrowLeft = element.querySelector(".arrowCalendar.left");
  const arrowRight = element.querySelector(".arrowCalendar.right");

  const monthNames = [
    "JANVIER",
    "FÉVRIER",
    "MARS",
    "AVRIL",
    "MAI",
    "JUIN",
    "JUILLET",
    "AOÛT",
    "SEPTEMBRE",
    "OCTOBRE",
    "NOVEMBRE",
    "DÉCEMBRE",
  ];

  let currentDate = new Date();

  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();

    const startOffset =
      firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;

    const daysInPreviousMonth = new Date(year, month, 0).getDate();

    monthSpan.textContent = `${monthNames[month]} ${year}`;
    divDay.innerHTML = "";

    for (let i = startOffset - 1; i >= 0; i--) {
      const day = daysInPreviousMonth - i;

      const dayDiv = document.createElement("div");

      dayDiv.classList.add("dayCalendar", "otherMonth");
      dayDiv.textContent = day;

      divDay.appendChild(dayDiv);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayDiv = document.createElement("div");

      dayDiv.classList.add("dayCalendar");
      dayDiv.textContent = day;

      const isToday =
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      if (isToday) {
        dayDiv.classList.add("todayCalendar");
      }

      divDay.appendChild(dayDiv);
    }

    const totalCells = divDay.children.length;

    const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);

    for (let i = 1; i <= remaining; i++) {
      const nextDayDiv = document.createElement("div");

      nextDayDiv.classList.add("dayCalendar", "otherMonth");
      nextDayDiv.textContent = i;

      divDay.appendChild(nextDayDiv);
    }
  }

  arrowLeft?.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);

    renderCalendar();
    choiceDate(element);
  });

  arrowRight?.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);

    renderCalendar();
    choiceDate(element);
  });

  renderCalendar();
}

function choiceDate(element) {
  const dayCalendar = element.querySelectorAll(".dayCalendar");
  const hourSpan = element.querySelectorAll(".hourSpan");

  dayCalendar.forEach((day) => {
    day.addEventListener("click", () => {
      if (day.classList.contains("otherMonth")) {
        return;
      }

      dayCalendar.forEach((currentDay) => {
        currentDay.classList.remove("activeDate");
      });

      day.classList.add("activeDate");
    });
  });

  hourSpan.forEach((hour) => {
    hour.addEventListener("click", () => {
      hourSpan.forEach((currentHour) => {
        currentHour.classList.remove("activeDate");
      });

      hour.classList.add("activeDate");
    });
  });
}

function validateRdv(element) {
  const nameInput = element.querySelector(".inputName");
  const prestationSelect = element.querySelector(".selectPrestation");
  const collaboratorSelect = element.querySelector(".selectCollaborator");
  const noteInput = element.querySelector(".textareaNote");
  const monthSpan = element.querySelector(".divMonth span");
  const selectedDay = element.querySelector(".dayCalendar.activeDate");
  const selectedHour = element.querySelector(".hourSpan.activeDate");
  const responseValidate = element.querySelector(".responseValidate");
  const responseCard = element.querySelector(".responseCard");

  if (
    !nameInput ||
    !prestationSelect ||
    !collaboratorSelect ||
    !monthSpan ||
    !responseValidate ||
    !responseCard
  ) {
    console.error(
      "Certains éléments du formulaire de rendez-vous sont introuvables.",
    );

    return;
  }

  const name = nameInput.value.trim();
  const prestation = prestationSelect.value;
  const collaborator = collaboratorSelect.value;
  const note = noteInput?.value.trim() || "";

  if (!name || !prestation || !collaborator || !selectedDay || !selectedHour) {
    responseValidate.classList.remove("is-confirmed");
    responseValidate.classList.add("is-error");

    responseCard.innerHTML = `
      <div class="responseIcon responseIcon--error">
        !
      </div>

      <div class="responseContent">

        <span class="responseEyebrow">
          INFORMATIONS MANQUANTES
        </span>

        <h3 class="responseTitle">
          Votre rendez-vous n'est pas encore complet
        </h3>

        <p class="responseMessage">
          Veuillez renseigner votre nom, choisir une prestation,
          un collaborateur, une date et un horaire.
        </p>

      </div>
    `;

    responseValidate.classList.add("is-visible");

    scrollDemo1ToResponse(element, responseValidate);

    return;
  }

  const day = selectedDay.textContent.trim();
  const month = monthSpan.textContent.trim();
  const hour = selectedHour.textContent.trim();

  responseValidate.classList.remove("is-error");
  responseValidate.classList.add("is-confirmed");

  responseCard.innerHTML = `
    <div class="responseIcon responseIcon--success">

      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M5 12.5L9.2 16.5L19 7"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

    </div>

    <div class="responseContent">

      <span class="responseEyebrow">
        RENDEZ-VOUS CONFIRMÉ
      </span>

      <h3 class="responseTitle">
        Merci ${escapeHtml(name)}
      </h3>

      <p class="responseMessage">
        Votre moment beauté a bien été réservé.
        Voici le récapitulatif de votre rendez-vous.
      </p>

      <div class="responseDetails">

        <div class="responseDetail">

          <span class="responseDetailLabel">
            PRESTATION
          </span>

          <strong>
            ${escapeHtml(prestation)}
          </strong>

        </div>

        <div class="responseDetail">

          <span class="responseDetailLabel">
            AVEC
          </span>

          <strong>
            ${escapeHtml(collaborator)}
          </strong>

        </div>

        <div class="responseDetail">

          <span class="responseDetailLabel">
            DATE
          </span>

          <strong>
            ${escapeHtml(day)} ${escapeHtml(month)}
          </strong>

        </div>

        <div class="responseDetail">

          <span class="responseDetailLabel">
            HORAIRE
          </span>

          <strong>
            ${escapeHtml(hour)}
          </strong>

        </div>

      </div>

      ${
        note
          ? `
            <div class="responseNote">

              <span class="responseDetailLabel">
                VOTRE DEMANDE
              </span>

              <p>
                ${escapeHtml(note)}
              </p>

            </div>
          `
          : ""
      }

      <p class="responseFooter">
        Nous avons hâte de vous accueillir au salon.
      </p>

    </div>
  `;

  responseValidate.classList.add("is-visible");

  scrollDemo1ToResponse(element, responseValidate);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
