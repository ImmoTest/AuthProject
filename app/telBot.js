/**
 * Created by kamill on 6/23/16.
 */
var TelegramBot = require('node-telegram-bot-api');
var token = '181209309:AAG4KXY2B-IFdTwxb5pB0FtJQbszXkjmsIw';
var bot = new TelegramBot(token, {polling: true});

bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    var text = msg.text;
    if(text == '/letmein'){
        var code = Math.floor(Math.random() * 99999) + 10000;
        bot.sendMessage(chatId, 'Login: ' + chatId + '\nPassword: ' + code);
        bot.sendMessage(chatId, 'Enter login and password on this page: wifi1.university.innopolis.ru/tg');
    } else if (text == '/help'){
        bot.sendMessage("Help command");
    } else if (text == '/start') {
        bot.sendMessage(chatId, 'Welcome ' + msg.chat.first_name + ' ' + msg.chat.last_name
            + '!\n' + 'Send "/letmein" for getting login and password.\n'
            + 'Send "/help" for understanding of this things.\n');
    } else {
        bot.sendMessage(chatId, "Something went wrong. Please, try again.");
    }
});