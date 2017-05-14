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
exports.connect = function(){
  db.connect();
};
exports.initializeTables = function(){
	db.query('CREATE TABLE IF NOT EXISTS muted ( \
  member_id VARCHAR(30), \
  guild_id VARCHAR(30), \
  epoch_unmute BIGINT(64) UNSIGNED PRIMARY KEY NOT NULL \
  );', (error, results, fields) => {
    if(error) throw error;
    if(typeof results !== 'undefined'){
      console.log('initialized tables: ', results);
    }
  });
};

//module.exports = connect, initializeTables;
