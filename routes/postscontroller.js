var mysql      = require('mysql');
var qs = require('querystring');
var settings = require('../setting');

var connection = mysql.createConnection(settings.databaseAuth);

module.exports = {
	getRecords: function(req, res) {
	    var sql = 'SELECT `id`,`response`,`created_at` FROM `post` order by id';
	    connection.query(
		  	sql, 
		  	function (error, results, fields) {
		  	    if(error){
		  		console.log("getPosts error");
		  	    }
		  	    res.render('bbs', { title: "bbs", posts: results });
		  	    });
	},
	addRecord: function(req,res) {
	    var body = "";
	    req.on("data", function(chunk){
		body += chunk;
	    });
	    req.on("end", function() {
		var contents = qs.parse(body);
		var sql = "insert into post set ?";
		connection.query(
			sql,{response:contents.name,created_at:new Date()},
			function(error,results,fields){
			    if(error){
				console.log("addPost error");
			    }
			    res.redirect('/');
			});
	    });
	}
}