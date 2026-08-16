document.querySelectorAll("[data-opening-hours]").forEach((openingHoursElement) => {
  const openingLabel = openingHoursElement.querySelector("[data-opening-label]");
  const openingDetail = openingHoursElement.querySelector("[data-opening-detail]");
  const bakeryTimeZone = "Europe/Prague";
  const openingHours = Array.from({ length: 7 }, () => []);
  const weekdayIndexes = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const nextDayPhrases = [
    "v neděli",
    "v pondělí",
    "v úterý",
    "ve středu",
    "ve čtvrtek",
    "v pátek",
    "v sobotu",
  ];
  const bakeryDateFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: bakeryTimeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  function parseTimeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes;
  }

  openingHoursElement.querySelectorAll("[data-opening-days]").forEach((scheduleRow) => {
    if (scheduleRow.hasAttribute("data-closed")) return;

    const times = scheduleRow.querySelectorAll("time[datetime]");
    if (times.length !== 2) return;

    const interval = {
      start: parseTimeToMinutes(times[0].dateTime),
      end: parseTimeToMinutes(times[1].dateTime),
    };

    scheduleRow.dataset.openingDays.split(/\s+/).forEach((weekday) => {
      const weekdayIndex = Number(weekday);

      if (Number.isInteger(weekdayIndex) && openingHours[weekdayIndex]) {
        openingHours[weekdayIndex].push(interval);
      }
    });
  });

  function getBakeryTime(date) {
    const dateParts = Object.fromEntries(
      bakeryDateFormatter
        .formatToParts(date)
        .filter(({ type }) => type !== "literal")
        .map(({ type, value }) => [type, value]),
    );

    return {
      weekday: weekdayIndexes[dateParts.weekday],
      minutes: Number(dateParts.hour) * 60 + Number(dateParts.minute),
    };
  }

  function formatOpeningTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = String(minutes % 60).padStart(2, "0");

    return `${hours}:${remainingMinutes}`;
  }

  function findNextOpening(currentWeekday, currentMinutes) {
    for (let dayOffset = 0; dayOffset < 8; dayOffset += 1) {
      const weekday = (currentWeekday + dayOffset) % 7;
      const dayIntervals = openingHours[weekday];
      const nextInterval = dayIntervals.find(
        ({ start }) => dayOffset > 0 || start > currentMinutes,
      );

      if (nextInterval) {
        return { dayOffset, weekday, start: nextInterval.start };
      }
    }

    return null;
  }

  function setOpeningStatus(state, label, detail) {
    if (openingHoursElement.dataset.state !== state) {
      openingHoursElement.dataset.state = state;
    }

    if (openingLabel.textContent !== label) {
      openingLabel.textContent = label;
    }

    if (openingDetail.textContent !== detail) {
      openingDetail.textContent = detail;
    }
  }

  function updateOpeningStatus(now = new Date()) {
    if (!openingLabel || !openingDetail) return;

    const { weekday, minutes } = getBakeryTime(now);
    const currentInterval = openingHours[weekday].find(
      ({ start, end }) => minutes >= start && minutes < end,
    );

    if (currentInterval) {
      setOpeningStatus(
        "open",
        "Otevřeno",
        ` – dnes do ${formatOpeningTime(currentInterval.end)}`,
      );
      return;
    }

    const nextOpening = findNextOpening(weekday, minutes);

    if (!nextOpening) {
      setOpeningStatus("closed", "Zavřeno", " – otevírací dobu ověřte telefonicky");
      return;
    }

    const dayPhrase =
      nextOpening.dayOffset === 0
        ? "dnes"
        : nextOpening.dayOffset === 1
          ? "zítra"
          : nextDayPhrases[nextOpening.weekday];

    setOpeningStatus(
      "closed",
      "Zavřeno",
      ` – ${dayPhrase} od ${formatOpeningTime(nextOpening.start)}`,
    );
  }

  function scheduleOpeningStatusUpdate() {
    const delayUntilNextMinute = 60_000 - (Date.now() % 60_000) + 50;

    window.setTimeout(() => {
      updateOpeningStatus();
      scheduleOpeningStatusUpdate();
    }, delayUntilNextMinute);
  }

  updateOpeningStatus();
  scheduleOpeningStatusUpdate();

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") updateOpeningStatus();
  });
});
