document.documentElement.classList.add("tabs-js");

const tabLists = [...document.querySelectorAll("[data-tab-list]")];

function getPanelForTab(tab) {
  if (!tab?.hash) return null;

  const panelId = decodeURIComponent(tab.hash.slice(1));
  const panel = document.getElementById(panelId);

  return panel?.matches("[data-tab-panel]") ? panel : null;
}

function setupTabList(tabList) {
  const tabs = [...tabList.querySelectorAll("[data-tab]")].filter((tab) => getPanelForTab(tab));

  if (!tabs.length) return;

  const panels = tabs.map((tab) => getPanelForTab(tab));
  const initialTab = tabs.find((tab) => tab.getAttribute("aria-current") === "true") || tabs[0];

  tabList.setAttribute("role", "tablist");

  tabs.forEach((tab) => {
    const panel = getPanelForTab(tab);
    const listItem = tab.closest("li");

    if (listItem) listItem.setAttribute("role", "presentation");

    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", panel.id);
  });

  panels.forEach((panel) => {
    panel.setAttribute("role", "tabpanel");
  });

  function activateTab(tab, { focus = false, updateHistory = false } = {}) {
    const targetPanel = getPanelForTab(tab);

    if (!targetPanel) return;

    tabs.forEach((item) => {
      const isSelected = item === tab;

      item.setAttribute("aria-selected", String(isSelected));
      item.setAttribute("tabindex", isSelected ? "0" : "-1");

      if (isSelected) item.setAttribute("aria-current", "true");
      else item.removeAttribute("aria-current");
    });

    panels.forEach((panel) => {
      panel.hidden = panel !== targetPanel;
    });

    if (updateHistory && window.location.hash !== tab.hash) {
      window.history.replaceState(null, "", tab.hash);
    }

    if (focus) tab.focus();

    tabList.dispatchEvent(
      new CustomEvent("pino:tabs:change", {
        detail: { tab, panel: targetPanel },
      }),
    );
  }

  function getTabFromHash() {
    return tabs.find((tab) => tab.hash === window.location.hash);
  }

  function syncWithUrl() {
    const tabFromHash = getTabFromHash();

    if (tabFromHash) {
      activateTab(tabFromHash);
      return;
    }

    if (!window.location.hash) activateTab(initialTab);
  }

  tabList.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-tab]");

    if (!tab || !tabs.includes(tab)) return;

    event.preventDefault();
    activateTab(tab, { updateHistory: true });
  });

  tabList.addEventListener("keydown", (event) => {
    const currentTab = event.target.closest("[data-tab]");
    const currentIndex = tabs.indexOf(currentTab);

    if (currentIndex < 0) return;

    let targetIndex;

    if (event.key === "ArrowRight") targetIndex = (currentIndex + 1) % tabs.length;
    else if (event.key === "ArrowLeft") {
      targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") targetIndex = 0;
    else if (event.key === "End") targetIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    activateTab(tabs[targetIndex], {
      focus: true,
      updateHistory: true,
    });
  });

  tabList.addEventListener("pino:tabs:activate", (event) => {
    const panelId = event.detail?.panelId;
    const tab = tabs.find((item) => item.hash === `#${panelId}`);

    if (!tab) return;

    activateTab(tab, {
      focus: Boolean(event.detail?.focus),
      updateHistory: Boolean(event.detail?.updateHistory),
    });
  });

  window.addEventListener("hashchange", syncWithUrl);
  window.addEventListener("popstate", syncWithUrl);

  activateTab(getTabFromHash() || initialTab);
}

tabLists.forEach(setupTabList);
