var express = require('express');
var path = require('path');
var settings = require('./setting');

var routes = require('./routes/postsroutes');

var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/', routes);

app.listen(settings.webServer,function(){
    console.log("server running at" + settings.webServer.port);
});

module.exports = app;
