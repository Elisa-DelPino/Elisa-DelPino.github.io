import { loadStylesheet } from "./resourceLoader.js";

function createLazyAnimation(exportName) {
  let animationPromise = null;

  return (element) => {
    if (!element) {
      return;
    }

    if (!animationPromise) {
      animationPromise = import("./animDemo.js").then((module) => {
        const animation = module[exportName];

        if (typeof animation !== "function") {
          throw new Error(`Animation ${exportName} introuvable.`);
        }

        return animation;
      });
    }

    animationPromise
      .then((animation) => {
        if (!element.isConnected) {
          return;
        }

        animation(element);
      })
      .catch((error) => {
        console.error(error);
      });
  };
}

const dataDemoWeb = [
  {
    title: "DEMO - Salon de coiffure",
    textContent: "Démo d'un site de salon de coiffure ",
    loadImg: async () => {
      await loadStylesheet("./css/demo1.css", "demo1-styles");

      const { addDemoWeb1 } = await import("./demoWeb1.js");

      return addDemoWeb1;
    },
  },
  {
    title: "DEMO - Site vitrine d'une patisserie",
    textContent: "Démo d'un site vitrine d'une patisserie ",
    loadImg: async () => {
      await loadStylesheet("./css/demo2.css", "demo2-styles");

      const { addDemoWeb2 } = await import("./demoWeb2.js");

      return addDemoWeb2;
    },
  },
  {
    title: "DEMO  - Site e-commerce de décoration d'intérieur",
    textContent: "Site e-commerce de décoration d'intérieur ",
    loadImg: async () => {
      await loadStylesheet("./css/demo3.css", "demo3-styles");

      const { addDemoWeb3 } = await import("./demoWeb3.js");

      return addDemoWeb3;
    },
  },
];

const dataDemoAnim = [
  {
    title: "ANIM 1",
    textContent: "ANIM 1 ",
    video: "./video/anim1B.mp4",
    anim: createLazyAnimation("anim1"),
  },
  {
    title: "ANIM 2",
    textContent: "ANIM 2 ",
    video: "./video/anim2B.mp4",
    anim: createLazyAnimation("anim2"),
  },
  {
    title: "ANIM 3",
    textContent: "ANIM 3 ",
    video: "./video/anim3B.mp4",
    anim: createLazyAnimation("anim3"),
  },
  {
    title: "ANIM 4",
    textContent: "ANIM 4 ",
    video: "./video/anim4B.mp4",
    anim: createLazyAnimation("anim4"),
  },
  {
    title: "ANIM 5",
    textContent: "ANIM 5 ",
    video: "./video/anim5B.mp4",
    anim: createLazyAnimation("anim5"),
  },
  {
    title: "ANIM 6",
    textContent: "ANIM 6 ",
    video: "./video/anim6B.mp4",
    anim: createLazyAnimation("anim6"),
  },
  {
    title: "ANIM 7",
    textContent: "ANIM 7 ",
    video: "./video/anim7B.mp4",
    anim: createLazyAnimation("anim7"),
  },
  {
    title: "ANIM 8",
    textContent: "ANIM 8 ",
    video: "./video/anim8B.mp4",
    anim: createLazyAnimation("anim8"),
  },
];

export function getDataWeb() {
  return dataDemoWeb;
}

export function getDataAnim() {
  return dataDemoAnim;
}
