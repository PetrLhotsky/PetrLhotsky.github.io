function setupLightbox() {
  const trigger = document.querySelector("[data-lightbox-open]");
  const lightbox = document.querySelector("[data-lightbox]");
  const closeButton = document.querySelector("[data-lightbox-close]");

  if (!trigger || !lightbox || typeof lightbox.showModal !== "function") return;

  let returnFocus = null;
  let isClosing = false;

  function finishClose() {
    if (lightbox.open) lightbox.close();
    lightbox.classList.remove("is-open", "is-closing");
    isClosing = false;
  }

  function closeLightbox() {
    if (!lightbox.open || isClosing) return;

    isClosing = true;
    lightbox.classList.remove("is-open");
    lightbox.classList.add("is-closing");

    const animations =
      typeof lightbox.getAnimations === "function"
        ? lightbox.getAnimations({ subtree: true })
        : [];

    if (!animations.length) {
      finishClose();
      return;
    }

    Promise.allSettled(animations.map((animation) => animation.finished)).then(finishClose);
  }

  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    returnFocus = trigger;
    lightbox.classList.remove("is-closing");
    lightbox.showModal();

    window.requestAnimationFrame(() => {
      lightbox.classList.add("is-open");
    });
  });

  closeButton?.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  lightbox.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeLightbox();
  });

  lightbox.addEventListener("close", () => {
    lightbox.classList.remove("is-open", "is-closing");
    isClosing = false;

    if (returnFocus?.isConnected) returnFocus.focus();
    returnFocus = null;
  });
}

setupLightbox();
