// overlayHistory.js

let activeOverlay = null;
let ignoreNextPopstate = false;

/* =====================================================
   OUVERTURE
===================================================== */

export function openOverlayHistory(closeCallback) {
  if (activeOverlay) {
    return;
  }

  const token = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  activeOverlay = {
    token,
    closeCallback,
  };

  history.pushState(
    {
      ...history.state,
      portfolioOverlay: token,
    },
    "",
    window.location.href,
  );
}

/* =====================================================
   FERMETURE MANUELLE
===================================================== */

export function closeOverlayHistory() {
  if (!activeOverlay) {
    return;
  }

  const token = activeOverlay.token;

  activeOverlay = null;

  if (history.state?.portfolioOverlay === token) {
    ignoreNextPopstate = true;
    history.back();
  }
}

/* =====================================================
   RETOUR NAVIGATEUR
===================================================== */

window.addEventListener("popstate", () => {
  if (ignoreNextPopstate) {
    ignoreNextPopstate = false;

    return;
  }

  if (!activeOverlay) {
    return;
  }

  const closeCallback = activeOverlay.closeCallback;

  activeOverlay = null;

  closeCallback?.();
});
