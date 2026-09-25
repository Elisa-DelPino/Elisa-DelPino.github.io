const contactForm = document.getElementById("contactForm");
const contactFormStatus = document.getElementById("contactFormStatus");

if (contactForm && contactFormStatus) {
  const submitButton = contactForm.querySelector(".contact__submit");
  const submitText = submitButton?.querySelector("span");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

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
