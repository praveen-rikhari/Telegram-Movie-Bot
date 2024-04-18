const axios = require('axios');

const TelegramBot = require('node-telegram-bot-api');

const token = '6043814170:AAGbic9sWgZ2ztmRO4bnVGyEBtOMrxeFbw4';

const bot = new TelegramBot(token, {
    polling: true
});

bot.on('message', async (msg) => {
    const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(msg.text)}&apikey=b6ec3311`;
        const response = await axios.get(apiUrl);
        const movie = response.data;
        if (movie.Response === "True") {
            const details = [
                `Title: ${movie.Title}`,
                `Release Date: ${movie.Released}`,
                `Actors: ${movie.Actors}`,
                `Ratings: ${movie.Ratings[0].Value}`
            ];
            bot.sendMessage(msg.chat.id, details.join('\n'));
        } else {
            bot.sendMessage(msg.chat.id, "Movie not found 🎬.");
        }
    } 
);

console.log("started");