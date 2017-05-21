const config = require('./config.json'); // Import configuration
const fs = require('fs'); // For log writing
const moment = require('moment'); // Part of log writing
var database = require('./database.js');

module.exports = { // Export event functions
	"ready": function ready(bot) { // Once the bot is ready (fully booted) ...
		console.log(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] ${bot.user.username} ready!`); // ...console log a ready message...
		bot.user.setGame("beep boop"); // ...and set default game status.
		database.initializeTables();
	},
	"error": function error(bot) { // If a "serious connection error" occurs...
		console.log(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] ${bot.user.username} encountered a "serious connection error"!`); // ...console log a notifcation.
	},
	"join": function join(bot, guild) { // Once the bot joins a new server ...
		console.log(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] ${bot.user.username} has joined a new server! ("${guild.name}")`); // ...console log a notification...
		fs.appendFileSync(`${config.logPath}${config.serverLog}`, `\n[${moment().format('DD/MM/YYYY HH:mm:ss')}][SERVERS] ${bot.user.username} has joined the '${guild.name}' server!`);
		// ...and log which server was joined and when.
	},
	"leave": function leave(bot, guild) { // Once the bot leaves a server...
		console.log(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] ${bot.user.username} has left a server! ("${guild.name}")`); // ...console log a notification...
		fs.appendFileSync(`${config.logPath}${config.serverLog}`, `\n[${moment().format('DD/MM/YYYY HH:mm:ss')}][SERVERS] ${bot.user.username} has left the '${guild.name}' server!`);
		// ...and log which server was left and when.
	}

};
