import { addDemoWeb1 } from "./demoWeb1.js";
import { addDemoWeb2 } from "./demoWeb2.js";
import { addDemoWeb3 } from "./demoWeb3.js";
import { anim1 } from "./animDemo.js";
import { anim2 } from "./animDemo.js";
import { anim3 } from "./animDemo.js";
import { anim4 } from "./animDemo.js";
import { anim5 } from "./animDemo.js";
import { anim6 } from "./animDemo.js";
import { anim7 } from "./animDemo.js";
import { anim8 } from "./animDemo.js";

import { autoWriteText } from "./animationHome.js";
import { initDecodeText } from "./animationHome.js";

const dataDemoWeb = [
  {
    title: "DEMO - Salon de coiffure",
    textContent: "Démo d'un site de salon de coiffure ",
    img: addDemoWeb1,
  },

  {
    title: "DEMO - Site vitrine d'une patisserie",
    textContent: "Démo d'un site vitrine d'une patisserie ",
    img: addDemoWeb2,
  },

  {
    title: "DEMO  - Site e-commerce de décoration d'intérieur",
    textContent: "Site e-commerce de décoration d'intérieur ",
    img: addDemoWeb3,
  },
];

const dataDemoAnim = [
  {
    title: "ANIM 1",
    textContent: "ANIM 1 ",
    video: "./video/anim1B.mp4",
    anim: anim1,
  },
  {
    title: "ANIM 2",
    textContent: "ANIM 2 ",
    video: "./video/anim2B.mp4",
    anim: anim2,
  },
  {
    title: "ANIM 3",
    textContent: "ANIM 3 ",
    video: "./video/anim3B.mp4",
    anim: anim3,
  },
  {
    title: "ANIM 4",
    textContent: "ANIM 4 ",
    video: "./video/anim4B.mp4",
    anim: anim4,
  },
  {
    title: "ANIM 5",
    textContent: "ANIM 5 ",
    video: "./video/anim5B.mp4",
    anim: anim5,
  },
  {
    title: "ANIM 6",
    textContent: "ANIM 6 ",
    video: "./video/anim6B.mp4",
    anim: anim6,
  },
  {
    title: "ANIM 7",
    textContent: "ANIM 7 ",
    video: "./video/anim7B.mp4",
    anim: anim7,
  },
  {
    title: "ANIM 8",
    textContent: "ANIM 8 ",
    video: "./video/anim8B.mp4",
    anim: anim8,
  },
];

export function getDataWeb() {
  return dataDemoWeb;
}

export function getDataAnim() {
  return dataDemoAnim;
}
