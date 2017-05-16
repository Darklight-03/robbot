const config = require('../config.json'); // Import configuration
const request = require('request'); // For website interaction
const fs = require('fs'); // For log writing
const moment = require('moment'); // Part of log writing
const prism = require('prism-media'); // Prism for smoother file playing of very short files
const database = require('../database.js');

exports.main = function(bot, msg, timeout, botPerm, userPerm) { // Export command function
	var command = "mute"; // For logging purposes
	if (timeout.check(msg.author.id, msg)) {
		return;
	}
	// Check for cooldown, if on cooldown notify user of it and abort command execution.
	let args = msg.content.substr(config.commandPrefix.length + command.length + 2);
	let lengthMute = parseInt(args.trim().split(' ')[1])*1000;
	let arg2 = lengthMute;
	let users = msg.guild.members;
	let mutee = users.get(msg.mentions.users.first().id);
	//console.log(msg.mentions.users.first());
	let muted = msg.guild.roles.find("name", 'Muted').id;
	database.addMuted(mutee.id, msg.guild.id, lengthMute);
	try {
		if (!msg.member.hasPermission("KICK_MEMBERS")) {
			msg.reply("U R NOT A MODERATOR");
		} else {
			if (mutee.roles.has(muted)) {
				msg.reply("that user is already muted");
			} else {
				//mute them.
				mutee.addRole(muted);
				msg.guild.createChannel('temp', 'voice').then(channel => {
					mutee.setVoiceChannel(channel).then(member => {
						channel.delete();
					});
				});
				lengthMute = lengthMute+Date.now();
				fs.writeFile('serverconf/muted/' + mutee.id, msg.guild.id+' '+lengthMute, (err) => {
					if (err) {
						msg.reply("error writing to file, err: " + err.toString());
					}
				});
				msg.reply("muted " + mutee.toString() + ' for ' + arg2 / 1000 + ' seconds.');
			}
		}
	} catch (err) {
		msg.reply("failed, " + err.toString());
	}
};


exports.desc = "mute the user specified"; // Export command description
exports.syntax = "<user>"; // Export command syntax
