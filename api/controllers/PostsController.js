/**
 * PostsController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports =  {

	index: function(req,res){
	    Posts.find().exec(function afterFind(err, posts) {
		  if (err) {
		    // uh oh
		    // (handle error; e.g. `return res.negotiate()`)
		    return;
		  }
		  return res.view({posts: posts});
	    });
	},
        create: function(req,res){
            Posts.create({response:req.param("contribution")}).exec(function(err) {
                  if (err) {
                    // uh oh
                    // (handle error; e.g. `return res.negotiate()`)
                    return;
                  }
                  return res.redirect("/");
            });
        }
}
