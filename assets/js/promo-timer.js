// Готовый локальный JS-скрипт: секундомер/таймер для промо-баннера.
(function () {
  const timer = document.querySelector("[data-countdown]");
  if (!timer) return;

  const target = new Date();
  target.setDate(target.getDate() + 6);
  target.setHours(18, 0, 0, 0);

  const daysNode = timer.querySelector("[data-days]");
  const hoursNode = timer.querySelector("[data-hours]");
  const minutesNode = timer.querySelector("[data-minutes]");
  const secondsNode = timer.querySelector("[data-seconds]");

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function update() {
    const diff = Math.max(0, target - new Date());
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    daysNode.textContent = pad(days);
    hoursNode.textContent = pad(hours);
    minutesNode.textContent = pad(minutes);
    secondsNode.textContent = pad(seconds);
  }

  update();
  setInterval(update, 1000);
})();
