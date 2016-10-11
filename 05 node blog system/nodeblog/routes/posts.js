var express 	= require('express');
var router 		= express.Router();
var mongo 		= require('mongodb');
var db 			= require('monk')('localhost/nodeblog');

router.get('/add', function(req, res, next){
	res.render('addpost', {
		"title": "Add Post" 
	});
});

router.post('/add', upload.single('mainimage'), function(req, res, next){
	// Get form values
	var title 		= req.body.title;
	var category 	= req.body.category;
	var body 		= req.body.body;
	var author 		= req.body.author;
	var date 		= new Date();

	// Check for image field
	if (req.file) {
		console.log('Uploading File...');

		// File info
		var mainImageOriginalName 	= req.file.originalname;
		var mainImageName 			= req.file.name;
		var mainImageMime			= req.file.mimetype;
		var mainImagePath			= req.file.path;
		var mainImageExt			= req.file.extension;
		var mainImageSize			= req.file.size;
	}
	else {
		// Set default image
		var mainImageName = 'noimage.png';
	}

	// Form validation
	req.checkBody('title', 'Title field is required').notEmpty();
	req.checkBody('body', 'Body field is required');

	// Check errors
	var errors = req.validationErrors();

	if (errors) {
		res.render('addpost',{
			"errors": errors,
			"title": title,
			"body": body
		});
	}
	else {
		var posts = db.get('posts');

		// Submit to do
		posts.insert({
			"title": title,
			"body": body,
			"category": category,
			"date": date,
			"author": author,
			"mainimage": mainimage
		}, function(err, post){
			if (err) {
				res.send('There was an issue submitting the post');
			}
			else {
				req.flash('success', 'Post Submitted');
				req.location('/');
				res.redirect('/');
			}
		});
	}
});

module.exports = router;
