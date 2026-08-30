(() => {
  const routeFilter = document.querySelector("[data-route-filter]");
  const selector = ".mobile-route_map iframe[data-map-src]";

  function reloadMap(panel) {
    const iframe = panel?.querySelector?.(selector);
    if (!iframe || iframe.dataset.mapReady === "true") return;

    const src = iframe.dataset.mapSrc || iframe.getAttribute("src");
    if (!src) return;

    iframe.dataset.mapReady = "true";
    requestAnimationFrame(() => {
      iframe.setAttribute("src", "about:blank");
      requestAnimationFrame(() => iframe.setAttribute("src", src));
    });
  }

  document.querySelectorAll(selector).forEach((iframe) => {
    const panel = iframe.closest("[data-tab-panel]");
    if (panel && !panel.hidden) reloadMap(panel);
  });

  routeFilter?.addEventListener("pino:tabs:change", (event) => {
    reloadMap(event.detail?.panel);
  });
})();
