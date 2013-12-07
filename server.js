// The main application script, ties everything together.

var express = require('express');
// var mongoose = require('mongoose');
var app = module.exports = express();

// connect to Mongo when the app initializes
// mongoose.connect('mongodb://localhost/norum');

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

// set up the RESTful API, handler methods are defined in api.js
// var api = require('./controllers/api.js');
// app.post('/thread', api.post);
// app.get('/thread/:title.:format?', api.show);
// app.get('/thread', api.list);

app.listen(3000);
// console.log("Express server listening on port %d", app.address().port);
app.get('/', function(req, res) {
  res.send('hi there');
});
app.get('/test', function(req, res) {
  res.send("you made it");
});
