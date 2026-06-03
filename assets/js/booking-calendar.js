// Готовый локальный JS-скрипт: календарь/ограничение даты записи.
(function () {
  const dateFields = document.querySelectorAll('input[type="date"]');
  if (!dateFields.length) return;

  const isEnglish = document.documentElement.lang === "en";
  const messages = isEnglish
    ? {
        available: "Booking is available for the next 45 days.",
        closed: "Sunday is a day off. Please choose another day.",
        ok: "Date is available. Choose a convenient time.",
        invalid: "Sunday is a day off",
      }
    : {
        available: "Запись доступна на ближайшие 45 дней.",
        closed: "Воскресенье — выходной. Выберите другой день.",
        ok: "Дата доступна. Выберите удобное время.",
        invalid: "Воскресенье — выходной день",
      };

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const minDate = `${yyyy}-${mm}-${dd}`;

  const max = new Date(today);
  max.setDate(max.getDate() + 45);
  const maxDate = `${max.getFullYear()}-${String(max.getMonth() + 1).padStart(2, "0")}-${String(max.getDate()).padStart(2, "0")}`;

  dateFields.forEach((field) => {
    field.min = minDate;
    field.max = maxDate;

    const note = document.createElement("span");
    note.className = "calendar-note";
    note.textContent = messages.available;

    // Подсказка выносится отдельной строкой сетки формы, чтобы она не растягивала поле даты
    // и не смещала кнопку отправки вниз.
    const dateFieldWrapper = field.closest(".field");
    if (dateFieldWrapper) {
      dateFieldWrapper.insertAdjacentElement("afterend", note);
    } else {
      field.insertAdjacentElement("afterend", note);
    }

    field.addEventListener("change", () => {
      const selected = new Date(field.value);
      const day = selected.getDay();
      if (day === 0) {
        note.textContent = messages.closed;
        note.classList.add("calendar-note--warning");
        field.setCustomValidity(messages.invalid);
      } else {
        note.textContent = messages.ok;
        note.classList.remove("calendar-note--warning");
        field.setCustomValidity("");
      }
    });
  });
})();
