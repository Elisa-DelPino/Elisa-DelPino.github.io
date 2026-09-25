const stylesheetPromises = new Map();
const scriptPromises = new Map();

/* =========================================================
   CHARGEMENT DES FEUILLES DE STYLE
========================================================= */

export function loadStylesheet(href, id = "") {
  const absoluteHref = new URL(href, document.baseURI).href;

  const existingLink = [
    ...document.querySelectorAll('link[rel="stylesheet"]'),
  ].find((link) => link.href === absoluteHref);

  if (existingLink) {
    if (existingLink.sheet) {
      return Promise.resolve(existingLink);
    }

    return new Promise((resolve, reject) => {
      existingLink.addEventListener("load", () => resolve(existingLink), {
        once: true,
      });

      existingLink.addEventListener(
        "error",
        () => reject(new Error(`Impossible de charger ${href}`)),
        {
          once: true,
        },
      );
    });
  }

  if (stylesheetPromises.has(absoluteHref)) {
    return stylesheetPromises.get(absoluteHref);
  }

  const promise = new Promise((resolve, reject) => {
    const link = document.createElement("link");

    link.rel = "stylesheet";
    link.href = href;

    if (id) {
      link.id = id;
    }

    link.addEventListener(
      "load",
      () => {
        resolve(link);
      },
      {
        once: true,
      },
    );

    link.addEventListener(
      "error",
      () => {
        stylesheetPromises.delete(absoluteHref);
        link.remove();
        reject(new Error(`Impossible de charger ${href}`));
      },
      {
        once: true,
      },
    );

    document.head.appendChild(link);
  });

  stylesheetPromises.set(absoluteHref, promise);

  return promise;
}

/* =========================================================
   CHARGEMENT DES SCRIPTS EXTERNES
========================================================= */

export function loadScript(src, id = "") {
  const absoluteSrc = new URL(src, document.baseURI).href;

  const existingScript = [...document.scripts].find(
    (script) => script.src === absoluteSrc,
  );

  if (existingScript) {
    if (existingScript.dataset.loaded === "true") {
      return Promise.resolve(existingScript);
    }

    return new Promise((resolve, reject) => {
      existingScript.addEventListener(
        "load",
        () => {
          existingScript.dataset.loaded = "true";
          resolve(existingScript);
        },
        {
          once: true,
        },
      );

      existingScript.addEventListener(
        "error",
        () => reject(new Error(`Impossible de charger ${src}`)),
        {
          once: true,
        },
      );
    });
  }

  if (scriptPromises.has(absoluteSrc)) {
    return scriptPromises.get(absoluteSrc);
  }

  const promise = new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.src = src;
    script.async = true;

    if (id) {
      script.id = id;
    }

    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolve(script);
      },
      {
        once: true,
      },
    );

    script.addEventListener(
      "error",
      () => {
        scriptPromises.delete(absoluteSrc);
        script.remove();
        reject(new Error(`Impossible de charger ${src}`));
      },
      {
        once: true,
      },
    );

    document.head.appendChild(script);
  });

  scriptPromises.set(absoluteSrc, promise);

  return promise;
}
