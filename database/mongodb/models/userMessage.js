var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var db = require('../util/dbconnect');

var messageSchema = new Schema({
    email: {type: String, required: true},
    message: {type: String, required: true}
});

module.exports = db.model('Message', messageSchema);