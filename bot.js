const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = 'ТВОЙ_ТОКЕН_БОТА'; // 7610878382:AAGzzueFe3d5WhJsenI5SxYpBGFmcnMEku4
const bot = new TelegramBot(token, { polling: true });

// Команда /start
bot.onText(/\/reflect (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userInput = match[1];
  const safeInput = encodeURIComponent(userInput);

  try {
    const response = await axios.post('https://reflect-dreamrunner-main.onrender.com/reflect', {
      text: safeInput
    });

    bot.sendMessage(chatId, decodeURIComponent(response.data.message || 'Ответ от DreamRunner получен!'));
  } catch (error) {
    console.error('Ошибка запроса:', error.message);
    bot.sendMessage(chatId, 'Ошибка при подключении к DreamRunner.');
  }
});


// Команда /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpMessage = `
📋 Список доступных команд:

/start - Начать работу с ботом
/help - Показать это сообщение
/reflect [текст] - Отправить текст на отражение в DreamRunner
  `;

  bot.sendMessage(chatId, helpMessage);
});


async function sendReflectRequest(userInput) {
  try {
    const response = await axios.post('https://reflect-dreamrunner-main.onrender.com/reflect', {
      text: userInput
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка запроса к DreamRunner:', error.message);
    return { message: 'DreamRunner недоступен.' };
  }
}

bot.onText(/\/reflect (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userInput = match[1];

  const result = await sendReflectRequest(userInput);

  bot.sendMessage(chatId, result.message);
});

