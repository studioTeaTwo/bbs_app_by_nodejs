var http = require('http'),
    fs = require('fs'),
    ejs = require('ejs'),
    qs = require('querystring');
var settings = require('./setting');
var mysql = require('mysql')
var server = http.createServer();
var template = fs.readFileSync(__dirname + '/html/bbs.ejs', 'utf-8');
var posts = [];
var connection = mysql.createConnection(settings.databaseAuth);

function renderForm(res){
    var query = connection.query(
	  	'SELECT `id`,`response`,`create_at` FROM `post` order by id', 
	  	function (error, results, fields) {
	  	    var data = ejs.render(template, {
	  		posts: results
	  		});
		    res.writeHead(200,{'Content-Type':'text/html'});
		    res.write(data);
		    res.end();
		  });
}

server.on('request', function(req,res){
	if(req.method == 'POST'){
	  req.data = "";
	  req.on("readable", function(){
	     req.data += req.read();
	  });
	  req.on("end", function() {
	      var contents = qs.parse(req.data);
	      var query = connection.query(
		      "insert into post set ?",{response:contents.name,create_at:new Date()},
		      function(error,results,fields){
			  renderForm(res);
	      });
	  });
	}else{
	    renderForm(res);
	}
});
server.listen(settings.port,settings.host);
console.log('Server Running at ' + settings.port);

