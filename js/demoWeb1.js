// INJECT CSS

const style = document.createElement("style");

style.innerHTML = `

    .header__demo1 {
        width : 100%;
        height: clamp(25px, 4vw, 55px);
        padding: 0 clamp(5px, 1vw, 20px);
        display:flex;
        align-items: center;
        justify-content: flex-end; 
    }

    .header__nav__demo1 {
        display: flex;
        gap : clamp(2px, 1vw, 20px);
        list-style: none;
        text-decoration: none; 
        font-size: clamp(8px, 1.5vw, 15px);
        color : black;
        cursor: pointer;   
    }

    /* ---------------------------------------------------- CSS HOME PAGE -----------------------------  */

    .hero__demo1 {
        width: 100%;
        height: clamp(100px, 18vw, 250px);
        background : #e3d5ca; 
    }

    .img__hero {
        width:100%;
        height:100%;
        object-fit:cover; 
    }
        

    .contentService__demo1 {
        width: 100%;
        height: clamp(100px, 18vw, 280px); 
        display : flex;
        align-items: center;
        justify-content:center; 
        gap: clamp(10px, 5vw, 35px);

    }

    .divService__demo1 {
    position: relative;

    width: clamp(60px, 20%, 300px);
    height: clamp(80px, 80%, 600px);

    border-radius: clamp(80px, 80%, 100px)
                   clamp(80px, 80%, 100px)
                   0 0;

    overflow: hidden;
}

    .img__coiffure {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        object-fit: cover;

        z-index: 1;
    }

    .divTextService__demo1 {
        position: absolute;
        bottom: 0;
        left: 0;

        width: 100%;
        height: 20%;

        background: rgba(227, 213, 202, 0.9);

        z-index: 2;

        display: flex;
        align-items: center;
        justify-content: center;
        font-size: clamp(8px, 1.5vw, 20px);
    }

    .contentSuite__demo1 {
        width: 100%;
        height: clamp(100px, 20vw, 400px); 
        display: flex; 
        background:white;
        margin: 2% 0% 0% 0%;
        padding: 0% 10%;
        position: relative;
    }

    .textContentSuite__demo1 {
        width:50%;
        height: 100%; 
    }

    .imgContentSuite__demo1 {
        display:flex;
        position: absolute;
        top: 0;
        right: clamp(30px, 8%, 80px);
        align-items:center;
        width:clamp(50px, 40%, 650px);
        height: clamp(80px, 110%, 600px); 
        background: #d6ccc2;
        border-radius: 0% 0% clamp(80px, 80%, 180px) clamp(80px, 80%, 180px);
        overflow:hidden;
    }

    .img-contentSuite {

        width:100%;
        height:100%;
        object-fit:cover; 
    
    }

    .contentPhoto__demo1 {
        width: 100%;
        height: clamp(80px, 20vw, 600px);
        display: flex; 
        gap: clamp(8px, 2.5vw, 25px);
        justify-content: center; 
        align-items: center; 
        background: #e3d5ca; 
    }

    .divImgContentPhoto__demo1 {
        width: clamp(50px, 18%, 300px);
        height: clamp(50px, 40%, 350px);
        background: white;
        overflow:hidden;
    }

    .img__favorite__coiffure {
        width:100%;
        height:100%;
        object-fit:cover;
    }

    .lastContent__demo1 {
    display:flex;
        width:100%;
        height: clamp(80px, 15vw, 400px);
        justify-content:center;
        align-items: flex-end;
        background: #f5ebe0;

    }

    .rdvLastContent__demo1 {
        width: clamp(50px, 30%, 550px);
        height: clamp(80px, 80%, 750px);
        background: #e3d5ca;
        border-radius: clamp(80px, 80%, 180px) clamp(80px, 80%, 180px) 0% 0% ;

    }

    /* ---------------------------------------------------- CSS PRESTATION PAGE ------------------- */

    .contentPrestation__demo1 {
        width: 100%;
        height: clamp(200px, 40vw, 600px);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr); 
        align-items: center; 
        justify-items:center;
        padding : 5%;
    }

    .divPrestation__demo1 {
        position: relative;
        overflow:hidden;
        width: clamp(60px, 60%, 450px); 
        height: clamp(80px, 80%, 600px);
        background: white;
        border-radius: clamp(80px, 80%, 100px) clamp(80px, 80%, 100px) 0% 0%;
    }

    .divPrestationImage__demo1 {
       width: 100%;
       height: clamp(100px, 20vw, 300px); 
       background: #e3d5ca;
    }

    .divPrestationLast__demo1 {
        width:100%; 
        height: clamp(80px, 15vw, 400px);
        display:flex;
        align-items: flex-end; 
        justify-content:center;
    }

    /* ---------------------------------------------------- CSS RDV PAGE ------------------- */

    .contentRdv__demo1 {
        width:100%;
        height: auto;
        display:flex;
        flex-direction: column;
        justify-content: center;
        padding: clamp(15px, 2.5vw, 25px) clamp(15px, 2.5vw, 25px) clamp(15px, 2.5vw, 105px) 0;
        gap: clamp(15px, 2.5vw, 25px);
    }
    .h1ContentRdv__demo1 {
        font-size : clamp(10px, 2vw, 20px); 
        text-align:center;
        font-weight:200;
    }

    .divContentRdv__demo1 {
        display:flex;
        width:100%;
        height:100%;
        padding: 0 clamp(5px, 5%, 150px);
    }

    .contentInput__demo1 {
        width:50%;
        height:auto; 
        display:flex;
        flex-direction:column;
        gap: clamp(5px, 2vw, 20px);
        justify-content: center;
        font-size: clamp(8px, 1.5vw, 20px);
    }

    
    .divInput__demo1 {
        margin: 5% auto;
        width: 80%;
        display:flex;
        flex-direction:column;
        gap: clamp(2px, 1vw, 10px);
    }

    .divInput__demo1 input {
        border:none;
        height: clamp(15px, 3vw, 80px);
        padding: 0 clamp(5px, 1.5vw, 10px);
        font-size: clamp(8px, 1.5vw, 15px);
    }

    .divInput__demo1 select {
        border:none;    
        height: clamp(15px, 3vw, 80px);
        font-size: clamp(8px, 1.5vw, 15px);
        padding: 0 clamp(5px, 1.5vw, 10px);
    }

    .buttonValidate {
        width: 50%;
        height: clamp(10px, 3vw, 80px);
        margin: 10px auto;
        background: white;
        border: none;
        font-size: clamp(5px, 1vw, 12px);
    }  
        
    .responseValidate {
        width: 100%;
        height: 10%;
        display:flex;
        justify-content: center;
        align-items: center;
        padding: clamp(5px, 1vw, 15px);
    }

    .responseSpan {
        font-size: clamp(8px, 1.5vw, 25px);
        visibility: hidden;
        color : green;
    }

    .contentCalendar__demo1 {
        display:flex;
        flex-direction: column;
        width:50%;
        height:auto;
        padding: 5% 0 0 0;
        gap: clamp(15px, 1.5vw, 25px);
        }
        
    .divCalendar__demo1 {
        width:100%;
        height: auto; 
        background: white;
        display:flex;
        flex-direction: column;
        padding: 3% 5%;
        gap: clamp(8px, 1.5vw, 25px);
    }

    .divMonth {
        width:100%;
        height: 15%;
        background: white;  
        display:flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 2%;
        font-size: clamp(8px, 1.5vw, 25px);
    }

    .arrowCalendar {
        background: none;
        border: none;
        font-size: clamp(10px, 2vw, 25px);
        cursor: pointer;}    

    .divMonth .span {
        flex:1;
        text-align:center;
    }

    .divWeek {
        width:100%;
        height: 15%;
        display:flex;
        justify-content: space-around;
        align-items: center;
    }

    .divWeek span {
        font-size: clamp(5px, 1.2vw, 15px);
    }

    .divDay {
        width:100%;     
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(5, 1fr);
        gap: clamp(5px, 1vw, 10px);
        padding: clamp(5px, 1vw, 15px) 0;
        justify-items: center;
        align-items: center;
        font-size: clamp(10px, 1.5vw, 20px);
    }

    .dayCalendar {
        cursor: pointer;
        padding: clamp(2px, 1vw, 5px) 0px;
    }

    .otherMonth {
        opacity: 0.5;
    }

    .contentHours {
        width:100%;
        height: clamp(40px, 12vw, 140px);
        display:grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        justify-items: center;
        align-items: center;
        gap: 6px;
        }
        
    .hourSpan {
        background: white;
        font-size: clamp(8px, 1.5vw, 18px);
        cursor: pointer;
        border: 0.5px solid #e3d5ca;
        padding: clamp(5px, 1vw, 10px) clamp(2px, 1.5vw, 50px);
    }

    .activeDate {
        background: #e3d5ca;
    }
          
    .divRdvLast__demo1 {
        width:100%;
        height: clamp(80px, 12vw, 180px); 
        display:flex;
        justify-content:center;
        align-items:flex-end;
    }

    .rdvLastContent__demo1 {
        width: 30%;
        height: 75%;
        background: #e3d5ca;
                
`;

document.head.appendChild(style);

export function addDemoWeb1(element) {
  if (!element) return;

  createHomeHTML(element);

  element.style.background = "#f5ebe0";
}

function createHomeHTML(element) {
  element.innerHTML = `
        <nav class="header__demo1">
            <ul class="header__nav__demo1">
                <li class="header__nav__demo1__link"><span data-page="home" >HOME</span></li>
                <li class="header__nav__demo1__link"><span data-page="prestation" >PRESTATION</span></li>
                <li class="header__nav__demo1__link"><span data-page="rdv" >RDV</span></li>
            </ul>
        </nav>

        <div class="wrapper__demo1"> 

            <div class="hero__demo1" > <img class="img__hero" src="./img/hero-coiffure.png" alt="Logo"> </div> 

            <div class="contentService__demo1">
                <div class="divService__demo1"> <img class="img__coiffure" src="./img/coiffure1.png" alt="Logo"> <div class="divTextService__demo1"> FEMME </div> </div>
                <div class="divService__demo1"> <img class="img__coiffure" src="./img/coiffure3.png" alt="Logo"> <div class="divTextService__demo1"> HOMME</div> </div>
                <div class="divService__demo1"> <img class="img__coiffure" src="./img/coiffure2.png" alt="Logo"> <div class="divTextService__demo1"> EVENEMENT </div> </div>
            </div> 

            <div class="contentSuite__demo1"> 
                <div class="textContentSuite__demo1"> </div>
                <div class="imgContentSuite__demo1"> <img class="img-contentSuite" src="./img/salon-coiffure.png" alt="Logo"> </div>  
            </div> 
            <div class="contentPhoto__demo1">
                <div class="divImgContentPhoto__demo1"> <img class="img__favorite__coiffure" src="./img/favorite-coiffure2.png" alt="Logo"> </div>
                <div class="divImgContentPhoto__demo1"> <img class="img__favorite__coiffure" src="./img/favorite-coiffure4.png" alt="Logo"> </div>
                <div class="divImgContentPhoto__demo1"> <img class="img__favorite__coiffure" src="./img/favorite-coiffure3.png" alt="Logo"> </div>
                <div class="divImgContentPhoto__demo1"> <img class="img__favorite__coiffure" src="./img/favorite-coiffure1.png" alt="Logo"> </div>
            </div> 

            <div class="lastContent__demo1"> <div class="rdvLastContent__demo1"> </div> </div> 
        </div>     
    `;

  const buttonMenu = element.querySelectorAll(".header__nav__demo1__link span");
  buttonMenu.forEach((button) => {
    const page = button.dataset.page;

    button.addEventListener("click", () => {
      if (page === "home") {
        createHomeHTML(element);
      } else if (page === "prestation") {
        createPrestationHTML(element);
      } else {
        createRdvHTML(element);
      }
    });
  });
}

function createPrestationHTML(element) {
  const wrapper = element.querySelector(".wrapper__demo1");

  wrapper.innerHTML = "";
  wrapper.innerHTML = `  
  
    <div class="hero__demo1" > <img class="img__hero" src="./img/hero-coiffure.png" alt="Logo"> </div>

    <div class="contentPrestation__demo1">
        <div class="divPrestation__demo1"> <img class="img__coiffure" src="./img/coiffure1.png" alt="Logo"> </div>
        <div class="divPrestation__demo1"> <img class="img__coiffure" src="./img/coiffure2.png" alt="Logo">  </div>
        <div class="divPrestation__demo1"> <img class="img__coiffure" src="./img/coiffure3.png" alt="Logo">  </div>
        <div class="divPrestation__demo1"> <img class="img__coiffure" src="./img/coiffure3.png" alt="Logo"> </div>
        <div class="divPrestation__demo1"> <img class="img__coiffure" src="./img/coiffure1.png" alt="Logo"> </div>
        <div class="divPrestation__demo1"> <img class="img__coiffure" src="./img/coiffure2.png" alt="Logo"> </div>
    </div>

    <div class="divPrestationImage__demo1"> </div>
    
    <div class="lastContent__demo1">
        <div class="rdvLastContent__demo1"> </div>
    </div>
    
    `;
}

function createRdvHTML(element) {
  const wrapper = element.querySelector(".wrapper__demo1");

  wrapper.innerHTML = "";
  wrapper.innerHTML = `

  <div class="hero__demo1" > <img class="img__hero" src="./img/hero-coiffure.png" alt="Logo"> </div>

  <div class="contentRdv__demo1"> 
    <h1 class="h1ContentRdv__demo1"> PRENDRE RDV </h1> 
    <div class="divContentRdv__demo1">
        <div class="contentInput__demo1">
            <div class="divInput__demo1">
                <span> NOM : </span>
                <input class="inputName"> </input> 
            </div>
            <div class="divInput__demo1">
                <span> PRESTATION : </span>
                <select class="selectPrestation">
                    <option value="">Choisir...</option>
                    <option value="femme">Coupe femme</option>
                    <option value="homme">Coupe homme</option>
                    <option value="moustache">Barbe/moustache</option>
                </select> 
            </div> 
            <div class="divInput__demo1">
                <span> COLLABORATEUR : </span>
                <select class="selectCollaborator">
                    <option value="">Choisir...</option>
                    <option value="natacha">Natacha</option>
                    <option value="pauline">Pauline</option>
                    <option value="damien">Damien</option>
                    <option value="stephane">Stéphane</option>
                </select>
            </div>
            <button class="buttonValidate"> VALIDER </button>
            <div class="responseValidate">
                <span class="responseSpan"> Response</span>
            </div>
        </div> 
        <div class="contentCalendar__demo1">
            <div class="divCalendar__demo1"> 
                <div class="divMonth" >
                    <button class="arrowCalendar left" type="button">&#10094;</button>
                    <span> MONTH </span>
                    <button class="arrowCalendar right" type="button">&#10095;</button>
                </div>
                <div class="divWeek"> 
                <span> LUN </span>
                <span> MAR </span>
                <span> MER </span>
                <span> JEU </span>
                <span> VEN </span>
                <span> SAM </span>
                <span> DIM </span>
                </div>
                <div class="divDay"> </div>
                </div>
                <div class="contentHours">
                    <div class="divHours"> <span class="hourSpan"> 09:00 </span> </div>
                    <div class="divHours"> <span class="hourSpan"> 10:00 </span> </div>
                    <div class="divHours"> <span class="hourSpan"> 11:00 </span> </div>
                    <div class="divHours"> <span class="hourSpan"> 12:00 </span> </div>
                    <div class="divHours"> <span class="hourSpan"> 14:00 </span> </div>
                    <div class="divHours"> <span class="hourSpan"> 15:00 </span> </div>
                    <div class="divHours"> <span class="hourSpan"> 16:00 </span> </div>
                    <div class="divHours"> <span class="hourSpan"> 17:00 </span> </div>
                    <div class="divHours"> <span class="hourSpan"> 18:00 </span> </div>
                </div>
        </div> 
    </div>     
  </div> 

  <div class="lastContent__demo1">
    <div class="rdvLastContent__demo1"> </div>
  </div> 
  
    `;
  const buttonValidate = element.querySelector(".buttonValidate");
  buttonValidate.addEventListener("click", validateRdv);

  initCalendar(element);
  choiceDate();
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

  arrowLeft.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
    choiceDate();
  });

  arrowRight.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
    choiceDate();
  });

  renderCalendar();
}

function choiceDate() {
  const monthSpan = document.querySelector(".divMonth span");
  const dayCalendar = document.querySelectorAll(".dayCalendar");
  const hourSpan = document.querySelectorAll(".hourSpan");

  dayCalendar.forEach((day) => {
    day.addEventListener("click", () => {
      if (day.classList.contains("otherMonth")) return;
      dayCalendar.forEach((d) => d.classList.remove("activeDate"));
      day.classList.add("activeDate");
    });
  });

  hourSpan.forEach((hour) => {
    hour.addEventListener("click", () => {
      hourSpan.forEach((h) => h.classList.remove("activeDate"));
      hour.classList.add("activeDate");
    });
  });
}

function validateRdv() {
  const nameInput = document.querySelector(".inputName");
  const prestationSelect = document.querySelector(".selectPrestation");
  const collaboratorSelect = document.querySelector(".selectCollaborator");
  const monthSpan = document.querySelector(".divMonth span");
  const dayCalendar = document.querySelector(".dayCalendar.activeDate");
  const hourSpan = document.querySelector(".hourSpan.activeDate");
  const divInput = document.querySelector(".contentInput__demo1");

  const responseSpan = document.querySelector(".responseSpan");

  if (
    !nameInput.value ||
    !prestationSelect.value ||
    !collaboratorSelect.value ||
    !monthSpan.textContent ||
    !dayCalendar ||
    !hourSpan
  ) {
    responseSpan.innerHTML = `<p> Veuillez remplir tous les champs pour confirmer votre rendez-vous. </p>`;
    responseSpan.style.color = "red";
    responseSpan.style.visibility = "visible";
    return;
  }

  divInput.innerHTML = `
    <p style="padding:0 20px;"> Votre rendez-vous pour ${prestationSelect.value} avec ${collaboratorSelect.value} le ${dayCalendar.textContent} ${monthSpan.textContent} à ${hourSpan.textContent}
    au nom de ${nameInput.value} à bien été confirmé. </p>
  `;
}
