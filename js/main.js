document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.elements['name'].value.trim();
    const contact = form.elements['contact'].value.trim();

    if (!name || !contact) {
      status.textContent = 'Заполните имя и контакт для связи.';
      status.className = 'form-status error';
      return;
    }

    // TODO: подключить реальную отправку (API / email-сервис) вместо заглушки.
    status.textContent = 'Заявка отправлена. Мы свяжемся с вами в течение рабочего дня.';
    status.className = 'form-status success';
    form.reset();
  });
});
