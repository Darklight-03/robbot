const config = require('./config.json'); // Import configuration
const fs = require('fs'); // For log writing
const moment = require('moment'); // Part of log writing
var mysql = require('mysql');
var db = mysql.createConnection({
	host: 'localhost',
	user: 'bot',
	password: 'fghg',
	database: 'botdb'
});
function connect(){
  db.connect();
}
function initializeTables() {
	db.query('CREATE TABLE IF NOT EXISTS \'muted\' ( \
  \'member_id\' VARCHAR, \
  \'guild_id\' VARCHAR, \
  \'epoch_unmute\' BIGINT UNSIGNED PRIMARY KEY NOT NULL, \
  );', (error, results, fields) => {
    if(error) throw error;
    console.log('The solution is: ', results[0].solution);
	});
}

module.exports = connect, initializeTables;
