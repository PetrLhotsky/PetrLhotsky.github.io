(() => {
  const initializeMap = (panel) => {
    if (!panel) return;
    const iframe = panel.querySelector('iframe[data-map-src]');
    if (!iframe || iframe.dataset.mapInitialized === 'true') return;
    iframe.dataset.mapInitialized = 'true';
    iframe.src = iframe.dataset.mapSrc;
  };

  const initializeVisibleMaps = () => {
    document.querySelectorAll('[data-tab-panel]:not([hidden])').forEach(initializeMap);
  };

  document.querySelectorAll('[data-tab-list]').forEach((tabList) => {
    tabList.addEventListener('pino:tabs:change', (event) => {
      initializeMap(event.detail?.panel || null);
    });
  });

  initializeVisibleMaps();
})();
