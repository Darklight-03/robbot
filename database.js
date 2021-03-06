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
  member_id VARCHAR(30) NOT NULL, \
  guild_id VARCHAR(30) NOT NULL, \
  epoch_unmute BIGINT(64) UNSIGNED \
  );', (error, results, fields) => {
    if(error) throw error;
    if(typeof results !== 'undefined'){
      console.log('initialized tables');
    }
  });
};
exports.removeMuted = function(member_id,guild_id){
  db.query('DELETE FROM muted WHERE member_id = ? AND guild_id = ?',[member_id,guild_id],(error,results,fields) => {
    if(error) throw error;
    if(typeof results !== 'undefined'){
      // console.log('removed from muted',results);
      return true;
    }
  });
}
exports.addMuted = function(member_id, guild_id, epoch_unmute){
  db.query('INSERT INTO muted (member_id, guild_id, epoch_unmute) \
  VALUES (?, ?, ?);', [member_id, guild_id, epoch_unmute], (error,results,fields) => {
    if(error) throw error;
    if(typeof results !== 'undefined'){
      // console.log('added muted ',results);
    }
  });
}
/**
* @param {String} get - member_id, guild_id, epoch_unmute
* @param {Integer} num - which line to get 
*/
exports.getMuted = function(get, num){
  return new Promise((resolve,reject)=>{
    db.query('SELECT * FROM muted;',(error, results, fields) => {
      if(error) throw error;
      r=[];
      for(i = 0;i<results.length;i++){
        if(typeof get !== 'undefined'){
          if(get == 'member_id') r.push(results[i].member_id);
          if(get == 'guild_id') r.push(results[i].guild_id);
          if(get == 'epoch_unmute') r.push(results[i].epoch_unmute);
        }
        else{
          r.push(results[i]);
        }
      }
      if(typeof num !== 'undefined'&&num<results.length) r=r[num];
      // console.log('results: ',results,'\nr = ',r); //TODO parse results and then return.
      resolve(r);
    });
  });
  
}

//module.exports = connect, initializeTables;
