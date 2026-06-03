(function () {
  const nav = document.querySelector("[data-nav]");
  const burger = document.querySelector("[data-burger]");
  const toTop = document.querySelector("[data-to-top]");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(isOpen));
    });
    nav.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (toTop) {
    window.addEventListener("scroll", () => {
      toTop.classList.toggle("is-visible", window.scrollY > 640);
    });
    toTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
  }

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  function normalisePhone(value) {
    return value.replace(/[^\d+]/g, "");
  }

  document.querySelectorAll(".booking-form").forEach((form) => {
    const status = form.querySelector(".form-status");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const phone = normalisePhone(String(formData.get("phone") || ""));
      const required = Array.from(form.querySelectorAll("[required]"));
      const invalid = required.find((input) => {
        if (input.type === "checkbox") return !input.checked;
        return !String(input.value || "").trim();
      });

      if (invalid) {
        invalid.focus();
        if (status) {
          status.textContent =
            "Пожалуйста, заполните обязательные поля формы записи.";
          status.style.background = "#fff4ee";
          status.style.color = "#9b3b1d";
          status.style.borderColor = "#ffd1bd";
          status.classList.add("is-visible");
        }
        return;
      }

      if (phone.length < 10) {
        const phoneField = form.querySelector('[name="phone"]');
        if (phoneField) phoneField.focus();
        if (status) {
          status.textContent =
            "Проверьте номер телефона: администратор должен суметь связаться с вами.";
          status.style.background = "#fff4ee";
          status.style.color = "#9b3b1d";
          status.style.borderColor = "#ffd1bd";
          status.classList.add("is-visible");
        }
        return;
      }

      const payload = Object.fromEntries(formData.entries());
      payload.createdAt = new Date().toISOString();
      const saved = JSON.parse(
        localStorage.getItem("funScissorsBookings") || "[]",
      );
      saved.push(payload);
      localStorage.setItem("funScissorsBookings", JSON.stringify(saved));

      if (status) {
        status.textContent =
          "Спасибо! Заявка сохранена в прототипе. На рабочем сайте она будет уходить администратору.";
        status.style.background = "#e8fff0";
        status.style.color = "#135f3a";
        status.style.borderColor = "#c5efd6";
        status.classList.add("is-visible");
      }
      form.reset();
    });
  });
})();
