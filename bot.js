// Import the axios module for making HTTP requests
const axios = require('axios');

// Import the node-telegram-bot-api module
const TelegramBot = require('node-telegram-bot-api');

// Telegram Bot token obtained from BotFather
const token = '6043814170:AAGbic9sWgZ2ztmRO4bnVGyEBtOMrxeFbw4';

// Initialize the Telegram bot with polling enabled to receive messages
const bot = new TelegramBot(token, {
    polling: true
});

// Event listener for incoming messages
bot.on('message', async (msg) => {
    // Constructed the API URL, encoding the user's text input to handle special characters
    const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(msg.text)}&apikey=b6ec3311`;

    try {
        // Make an HTTP GET request to the OMDB API
        const response = await axios.get(apiUrl);
        // Extract the movie data from the response
        const movie = response.data;

        // Check if the API found a matching movie
        if (movie.Response === "True") {
            // Prepare movie details for output
            const details = [
                `Poster: ${movie.Poster}`,
                `Title: ${movie.Title}`,
                `Release Date: ${movie.Released}`,
                `RunTime: ${movie.Runtime}`,
                `Genre: ${movie.Genre}`,
                `Actors: ${movie.Actors}`,
                `Director: ${movie.Director}`,
                `Ratings: ${movie.Ratings[0].Value}`,
                `Rotten Tomatoes: ${movie.Ratings[1].Value}`,
                `Awards Won: ${movie.Awards}`,
            ];
            // Send the movie details to the user
            bot.sendMessage(msg.chat.id, details.join('\n'));
        } else {
            // Notify the user if no movie was found
            bot.sendMessage(msg.chat.id, "Movie not found 🎬.");
        }
    } catch (error) {
        // Log and notify of any errors during the API request
        console.error('Error fetching data:', error);
        bot.sendMessage(msg.chat.id, "Error occurred while fetching movie data.");
    }
});

// Log to console when the bot is successfully started
console.log("Bot Started");
