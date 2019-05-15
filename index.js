var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./database/mongodb/util/config');

var authenticate = require('./database/routes/authenticate-controller')(router);
var user = require('./database/routes/user-controller')(router);
var task = require('./database/routes/task-controller')(router);
var team = require('./database/routes/team-controller')(router);
var message = require('./database/routes/message-controller')(router);

app.use(cors({
    origin: config.cors.origin
}));

// adding body-parser
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

// static files
app.use(express.static(__dirname + '/src'));

//adding routes
app.use('/api', authenticate);
app.use('/api', user);
app.use('/api', task);
app.use('/api', team);
app.use('/api', message);

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname + 'myApp/src/index.html'));
});

app.listen(config.port, function(){
    console.log('listening on port 8000');
});