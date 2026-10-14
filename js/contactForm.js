const contactForm = document.getElementById("contactForm");
const contactFormStatus = document.getElementById("contactFormStatus");

if (contactForm && contactFormStatus) {
  const submitButton = contactForm.querySelector(".contact__submit");
  const submitText = submitButton?.querySelector("span");
  const emailInput = contactForm.querySelector("#email");
  const phoneInput = contactForm.querySelector("#phone");

  function validateContactMethods() {
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    emailInput.setCustomValidity("");
    phoneInput.setCustomValidity("");

    if (!email && !phone) {
      emailInput.setCustomValidity(
        "Veuillez renseigner une adresse e-mail ou un numéro de téléphone.",
      );
      return;
    }

    if (phone) {
      const digits = phone.replace(/\D/g, "");
      const validCharacters = /^\+?[0-9\s().-]+$/.test(phone);

      if (!validCharacters || digits.length < 8 || digits.length > 15) {
        phoneInput.setCustomValidity(
          "Veuillez saisir un numéro de téléphone valide.",
        );
      }
    }
  }

  emailInput.addEventListener("input", validateContactMethods);
  phoneInput.addEventListener("input", validateContactMethods);

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    validateContactMethods();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    contactFormStatus.textContent = "Envoi en cours...";
    contactFormStatus.classList.remove("is-success", "is-error");

    if (submitButton) {
      submitButton.disabled = true;
    }

    if (submitText) {
      submitText.textContent = "ENVOI...";
    }

    try {
      const formData = new FormData(contactForm);
      const formObject = Object.fromEntries(formData.entries());

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formObject),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Erreur lors de l'envoi.");
      }

      contactFormStatus.textContent = "Votre message a bien été envoyé.";
      contactFormStatus.classList.add("is-success");

      contactForm.reset();
      emailInput.setCustomValidity("");
      phoneInput.setCustomValidity("");
    } catch (error) {
      console.error("Erreur Web3Forms :", error);

      contactFormStatus.textContent =
        "Une erreur est survenue. Veuillez réessayer.";

      contactFormStatus.classList.add("is-error");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }

      if (submitText) {
        submitText.textContent = "ENVOYER";
      }
    }
  });
}
