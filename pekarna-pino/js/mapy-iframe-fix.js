(() => {
  const selector = 'iframe[data-map-src]';
  const activate = (panel) => {
    if (!panel || panel.hidden) return;
    const frame = panel.querySelector(selector);
    if (!frame || frame.dataset.mapActivated === 'true') return;
    const source = frame.dataset.mapSrc;
    if (!source) return;
    frame.src = source;
    frame.dataset.mapActivated = 'true';
  };
  document.querySelectorAll('[data-tab-list]').forEach((list) => {
    list.addEventListener('pino:tabs:change', (event) => {
      requestAnimationFrame(() => activate(event.detail?.panel));
    });
  });
  document.querySelectorAll('[data-tab-panel]').forEach(activate);
})();
