var mongoose = require('mongoose');
var config = require('./config');
var db;

mongoose.Promise = global.Promise;
db = mongoose.createConnection(config.dbConfig.url, function(err){
        if(err){
            console.log('coud not connect to database' + err);
        } else{
            console.log('connected to database ' + config.dbConfig.database);
        }
    });
module.exports = db;
 