const axios = require('axios');

const TelegramBot = require('node-telegram-bot-api');

const token = '6043814170:AAGbic9sWgZ2ztmRO4bnVGyEBtOMrxeFbw4';

const bot = new TelegramBot(token, {
    polling: true
});
console.log("Started")