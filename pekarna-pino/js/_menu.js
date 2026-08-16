document.documentElement.classList.add("js");

const menuToggle = document.querySelector(".site-menu_toggle");
const menuPanel = document.querySelector("#site-menu-panel");
const menuLabel = menuToggle?.querySelector(".visually-hidden");
const menuBreakpoint =
  getComputedStyle(document.documentElement).getPropertyValue("--menu-breakpoint").trim() ||
  "64rem";
const mobileViewport = window.matchMedia(`(width < ${menuBreakpoint})`);
const menuMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let menuAnimation;

const siteHeader = document.querySelector(".site-header");

function syncHeaderShadow() {
  if (!siteHeader) return;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 0);
}

if (siteHeader) {
  syncHeaderShadow();
  window.addEventListener("scroll", syncHeaderShadow, { passive: true });
}

function setMenuState(isOpen, animate = false) {
  if (!menuToggle || !menuPanel || !menuLabel) return;

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuLabel.textContent = isOpen
    ? "Zavřít hlavní menu"
    : "Otevřít hlavní menu";

  menuAnimation?.cancel();

  if (!animate || !mobileViewport.matches || menuMotionQuery.matches) {
    menuPanel.hidden = !isOpen;
    return;
  }

  if (isOpen) {
    menuPanel.hidden = false;
    menuAnimation = menuPanel.animate(
      [
        { opacity: 0, clipPath: "inset(0 0 100% 0)", transform: "translateY(-0.5rem)" },
        { opacity: 1, clipPath: "inset(0 0 0 0)", transform: "translateY(0)" },
      ],
      { duration: 220, easing: "cubic-bezier(0.2, 0, 0, 1)" },
    );
    return;
  }

  menuAnimation = menuPanel.animate(
    [
      { opacity: 1, clipPath: "inset(0 0 0 0)", transform: "translateY(0)" },
      { opacity: 0, clipPath: "inset(0 0 100% 0)", transform: "translateY(-0.5rem)" },
    ],
    { duration: 180, easing: "cubic-bezier(0.4, 0, 1, 1)" },
  );

  menuAnimation.addEventListener(
    "finish",
    () => {
      if (menuToggle.getAttribute("aria-expanded") === "false") {
        menuPanel.hidden = true;
      }
    },
    { once: true },
  );
}

function syncMenuWithViewport(event) {
  setMenuState(!event.matches);
}

if (menuToggle && menuPanel) {
  menuToggle.hidden = false;
  syncMenuWithViewport(mobileViewport);

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen, true);
  });

  menuPanel.addEventListener("click", (event) => {
    if (mobileViewport.matches && event.target.closest("a")) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuToggle.getAttribute("aria-expanded") === "true" &&
      mobileViewport.matches
    ) {
      setMenuState(false, true);
      menuToggle.focus();
    }
  });

  mobileViewport.addEventListener("change", syncMenuWithViewport);
}

const currentYearElements = document.querySelectorAll("[data-current-year]");

if (currentYearElements.length) {
  const currentYear = new Intl.DateTimeFormat("en", {
    year: "numeric",
    timeZone: "Europe/Prague",
  }).format(new Date());

  currentYearElements.forEach((yearElement) => {
    yearElement.textContent = currentYear;
    yearElement.setAttribute("datetime", currentYear);
  });
}
