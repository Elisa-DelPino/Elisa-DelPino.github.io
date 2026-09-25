// logicielDevis.js

import { openOverlayHistory, closeOverlayHistory } from "./overlayHistory.js";

/* =====================================================
   CLIENTS DE DÉMONSTRATION
===================================================== */

const INITIAL_CLIENTS = [
  {
    id: "devis-client-001",
    firstName: "Julie",
    lastName: "Martin",
    company: "",
    address: "18 rue Paradis\n13006 Marseille",
    quoteNumber: "DV-001",
    services: [
      {
        id: "service-001",
        label: "Café Arabica",
        quantity: 12,
        price: 2.99,
      },
      {
        id: "service-002",
        label: "Chocolat en poudre Noir 70%",
        quantity: 20,
        price: 1.75,
      },
    ],
  },
  {
    id: "devis-client-002",
    firstName: "Sophie",
    lastName: "Bernard",
    company: "Atelier Nova",
    address: "42 avenue du Prado\n13008 Marseille",
    quoteNumber: "DV-002",
    services: [],
  },
  {
    id: "devis-client-003",
    firstName: "Thomas",
    lastName: "Leroy",
    company: "",
    address: "7 boulevard Longchamp\n13001 Marseille",
    quoteNumber: "DV-003",
    services: [],
  },
];

/* =====================================================
   ÉTAT DU LOGICIEL
===================================================== */

let clients = INITIAL_CLIENTS.map((client) => ({
  ...client,
  services: client.services.map((service) => ({
    ...service,
  })),
}));

let selectedClientId = clients[0]?.id ?? null;
let lastFocusedElement = null;
let previousBodyOverflow = "";
let isInitialized = false;
let clientModalLastFocusedElement = null;

const FOCUSABLE_SELECTOR =
  'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),video[controls],[tabindex]:not([tabindex="-1"])';

/* =====================================================
   RÉFÉRENCES DOM
===================================================== */

let overlay = null;
let dialog = null;
let mobilePreviewOverlay = null;
let mobilePreviewVideo = null;
let mobilePreviewDialog = null;
let clientList = null;
let selectedClientContainer = null;
let serviceForm = null;
let serviceNameInput = null;
let serviceQuantityInput = null;
let servicePriceInput = null;
let serviceMessage = null;
let serviceList = null;
let quoteClient = null;
let quoteBody = null;
let quoteTotal = null;
let quoteNumber = null;
let quoteDate = null;
let clientModal = null;
let clientModalDialog = null;
let clientForm = null;
let clientFormMessage = null;

/* =====================================================
   ACCESSIBILITÉ ET RÉDUCTION DES MOUVEMENTS
===================================================== */

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getFocusableElements(container) {
  if (!container) {
    return [];
  }

  return [...container.querySelectorAll(FOCUSABLE_SELECTOR)].filter(
    (element) => {
      const style = window.getComputedStyle(element);

      return (
        !element.closest('[hidden], [aria-hidden="true"]') &&
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        element.getClientRects().length > 0
      );
    },
  );
}

function trapFocus(event, container) {
  if (event.key !== "Tab" || !container) {
    return;
  }

  const focusableElements = getFocusableElements(container);

  if (focusableElements.length === 0) {
    event.preventDefault();
    container.focus();
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  const activeElement = document.activeElement;

  if (!container.contains(activeElement)) {
    event.preventDefault();
    (event.shiftKey ? lastElement : firstElement).focus();
    return;
  }

  if (event.shiftKey && activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
    return;
  }

  if (!event.shiftKey && activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

/* =====================================================
   HTML PRINCIPAL
===================================================== */

function createDemoHTML() {
  return `
    <div
      class="logiciel-devis-overlay"
      id="logiciel-devis-overlay"
      aria-hidden="true"
    >
      <div
        class="devis-demo"
        role="dialog"
        aria-modal="true"
        aria-label="Logiciel de gestion clients et création de devis"
        tabindex="-1"
      >
        <button
          class="devis-demo__close"
          type="button"
          aria-label="Fermer la démonstration"
          data-devis-close
        >
          ×
        </button>

        <!-- =====================================================
             CLIENTS
        ====================================================== -->

        <aside class="devis-demo__clients">
          <h2 class="devis-demo__section-title">
            Clients
          </h2>

          <p class="devis-demo__section-description">
            Sélectionnez un client pour préparer son devis.
          </p>

          <button
            class="devis-demo__new-client"
            type="button"
            data-devis-new-client
          >
            + Nouveau client
          </button>

          <div
            class="devis-demo__client-list"
            data-devis-client-list
          ></div>
        </aside>

        <!-- =====================================================
             ESPACE DE TRAVAIL
        ====================================================== -->

        <main class="devis-demo__workspace">

          <!-- =====================================================
               CLIENT SÉLECTIONNÉ
          ====================================================== -->

          <section
            class="devis-demo__client-card"
            data-devis-selected-client
          ></section>

          <!-- =====================================================
               AJOUTER UN PRODUIT OU UNE PRESTATION
          ====================================================== -->

          <section class="devis-demo__service-card">
            <h3 class="devis-demo__subtitle">
              Ajouter un produit ou une prestation
            </h3>

            <form
              class="devis-demo__service-form"
              data-devis-service-form
              novalidate
            >
              <div class="devis-demo__field">
                <label for="devis-service-name">
                  Produit ou prestation
                </label>

                <input
                  id="devis-service-name"
                  name="service"
                  type="text"
                  placeholder="Ex. Café noir"
                  autocomplete="off"
                  data-devis-service-name
                />
              </div>

              <div class="devis-demo__field">
                <label for="devis-service-quantity">
                  Quantité
                </label>

                <input
                  id="devis-service-quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  step="1"
                  value="1"
                  inputmode="numeric"
                  data-devis-service-quantity
                />
              </div>

              <div class="devis-demo__field">
                <label for="devis-service-price">
                  Prix unitaire (€)
                </label>

                <input
                  id="devis-service-price"
                  name="price"
                  type="text"
                  inputmode="decimal"
                  placeholder="250"
                  autocomplete="off"
                  data-devis-service-price
                />
              </div>

              <button
                class="devis-demo__add-service"
                type="submit"
              >
                Ajouter
              </button>
            </form>

            <p
              class="devis-demo__form-message"
              data-devis-service-message
              aria-live="polite"
            ></p>
          </section>

          <!-- =====================================================
               PRODUITS ET PRESTATIONS
          ====================================================== -->

          <section class="devis-demo__services-card">
            <h3 class="devis-demo__subtitle">
              Produits et prestations du devis
            </h3>

            <div
              class="devis-demo__service-list"
              data-devis-service-list
            ></div>
          </section>
        </main>

        <!-- =====================================================
             DEVIS
        ====================================================== -->

        <aside class="devis-demo__preview-panel">
          <div class="devis-demo__paper">
            <div class="devis-demo__paper-header">
              <h2 class="devis-demo__paper-title">
                DEVIS
              </h2>

              <div class="devis-demo__paper-meta">
                <span>
                  N° <strong data-devis-quote-number></strong>
                </span>

                <span>
                  Date : <strong data-devis-date></strong>
                </span>
              </div>
            </div>

            <div
              class="devis-demo__paper-client"
              data-devis-quote-client
            ></div>

            <table class="devis-demo__quote-table">
              <thead>
                <tr>
                  <th>
                    Produit ou prestation
                  </th>

                  <th>
                    Qté
                  </th>

                  <th>
                    Prix unitaire
                  </th>

                  <th>
                    Montant
                  </th>
                </tr>
              </thead>

              <tbody data-devis-quote-body></tbody>
            </table>

            <div class="devis-demo__quote-total">
              <span>
                Total
              </span>

              <strong data-devis-total>
                0,00 €
              </strong>
            </div>
          </div>

          <button
            class="devis-demo__reset"
            type="button"
            data-devis-reset
          >
            RÉINITIALISER
          </button>
        </aside>

        <!-- =====================================================
             NOUVEAU CLIENT
        ====================================================== -->

        <div
          class="devis-demo__client-modal"
          data-devis-client-modal
          aria-hidden="true"
        >
          <div
            class="devis-demo__client-form-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="devis-client-modal-title"
            tabindex="-1"
          >
            <h3
              class="devis-demo__client-form-title"
              id="devis-client-modal-title"
            >
              Nouveau client
            </h3>

            <form
              class="devis-demo__client-form"
              data-devis-client-form
              novalidate
            >
              <div class="devis-demo__client-form-row">
                <div class="devis-demo__field">
                  <label for="devis-client-firstname">
                    Prénom
                  </label>

                  <input
                    id="devis-client-firstname"
                    name="firstName"
                    type="text"
                    autocomplete="off"
                  />
                </div>

                <div class="devis-demo__field">
                  <label for="devis-client-lastname">
                    Nom
                  </label>

                  <input
                    id="devis-client-lastname"
                    name="lastName"
                    type="text"
                    autocomplete="off"
                  />
                </div>
              </div>

              <div class="devis-demo__field">
                <label for="devis-client-company">
                  Raison sociale
                </label>

                <input
                  id="devis-client-company"
                  name="company"
                  type="text"
                  placeholder="Facultatif"
                  autocomplete="off"
                />
              </div>

              <div class="devis-demo__field">
                <label for="devis-client-address">
                  Adresse
                </label>

                <textarea
                  id="devis-client-address"
                  name="address"
                  placeholder="Adresse du client"
                ></textarea>
              </div>

              <p
                class="devis-demo__client-form-message"
                data-devis-client-form-message
                aria-live="polite"
              ></p>

              <div class="devis-demo__client-form-actions">
                <button
                  class="devis-demo__cancel-client"
                  type="button"
                  data-devis-cancel-client
                >
                  Annuler
                </button>

                <button
                  class="devis-demo__save-client"
                  type="submit"
                >
                  Ajouter le client
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* =====================================================
   APERÇU VIDÉO POUR ÉCRANS <= 900 PX
===================================================== */

function createMobilePreviewHTML() {
  return `
    <div
      class="
        logiciel-devis-overlay
        logiciel-devis-preview-overlay
      "
      id="logiciel-devis-preview-overlay"
      aria-hidden="true"
    >
      <div
        class="logiciel-devis-preview"
        role="dialog"
        aria-modal="true"
        aria-label="Aperçu vidéo du logiciel de gestion clients et devis"
        tabindex="-1"
      >
        <video
          class="logiciel-devis-preview__media"
          data-devis-preview-video
          data-src="./video/demoDevis.mp4"
          muted
          loop
          playsinline
          preload="none"
          aria-label="Aperçu vidéo du logiciel de gestion clients et devis"
        ></video>

        <button
          class="logiciel-devis-preview__close"
          type="button"
          aria-label="Fermer l'aperçu"
          data-devis-preview-close
        >
          ×
        </button>
      </div>
    </div>
  `;
}

/* =====================================================
   TAILLE D'ÉCRAN
===================================================== */

function isSmallDevisScreen() {
  return window.matchMedia("(max-width: 900px)").matches;
}

/* =====================================================
   VIDÉO MOBILE
===================================================== */

function playMobilePreviewVideo() {
  if (!mobilePreviewVideo) {
    return;
  }

  if (!mobilePreviewVideo.getAttribute("src")) {
    const source = mobilePreviewVideo.dataset.src;

    if (source) {
      mobilePreviewVideo.src = source;
      mobilePreviewVideo.load();
    }
  }

  try {
    mobilePreviewVideo.currentTime = 0;
  } catch {}

  if (prefersReducedMotion()) {
    mobilePreviewVideo.pause();
    mobilePreviewVideo.controls = true;
    mobilePreviewVideo.loop = false;
    mobilePreviewVideo.removeAttribute("loop");
    return;
  }

  mobilePreviewVideo.controls = false;
  mobilePreviewVideo.loop = true;
  mobilePreviewVideo.setAttribute("loop", "");

  const playPromise = mobilePreviewVideo.play();

  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {});
  }
}

function stopMobilePreviewVideo() {
  if (!mobilePreviewVideo) {
    return;
  }

  mobilePreviewVideo.pause();

  try {
    mobilePreviewVideo.currentTime = 0;
  } catch {}
}

/* =====================================================
   OUTILS
===================================================== */

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatPrice(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function parsePrice(value) {
  const normalizedValue = String(value)
    .trim()
    .replace(/\s/g, "")
    .replace(",", ".");

  const number = Number(normalizedValue);

  if (!Number.isFinite(number) || number <= 0) {
    return null;
  }

  return Math.round(number * 100) / 100;
}

function parseQuantity(value) {
  const number = Number(value);

  if (!Number.isInteger(number) || number < 1) {
    return null;
  }

  return number;
}

function normalizeServiceLabel(value) {
  return String(value)
    .trim()
    .replace(/\s+/g, " ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr-FR");
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getSelectedClient() {
  return clients.find((client) => client.id === selectedClientId) ?? null;
}

function getClientDisplayName(client) {
  if (!client) {
    return "";
  }

  if (client.company.trim()) {
    return client.company.trim();
  }

  return `${client.firstName} ${client.lastName}`.trim();
}

function getClientPersonName(client) {
  if (!client) {
    return "";
  }

  return `${client.firstName} ${client.lastName}`.trim();
}

function getQuoteTotal(client) {
  if (!client) {
    return 0;
  }

  return client.services.reduce((total, service) => {
    return total + service.price * service.quantity;
  }, 0);
}

function createQuoteNumber() {
  const highestNumber = clients.reduce((highest, client) => {
    const number = Number(client.quoteNumber.replace(/\D/g, ""));

    return Number.isFinite(number) ? Math.max(highest, number) : highest;
  }, 0);

  return `DV-${String(highestNumber + 1).padStart(3, "0")}`;
}

/* =====================================================
   CLIENTS
===================================================== */

function renderClients() {
  if (!clientList) {
    return;
  }

  clientList.innerHTML = clients
    .map((client) => {
      const isActive = client.id === selectedClientId;
      const displayName = getClientDisplayName(client);
      const type = client.company.trim() ? "Professionnel" : "Particulier";

      return `
        <div class="devis-demo__client-item">
          <button
            class="devis-demo__client-button${isActive ? " is-active" : ""}"
            type="button"
            data-devis-client-id="${escapeHTML(client.id)}"
          >
            <span class="devis-demo__client-name">
              ${escapeHTML(displayName)}
            </span>

            <span class="devis-demo__client-type">
              ${type}
            </span>
          </button>

          <button
            class="devis-demo__delete-client"
            type="button"
            data-devis-delete-client="${escapeHTML(client.id)}"
            aria-label="Supprimer ${escapeHTML(displayName)}"
          >
            ×
          </button>
        </div>
      `;
    })
    .join("");
}

/* =====================================================
   CLIENT SÉLECTIONNÉ
===================================================== */

function renderSelectedClient() {
  if (!selectedClientContainer) {
    return;
  }

  const client = getSelectedClient();

  if (!client) {
    selectedClientContainer.innerHTML = `
      <span class="devis-demo__eyebrow">
        Client sélectionné
      </span>

      <p class="devis-demo__selected-address">
        Aucun client sélectionné.
      </p>
    `;

    return;
  }

  const displayName = getClientDisplayName(client);
  const personName = getClientPersonName(client);
  const showPerson = client.company.trim() && personName;

  selectedClientContainer.innerHTML = `
    <span class="devis-demo__eyebrow">
      Client sélectionné
    </span>

    <h3 class="devis-demo__selected-name">
      ${escapeHTML(displayName)}
    </h3>

    ${
      showPerson
        ? `
          <p class="devis-demo__selected-person">
            ${escapeHTML(personName)}
          </p>
        `
        : ""
    }

    <p class="devis-demo__selected-address">
      ${escapeHTML(client.address).replaceAll("\n", "<br>")}
    </p>
  `;
}

/* =====================================================
   PRODUITS ET PRESTATIONS
===================================================== */

function renderServices() {
  if (!serviceList) {
    return;
  }

  const client = getSelectedClient();

  if (!client || client.services.length === 0) {
    serviceList.innerHTML = `
      <p class="devis-demo__empty-services">
        Aucun produit ou prestation pour le moment.<br>
        Ajoutez un élément pour le voir apparaître automatiquement dans le devis.
      </p>
    `;

    return;
  }

  serviceList.innerHTML = client.services
    .map(
      (service) => `
        <div class="devis-demo__service-row">
          <span class="devis-demo__service-label">
            ${escapeHTML(service.label)}
          </span>

          <span class="devis-demo__service-quantity">
            Qté ${service.quantity}
          </span>

          <span class="devis-demo__service-unit-price">
            ${formatPrice(service.price)} / unité
          </span>

          <span class="devis-demo__service-price">
            ${formatPrice(service.price * service.quantity)}
          </span>

          <button
            class="devis-demo__delete-service"
            type="button"
            data-devis-delete-service="${escapeHTML(service.id)}"
            aria-label="Supprimer ${escapeHTML(service.label)}"
          >
            ×
          </button>
        </div>
      `,
    )
    .join("");
}

/* =====================================================
   DEVIS
===================================================== */

function renderQuoteClient() {
  if (!quoteClient) {
    return;
  }

  const client = getSelectedClient();

  if (!client) {
    quoteClient.innerHTML = "";
    return;
  }

  const displayName = getClientDisplayName(client);
  const personName = getClientPersonName(client);
  const showPerson = client.company.trim() && personName;

  quoteClient.innerHTML = `
    <span class="devis-demo__paper-label">
      Client
    </span>

    <strong class="devis-demo__paper-client-name">
      ${escapeHTML(displayName)}
    </strong>

    ${
      showPerson
        ? `
          <span class="devis-demo__paper-client-person">
            ${escapeHTML(personName)}
          </span>
        `
        : ""
    }

    <span class="devis-demo__paper-client-address">
      ${escapeHTML(client.address)}
    </span>
  `;
}

function renderQuoteServices() {
  if (!quoteBody) {
    return;
  }

  const client = getSelectedClient();

  if (!client || client.services.length === 0) {
    quoteBody.innerHTML = `
      <tr class="devis-demo__quote-empty">
        <td colspan="4">
          Les produits et prestations ajoutés apparaîtront ici.
        </td>
      </tr>
    `;

    return;
  }

  quoteBody.innerHTML = client.services
    .map(
      (service) => `
        <tr>
          <td>
            ${escapeHTML(service.label)}
          </td>

          <td>
            ${service.quantity}
          </td>

          <td>
            ${formatPrice(service.price)}
          </td>

          <td>
            ${formatPrice(service.price * service.quantity)}
          </td>
        </tr>
      `,
    )
    .join("");
}

function renderQuote() {
  const client = getSelectedClient();

  renderQuoteClient();
  renderQuoteServices();

  if (quoteNumber) {
    quoteNumber.textContent = client?.quoteNumber ?? "";
  }

  if (quoteDate) {
    quoteDate.textContent = new Date().toLocaleDateString("fr-FR");
  }

  if (quoteTotal) {
    quoteTotal.textContent = formatPrice(getQuoteTotal(client));
  }
}

/* =====================================================
   RENDU GLOBAL
===================================================== */

function render() {
  renderClients();
  renderSelectedClient();
  renderServices();
  renderQuote();
}

/* =====================================================
   SÉLECTION D'UN CLIENT
===================================================== */

function selectClient(clientId) {
  const clientExists = clients.some((client) => client.id === clientId);

  if (!clientExists) {
    return;
  }

  selectedClientId = clientId;
  clearServiceMessage();
  render();
}

/* =====================================================
   SUPPRESSION D'UN CLIENT
===================================================== */

function deleteClient(clientId) {
  const clientIndex = clients.findIndex((client) => client.id === clientId);

  if (clientIndex === -1) {
    return;
  }

  clients.splice(clientIndex, 1);

  if (selectedClientId === clientId) {
    selectedClientId = clients[0]?.id ?? null;
  }

  render();
}

/* =====================================================
   MESSAGE PRODUIT OU PRESTATION
===================================================== */

function showServiceMessage(message) {
  if (serviceMessage) {
    serviceMessage.textContent = message;
  }
}

function clearServiceMessage() {
  if (serviceMessage) {
    serviceMessage.textContent = "";
  }
}

/* =====================================================
   AJOUT D'UN PRODUIT OU D'UNE PRESTATION
===================================================== */

function handleServiceSubmit(event) {
  event.preventDefault();

  const client = getSelectedClient();

  if (
    !client ||
    !serviceNameInput ||
    !serviceQuantityInput ||
    !servicePriceInput
  ) {
    return;
  }

  clearServiceMessage();

  const label = serviceNameInput.value.trim();
  const quantity = parseQuantity(serviceQuantityInput.value);
  const price = parsePrice(servicePriceInput.value);

  if (!label) {
    showServiceMessage("Indiquez le nom du produit ou de la prestation.");
    return;
  }

  const normalizedLabel = normalizeServiceLabel(label);

  const alreadyExists = client.services.some((service) => {
    return normalizeServiceLabel(service.label) === normalizedLabel;
  });

  if (alreadyExists) {
    showServiceMessage(
      "Ce produit ou cette prestation a déjà été ajouté au devis.",
    );

    serviceNameInput.focus();
    serviceNameInput.select();

    return;
  }

  if (quantity === null) {
    showServiceMessage("Indiquez une quantité supérieure ou égale à 1.");
    return;
  }

  if (price === null) {
    showServiceMessage("Indiquez un prix unitaire supérieur à zéro.");
    return;
  }

  client.services.push({
    id: createId("service"),
    label,
    quantity,
    price,
  });

  serviceForm?.reset();

  render();

  serviceNameInput.focus();
}

/* =====================================================
   SUPPRESSION D'UN PRODUIT OU D'UNE PRESTATION
===================================================== */

function deleteService(serviceId) {
  const client = getSelectedClient();

  if (!client) {
    return;
  }

  client.services = client.services.filter((service) => {
    return service.id !== serviceId;
  });

  renderServices();

  renderQuote();
}

/* =====================================================
   RÉINITIALISATION DU DEVIS
===================================================== */

function resetCurrentQuote() {
  const client = getSelectedClient();

  if (!client) {
    return;
  }

  client.services = [];

  serviceForm?.reset();

  clearServiceMessage();

  renderServices();

  renderQuote();

  serviceNameInput?.focus();
}

/* =====================================================
   RÉINITIALISATION COMPLÈTE DE LA DÉMO
===================================================== */

function resetDevisDemo() {
  clients = INITIAL_CLIENTS.map((client) => ({
    ...client,
    services: client.services.map((service) => ({
      ...service,
    })),
  }));

  selectedClientId = clients[0]?.id ?? null;
  clientModalLastFocusedElement = null;

  if (serviceForm) {
    serviceForm.reset();
  }

  if (serviceQuantityInput) {
    serviceQuantityInput.value = "1";
  }

  clearServiceMessage();

  if (clientForm) {
    clientForm.reset();
  }

  if (clientFormMessage) {
    clientFormMessage.textContent = "";
  }

  if (clientModal) {
    clientModal.classList.remove("is-open");
    clientModal.setAttribute("aria-hidden", "true");
  }

  render();
}

/* =====================================================
   NOUVEAU CLIENT
===================================================== */

function openClientModal(trigger = null) {
  if (!clientModal || !clientForm) {
    return;
  }

  clientModalLastFocusedElement =
    trigger instanceof HTMLElement ? trigger : document.activeElement;

  clientForm.reset();

  if (clientFormMessage) {
    clientFormMessage.textContent = "";
  }

  clientModal.classList.add("is-open");

  clientModal.setAttribute("aria-hidden", "false");

  requestAnimationFrame(() => {
    clientForm.elements.namedItem("firstName")?.focus();
  });
}

function closeClientModal(restoreFocus = true) {
  if (!clientModal) {
    return;
  }

  const elementToFocus = clientModalLastFocusedElement;

  clientModal.classList.remove("is-open");

  clientModal.setAttribute("aria-hidden", "true");

  if (clientFormMessage) {
    clientFormMessage.textContent = "";
  }

  if (restoreFocus) {
    requestAnimationFrame(() => {
      if (elementToFocus instanceof HTMLElement && elementToFocus.isConnected) {
        elementToFocus.focus();
      }
    });
  }

  clientModalLastFocusedElement = null;
}

function handleClientSubmit(event) {
  event.preventDefault();

  if (!clientForm || !clientFormMessage) {
    return;
  }

  const formData = new FormData(clientForm);

  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();

  clientFormMessage.textContent = "";

  if (!company && (!firstName || !lastName)) {
    clientFormMessage.textContent =
      "Indiquez un nom et un prénom, ou une raison sociale.";

    return;
  }

  if (!address) {
    clientFormMessage.textContent = "Indiquez l'adresse du client.";
    return;
  }

  const client = {
    id: createId("devis-client"),
    firstName,
    lastName,
    company,
    address,
    quoteNumber: createQuoteNumber(),
    services: [],
  };

  clients.push(client);

  selectedClientId = client.id;

  closeClientModal();

  render();
}

/* =====================================================
   AFFICHAGE DU VRAI LOGICIEL
===================================================== */

function showFullDemo() {
  if (!overlay) {
    return;
  }

  stopMobilePreviewVideo();

  mobilePreviewOverlay?.classList.remove("is-open");

  mobilePreviewOverlay?.setAttribute("aria-hidden", "true");

  overlay.classList.add("is-open");

  overlay.setAttribute("aria-hidden", "false");

  render();

  requestAnimationFrame(() => {
    overlay?.querySelector("[data-devis-close]")?.focus();
  });
}

/* =====================================================
   AFFICHAGE DE L'APERÇU VIDÉO <= 900PX
===================================================== */

function showMobilePreview() {
  if (!mobilePreviewOverlay) {
    return;
  }

  closeClientModal(false);

  overlay?.classList.remove("is-open");

  overlay?.setAttribute("aria-hidden", "true");

  mobilePreviewOverlay.classList.add("is-open");

  mobilePreviewOverlay.setAttribute("aria-hidden", "false");

  playMobilePreviewVideo();

  requestAnimationFrame(() => {
    mobilePreviewOverlay?.querySelector("[data-devis-preview-close]")?.focus();
  });
}

/* =====================================================
   SAVOIR SI UNE DÉMO EST OUVERTE
===================================================== */

function isDemoOpen() {
  return Boolean(
    overlay?.classList.contains("is-open") ||
    mobilePreviewOverlay?.classList.contains("is-open"),
  );
}

/* =====================================================
   CHANGEMENT DE TAILLE D'ÉCRAN
===================================================== */

function switchOpenDemoForViewport() {
  if (!isDemoOpen()) {
    return;
  }

  if (isSmallDevisScreen()) {
    showMobilePreview();
  } else {
    showFullDemo();
  }
}

/* =====================================================
   CLIC SUR LE FOND DE LA LIGHTBOX PRINCIPALE
===================================================== */

function handleOverlayClick(event) {
  if (event.target === overlay) {
    closeLogicielDevisDemo();
  }
}

/* =====================================================
   CLIC SUR LE FOND DE LA LIGHTBOX MOBILE
===================================================== */

function handleMobilePreviewOverlayClick(event) {
  if (event.target === mobilePreviewOverlay) {
    closeLogicielDevisDemo();
  }
}

/* =====================================================
   CLIC SUR LE FOND DU POPUP CLIENT
===================================================== */

function handleClientModalClick(event) {
  if (event.target === clientModal) {
    closeClientModal();
  }
}

/* =====================================================
   GESTION DES CLICS
===================================================== */

function handleDocumentClick(event) {
  const closeTrigger = event.target.closest("[data-devis-close]");

  if (closeTrigger) {
    closeLogicielDevisDemo();
    return;
  }

  const mobileCloseTrigger = event.target.closest("[data-devis-preview-close]");

  if (mobileCloseTrigger) {
    closeLogicielDevisDemo();
    return;
  }

  const resetButton = event.target.closest("[data-devis-reset]");

  if (resetButton && overlay?.contains(resetButton)) {
    resetCurrentQuote();
    return;
  }

  const newClientButton = event.target.closest("[data-devis-new-client]");

  if (newClientButton && overlay?.contains(newClientButton)) {
    openClientModal(newClientButton);
    return;
  }

  const cancelClientButton = event.target.closest("[data-devis-cancel-client]");

  if (cancelClientButton && overlay?.contains(cancelClientButton)) {
    closeClientModal();
    return;
  }

  const deleteClientButton = event.target.closest("[data-devis-delete-client]");

  if (deleteClientButton && overlay?.contains(deleteClientButton)) {
    deleteClient(deleteClientButton.dataset.devisDeleteClient);
    return;
  }

  const clientButton = event.target.closest("[data-devis-client-id]");

  if (clientButton && overlay?.contains(clientButton)) {
    selectClient(clientButton.dataset.devisClientId);
    return;
  }

  const deleteServiceButton = event.target.closest(
    "[data-devis-delete-service]",
  );

  if (deleteServiceButton && overlay?.contains(deleteServiceButton)) {
    deleteService(deleteServiceButton.dataset.devisDeleteService);
  }
}

/* =====================================================
   CLAVIER
===================================================== */

function handleDocumentKeydown(event) {
  if (!isDemoOpen()) {
    return;
  }

  if (event.key === "Tab") {
    if (clientModal?.classList.contains("is-open")) {
      trapFocus(event, clientModalDialog);
      return;
    }

    if (mobilePreviewOverlay?.classList.contains("is-open")) {
      trapFocus(event, mobilePreviewDialog);
      return;
    }

    if (overlay?.classList.contains("is-open")) {
      trapFocus(event, dialog);
    }

    return;
  }

  if (event.key !== "Escape") {
    return;
  }

  if (clientModal?.classList.contains("is-open")) {
    closeClientModal();
    return;
  }

  closeLogicielDevisDemo();
}

/* =====================================================
   RÉCUPÉRATION DES ÉLÉMENTS
===================================================== */

function cacheElements() {
  overlay = document.getElementById("logiciel-devis-overlay");

  dialog = overlay?.querySelector(".devis-demo") ?? null;

  mobilePreviewOverlay = document.getElementById(
    "logiciel-devis-preview-overlay",
  );

  mobilePreviewDialog =
    mobilePreviewOverlay?.querySelector(".logiciel-devis-preview") ?? null;

  mobilePreviewVideo =
    mobilePreviewOverlay?.querySelector("[data-devis-preview-video]") ?? null;

  clientList = overlay?.querySelector("[data-devis-client-list]") ?? null;

  selectedClientContainer =
    overlay?.querySelector("[data-devis-selected-client]") ?? null;

  serviceForm = overlay?.querySelector("[data-devis-service-form]") ?? null;

  serviceNameInput =
    overlay?.querySelector("[data-devis-service-name]") ?? null;

  serviceQuantityInput =
    overlay?.querySelector("[data-devis-service-quantity]") ?? null;

  servicePriceInput =
    overlay?.querySelector("[data-devis-service-price]") ?? null;

  serviceMessage =
    overlay?.querySelector("[data-devis-service-message]") ?? null;

  serviceList = overlay?.querySelector("[data-devis-service-list]") ?? null;

  quoteClient = overlay?.querySelector("[data-devis-quote-client]") ?? null;

  quoteBody = overlay?.querySelector("[data-devis-quote-body]") ?? null;

  quoteTotal = overlay?.querySelector("[data-devis-total]") ?? null;

  quoteNumber = overlay?.querySelector("[data-devis-quote-number]") ?? null;

  quoteDate = overlay?.querySelector("[data-devis-date]") ?? null;

  clientModal = overlay?.querySelector("[data-devis-client-modal]") ?? null;

  clientModalDialog =
    clientModal?.querySelector(".devis-demo__client-form-card") ?? null;

  clientForm = overlay?.querySelector("[data-devis-client-form]") ?? null;

  clientFormMessage =
    overlay?.querySelector("[data-devis-client-form-message]") ?? null;
}

/* =====================================================
   ÉVÉNEMENTS
===================================================== */

function bindEvents() {
  document.addEventListener("click", handleDocumentClick);

  document.addEventListener("keydown", handleDocumentKeydown);

  overlay?.addEventListener("click", handleOverlayClick);

  mobilePreviewOverlay?.addEventListener(
    "click",
    handleMobilePreviewOverlayClick,
  );

  clientModal?.addEventListener("click", handleClientModalClick);

  serviceForm?.addEventListener("submit", handleServiceSubmit);

  serviceForm?.addEventListener("input", clearServiceMessage);

  clientForm?.addEventListener("submit", handleClientSubmit);

  window.addEventListener("resize", switchOpenDemoForViewport);
}

/* =====================================================
   INITIALISATION
===================================================== */

export function initLogicielDevis() {
  if (isInitialized) {
    return;
  }

  document.body.insertAdjacentHTML("beforeend", createDemoHTML());

  document.body.insertAdjacentHTML("beforeend", createMobilePreviewHTML());

  cacheElements();

  bindEvents();

  render();

  isInitialized = true;
}

/* =====================================================
   OUVRIR LA DÉMO
===================================================== */

export function openLogicielDevisDemo() {
  if (!isInitialized) {
    initLogicielDevis();
  }

  if (!overlay || !dialog || !mobilePreviewOverlay) {
    return;
  }

  if (!isDemoOpen()) {
    lastFocusedElement = document.activeElement;
    previousBodyOverflow = document.body.style.overflow;

    openOverlayHistory(() => {
      closeLogicielDevisDemo(true);
    });
  }

  document.body.style.overflow = "hidden";

  if (isSmallDevisScreen()) {
    showMobilePreview();
  } else {
    showFullDemo();
  }
}

/* =====================================================
   FERMER LA DÉMO
===================================================== */

export function closeLogicielDevisDemo(fromHistory = false) {
  if (!isInitialized) {
    return;
  }

  closeClientModal(false);
  stopMobilePreviewVideo();

  overlay?.classList.remove("is-open");
  overlay?.setAttribute("aria-hidden", "true");

  mobilePreviewOverlay?.classList.remove("is-open");
  mobilePreviewOverlay?.setAttribute("aria-hidden", "true");

  resetDevisDemo();

  document.body.style.overflow = previousBodyOverflow;

  if (!fromHistory) {
    closeOverlayHistory();
  }

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

/* =====================================================
   RACCOURCIS CONSOLE
===================================================== */

window.openLogicielDevisDemo = openLogicielDevisDemo;
window.closeLogicielDevisDemo = closeLogicielDevisDemo;
