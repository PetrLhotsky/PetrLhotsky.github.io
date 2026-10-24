(() => {
  const routes = [...document.querySelectorAll('[data-route]')];
  if (!routes.length) return;

  const initMap = (route) => {
    if (!route) return;
    const frame = route.querySelector('.mobile-route_map iframe[data-map-src]');
    if (!frame || frame.dataset.mapReady === 'true') return;
    const src = frame.dataset.mapSrc;
    if (!src) return;
    frame.dataset.mapReady = 'true';
    requestAnimationFrame(() => {
      frame.src = 'about:blank';
      requestAnimationFrame(() => { frame.src = src; });
    });
  };

  const visibleRoute = () => routes.find((route) => getComputedStyle(route).display !== 'none');
  const first = visibleRoute();
  if (first) {
    const firstFrame = first.querySelector('.mobile-route_map iframe[data-map-src]');
    if (firstFrame) firstFrame.dataset.mapReady = 'true';
  }

  document.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-tab][href^="#"]');
    if (!tab) return;
    const id = tab.getAttribute('href').slice(1);
    setTimeout(() => initMap(document.getElementById(id)), 0);
  });

  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    if (id) setTimeout(() => initMap(document.getElementById(id)), 0);
  });
})();
