(() => {
  const selector = 'iframe[data-map-src]';
  const refreshed = new WeakSet();

  function refreshMap(frame) {
    if (!frame || refreshed.has(frame)) return;
    const src = frame.dataset.mapSrc;
    if (!src) return;

    refreshed.add(frame);
    frame.removeAttribute('src');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        frame.src = src;
      });
    });
  }

  function refreshMapsIn(panel) {
    if (!panel) return;
    panel.querySelectorAll(selector).forEach(refreshMap);
  }

  document.querySelectorAll('[data-tab-list]').forEach((tabList) => {
    tabList.addEventListener('pino:tabs:change', (event) => {
      refreshMapsIn(event.detail?.panel);
    });
  });

  document.querySelectorAll('[data-tab-panel]:not([hidden])').forEach(refreshMapsIn);
})();
