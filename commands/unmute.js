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
	let users = msg.guild.members;
	let mutee = users.get(msg.mentions.users.first().id);
	//console.log(msg.mentions.users.first());
	let muted = msg.guild.roles.find("name", 'Muted').id;
	try {
		if (!msg.member.hasPermission("KICK_MEMBERS")) {
			msg.reply("U R NOT A MODERATOR");
		} else {
			if (mutee.roles.has(muted)) {
				mutee.removeRole(muted);
				database.removeMuted(mutee,msg.guild);
				msg.reply("UNMUTED " + mutee.toString());
			} else {
				msg.reply(mutee.toString() + " IS NOT MUTED. CANNOT COMPUTE. KMS.");
			}
		}
	} catch (err) {
		msg.reply("failed, " + err.toString());
	}
};


exports.desc = "unmute the user specified"; // Export command description
exports.syntax = "<user>"; // Export command syntax
