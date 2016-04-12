var mysql      = require('mysql');
var qs = require('querystring');
var settings = require('../setting');

var connection = mysql.createConnection(settings.databaseAuth);

module.exports = {
	getRecords: function(req, res) {
	    var sql = 'SELECT `id`,`response`,`create_at` FROM `post` order by id';
	    connection.query(
		  	sql, 
		  	function (error, results, fields) {
		  	    if(error){
		  		console.log("getPosts error");
		  	    }
		  	    res.render('bbs', { posts: results });
		  	    });
	},
	addRecord: function(req,res) {
	    req.data = "";
	    req.on("readable", function(){
		req.data += req.read();
	    });
	    req.on("end", function() {
		var contents = qs.parse(req.data);
		var sql = "insert into post set ?";
		connection.query(
			sql,{response:contents.name,create_at:new Date()},
			function(error,results,fields){
			    if(error){
				console.log("addPost error");
			    }
			    res.redirect('/');
			});
	    });
	}
}