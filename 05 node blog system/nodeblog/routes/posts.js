var express 	= require('express');
var router 		= express.Router();
var mongo 		= require('mongodb');
var db 			= require('monk')('localhost/nodeblog');

router.get('/add', function(req, res, next){
	res.render('addpost', {
		"title": "Add Post" 
	});
});

router.post('/add', function(req, res, next){
	// Get form values
	var title 		= req.body.title;
	var category 	= req.body.category;
	var body 		= req.body.body;
	var author 		= req.body.author;
	var date 		= new Date();
});

module.exports = router;
