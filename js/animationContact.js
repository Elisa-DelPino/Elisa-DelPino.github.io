let contactAnimationInitialized = false;
let contactObserver = null;

export function initContactAnimation() {
  if (contactAnimationInitialized) return;

  const contactSection = document.querySelector(".section__contact");

  const infoPanel = document.querySelector(".contact__info-panel");

  const formPanel = document.querySelector(".form__contact");

  if (!contactSection || !infoPanel || !formPanel) {
    console.warn(
      "La section contact, les informations ou le formulaire sont introuvables.",
    );

    return;
  }

  contactAnimationInitialized = true;

  /*
   * Accessibilité : aucune animation si l’utilisateur
   * préfère réduire les mouvements.
   */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    infoPanel.classList.add("is-contact-info-visible");
    formPanel.classList.add("is-contact-form-visible");

    return;
  }

  contactObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        if (entry.target.classList.contains("contact__info-panel")) {
          entry.target.classList.add("is-contact-info-visible");
        }

        if (entry.target.classList.contains("form__contact")) {
          entry.target.classList.add("is-contact-form-visible");
        }

        /*
         * Chaque bloc ne s’anime qu’une seule fois.
         */
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  contactObserver.observe(infoPanel);
  contactObserver.observe(formPanel);
}

export function destroyContactAnimation() {
  if (contactObserver) {
    contactObserver.disconnect();
    contactObserver = null;
  }

  const infoPanel = document.querySelector(".contact__info-panel");

  const formPanel = document.querySelector(".form__contact");

  infoPanel?.classList.remove("is-contact-info-visible");

  formPanel?.classList.remove("is-contact-form-visible");

  contactAnimationInitialized = false;
}
