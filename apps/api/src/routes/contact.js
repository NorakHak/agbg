const bodySchema = {
  type: 'object',
  required: ['name', 'contact'],
  properties: {
    name: { type: 'string', minLength: 1 },
    contact: { type: 'string', minLength: 1 },
    company: { type: 'string' },
    message: { type: 'string' },
  },
};

function formatTelegramText({ name, contact, company, message }) {
  const lines = [
    '📩 Новая заявка с сайта agbg',
    `Имя: ${name}`,
    `Контакт: ${contact}`,
  ];
  if (company) lines.push(`Компания: ${company}`);
  if (message) lines.push(`Комментарий: ${message}`);
  return lines.join('\n');
}

export default async function contactRoutes(app) {
  app.post('/api/contact', { schema: { body: bodySchema } }, async (request, reply) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      request.log.error('TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID is not configured');
      return reply.code(500).send({ ok: false, error: 'Notification channel is not configured' });
    }

    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatTelegramText(request.body),
      }),
    });

    if (!telegramResponse.ok) {
      request.log.error({ status: telegramResponse.status }, 'Telegram sendMessage failed');
      return reply.code(502).send({ ok: false, error: 'Failed to deliver the request, try again later' });
    }

    return reply.code(200).send({ ok: true });
  });
}
