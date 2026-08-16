const routeElements = [...document.querySelectorAll("[data-route]")];
const routeFilter = document.querySelector("[data-route-filter]");

if (routeElements.length) {
  const routeTimeZone = "Europe/Prague";

  const weekdayIndexes = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const weekdayLabels = {
    0: "neděli",
    1: "pondělí",
    2: "úterý",
    3: "středu",
    4: "čtvrtek",
    5: "pátek",
    6: "sobotu",
  };

  const routeDateFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: routeTimeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  function parseTimeToMinutes(time) {
    const [hours, minutes] = String(time || "").split(":").map(Number);

    if (!Number.isInteger(hours) || !Number.isInteger(minutes)) {
      return null;
    }

    return hours * 60 + minutes;
  }

  function displayTime(time) {
    return String(time || "").replace(/^0/, "");
  }

  function getRouteTime(date = new Date()) {
    const dateParts = Object.fromEntries(
      routeDateFormatter
        .formatToParts(date)
        .filter(({ type }) => type !== "literal")
        .map(({ type, value }) => [type, value]),
    );

    return {
      weekday: weekdayIndexes[dateParts.weekday],
      minutes: Number(dateParts.hour) * 60 + Number(dateParts.minute),
    };
  }

  function getRouteWeekdays(route) {
    return (route.dataset.routeDays || "")
      .split(/\s+/)
      .map(Number)
      .filter((day) => Number.isInteger(day) && day >= 0 && day <= 6);
  }

  function getRouteSchedule(route) {
    const weekdays = getRouteWeekdays(route);

    const stops = [...route.querySelectorAll("[data-route-stop]")]
      .map((element) => {
        const from = parseTimeToMinutes(element.dataset.timeFrom);
        const to = parseTimeToMinutes(element.dataset.timeTo);

        if (from === null || to === null) {
          return null;
        }

        return {
          element,
          from,
          to,
          municipality:
            element
              .querySelector(".mobile-route_stop-name")
              ?.textContent.trim() || "",
        };
      })
      .filter(Boolean)
      .sort((firstStop, secondStop) => firstStop.from - secondStop.from);

    return { weekdays, stops };
  }

  function getRouteDaysLabel(weekdays) {
    return weekdays
      .map((weekday) => weekdayLabels[weekday])
      .filter(Boolean)
      .join(", ");
  }

  function setStatus(route, message, state) {
    const statusText = route.querySelector("[data-route-status-text]");

    route.dataset.routeState = state;

    if (statusText && statusText.textContent !== message) {
      statusText.textContent = message;
    }
  }

  function resetStopStates(stops) {
    stops.forEach(({ element }) => {
      delete element.dataset.routeStopState;
      element.removeAttribute("aria-current");
    });
  }

  function updateRoute(route, currentTime) {
    const { weekdays, stops } = getRouteSchedule(route);

    resetStopStates(stops);

    if (!weekdays.includes(currentTime.weekday)) {
      const daysLabel = getRouteDaysLabel(weekdays);

      setStatus(
        route,
        daysLabel ? `Jezdí v ${daysLabel} (časy jsou orientační)` : "Dnes nejede",
        "off",
      );

      return "off";
    }

    if (!stops.length) {
      setStatus(route, "Dnes nejede", "off");
      return "off";
    }

    const firstStop = stops[0];
    const lastStop = stops.at(-1);

    if (currentTime.minutes < firstStop.from) {
      setStatus(
        route,
        `Dnes vyjíždí v ${displayTime(firstStop.element.dataset.timeFrom)}`,
        "upcoming",
      );

      stops.forEach(({ element }, index) => {
        element.dataset.routeStopState = index === 0 ? "next" : "upcoming";

        if (index === 0) {
          element.setAttribute("aria-current", "step");
        }
      });

      return "upcoming";
    }

    if (currentTime.minutes > lastStop.to) {
      setStatus(route, "Dnešní trasa skončila", "finished");

      stops.forEach(({ element }) => {
        element.dataset.routeStopState = "past";
      });

      return "finished";
    }

    const currentStopIndex = stops.findIndex(
      ({ from, to }) =>
        currentTime.minutes >= from && currentTime.minutes <= to,
    );

    if (currentStopIndex >= 0) {
      const currentStop = stops[currentStopIndex];

      setStatus(
        route,
        currentStop.municipality
          ? `Právě jsme v ${currentStop.municipality}`
          : "Právě jsme na zastávce",
        "active",
      );

      stops.forEach(({ element }, index) => {
        if (index < currentStopIndex) {
          element.dataset.routeStopState = "past";
        } else if (index === currentStopIndex) {
          element.dataset.routeStopState = "next";
          element.setAttribute("aria-current", "step");
        } else {
          element.dataset.routeStopState = "upcoming";
        }
      });

      return "active";
    }

    setStatus(route, "Teď na cestě", "active");

    const nextStopIndex = stops.findIndex(
      ({ from }) => from > currentTime.minutes,
    );

    stops.forEach(({ element }, index) => {
      if (nextStopIndex < 0 || index < nextStopIndex) {
        element.dataset.routeStopState = "past";
      } else if (index === nextStopIndex) {
        element.dataset.routeStopState = "next";
        element.setAttribute("aria-current", "step");
      } else {
        element.dataset.routeStopState = "upcoming";
      }
    });

    return "active";
  }

  function updateRoutes({ selectTodayRoute = false } = {}) {
    const currentTime = getRouteTime();

    routeElements.forEach((route) => {
      updateRoute(route, currentTime);
    });

    if (!selectTodayRoute || !routeFilter) {
      return;
    }

    const hasExplicitRouteHash = routeElements.some(
      (route) => window.location.hash === `#${route.id}`,
    );

    if (hasExplicitRouteHash) {
      return;
    }

    const todayRoute = routeElements.find((route) =>
      getRouteWeekdays(route).includes(currentTime.weekday),
    );

    const routeToSelect = todayRoute || routeElements[0];

    if (!routeToSelect) {
      return;
    }

    routeFilter.dispatchEvent(
      new CustomEvent("pino:tabs:activate", {
        detail: {
          panelId: routeToSelect.id,
        },
      }),
    );
  }

  updateRoutes({ selectTodayRoute: true });

  const millisecondsUntilNextMinute =
    60_000 - (Date.now() % 60_000) + 50;

  window.setTimeout(() => {
    updateRoutes();
    window.setInterval(updateRoutes, 60_000);
  }, millisecondsUntilNextMinute);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      updateRoutes();
    }
  });
}
