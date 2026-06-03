// Готовый локальный JS-скрипт: просмотр изображений галереи в модальном окне.
(function () {
  const triggers = document.querySelectorAll("[data-lightbox]");
  if (!triggers.length) return;

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.innerHTML = `
    <button class="lightbox__close" type="button" aria-label="Закрыть изображение">×</button>
    <div class="lightbox__dialog">
      <img src="" alt="">
      <div class="lightbox__caption"></div>
    </div>
  `;
  document.body.appendChild(lightbox);

  const img = lightbox.querySelector("img");
  const caption = lightbox.querySelector(".lightbox__caption");
  const close = lightbox.querySelector(".lightbox__close");

  function openLightbox(src, text) {
    img.src = src;
    img.alt = text || "Изображение из галереи";
    caption.textContent = text || "";
    lightbox.classList.add("is-open");
    close.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    img.src = "";
  }

  triggers.forEach((button) => {
    button.addEventListener("click", () =>
      openLightbox(button.dataset.lightbox, button.dataset.caption),
    );
  });

  close.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open"))
      closeLightbox();
  });
})();
