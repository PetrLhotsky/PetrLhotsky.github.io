(() => {
  const routePanels = [...document.querySelectorAll("[data-route]")];
  const routeTabLists = [...document.querySelectorAll("[data-tab-list]")];

  if (!routePanels.length) return;

  function getMapFrame(panel) {
    return panel?.querySelector('iframe[data-map-src^="https://mapy.com/s/"]') || null;
  }

  function reloadMapOnce(panel) {
    const frame = getMapFrame(panel);

    if (!frame || frame.dataset.mapReady === "true") return;

    const src = frame.dataset.mapSrc || frame.getAttribute("src");
    if (!src) return;

    frame.dataset.mapReady = "true";
    frame.setAttribute("src", "about:blank");

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        frame.setAttribute("src", src);
      });
    });
  }

  // The first route is rendered visibly by default and can keep its initial load.
  const firstFrame = getMapFrame(routePanels[0]);
  if (firstFrame) firstFrame.dataset.mapReady = "true";

  // If page logic selected another route before this script ran (hash/today route),
  // reload that non-primary map once now that its panel is visible.
  routePanels.slice(1).forEach((panel) => {
    if (!panel.hidden) reloadMapOnce(panel);
  });

  routeTabLists.forEach((tabList) => {
    tabList.addEventListener("pino:tabs:change", (event) => {
      const panel = event.detail?.panel;
      if (!panel) return;
      reloadMapOnce(panel);
    });
  });
})();
