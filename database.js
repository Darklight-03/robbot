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
  member_id VARCHAR(30) PRIMARY KEY NOT NULL, \
  guild_id VARCHAR(30), \
  epoch_unmute BIGINT(64) UNSIGNED \
  );', (error, results, fields) => {
    if(error) throw error;
    if(typeof results !== 'undefined'){
      console.log('initialized tables: ', results);
    }
  });
};
exports.addMuted = function(member_id, guild_id, epoch_unmute){
  db.query('INSERT INTO muted (member_id, guild_id, epoch_unmute) \
  VALUES (?, ?, ?);', [member_id, guild_id, epoch_unmute], (error,results,fields) => {
    if(error) throw error;
    if(typeof results !== 'undefined'){
      console.log('added muted ',results);
    }
  });
}
exports.getMuted = function(){
  db.query('SELECT * FROM muted;',(error, results, fields) => {
    if(error) throw error;
    console.log(); //TODO parse results and then return.
    return results;
  });
}

//module.exports = connect, initializeTables;
