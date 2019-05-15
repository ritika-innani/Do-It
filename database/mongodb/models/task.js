var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var db = require('../util/dbconnect');

var taskSchema = new Schema({
    user_id: {type: String, required: true},
    project: {type: String, required: true},
    task: {type: String, required: true},
    description: {type: String, required: true},
    created_on: {type: Date, default: Date.now()},
    due_date: {},
    assignee: {type: String},
    priority: {type: String},
    status: {type: String}
});

module.exports = db.model('Task', taskSchema);