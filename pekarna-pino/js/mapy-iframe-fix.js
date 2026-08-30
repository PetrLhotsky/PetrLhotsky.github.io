(() => {
  const routeFilter = document.querySelector("[data-route-filter]");
  const selector = 'iframe[data-mapy-embed][src^="https://mapy.com/s/"]';

  function initializeMap(panel) {
    if (!panel || panel.hidden) return;

    const frame = panel.querySelector(selector);
    if (!frame || frame.dataset.mapyInitialized === "true") return;

    const src = frame.getAttribute("src");
    if (!src) return;

    frame.dataset.mapyInitialized = "true";

    // A Mapy.com iframe that first rendered in a hidden tab can calculate
    // an incorrect viewport. Reload it once after the panel is visible.
    frame.removeAttribute("src");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        frame.setAttribute("src", src);
      });
    });
  }

  // _tabs.js and pojizdna-prodejna.js are loaded before this file, so the
  // currently selected route is already known here.
  document.querySelectorAll("[data-route]").forEach((panel) => {
    if (!panel.hidden) initializeMap(panel);
  });

  routeFilter?.addEventListener("pino:tabs:change", (event) => {
    initializeMap(event.detail?.panel);
  });
})();
