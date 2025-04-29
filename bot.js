const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = 'ТВОЙ_ТОКЕН_БОТА'; // 7610878382:AAGzzueFe3d5WhJsenI5SxYpBGFmcnMEku4
const bot = new TelegramBot(token, { polling: true });

// Команда /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = `
👋 Привет! Я твой AI-компаньон PlayAI.fm.

Доступные команды:
/start - Начать работу
/help - Список доступных команд
/reflect [текст] - Отразить твой текст через DreamRunner
  `;
bot.onText(/\/dream (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userInput = match[1];

  try {
    const response = await axios.post('https://reflect-dreamrunner-main.onrender.com/dream', {
      text: userInput
    });

    bot.sendMessage(chatId, response.data.message || 'Ответ от DreamRunner получен!');
  } catch (error) {
    console.error('Ошибка запроса на /dream:', error.message);
    bot.sendMessage(chatId, 'Ошибка при обращении к DreamRunner.');
  }
});
bot.onText(/\/pulse (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userInput = match[1];

  try {
    const response = await axios.post('https://reflect-dreamrunner-main.onrender.com/pulse', {
      text: userInput
    });

    bot.sendMessage(chatId, response.data.message || 'Пульс получен!');
  } catch (error) {
    console.error('Ошибка запроса на /pulse:', error.message);
    bot.sendMessage(chatId, 'Ошибка при подключении к DreamRunner.');
  }
});
app.post('/reflect', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'No text provided.' });
  }

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Проанализируй это сообщение осознанно: "${text}"`,
      max_tokens: 150,
    });

    res.json({ message: completion.data.choices[0].text.trim() });
  } catch (error) {
    console.error('Ошибка запроса к OpenAI:', error.message);
    res.status(500).json({ error: 'Ошибка на сервере AI.' });
  }
});

  bot.sendMessage(chatId, welcomeMessage);
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

