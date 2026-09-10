const CONTACT_PATTERN = /^(?:[^\s@]+@[^\s@]+\.[^\s@]+|[+\d][\d\s\-()]{6,19})$/;

function validateContactForm({ name, contact, company, message }) {
  if (name.length < 2 || name.length > 80) {
    return 'Имя должно быть от 2 до 80 символов.';
  }
  if (!contact) {
    return 'Укажите телефон или почту для связи.';
  }
  if (!CONTACT_PATTERN.test(contact)) {
    return 'Укажите корректный телефон или e-mail.';
  }
  if (company.length > 120) {
    return 'Название компании слишком длинное (макс. 120 символов).';
  }
  if (message.length > 1000) {
    return 'Комментарий слишком длинный (макс. 1000 символов).';
  }
  return null;
}

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

    const validationError = validateContactForm({ name, contact, company, message });
    if (validationError) {
      status.textContent = validationError;
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
