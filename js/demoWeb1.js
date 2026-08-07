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
        gap : clamp(8px, 1vw, 20px);
        list-style: none;
        text-decoration: none; 
        font-size: clamp(12px, 1.5vw, 15px);
        color : #3d312c;
        cursor: pointer;   

        font-family: "Cinzel", serif;
        font-weight: 500;
        letter-spacing: clamp(0.8px, 0.2vw, 1.5px);
    }

    /* ---------------------------------------------------- CSS HOME PAGE -----------------------------  */

    .hero__demo1 {
    position: relative;

    width: 100%;
    height: clamp(150px, 18vw, 350px);

    background: #e3d5ca;

    overflow: hidden;
}

.img__hero {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center;
}

/* Logo centré dans le hero */

.logo__hero__demo1 {
    position: absolute;
    top: 50%;
    left: 50%;
    width: clamp(150px, 28vw, 430px);
    height: auto;
    transform: translate(-50%, -50%);
    object-fit: contain;
    z-index: 2;
}
        

    .contentService__demo1 {
        width: 100%;
        height: clamp(180px, 35vw, 450px); 
        display : flex;
        align-items: center;
        justify-content:center; 
        gap: clamp(10px, 5vw, 35px);

    }

    .divService__demo1 {
    position: relative;

    width: clamp(20px, 25%, 250px);
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
        color : #3d312c;

        z-index: 2;

        display: flex;
        align-items: center;
        justify-content: center;
        font-size: clamp(12px, 1.5vw, 20px);
    }

    .contentSuite__demo1 {
  width: 100%;
  min-height: clamp(200px, 18vw, 250px);

  display: flex;
  align-items: center;

  position: relative;

  margin: 2% 0 0;
  padding: clamp(25px, 4vw, 30px) 10%;

  background: white;
}

    .textContentSuite__demo1 {
  width: 52%;
  min-width: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: clamp(10px, 1.2vw, 18px);

  padding-right: clamp(35px, 6vw, 90px);

  position: relative;
  z-index: 2;
}

.subtitleSuite {
  margin: 0;

  font-size: clamp(7px, 0.85vw, 13px);
  font-weight: 600;

  letter-spacing: clamp(2px, 0.35vw, 5px);

  color: #b08968;
}

.titleSuite {
  max-width: 520px;
  margin: 0;

  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(21px, 3.1vw, 46px);
  font-weight: 500;

  line-height: 1.02;

  color: #3d312c;
}

.textSuite {
  max-width: 570px;
  margin: 0;

  font-size: clamp(9px, 1.15vw, 16px);
  line-height: 1.65;

  color: #6b5c54;
}

.buttonSuite {
  margin-top: clamp(5px, 1vw, 14px);

  padding:
    clamp(9px, 1vw, 14px)
    clamp(18px, 2.5vw, 34px);

  border: none;

  background: #3d312c;
  color: white;

  font-size: clamp(6px, 0.75vw, 11px);
  letter-spacing: clamp(1px, 0.2vw, 3px);

  cursor: pointer;

  transition:
    background 0.3s ease,
    transform 0.3s ease;
}

.buttonSuite:hover {
  background: #b08968;
  transform: translateY(-2px);
}

    .imgContentSuite__demo1 {
        display:flex;
        position: absolute;
        top: 0;
        right: clamp(30px, 8%, 80px);
        align-items:center;
        width:clamp(50px, 40%, 450px);
        height: clamp(80px, 100%, 600px); 
        background: #d6ccc2;
        border-radius: 0% 0% clamp(80px, 80%, 180px) clamp(80px, 80%, 180px);
        overflow:hidden;
    }

    .img-contentSuite {

        width:100%;
        height:100%;
        object-fit:cover; 
    
    }

    /* Par défaut : image ordinateur visible */
.imgContentSuite__demo1--desktop {
    display: flex;
}

.imgContentSuite__demo1--mobile {
    display: none;
}

    .contentPhoto__demo1 {
        width: 100%;
        height: clamp(230px, 25vw, 600px);
        display: flex; 
        gap: clamp(8px, 2.5vw, 25px);
        justify-content: center; 
        align-items: center; 
        background: #e3d5ca; 
    }

    .divImgContentPhoto__demo1 {
        width: clamp(50px, 18%, 300px);
        height: clamp(50px, 60%, 550px);
        background: white;
        overflow:hidden;
    }

    .img__favorite__coiffure {
        width:100%;
        height:100%;
        object-fit:cover;
    }

    .lastContent__demo1 {
  width: 100%;
  height: clamp(170px, 18vw, 350px);

  display: flex;
  justify-content: center;
  align-items: flex-end;

  padding-top: clamp(10px, 5vw, 30px);

  background: #f5ebe0;
}

    .rdvLastContent__demo1 {
  width: clamp(220px, 28%, 440px);
  height: clamp(150px, 15vw, 300px);

  margin: 0 auto;

  padding: 0 clamp(18px, 2vw, 30px);

  background: #e3d5ca;

  border-radius:
    clamp(80px, 12vw, 170px)
    clamp(80px, 12vw, 170px)
    0 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  box-sizing: border-box;
}
    .rdv-subtitle{

    font-size:clamp(8px,.75vw,12px);

    letter-spacing:.35em;

    color:#b08968;

     margin-top: clamp(6px, 2.5vw, 30px);
     margin-bottom: clamp(6px, 1vw, 12px);

    font-weight:600;
}

    .rdv-text{

    margin: clamp(4px, 0.8vw, 10px) 0;
    line-height: 1.5;

    color:#6f5c55;

    font-size:clamp(11px,1vw,17px);
  }
    .rdv-button{

    text-decoration:none;

    color:white;
    background:#3d312c;

    margin-top: clamp(6px, 1.5vw, 18px);

    padding:
      clamp(9px, 1vw, 13px)
      clamp(20px, 2vw, 30px);

    border-radius:6px;

    letter-spacing:.18em;
    font-size: clamp(8px,1vw,10px);
    font-weight:600;

    transition:.35s;
}

  .rdv-button:hover{

    background:#b08968;
    transform:translateY(-3px);
  }

    /* ---------------------------------------------------- CSS PRESTATION PAGE ------------------- */

    /* =====================================================
   PAGE PRESTATIONS
===================================================== */

.contentPrestation__demo1 {
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;

  gap: clamp(35px, 6vw, 90px);

  padding:
    clamp(35px, 6vw, 90px)
    clamp(30px, 9vw, 150px);

  background: #f5ebe0;
}


/* Un bloc complet */

.prestationCategory__demo1 {
  width: 100%;

  display: flex;
  align-items: center;

  gap: clamp(30px, 7vw, 110px);
}


/* Alterne automatiquement le sens */

.prestationCategory__demo1--reverse {
  flex-direction: row-reverse;
}


/* Image en forme d'arche */

.prestationImage__demo1 {
  width: clamp(220px, 38%, 520px);
  height: clamp(300px, 32vw, 500px);

  flex-shrink: 0;

  overflow: hidden;

  border-radius:
    clamp(100px, 15vw, 230px)
    clamp(100px, 15vw, 230px)
    0
    0;

  background: #e3d5ca;
}

.prestationImage__demo1 img {
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;
  object-position: center;
}


/* Texte */

.prestationText__demo1 {
  flex: 1;
  min-width: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: clamp(10px, 1.6vw, 22px);
}

.prestationSubtitle__demo1 {
  color: #b08968;

  font-size: clamp(7px, 0.8vw, 12px);
  font-weight: 600;

  letter-spacing: clamp(2px, 0.35vw, 5px);
}

.prestationTitle__demo1 {
  margin: 0;

  color: #3d312c;

  font-family:
    "Cormorant Garamond",
    Georgia,
    serif;

  font-size: clamp(28px, 4vw, 62px);
  font-weight: 500;

  line-height: 1;
}

.prestationText__demo1 p {
  max-width: 620px;
  margin: 0;

  color: #6b5c54;

  font-size: clamp(10px, 1.2vw, 17px);
  line-height: 1.75;
}


/* Bouton */

.prestationButton__demo1 {
  margin-top: clamp(6px, 1.2vw, 16px);

  padding:
    clamp(10px, 1.2vw, 16px)
    clamp(22px, 2.8vw, 42px);

  border: none;

  background: #3d312c;
  color: #fff;

  font-size: clamp(7px, 0.8vw, 11px);
  font-weight: 600;

  letter-spacing: clamp(1px, 0.22vw, 3px);

  cursor: pointer;

  transition:
    background 0.3s ease,
    transform 0.3s ease;
}

.prestationButton__demo1:hover {
  background: #b08968;
  transform: translateY(-2px);
}

    /* ---------------------------------------------------- CSS RDV PAGE ------------------- */

    /* =====================================================
   PAGE PRISE DE RENDEZ-VOUS
===================================================== */

/* Conteneur principal de la page */

.contentRdv__demo1 {
  width: 100%;
  min-height: 100%;
  align-items:flex-start;

  padding:
    clamp(25px, 4vw, 60px)
    clamp(25px, 5vw, 80px);

  background: #f5ebe0;

  box-sizing: border-box;
}


/* Grille générale : formulaire à gauche, calendrier à droite */

.divContentRdv__demo1 {
  width: 100%;

  display: grid;
  grid-template-columns:
    minmax(0, 0.9fr)
    minmax(0, 1.1fr);

  gap: clamp(30px, 5vw, 80px);

  align-items: start;

  padding:
    clamp(25px, 4vw, 55px)
    clamp(20px, 4vw, 65px);

  background: #f5ebe0;

  box-sizing: border-box;
}


/* =====================================================
   COLONNE GAUCHE : FORMULAIRE
===================================================== */

.leftRdv {
  width: 100%;
  min-width: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  gap: clamp(15px, 2vw, 26px);
}


/* Grand titre */


/* Bloc d’un champ */

.divInput__demo1 {
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: clamp(6px, 0.8vw, 10px);

  margin: 0;
}


/* Labels */

.divInput__demo1 label {
  color: #5f5049;

  font-size: clamp(10px, 1vw, 14px);
  font-weight: 500;

  letter-spacing: clamp(0.5px, 0.1vw, 1.5px);
}


/* Champs, listes et textarea */

.divInput__demo1 input,
.divInput__demo1 select,
.textareaNote {
  width: 100%;

  min-height: clamp(42px, 4vw, 58px);

  padding:
    0
    clamp(13px, 1.5vw, 20px);

  border: 1px solid #dfd0c4;
  border-radius: 8px;

  background: rgba(255, 255, 255, 0.88);

  color: #3d312c;

  font-family: inherit;
  font-size: clamp(10px, 1vw, 15px);

  outline: none;

  box-sizing: border-box;

  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
}


/* Placeholder */

.divInput__demo1 input::placeholder,
.textareaNote::placeholder {
  color: rgba(61, 49, 44, 0.46);
}


/* Focus */

.divInput__demo1 input:focus,
.divInput__demo1 select:focus,
.textareaNote:focus {
  border-color: #b08968;

  background: #fff;

  box-shadow:
    0 0 0 3px
    rgba(176, 137, 104, 0.1);
}


/* Zone de notes */

.textareaNote {
  min-height: clamp(90px, 9vw, 135px);

  padding:
    clamp(13px, 1.4vw, 18px)
    clamp(13px, 1.5vw, 20px);

  resize: vertical;

  line-height: 1.5;
}


/* Bouton principal */

.buttonValidate {
  width: 100%;

  min-height: clamp(45px, 4.5vw, 60px);

  margin-top: clamp(4px, 1vw, 12px);

  border: 1px solid #3d312c;
  border-radius: 6px;

  background: #3d312c;
  color: #fff;

  font-size: clamp(8px, 0.9vw, 12px);
  font-weight: 600;

  letter-spacing: clamp(1px, 0.2vw, 3px);

  cursor: pointer;

  transition:
    background 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease,
    transform 0.3s ease;
}

.buttonValidate:hover {
  border-color: #b08968;

  background: #b08968;

  transform: translateY(-2px);
}


/* Message de validation */

/* =====================================================
   CONFIRMATION DU RENDEZ-VOUS
===================================================== */

.responseValidate {
  
 width: 100%;
  margin-top: 0;

  max-height: 0;

  opacity: 0;
  overflow: hidden;

  transform: translateY(18px);

  transition:
    max-height 0.55s ease,
    margin-top 0.4s ease,
    opacity 0.4s ease,
    transform 0.4s ease;
}

.responseValidate.is-visible {
  max-height: 900px;

  margin-top: clamp(20px, 3vw, 38px);

  opacity: 1;

  transform: translateY(0);
}

.responseCard {
  width: 100%;

  display: grid;
  grid-template-columns: auto minmax(0, 1fr);

  gap: clamp(16px, 2vw, 25px);

  padding:
    clamp(22px, 3vw, 38px);

  border: 1px solid rgba(176, 137, 104, 0.28);
  border-radius: 10px;

  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.95),
      rgba(250, 245, 240, 0.88)
    );

  box-shadow:
    0 20px 50px
    rgba(75, 55, 45, 0.07);

  box-sizing: border-box;
}


/* Icône ronde */

.responseIcon {
  width: clamp(40px, 4vw, 54px);
  height: clamp(40px, 4vw, 54px);

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 50%;
}

.responseIcon svg {
  width: 48%;
  height: 48%;
}

.responseIcon--success {
  background: #e3d5ca;
  color: #725646;
}

.responseIcon--error {
  border: 1px solid #c48978;

  background: #f4e1dc;
  color: #9a5748;

  font-family: Georgia, serif;
  font-size: clamp(18px, 2vw, 25px);
}


/* Contenu principal */

.responseContent {
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: clamp(8px, 1vw, 13px);
}

.responseEyebrow {
  color: #b08968;

  font-size: clamp(7px, 0.75vw, 10px);
  font-weight: 600;

  letter-spacing: clamp(1.5px, 0.25vw, 3.5px);
}

.responseTitle {
  margin: 0;

  color: #3d312c;

  font-family:
    "Cormorant Garamond",
    Georgia,
    serif;

  font-size: clamp(22px, 2.5vw, 37px);
  font-weight: 500;

  line-height: 1.05;
}

.responseMessage {
  max-width: 620px;

  margin: 0;

  color: #6b5c54;

  font-size: clamp(9px, 1vw, 14px);
  line-height: 1.65;
}


/* Informations du rendez-vous */

.responseDetails {
  width: 100%;

  display: grid;
  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: clamp(9px, 1.2vw, 15px);

  margin-top: clamp(7px, 1vw, 12px);
}

.responseDetail {
  display: flex;
  flex-direction: column;

  gap: 5px;

  padding:
    clamp(12px, 1.5vw, 18px);

  border: 1px solid rgba(176, 137, 104, 0.2);
  border-radius: 7px;

  background: rgba(255, 255, 255, 0.66);
}

.responseDetailLabel {
  color: #b08968;

  font-size: clamp(6px, 0.7vw, 9px);
  font-weight: 600;

  letter-spacing: clamp(1px, 0.18vw, 2.5px);
}

.responseDetail strong {
  overflow-wrap: anywhere;

  color: #493a33;

  font-size: clamp(9px, 1vw, 14px);
  font-weight: 500;
}


/* Note facultative */

.responseNote {
  margin-top: clamp(5px, 0.8vw, 10px);

  padding:
    clamp(13px, 1.5vw, 18px);

  border-left: 2px solid #b08968;

  background: rgba(227, 213, 202, 0.28);
}

.responseNote p {
  margin:
    7px
    0
    0;

  color: #6b5c54;

  font-size: clamp(9px, 1vw, 13px);
  line-height: 1.55;

  overflow-wrap: anywhere;
}


/* Dernière phrase */

.responseFooter {
  margin:
    clamp(5px, 0.8vw, 10px)
    0
    0;

  color: #806d63;

  font-family:
    "Cormorant Garamond",
    Georgia,
    serif;

  font-size: clamp(13px, 1.4vw, 19px);
  font-style: italic;
}


/* Erreur */

.responseValidate.is-error .responseCard {
  border-color: rgba(154, 87, 72, 0.35);

  background:
    linear-gradient(
      145deg,
      rgba(255, 250, 248, 0.97),
      rgba(248, 235, 231, 0.9)
    );
}


/* Petit écran */

@media (max-width: 520px) {
  .responseCard {
    grid-template-columns: 1fr;
  }

  .responseDetails {
    grid-template-columns: 1fr;
  }
}


/* =====================================================
   COLONNE DROITE : CALENDRIER
===================================================== */

.rightRdv {
  width: 100%;
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: clamp(16px, 2vw, 26px);
}


/* Carte calendrier */

.divCalendar__demo1 {
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: clamp(13px, 1.8vw, 24px);

  padding:
    clamp(20px, 3vw, 38px)
    clamp(18px, 3vw, 38px);

  border: 1px solid rgba(176, 137, 104, 0.2);
  border-radius: 12px;

  background: rgba(255, 255, 255, 0.86);

  box-shadow:
    0 18px 45px
    rgba(75, 55, 45, 0.05);

  box-sizing: border-box;
}


/* Mois et flèches */

.divMonth {
  width: 100%;

  display: grid;
  grid-template-columns: 45px 1fr 45px;

  align-items: center;

  padding: 0;

  background: transparent;
}


/* Nom du mois */

.divMonth > span {
  text-align: center;

  color: #3d312c;

  font-family:
    "Cormorant Garamond",
    Georgia,
    serif;

  font-size: clamp(18px, 2vw, 29px);
  font-weight: 500;
}


/* Flèches du calendrier */

.arrowCalendar {
  width: clamp(32px, 3vw, 42px);
  height: clamp(32px, 3vw, 42px);

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 50%;

  background: transparent;
  color: #3d312c;

  font-size: clamp(16px, 1.8vw, 26px);

  cursor: pointer;

  transition:
    background 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease;
}

.arrowCalendar:hover {
  background: #e3d5ca;
  color: #3d312c;

  transform: scale(1.05);
}


/* Jours de la semaine */

.divWeek {
  width: 100%;

  display: grid;
  grid-template-columns: repeat(7, 1fr);

  align-items: center;
}

.divWeek span {
  text-align: center;

  color: #5f5049;

  font-size: clamp(7px, 0.8vw, 11px);
  font-weight: 600;

  letter-spacing: 0.5px;
}


/* Grille des jours */

.divDay {
  width: 100%;

  display: grid;
  grid-template-columns: repeat(7, 1fr);

  gap: clamp(4px, 0.7vw, 9px);

  padding: 0;

  justify-items: center;
  align-items: center;

  font-size: clamp(9px, 1vw, 15px);
}


/* Chaque jour */

.dayCalendar {
  width: clamp(27px, 2.8vw, 40px);
  height: clamp(27px, 2.8vw, 40px);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: 1px solid transparent;
  border-radius: 50%;

  color: #3d312c;

  cursor: pointer;

  transition:
    background 0.22s ease,
    border-color 0.22s ease,
    color 0.22s ease,
    transform 0.22s ease;
}

.dayCalendar:not(.otherMonth):hover {
  border-color: #d3b89f;

  background: rgba(227, 213, 202, 0.55);

  transform: translateY(-1px);
}


/* Jours du mois précédent ou suivant */

.otherMonth {
  opacity: 0.35;

  cursor: default;
}


/* Jour actuel */

.todayCalendar {
  border-color: #b08968;
}


/* Jour sélectionné */

.dayCalendar.activeDate {
  border-color: #d6c0ad;

  background: #e3d5ca;
  color: #3d312c;

  box-shadow:
    0 5px 13px
    rgba(176, 137, 104, 0.13);
}


/* =====================================================
   HORAIRES
===================================================== */

.hoursTitle {
  width: 100%;

  display: flex;
  align-items: center;

  gap: clamp(10px, 1.5vw, 20px);

  color: #5f5049;

  font-size: clamp(8px, 0.8vw, 11px);
  font-weight: 600;

  letter-spacing: clamp(0.8px, 0.15vw, 2px);

  text-align: center;
}

.hoursTitle::before,
.hoursTitle::after {
  content: "";

  flex: 1;

  height: 1px;

  background: #d8c2af;
}


/* Grille des heures */

.contentHours {
  width: 100%;
  height: auto;

  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  gap: clamp(8px, 1vw, 13px);

  justify-items: stretch;
  align-items: stretch;
}


/* Conteneur éventuel autour des heures */

.divHours {
  width: 100%;
}


/* Boutons horaires */

.hourSpan {
  width: 100%;
  min-height: clamp(37px, 3.7vw, 50px);

  display: flex;
  align-items: center;
  justify-content: center;

  padding:
    clamp(7px, 0.8vw, 10px)
    clamp(8px, 1vw, 14px);

  border: 1px solid #dfd0c4;
  border-radius: 6px;

  background: rgba(255, 255, 255, 0.86);
  color: #3d312c;

  font-size: clamp(9px, 1vw, 14px);

  cursor: pointer;

  box-sizing: border-box;

  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.hourSpan:hover {
  border-color: #c9a98e;

  background: #f8f2ed;

  transform: translateY(-1px);
}


/* Date et heure sélectionnées */

.activeDate {
  border-color: #c9a98e !important;

  background: #e3d5ca !important;

  box-shadow:
    0 5px 12px
    rgba(176, 137, 104, 0.12);
}


/* =====================================================
   DURÉE ESTIMÉE
===================================================== */

.durationBox {
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: clamp(5px, 0.8vw, 9px);

  padding:
    clamp(15px, 1.8vw, 23px)
    clamp(17px, 2vw, 25px);

  border: 1px solid #dfd0c4;
  border-radius: 8px;

  background: rgba(255, 255, 255, 0.75);

  box-sizing: border-box;
}

.durationTitle {
  color: #b08968;

  font-size: clamp(8px, 0.8vw, 11px);
  font-weight: 600;

  letter-spacing: clamp(1px, 0.2vw, 3px);
}

.durationText {
  color: #6b5c54;

  font-size: clamp(9px, 1vw, 14px);
}


/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 850px) {
  .divContentRdv__demo1 {
    grid-template-columns: 1fr;
  }

  .rightRdv {
    order: 1;
  }

  .leftRdv {
    display: contents;
  }

  .leftRdv > .divInput__demo1,
  .leftRdv > .buttonValidate {
    order: 2;
  }

  .responseValidate {
    order: 3;
    grid-column: 1;
    width: 100%;
  }
}

@media (max-width: 520px) {
  .contentRdv__demo1 {
    padding:
      20px
      12px;
  }

  .divContentRdv__demo1 {
    padding:
      24px
      14px;
  }

  .rdvTitle {
    font-size: clamp(32px, 12vw, 47px);
  }

  .divCalendar__demo1 {
    padding:
      20px
      12px;
  }

  .contentHours {
    grid-template-columns: repeat(2, 1fr);
  }

  .dayCalendar {
    width: 29px;
    height: 29px;
  }
}

/* =====================================================
   PAGE PRESTATIONS — RESPONSIVE MOBILE
===================================================== */

@media screen and (max-width: 650px) {

  /* Conteneur général de la page */
  .contentPrestation__demo1 {
    width: 100%;
    height: auto;

    padding:
      clamp(28px, 8vw, 45px)
      clamp(18px, 5vw, 28px);

    gap: clamp(45px, 12vw, 70px);

    overflow-x: hidden;
  }

  /* Chaque catégorie passe en colonne */
  .prestationCategory__demo1,
  .prestationCategory__demo1--reverse {
    width: 100%;

    display: flex;
    flex-direction: column;

    align-items: center;

    gap: clamp(24px, 7vw, 38px);
  }

  /*
   * On annule le row-reverse de la catégorie Hommes.
   * Ainsi, les trois sections ont toutes :
   * image en haut, texte en dessous.
   */
  .prestationCategory__demo1--reverse {
    flex-direction: column;
  }

  /* Image en arche */
  .prestationImage__demo1 {
    width: min(75%, 200px);
    height: clamp(250px, 80vw, 370px);

    flex-shrink: 0;

    margin: 0 auto;

    border-radius:
      clamp(110px, 35vw, 170px)
      clamp(110px, 35vw, 170px)
      0
      0;
  }

  .prestationImage__demo1 img {
    width: 100%;
    height: 100%;

    object-fit: cover;
    object-position: center;
  }

  /* Partie texte */
  .prestationText__demo1 {
    width: 100%;
    min-width: 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: clamp(12px, 4vw, 20px);

    text-align: center;
  }

  .prestationSubtitle__demo1 {
    width: 100%;

    font-size: clamp(8px, 2.6vw, 11px);
    letter-spacing: clamp(2px, 1vw, 4px);

    text-align: center;
  }

  .prestationTitle__demo1 {
    width: 100%;

    font-size: clamp(25px, 10vw, 40px);
    line-height: 0.95;

    text-align: center;
  }

  .prestationText__demo1 p {
    width: 100%;
    max-width: 430px;

    font-size: clamp(13px, 3.8vw, 16px);
    line-height: 1.65;

    text-align: center;
  }

  /* Bouton */
  .prestationButton__demo1 {
    width: min(78%, 270px);

    margin-top: clamp(7px, 2vw, 12px);

    padding:
      13px
      20px;

    font-size: clamp(9px, 2.7vw, 11px);
    letter-spacing: clamp(1px, 0.7vw, 2.5px);

    text-align: center;
  }
}

@media screen and (max-width:650px){;

  .logo__hero__demo1 {
  width: clamp(100px, 30vw, 200px);
  } 

  .contentSuite__demo1 {
    width: 100%;
    min-height: 0;

    display: block;

    margin-top: 0;

    padding:
      clamp(32px, 8vw, 45px)
      clamp(20px, 6vw, 30px);
    
    background: #fff;

    overflow: hidden;
    box-sizing: border-box;
    }

    .imgContentSuite__demo1{

        float:right;

        position:relative;
        top:auto;
        right:auto;

        width:50%;
        height:380px;

        margin:
            0
            0
            15px
            20px;

        border-radius:
            0
            0
            120px
            120px;
    }

    .textContentSuite__demo1 {
        width: 100%;
        min-width: 0;

        display: block;

        padding: 0;

        position: relative;
    }

    /* Cache l’image desktop */
    .imgContentSuite__demo1--desktop {
        display: none;
    }

    /* Affiche l’image placée dans le texte */
    .imgContentSuite__demo1--mobile {
        display: block;

        float: right;

        position: relative;
        top: auto;
        right: auto;

        width: clamp(165px, 42%, 230px);
        height: clamp(150px, 40vw, 300px);

        margin:
            clamp(8px, 2vw, 15px)
            0
            clamp(12px, 3vw, 20px)
            clamp(18px, 5vw, 28px);

        background: #d6ccc2;

        border-radius:
            0
            0
            clamp(90px, 25vw, 140px)
            clamp(90px, 25vw, 140px);

        overflow: hidden;
    }

    .imgContentSuite__demo1--mobile .img-contentSuite {
        width: 100%;
        height: 100%;

        display: block;

        object-fit: cover;
        object-position: center;
    }

    .subtitleSuite {
        display: block;

        margin: 0 0 14px;

        font-size: clamp(9px, 2.5vw, 12px);
        letter-spacing: clamp(2px, 0.8vw, 4px);
    }

    .titleSuite {
        max-width: 100%;

        margin: 0 0 clamp(22px, 6vw, 32px);

        font-size: clamp(15px, 8vw, 30px);
        line-height: 0.98;
    }

    .textSuite {
        max-width: none;

        margin: 0 0 clamp(14px, 4vw, 22px);

        font-size: clamp(14px, 3.8vw, 17px);
        line-height: 1.7;

        text-align: left;
    }

    .buttonSuite{
    clear: both;
    display: block;

    width: fit-content;

    margin:
        clamp(30px, 7vw, 40px)
        auto
        0;

    padding: 14px 28px;
    font-size: clamp(10px, 2.5vw, 12px);
}

    /*
     * Force le conteneur à englober correctement
     * l’image flottante.
     */
    .textContentSuite__demo1::after {
        content: "";
        display: block;
        clear: both;
    }

}
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
                <li class="header__nav__demo1__link"><span data-page="home" >ACCUEIL</span></li>
                <li class="header__nav__demo1__link"><span data-page="prestation" >PRESTATION</span></li>
                <li class="header__nav__demo1__link"><span data-page="rdv" >RDV</span></li>
            </ul>
        </nav>

        <div class="wrapper__demo1"> 
            <div class="hero__demo1">
              <img class="img__hero" src="./img/hero-coiffure.png" alt="Intérieur du salon de coiffure">
              <img class="logo__hero__demo1" src="./img/logoSalonCoiffure.png" alt="UMA Salon de coiffure">
            </div>

            <div class="contentService__demo1">
                <div class="divService__demo1"> <img class="img__coiffure" src="./img/coiffure1.png" alt="Logo"> <div class="divTextService__demo1"> FEMME </div> </div>
                <div class="divService__demo1"> <img class="img__coiffure" src="./img/coiffure3.png" alt="Logo"> <div class="divTextService__demo1"> HOMME</div> </div>
                <div class="divService__demo1"> <img class="img__coiffure" src="./img/coiffure2.png" alt="Logo"> <div class="divTextService__demo1"> EVENEMENT </div> </div>
            </div> 

            <div class="contentSuite__demo1">

    <div class="textContentSuite__demo1">

        <span class="subtitleSuite">
            NOTRE SALON
        </span>

        <h2 class="titleSuite">
            Un salon dédié à votre beauté
        </h2>

        <!-- Image utilisée uniquement sur téléphone -->
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

    <!-- Image utilisée sur ordinateur -->
    <div class="imgContentSuite__demo1 imgContentSuite__demo1--desktop">
        <img
            class="img-contentSuite"
            src="./img/salon-coiffure.png"
            alt="Intérieur du salon de coiffure"
        >
    </div>

</div>

            <div class="contentPhoto__demo1">
                <div class="divImgContentPhoto__demo1"> <img class="img__favorite__coiffure" src="./img/favorite-coiffure2.png" alt="Logo"> </div>
                <div class="divImgContentPhoto__demo1"> <img class="img__favorite__coiffure" src="./img/favorite-coiffure4.png" alt="Logo"> </div>
                <div class="divImgContentPhoto__demo1"> <img class="img__favorite__coiffure" src="./img/favorite-coiffure3.png" alt="Logo"> </div>
                <div class="divImgContentPhoto__demo1"> <img class="img__favorite__coiffure" src="./img/favorite-coiffure1.png" alt="Logo"> </div>
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
    `;

  element.querySelector(".buttonSuite")?.addEventListener("click", () => {
    createPrestationHTML(element);

    requestAnimationFrame(() => {
      element.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });

  const rdvButton = element.querySelector(".rdv-button");

  rdvButton.addEventListener("click", () => {
    createRdvHTML(element);
  });

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
  
    <div class="hero__demo1">
              <img class="img__hero" src="./img/hero-coiffure.png" alt="Intérieur du salon de coiffure">
              <img class="logo__hero__demo1" src="./img/logoSalonCoiffure.png" alt="UMA Salon de coiffure">
            </div>

    <div class="contentPrestation__demo1">

  <!-- FEMMES -->

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


  <!-- HOMMES -->

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


  <!-- ÉVÉNEMENTS -->

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

    <div class="divPrestationImage__demo1"> </div>
    
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

  // Remonte en haut après le changement de page
  requestAnimationFrame(() => {
    element.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

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

  arrowLeft.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
    choiceDate(element);
  });

  arrowRight.addEventListener("click", () => {
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

  /*
   * Vérification des champs obligatoires.
   */
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

    responseValidate.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    return;
  }

  /*
   * Tous les renseignements connus.
   */
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

  /*
   * On attend que la carte soit dessinée avant de scroller.
   */
  requestAnimationFrame(() => {
    responseValidate.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
