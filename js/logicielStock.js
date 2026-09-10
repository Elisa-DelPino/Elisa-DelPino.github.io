// logicielStock.js

/* =====================================================
   PRODUITS DE DÉMONSTRATION
===================================================== */

const INITIAL_PRODUCTS = [
  {
    id: "stock-001",
    name: "Eau plate",
    category: "Boissons",
    stock: 3,
    alertStock: 10,
    limitStock: 3,
  },
  {
    id: "stock-002",
    name: "Café moulu",
    category: "Boissons",
    stock: 42,
    alertStock: 15,
    limitStock: 5,
  },
  {
    id: "stock-003",
    name: "Gobelet carton",
    category: "Emballages",
    stock: 120,
    alertStock: 35,
    limitStock: 15,
  },
  {
    id: "stock-004",
    name: "Sac kraft",
    category: "Emballages",
    stock: 25,
    alertStock: 30,
    limitStock: 10,
  },
  {
    id: "stock-005",
    name: "Papier toilette",
    category: "Hygiène",
    stock: 8,
    alertStock: 15,
    limitStock: 5,
  },
  {
    id: "stock-006",
    name: "Savon mains",
    category: "Hygiène",
    stock: 60,
    alertStock: 20,
    limitStock: 8,
  },
  {
    id: "stock-007",
    name: "Stylo bleu",
    category: "Fournitures",
    stock: 90,
    alertStock: 25,
    limitStock: 10,
  },
  {
    id: "stock-008",
    name: "Bloc-notes",
    category: "Fournitures",
    stock: 35,
    alertStock: 15,
    limitStock: 5,
  },
];

/* =====================================================
   ÉTAT DU LOGICIEL
===================================================== */

let products = INITIAL_PRODUCTS.map((product) => ({
  ...product,
}));

let activeView = "products";
let selectedCategory = "";
let lastFocusedElement = null;
let previousBodyOverflow = "";
let isInitialized = false;
let stockOperation = null;

/* =====================================================
   RÉFÉRENCES DOM
===================================================== */

let overlay = null;
let dialog = null;
let mobilePreviewOverlay = null;
let tableBody = null;
let emptyState = null;
let pageTitle = null;
let pageSubtitle = null;
let categoryFilter = null;
let categoryFilterSelect = null;
let alertBadge = null;
let addProductForm = null;
let formCategorySelect = null;
let newCategoryField = null;
let newCategoryInput = null;
let formMessage = null;
let quantityBackdrop = null;
let quantityTitle = null;
let quantityProductName = null;
let quantityForm = null;
let quantityInput = null;
let quantityMessage = null;
let quantitySubmit = null;

/* =====================================================
   ICÔNES
===================================================== */

const ICONS = {
  box: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m21 8-9 5-9-5"></path>

      <path
        d="m3 8 9-5 9 5v8l-9 5-9-5Z"
      ></path>

      <path d="M12 13v8"></path>
    </svg>
  `,

  products: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m21 8-9 5-9-5"></path>

      <path
        d="m3 8 9-5 9 5v8l-9 5-9-5Z"
      ></path>

      <path d="M12 13v8"></path>
    </svg>
  `,

  categories: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path
        d="M20 13 11 22l-9-9V4h9Z"
      ></path>

      <circle
        cx="7.5"
        cy="8.5"
        r="1.2"
      ></circle>
    </svg>
  `,

  alerts: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path
        d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
      ></path>

      <path
        d="M10 21h4"
      ></path>
    </svg>
  `,

  close: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path
        d="M6 6l12 12"
      ></path>

      <path
        d="M18 6 6 18"
      ></path>
    </svg>
  `,
};

/* =====================================================
   CRÉATION DU HTML PRINCIPAL
===================================================== */

function createDemoHTML() {
  return `

    <div
      class="logiciel-stock-overlay"
      id="logiciel-stock-overlay"
      aria-hidden="true"
    >

      <div
        class="stock-demo"
        role="dialog"
        aria-modal="true"
        aria-labelledby="stock-demo-dialog-title"
      >

        <!-- ==================================================
             BARRE DU HAUT
        =================================================== -->

        <header class="stock-demo__topbar">

          <div class="stock-demo__brand">

            <span class="stock-demo__brand-icon">

              ${ICONS.box}

            </span>

            <div class="stock-demo__brand-text">

              <strong id="stock-demo-dialog-title">

                Gestion de stock

              </strong>

              <span>

                Démo interactive

              </span>

            </div>

          </div>

          <button
            class="stock-demo__close"
            type="button"
            aria-label="Fermer la démonstration"
            data-stock-close
          >

            ${ICONS.close}

          </button>

        </header>

        <!-- ==================================================
             CONTENU
        =================================================== -->

        <div class="stock-demo__layout">

          <!-- ==================================================
               MENU
          =================================================== -->

          <aside
            class="stock-demo__sidebar"
            aria-label="Navigation du logiciel"
          >

            <nav class="stock-demo__nav">

              <!-- PRODUITS -->

              <button
                class="stock-demo__nav-button is-active"
                type="button"
                data-stock-view="products"
              >

                <span class="stock-demo__nav-icon">

                  ${ICONS.products}

                </span>

                <span>

                  Produits

                </span>

              </button>

              <!-- CATÉGORIES -->

              <button
                class="stock-demo__nav-button"
                type="button"
                data-stock-view="categories"
              >

                <span class="stock-demo__nav-icon">

                  ${ICONS.categories}

                </span>

                <span>

                  Catégories

                </span>

              </button>

              <!-- ALERTES -->

              <button
                class="stock-demo__nav-button"
                type="button"
                data-stock-view="alerts"
              >

                <span class="stock-demo__nav-icon">

                  ${ICONS.alerts}

                </span>

                <span>

                  Alertes

                </span>

                <span
                  class="stock-demo__alert-badge"
                  data-stock-alert-badge
                >

                  0

                </span>

              </button>

            </nav>

            <!-- ==================================================
                 LÉGENDE
            =================================================== -->

            <div class="stock-demo__legend">

              <p class="stock-demo__legend-title">

                État du stock

              </p>

              <div class="stock-demo__legend-item">

                <span
                  class="
                    stock-demo__legend-dot
                    stock-demo__legend-dot--ok
                  "
                ></span>

                <span>

                  En stock

                </span>

              </div>

              <div class="stock-demo__legend-item">

                <span
                  class="
                    stock-demo__legend-dot
                    stock-demo__legend-dot--warning
                  "
                ></span>

                <span>

                  Seuil d'alerte

                </span>

              </div>

              <div class="stock-demo__legend-item">

                <span
                  class="
                    stock-demo__legend-dot
                    stock-demo__legend-dot--critical
                  "
                ></span>

                <span>

                  Stock limite

                </span>

              </div>

            </div>

          </aside>

          <!-- ==================================================
               CENTRE
          =================================================== -->

          <main class="stock-demo__main">

            <div class="stock-demo__main-header">

              <div>

                <h2
                  class="stock-demo__page-title"
                  data-stock-page-title
                >

                  Produits

                </h2>

                <p
                  class="stock-demo__page-subtitle"
                  data-stock-page-subtitle
                >

                  Tous les produits de votre inventaire.

                </p>

              </div>

            </div>

            <!-- ==================================================
                 FILTRE CATÉGORIE
            =================================================== -->

            <div
              class="stock-demo__category-filter"
              data-stock-category-filter
              hidden
            >

              <label
                for="stock-demo-category-filter"
              >

                Afficher la catégorie

              </label>

              <select
                id="stock-demo-category-filter"
                data-stock-category-select
              ></select>

            </div>

            <!-- ==================================================
                 TABLE
            =================================================== -->

            <div class="stock-demo__table-card">

              <div class="stock-demo__table-scroll">

                <table class="stock-demo__table">

                  <thead>

                    <tr>

                      <th>
                        Produit
                      </th>

                      <th>
                        Catégorie
                      </th>

                      <th>
                        Stock actuel
                      </th>

                      <th>
                        Seuil d'alerte
                      </th>

                      <th>
                        Stock limite
                      </th>

                      <th>
                        Statut
                      </th>

                      <th
                        aria-label="Supprimer le produit"
                      ></th>

                    </tr>

                  </thead>

                  <tbody
                    data-stock-table-body
                  ></tbody>

                </table>

              </div>

              <div
                class="stock-demo__empty"
                data-stock-empty
                hidden
              >

                Aucun produit à afficher.

              </div>

            </div>

          </main>

          <!-- ==================================================
               AJOUTER UN PRODUIT
          =================================================== -->

          <aside class="stock-demo__form-panel">

            <div class="stock-demo__form-heading">

              <span class="stock-demo__form-heading-icon">

                +

              </span>

              <div>

                <h3>

                  Ajouter un produit

                </h3>

                <p>

                  Ajoutez simplement un produit à l'inventaire.

                </p>

              </div>

            </div>

            <form
              class="stock-demo__form"
              data-stock-form
              novalidate
            >

              <!-- NOM -->

              <div class="stock-demo__field">

                <label
                  for="stock-demo-name"
                >

                  Nom du produit

                </label>

                <input
                  id="stock-demo-name"
                  name="name"
                  type="text"
                  placeholder="Ex. Bouteille d'eau"
                  autocomplete="off"
                  required
                />

              </div>

              <!-- CATÉGORIE -->

              <div class="stock-demo__field">

                <label
                  for="stock-demo-category"
                >

                  Catégorie

                </label>

                <select
                  id="stock-demo-category"
                  name="category"
                  required
                  data-stock-form-category
                ></select>

              </div>

              <!-- NOUVELLE CATÉGORIE -->

              <div
                class="stock-demo__field"
                data-stock-new-category-field
                hidden
              >

                <label
                  for="stock-demo-new-category"
                >

                  Nouvelle catégorie

                </label>

                <input
                  id="stock-demo-new-category"
                  name="newCategory"
                  type="text"
                  placeholder="Ex. Entretien"
                  autocomplete="off"
                  data-stock-new-category
                />

              </div>

              <!-- STOCK ACTUEL -->

              <div class="stock-demo__field">

                <label
                  for="stock-demo-current"
                >

                  Stock actuel

                </label>

                <input
                  id="stock-demo-current"
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  value="0"
                  required
                />

              </div>

              <!-- SEUILS -->

              <div class="stock-demo__thresholds">

                <div class="stock-demo__field">

                  <label
                    for="stock-demo-alert"
                  >

                    Seuil d'alerte

                  </label>

                  <input
                    id="stock-demo-alert"
                    name="alertStock"
                    type="number"
                    min="0"
                    step="1"
                    value="10"
                    required
                  />

                </div>

                <div class="stock-demo__field">

                  <label
                    for="stock-demo-limit"
                  >

                    Stock limite

                  </label>

                  <input
                    id="stock-demo-limit"
                    name="limitStock"
                    type="number"
                    min="0"
                    step="1"
                    value="3"
                    required
                  />

                </div>

              </div>

              <p class="stock-demo__threshold-help">

                Orange à partir du seuil d'alerte,
                rouge à partir du stock limite.

              </p>

              <p
                class="stock-demo__form-message"
                data-stock-form-message
                aria-live="polite"
              ></p>

              <button
                class="stock-demo__submit"
                type="submit"
              >

                Enregistrer le produit

              </button>

            </form>

          </aside>

        </div>

        <!-- ==================================================
             POPUP AJOUT / RETRAIT DE STOCK
        =================================================== -->

        <div
          class="stock-demo__quantity-backdrop"
          data-stock-quantity-backdrop
          hidden
        >

          <div
            class="stock-demo__quantity-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="stock-demo-quantity-title"
          >

            <button
              class="stock-demo__quantity-close"
              type="button"
              aria-label="Fermer"
              data-stock-quantity-close
            >

              ×

            </button>

            <h3
              id="stock-demo-quantity-title"
              data-stock-quantity-title
            >

              Modifier le stock

            </h3>

            <p
              class="stock-demo__quantity-product"
              data-stock-quantity-product
            ></p>

            <form
              class="stock-demo__quantity-form"
              data-stock-quantity-form
            >

              <label
                for="stock-demo-quantity"
              >

                Quantité

              </label>

              <input
                class="stock-demo__quantity-input"
                id="stock-demo-quantity"
                type="number"
                min="1"
                step="1"
                value="1"
                inputmode="numeric"
                data-stock-quantity-input
                required
              />

              <p
                class="stock-demo__quantity-message"
                data-stock-quantity-message
                aria-live="polite"
              ></p>

              <button
                class="stock-demo__quantity-submit"
                type="submit"
                data-stock-quantity-submit
              >

                Valider

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>

  `;
}

/* =====================================================
   APERÇU NOIR POUR ÉCRANS <= 900 PX
===================================================== */

function createMobilePreviewHTML() {
  return `

    <div
      class="
        logiciel-stock-overlay
        logiciel-stock-preview-overlay
      "
      id="logiciel-stock-preview-overlay"
      aria-hidden="true"
    >

      <div
        class="logiciel-stock-preview"
        role="dialog"
        aria-modal="true"
        aria-label="Aperçu vidéo du logiciel de gestion de stock"
      >

        <div
          class="logiciel-stock-preview__media"
          data-stock-preview-media
          aria-hidden="true"
        ></div>

        <button
          class="logiciel-stock-preview__close"
          type="button"
          aria-label="Fermer l'aperçu"
          data-stock-preview-close
        >

          ${ICONS.close}

        </button>

      </div>

    </div>

  `;
}

/* =====================================================
   TAILLE D'ÉCRAN
===================================================== */

function isSmallStockScreen() {
  return window.matchMedia("(max-width: 900px)").matches;
}

/* =====================================================
   SÉCURISATION DU TEXTE HTML
===================================================== */

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =====================================================
   CONVERSION EN ENTIER
===================================================== */

function normalizeInteger(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return null;
  }

  return Math.max(0, Math.floor(number));
}

/* =====================================================
   ENTIER STRICTEMENT POSITIF
===================================================== */

function normalizePositiveInteger(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return null;
  }

  const integer = Math.floor(number);

  if (integer < 1) {
    return null;
  }

  return integer;
}

/* =====================================================
   NORMALISATION DU NOM
===================================================== */

function normalizeProductName(value) {
  return String(value)
    .trim()
    .replace(/\s+/g, " ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr-FR");
}

/* =====================================================
   ID DES NOUVEAUX PRODUITS
===================================================== */

function createProductId() {
  return `stock-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/* =====================================================
   CATÉGORIES
===================================================== */

function getCategories() {
  return [
    ...new Set(
      products.map((product) => product.category.trim()).filter(Boolean),
    ),
  ].sort((categoryA, categoryB) => categoryA.localeCompare(categoryB, "fr"));
}

/* =====================================================
   STATUT D'UN PRODUIT
===================================================== */

function getProductStatus(product) {
  if (product.stock <= product.limitStock) {
    return {
      key: "critical",
      label: "Stock limite",
    };
  }

  if (product.stock <= product.alertStock) {
    return {
      key: "warning",
      label: "Alerte",
    };
  }

  return {
    key: "ok",
    label: "En stock",
  };
}

/* =====================================================
   PRODUITS EN ALERTE
===================================================== */

function getAlertProducts() {
  return products.filter((product) => {
    const status = getProductStatus(product);

    return status.key === "warning" || status.key === "critical";
  });
}

/* =====================================================
   PRODUITS À AFFICHER
===================================================== */

function getVisibleProducts() {
  if (activeView === "alerts") {
    return getAlertProducts();
  }

  if (activeView === "categories") {
    if (!selectedCategory) {
      return [];
    }

    return products.filter((product) => product.category === selectedCategory);
  }

  return products;
}

/* =====================================================
   LISTES DES CATÉGORIES
===================================================== */

function renderCategorySelectors() {
  const categories = getCategories();

  if (activeView === "categories") {
    if (!selectedCategory || !categories.includes(selectedCategory)) {
      selectedCategory = categories[0] ?? "";
    }
  }

  if (categoryFilterSelect) {
    categoryFilterSelect.innerHTML = categories.length
      ? categories
          .map(
            (category) => `
                <option
                  value="${escapeHTML(category)}"
                  ${category === selectedCategory ? "selected" : ""}
                >
                  ${escapeHTML(category)}
                </option>
              `,
          )
          .join("")
      : `
            <option value="">
              Aucune catégorie
            </option>
          `;
  }

  if (formCategorySelect) {
    const currentValue = formCategorySelect.value;

    formCategorySelect.innerHTML = `

      ${categories
        .map(
          (category) => `
            <option
              value="${escapeHTML(category)}"
            >
              ${escapeHTML(category)}
            </option>
          `,
        )
        .join("")}

      <option value="__new__">
        + Nouvelle catégorie
      </option>

    `;

    const optionStillExists =
      currentValue &&
      [...formCategorySelect.options].some(
        (option) => option.value === currentValue,
      );

    if (optionStillExists) {
      formCategorySelect.value = currentValue;
    } else if (categories.length > 0) {
      formCategorySelect.value = categories[0];
    } else {
      formCategorySelect.value = "__new__";
    }

    updateNewCategoryField();
  }
}

/* =====================================================
   TITRE DE LA PAGE
===================================================== */

function renderPageHeading() {
  if (!pageTitle || !pageSubtitle || !categoryFilter) {
    return;
  }

  if (activeView === "categories") {
    pageTitle.textContent = "Catégories";

    pageSubtitle.textContent =
      "Sélectionnez une catégorie pour afficher uniquement les produits correspondants.";

    categoryFilter.hidden = false;

    return;
  }

  if (activeView === "alerts") {
    pageTitle.textContent = "Alertes";

    pageSubtitle.textContent =
      "Produits ayant atteint le seuil d'alerte ou le stock limite.";

    categoryFilter.hidden = true;

    return;
  }

  pageTitle.textContent = "Produits";
  pageSubtitle.textContent = "Tous les produits de votre inventaire.";
  categoryFilter.hidden = true;
}

/* =====================================================
   NAVIGATION
===================================================== */

function renderNavigation() {
  overlay?.querySelectorAll("[data-stock-view]").forEach((button) => {
    const isActive = button.dataset.stockView === activeView;

    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (alertBadge) {
    const alertCount = getAlertProducts().length;

    alertBadge.textContent = String(alertCount);
    alertBadge.hidden = alertCount === 0;
  }
}

/* =====================================================
   CRÉATION D'UNE LIGNE
===================================================== */

function createProductRow(product) {
  const status = getProductStatus(product);

  return `

    <tr
      class="
        stock-demo__row
        stock-demo__row--${status.key}
      "
    >

      <!-- PRODUIT -->

      <td>

        <strong class="stock-demo__product-name">

          ${escapeHTML(product.name)}

        </strong>

      </td>

      <!-- CATÉGORIE -->

      <td>

        <span class="stock-demo__category-chip">

          ${escapeHTML(product.category)}

        </span>

      </td>

      <!-- STOCK -->

      <td>

        <div class="stock-demo__stock-control">

          <button
            type="button"
            class="stock-demo__stock-button"
            data-stock-action="decrease"
            data-product-id="${escapeHTML(product.id)}"
            aria-label="Retirer du stock de ${escapeHTML(product.name)}"
          >

            −

          </button>

          <strong
            class="
              stock-demo__stock-value
              stock-demo__stock-value--${status.key}
            "
          >

            ${product.stock}

          </strong>

          <button
            type="button"
            class="stock-demo__stock-button"
            data-stock-action="increase"
            data-product-id="${escapeHTML(product.id)}"
            aria-label="Ajouter du stock à ${escapeHTML(product.name)}"
          >

            +

          </button>

        </div>

      </td>

      <!-- ALERTE -->

      <td>

        ${product.alertStock}

      </td>

      <!-- LIMITE -->

      <td>

        ${product.limitStock}

      </td>

      <!-- STATUT -->

      <td>

        <span
          class="
            stock-demo__status
            stock-demo__status--${status.key}
          "
        >

          <span
            class="stock-demo__status-dot"
          ></span>

          ${status.label}

        </span>

      </td>

      <!-- SUPPRESSION -->

      <td>

        <button
          type="button"
          class="stock-demo__delete-button"
          data-stock-delete
          data-product-id="${escapeHTML(product.id)}"
          aria-label="Supprimer ${escapeHTML(product.name)}"
          title="Supprimer le produit"
        >

          ×

        </button>

      </td>

    </tr>

  `;
}

/* =====================================================
   TABLEAU
===================================================== */

function renderTable() {
  if (!tableBody || !emptyState) {
    return;
  }

  const visibleProducts = getVisibleProducts();

  tableBody.innerHTML = visibleProducts.map(createProductRow).join("");
  emptyState.hidden = visibleProducts.length > 0;
}

/* =====================================================
   RENDU GLOBAL
===================================================== */

function render() {
  renderCategorySelectors();
  renderPageHeading();
  renderNavigation();
  renderTable();
}

/* =====================================================
   NOUVELLE CATÉGORIE
===================================================== */

function updateNewCategoryField() {
  if (!formCategorySelect || !newCategoryField || !newCategoryInput) {
    return;
  }

  const isNewCategory = formCategorySelect.value === "__new__";

  newCategoryField.hidden = !isNewCategory;
  newCategoryInput.required = isNewCategory;

  if (!isNewCategory) {
    newCategoryInput.value = "";
  }
}

/* =====================================================
   POPUP DE MODIFICATION DU STOCK
===================================================== */

function openStockQuantityDialog(productId, direction) {
  if (
    !quantityBackdrop ||
    !quantityTitle ||
    !quantityProductName ||
    !quantityInput ||
    !quantitySubmit ||
    !quantityMessage
  ) {
    return;
  }

  const product = products.find((item) => item.id === productId);

  if (!product) {
    return;
  }

  stockOperation = {
    productId,
    direction,
  };

  const isIncrease = direction === "increase";

  quantityTitle.textContent = isIncrease
    ? "Ajouter du stock"
    : "Retirer du stock";

  quantityProductName.textContent = product.name;
  quantitySubmit.textContent = isIncrease ? "Ajouter" : "Retirer";
  quantityMessage.textContent = "";
  quantityInput.value = "1";
  quantityBackdrop.hidden = false;

  requestAnimationFrame(() => {
    quantityInput?.focus();
    quantityInput?.select();
  });
}

/* =====================================================
   FERMER LE POPUP DE STOCK
===================================================== */

function closeStockQuantityDialog() {
  if (!quantityBackdrop) {
    return;
  }

  quantityBackdrop.hidden = true;
  stockOperation = null;

  if (quantityMessage) {
    quantityMessage.textContent = "";
  }
}

/* =====================================================
   VALIDATION DU NOUVEAU STOCK
===================================================== */

function handleQuantitySubmit(event) {
  event.preventDefault();

  if (!stockOperation || !quantityInput || !quantityMessage) {
    return;
  }

  const quantity = normalizePositiveInteger(quantityInput.value);

  if (quantity === null) {
    quantityMessage.textContent = "Indiquez une quantité supérieure à zéro.";
    return;
  }

  const product = products.find((item) => item.id === stockOperation.productId);

  if (!product) {
    closeStockQuantityDialog();
    return;
  }

  if (stockOperation.direction === "decrease") {
    if (quantity > product.stock) {
      quantityMessage.textContent = `Le stock disponible est de ${product.stock}.`;
      return;
    }

    product.stock -= quantity;
  } else {
    product.stock += quantity;
  }

  closeStockQuantityDialog();
  render();
}

/* =====================================================
   SUPPRESSION D'UN PRODUIT
===================================================== */

function deleteProduct(productId) {
  const productIndex = products.findIndex((item) => item.id === productId);

  if (productIndex === -1) {
    return;
  }

  products.splice(productIndex, 1);

  const categories = getCategories();

  if (selectedCategory && !categories.includes(selectedCategory)) {
    selectedCategory = categories[0] ?? "";
  }

  render();
}

/* =====================================================
   CHANGEMENT DE PAGE
===================================================== */

function setActiveView(view) {
  const allowedViews = ["products", "categories", "alerts"];

  if (!allowedViews.includes(view)) {
    return;
  }

  activeView = view;

  closeStockQuantityDialog();
  render();
}

/* =====================================================
   MESSAGE DU FORMULAIRE
===================================================== */

function showFormMessage(message, type = "error") {
  if (!formMessage) {
    return;
  }

  formMessage.textContent = message;
  formMessage.classList.toggle("is-success", type === "success");
  formMessage.classList.toggle("is-error", type === "error");
}

function clearFormMessage() {
  if (!formMessage) {
    return;
  }

  formMessage.textContent = "";
  formMessage.classList.remove("is-success", "is-error");
}

/* =====================================================
   AJOUT D'UN PRODUIT
===================================================== */

function handleAddProduct(event) {
  event.preventDefault();

  if (!addProductForm || !formCategorySelect || !newCategoryInput) {
    return;
  }

  clearFormMessage();

  const formData = new FormData(addProductForm);

  const name = String(formData.get("name") ?? "").trim();
  const stock = normalizeInteger(formData.get("stock"));
  const alertStock = normalizeInteger(formData.get("alertStock"));
  const limitStock = normalizeInteger(formData.get("limitStock"));

  let category = String(formData.get("category") ?? "").trim();

  if (category === "__new__") {
    category = String(formData.get("newCategory") ?? "").trim();
  }

  /* -----------------------------------------------------
     NOM OBLIGATOIRE
  ------------------------------------------------------ */

  if (!name) {
    showFormMessage("Indiquez le nom du produit.");
    return;
  }

  /* -----------------------------------------------------
     PRODUIT DÉJÀ EXISTANT
  ------------------------------------------------------ */

  const normalizedName = normalizeProductName(name);

  const existingProduct = products.find(
    (product) => normalizeProductName(product.name) === normalizedName,
  );

  if (existingProduct) {
    showFormMessage(
      "Ce produit est déjà présent dans l'inventaire. Modifiez directement son stock depuis la liste des produits.",
      "error",
    );

    return;
  }

  /* -----------------------------------------------------
     CATÉGORIE
  ------------------------------------------------------ */

  if (!category) {
    showFormMessage("Choisissez ou créez une catégorie.");
    return;
  }

  /* -----------------------------------------------------
     VALEURS NUMÉRIQUES
  ------------------------------------------------------ */

  if (stock === null || alertStock === null || limitStock === null) {
    showFormMessage("Les valeurs de stock doivent être des nombres positifs.");
    return;
  }

  /* -----------------------------------------------------
     COHÉRENCE DES SEUILS
  ------------------------------------------------------ */

  if (limitStock > alertStock) {
    showFormMessage(
      "Le stock limite doit être inférieur ou égal au seuil d'alerte.",
    );

    return;
  }

  /* -----------------------------------------------------
     AJOUT
  ------------------------------------------------------ */

  products.push({
    id: createProductId(),
    name,
    category,
    stock,
    alertStock,
    limitStock,
  });

  /* -----------------------------------------------------
     RESET DU FORMULAIRE
  ------------------------------------------------------ */

  addProductForm.reset();

  const stockInput = addProductForm.elements.namedItem("stock");
  const alertInput = addProductForm.elements.namedItem("alertStock");
  const limitInput = addProductForm.elements.namedItem("limitStock");

  if (stockInput) {
    stockInput.value = "0";
  }

  if (alertInput) {
    alertInput.value = "10";
  }

  if (limitInput) {
    limitInput.value = "3";
  }

  selectedCategory = category;

  render();

  if (
    formCategorySelect &&
    [...formCategorySelect.options].some((option) => option.value === category)
  ) {
    formCategorySelect.value = category;
  }

  updateNewCategoryField();

  showFormMessage("Produit ajouté à l'inventaire.", "success");
}

/* =====================================================
   AFFICHAGE DU VRAI LOGICIEL
===================================================== */

function showFullDemo() {
  if (!overlay) {
    return;
  }

  mobilePreviewOverlay?.classList.remove("is-open");
  mobilePreviewOverlay?.setAttribute("aria-hidden", "true");

  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");

  render();

  requestAnimationFrame(() => {
    overlay?.querySelector("[data-stock-close]")?.focus();
  });
}

/* =====================================================
   AFFICHAGE DE L'APERÇU NOIR <= 900PX
===================================================== */

function showMobilePreview() {
  if (!mobilePreviewOverlay) {
    return;
  }

  closeStockQuantityDialog();

  overlay?.classList.remove("is-open");
  overlay?.setAttribute("aria-hidden", "true");

  mobilePreviewOverlay.classList.add("is-open");
  mobilePreviewOverlay.setAttribute("aria-hidden", "false");

  requestAnimationFrame(() => {
    mobilePreviewOverlay?.querySelector("[data-stock-preview-close]")?.focus();
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

  if (isSmallStockScreen()) {
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
    closeLogicielStockDemo();
  }
}

/* =====================================================
   CLIC SUR LE FOND DE LA LIGHTBOX MOBILE
===================================================== */

function handleMobilePreviewOverlayClick(event) {
  if (event.target === mobilePreviewOverlay) {
    closeLogicielStockDemo();
  }
}

/* =====================================================
   CLIC SUR LE FOND DU POPUP QUANTITÉ
===================================================== */

function handleQuantityBackdropClick(event) {
  if (event.target === quantityBackdrop) {
    closeStockQuantityDialog();
  }
}

/* =====================================================
   GESTION DES CLICS
===================================================== */

function handleDocumentClick(event) {
  /* -----------------------------------------------------
     OUVRIR LA DÉMO
  ------------------------------------------------------ */

  const openTrigger = event.target.closest("[data-open-stock-demo]");

  if (openTrigger) {
    event.preventDefault();

    openLogicielStockDemo();

    return;
  }

  /* -----------------------------------------------------
     FERMER LE VRAI LOGICIEL
  ------------------------------------------------------ */

  const closeTrigger = event.target.closest("[data-stock-close]");

  if (closeTrigger) {
    closeLogicielStockDemo();
    return;
  }

  /* -----------------------------------------------------
     FERMER L'APERÇU MOBILE
  ------------------------------------------------------ */

  const mobileCloseTrigger = event.target.closest("[data-stock-preview-close]");

  if (mobileCloseTrigger) {
    closeLogicielStockDemo();
    return;
  }

  /* -----------------------------------------------------
     FERMER LE POPUP QUANTITÉ
  ------------------------------------------------------ */

  const quantityCloseTrigger = event.target.closest(
    "[data-stock-quantity-close]",
  );

  if (quantityCloseTrigger) {
    closeStockQuantityDialog();
    return;
  }

  /* -----------------------------------------------------
     PRODUITS / CATÉGORIES / ALERTES
  ------------------------------------------------------ */

  const viewButton = event.target.closest("[data-stock-view]");

  if (viewButton && overlay?.contains(viewButton)) {
    setActiveView(viewButton.dataset.stockView);
    return;
  }

  /* -----------------------------------------------------
     SUPPRIMER UN PRODUIT
  ------------------------------------------------------ */

  const deleteButton = event.target.closest("[data-stock-delete]");

  if (deleteButton && overlay?.contains(deleteButton)) {
    deleteProduct(deleteButton.dataset.productId);
    return;
  }

  /* -----------------------------------------------------
     AJOUTER / RETIRER DU STOCK
  ------------------------------------------------------ */

  const stockButton = event.target.closest("[data-stock-action]");

  if (stockButton && overlay?.contains(stockButton)) {
    openStockQuantityDialog(
      stockButton.dataset.productId,
      stockButton.dataset.stockAction,
    );
  }
}

/* =====================================================
   TOUCHE ÉCHAP
===================================================== */

function handleDocumentKeydown(event) {
  if (event.key !== "Escape") {
    return;
  }

  if (quantityBackdrop && !quantityBackdrop.hidden) {
    closeStockQuantityDialog();
    return;
  }

  if (isDemoOpen()) {
    closeLogicielStockDemo();
  }
}

/* =====================================================
   RÉCUPÉRATION DES ÉLÉMENTS
===================================================== */

function cacheElements() {
  overlay = document.getElementById("logiciel-stock-overlay");

  dialog = overlay?.querySelector(".stock-demo") ?? null;

  mobilePreviewOverlay = document.getElementById(
    "logiciel-stock-preview-overlay",
  );

  tableBody = overlay?.querySelector("[data-stock-table-body]") ?? null;
  emptyState = overlay?.querySelector("[data-stock-empty]") ?? null;
  pageTitle = overlay?.querySelector("[data-stock-page-title]") ?? null;
  pageSubtitle = overlay?.querySelector("[data-stock-page-subtitle]") ?? null;

  categoryFilter =
    overlay?.querySelector("[data-stock-category-filter]") ?? null;

  categoryFilterSelect =
    overlay?.querySelector("[data-stock-category-select]") ?? null;

  alertBadge = overlay?.querySelector("[data-stock-alert-badge]") ?? null;
  addProductForm = overlay?.querySelector("[data-stock-form]") ?? null;

  formCategorySelect =
    overlay?.querySelector("[data-stock-form-category]") ?? null;

  newCategoryField =
    overlay?.querySelector("[data-stock-new-category-field]") ?? null;

  newCategoryInput =
    overlay?.querySelector("[data-stock-new-category]") ?? null;

  formMessage = overlay?.querySelector("[data-stock-form-message]") ?? null;

  quantityBackdrop =
    overlay?.querySelector("[data-stock-quantity-backdrop]") ?? null;

  quantityTitle = overlay?.querySelector("[data-stock-quantity-title]") ?? null;

  quantityProductName =
    overlay?.querySelector("[data-stock-quantity-product]") ?? null;

  quantityForm = overlay?.querySelector("[data-stock-quantity-form]") ?? null;

  quantityInput = overlay?.querySelector("[data-stock-quantity-input]") ?? null;

  quantityMessage =
    overlay?.querySelector("[data-stock-quantity-message]") ?? null;

  quantitySubmit =
    overlay?.querySelector("[data-stock-quantity-submit]") ?? null;
}

/* =====================================================
   ÉVÉNEMENTS
===================================================== */

function bindEvents() {
  /* -----------------------------------------------------
     CLICS DU DOCUMENT
  ------------------------------------------------------ */

  document.addEventListener("click", handleDocumentClick);

  /* -----------------------------------------------------
     CLAVIER
  ------------------------------------------------------ */

  document.addEventListener("keydown", handleDocumentKeydown);

  /* -----------------------------------------------------
     FOND LIGHTBOX DESKTOP
  ------------------------------------------------------ */

  overlay?.addEventListener("click", handleOverlayClick);

  /* -----------------------------------------------------
     FOND LIGHTBOX <= 900PX
  ------------------------------------------------------ */

  mobilePreviewOverlay?.addEventListener(
    "click",
    handleMobilePreviewOverlayClick,
  );

  /* -----------------------------------------------------
     FOND POPUP QUANTITÉ
  ------------------------------------------------------ */

  quantityBackdrop?.addEventListener("click", handleQuantityBackdropClick);

  /* -----------------------------------------------------
     FILTRE CATÉGORIE
  ------------------------------------------------------ */

  categoryFilterSelect?.addEventListener("change", (event) => {
    selectedCategory = event.target.value;
    renderTable();
  });

  /* -----------------------------------------------------
     CATÉGORIE DU NOUVEAU PRODUIT
  ------------------------------------------------------ */

  formCategorySelect?.addEventListener("change", () => {
    updateNewCategoryField();
    clearFormMessage();
  });

  /* -----------------------------------------------------
     AJOUT DU PRODUIT
  ------------------------------------------------------ */

  addProductForm?.addEventListener("submit", handleAddProduct);

  /* -----------------------------------------------------
     EFFACE LE MESSAGE D'ERREUR
     QUAND L'UTILISATEUR RETAPE
  ------------------------------------------------------ */

  addProductForm?.addEventListener("input", () => {
    clearFormMessage();
  });

  /* -----------------------------------------------------
     VALIDATION POPUP QUANTITÉ
  ------------------------------------------------------ */

  quantityForm?.addEventListener("submit", handleQuantitySubmit);

  /* -----------------------------------------------------
     CHANGEMENT DE TAILLE
  ------------------------------------------------------ */

  window.addEventListener("resize", switchOpenDemoForViewport);
}

/* =====================================================
   INITIALISATION
===================================================== */

export function initLogicielStock() {
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

export function openLogicielStockDemo() {
  if (!isInitialized) {
    initLogicielStock();
  }

  if (!overlay || !dialog || !mobilePreviewOverlay) {
    return;
  }

  if (!isDemoOpen()) {
    lastFocusedElement = document.activeElement;
    previousBodyOverflow = document.body.style.overflow;
  }

  document.body.style.overflow = "hidden";

  if (isSmallStockScreen()) {
    showMobilePreview();
  } else {
    showFullDemo();
  }
}

/* =====================================================
   FERMER LA DÉMO
===================================================== */

export function closeLogicielStockDemo() {
  if (!isInitialized) {
    return;
  }

  closeStockQuantityDialog();

  overlay?.classList.remove("is-open");
  overlay?.setAttribute("aria-hidden", "true");

  mobilePreviewOverlay?.classList.remove("is-open");
  mobilePreviewOverlay?.setAttribute("aria-hidden", "true");

  document.body.style.overflow = previousBodyOverflow;

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

/* =====================================================
   RACCOURCIS CONSOLE
===================================================== */

window.openLogicielStockDemo = openLogicielStockDemo;
window.closeLogicielStockDemo = closeLogicielStockDemo;
