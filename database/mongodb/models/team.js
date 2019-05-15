var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var db = require('../util/dbconnect');

var teamSchema = new Schema({
    email: {type: String, required: true},
    member: {type: String, required: true}
});

module.exports = db.model('Team', teamSchema);