document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = form.elements['name'].value.trim();
    const contact = form.elements['contact'].value.trim();
    const company = form.elements['company'].value.trim();
    const message = form.elements['message'].value.trim();

    if (!name || !contact) {
      status.textContent = 'Заполните имя и контакт для связи.';
      status.className = 'form-status error';
      return;
    }

    submitButton.disabled = true;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, contact, company, message }),
      });

      if (!response.ok) {
        throw new Error('request failed');
      }

      status.textContent = 'Заявка отправлена. Мы свяжемся с вами в течение рабочего дня.';
      status.className = 'form-status success';
      form.reset();
    } catch (error) {
      status.textContent = 'Не удалось отправить заявку. Попробуйте ещё раз или напишите на info@agbg.ru.';
      status.className = 'form-status error';
    } finally {
      submitButton.disabled = false;
    }
  });
});
