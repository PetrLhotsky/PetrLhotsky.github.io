document.documentElement.classList.add("home-js");

const carouselControls = document.querySelector("[data-carousel-controls]");

function getVisualItems(viewport) {
  return [...viewport.querySelectorAll(".frgals_item")].sort(
    (firstItem, secondItem) =>
      firstItem.getBoundingClientRect().left - secondItem.getBoundingClientRect().left,
  );
}

function getTrackInset(viewport, items) {
  if (!items.length) return 0;

  return (
    items[0].getBoundingClientRect().left -
    viewport.getBoundingClientRect().left +
    viewport.scrollLeft
  );
}

function getActiveItemIndex(viewport, items) {
  const viewportStart = viewport.getBoundingClientRect().left + getTrackInset(viewport, items);

  return items.reduce(
    (closestItem, item, itemIndex) => {
      const itemBox = item.getBoundingClientRect();
      const distance = Math.abs(itemBox.left - viewportStart);

      return distance < closestItem.distance
        ? { index: itemIndex, distance }
        : closestItem;
    },
    { index: 0, distance: Number.POSITIVE_INFINITY },
  ).index;
}

function getVisibleItemCount(viewport, items) {
  const itemWidth = items[0]?.getBoundingClientRect().width;

  if (!itemWidth) return 1;

  return Math.min(items.length, Math.max(1, Math.round(viewport.clientWidth / itemWidth)));
}

if (carouselControls) {
  const viewportId = carouselControls.dataset.carouselControls;
  const viewport = document.querySelector(`#${viewportId}`);
  const status = document.querySelector("[data-carousel-status]");
  let scrollStatusTimer;
  let dragPointerId;
  let dragStartX = 0;
  let dragStartScrollLeft = 0;
  let dragMoved = false;
  let autoplayTimer;
  let autoplayEnabled = true;
  let announceNextScroll = false;
  let touchStartX = 0;
  let touchStartY = 0;
  let touchGestureDirection;
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  function updateCarouselState(announce = false) {
    if (!viewport) return;

    const items = getVisualItems(viewport);
    const activeIndex = getActiveItemIndex(viewport, items);
    const activeItem = items[activeIndex];

    items.forEach((item) => item.removeAttribute("aria-current"));
    activeItem.setAttribute("aria-current", "true");
    viewport.dataset.activeItem = activeItem.id;

    if (status) {
      const itemName = activeItem.querySelector(".frgal-card_caption")?.textContent.trim();
      const message = `${itemName || "Frgál"}, položka ${activeIndex + 1} ze ${items.length}`;

      if (announce) status.textContent = message;
      else status.dataset.currentItem = message;
    }
  }

  function moveCarousel(direction, announce = true) {
    if (!viewport) return;

    const items = getVisualItems(viewport);
    const activeIndex = getActiveItemIndex(viewport, items);
    const lastStartIndex = Math.max(0, items.length - getVisibleItemCount(viewport, items));
    const targetIndex =
      direction === "next"
        ? activeIndex >= lastStartIndex
          ? 0
          : Math.min(activeIndex + 1, lastStartIndex)
        : activeIndex <= 0
          ? lastStartIndex
          : Math.max(activeIndex - 1, 0);
    const targetItem = items[targetIndex];
    const viewportBox = viewport.getBoundingClientRect();
    const targetBox = targetItem.getBoundingClientRect();
    const trackInset = getTrackInset(viewport, items);
    const targetLeft =
      viewport.scrollLeft +
      targetBox.left -
      viewportBox.left -
      trackInset;

    announceNextScroll = announce;
    viewport.scrollTo({
      left: targetLeft,
      behavior: reducedMotionQuery.matches ? "auto" : "smooth",
    });
  }

  function stopCarouselAutoplay() {
    autoplayEnabled = false;
    window.clearInterval(autoplayTimer);
  }

  function startCarouselAutoplay() {
    window.clearInterval(autoplayTimer);

    if (!autoplayEnabled || reducedMotionQuery.matches) return;

    autoplayTimer = window.setInterval(() => {
      if (document.hidden || viewport?.matches(":focus-within") || dragPointerId !== undefined) {
        return;
      }

      moveCarousel("next", false);
    }, 2_000);
  }

  function stopCarouselDrag(event) {
    if (!viewport || event.pointerId !== dragPointerId) return;

    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    dragPointerId = undefined;
    viewport.classList.remove("is-dragging");
    window.setTimeout(() => {
      dragMoved = false;
    });
  }

  carouselControls.addEventListener("click", (event) => {
    const control = event.target.closest("[data-carousel-direction]");

    if (!control || !viewport) return;

    stopCarouselAutoplay();
    moveCarousel(control.dataset.carouselDirection);
  });

  viewport?.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    stopCarouselAutoplay();
    moveCarousel(event.key === "ArrowRight" ? "next" : "previous");
  });

  viewport?.addEventListener("pointerdown", (event) => {
    announceNextScroll = true;

    if (event.pointerType !== "mouse" || event.button !== 0) return;

    dragPointerId = event.pointerId;
    dragStartX = event.clientX;
    dragStartScrollLeft = viewport.scrollLeft;
    dragMoved = false;
  });

  viewport?.addEventListener("pointermove", (event) => {
    if (event.pointerId !== dragPointerId) return;

    const distance = event.clientX - dragStartX;

    if (!dragMoved && Math.abs(distance) <= 6) return;

    if (!dragMoved) {
      dragMoved = true;
      stopCarouselAutoplay();
      viewport.setPointerCapture(event.pointerId);
      viewport.classList.add("is-dragging");
    }

    viewport.scrollLeft = dragStartScrollLeft - distance;
  });

  viewport?.addEventListener("pointerup", stopCarouselDrag);
  viewport?.addEventListener("pointercancel", stopCarouselDrag);
  viewport?.addEventListener("lostpointercapture", stopCarouselDrag);

  viewport?.addEventListener(
    "touchstart",
    (event) => {
      if (event.touches.length !== 1) return;

      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
      touchGestureDirection = undefined;
    },
    { passive: true },
  );

  viewport?.addEventListener(
    "touchmove",
    (event) => {
      if (touchGestureDirection || event.touches.length !== 1) return;

      const distanceX = event.touches[0].clientX - touchStartX;
      const distanceY = event.touches[0].clientY - touchStartY;
      const absoluteX = Math.abs(distanceX);
      const absoluteY = Math.abs(distanceY);

      if (Math.max(absoluteX, absoluteY) <= 8) return;

      touchGestureDirection = absoluteX > absoluteY ? "horizontal" : "vertical";

      if (touchGestureDirection === "horizontal") {
        announceNextScroll = true;
        stopCarouselAutoplay();
      }
    },
    { passive: true },
  );

  viewport?.addEventListener("touchend", () => {
    touchGestureDirection = undefined;
  }, { passive: true });
  viewport?.addEventListener("touchcancel", () => {
    touchGestureDirection = undefined;
  }, { passive: true });

  viewport?.addEventListener("dragstart", (event) => event.preventDefault());
  viewport?.addEventListener("wheel", () => {
    announceNextScroll = true;
  }, { passive: true });
  viewport?.addEventListener(
    "click",
    (event) => {
      if (!dragMoved) return;

      event.preventDefault();
      event.stopPropagation();
      dragMoved = false;
    },
    { capture: true },
  );

  viewport?.addEventListener(
    "scroll",
    () => {
      window.clearTimeout(scrollStatusTimer);
      scrollStatusTimer = window.setTimeout(() => {
        updateCarouselState(announceNextScroll);
        announceNextScroll = false;
      }, 140);
    },
    { passive: true },
  );

  window.requestAnimationFrame(() => updateCarouselState());
  startCarouselAutoplay();

  reducedMotionQuery.addEventListener("change", startCarouselAutoplay);
}

const revealSections = document.querySelectorAll("main > section");
const revealMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

if (revealSections.length && !revealMotionQuery.matches && "IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        sectionObserver.unobserve(entry.target);
      });
    },
    {
      rootMargin: "-8% 0px -8% 0px",
      threshold: 0.05,
    },
  );

  revealSections.forEach((section) => {
    section.classList.add("section-reveal");
    sectionObserver.observe(section);
  });
}
