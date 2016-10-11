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
		var profileImageOriginalName 	= req.file.originalname;
		var profileImageName 			= req.file.name;
		var profileImageMime			= req.file.mimetype;
		var profileImagePath			= req.file.path;
		var profileImageExt				= req.file.extension;
		var profileImageSize			= req.file.size;
	}
	else {
		// Set default image
		var profileImageName = 'noimage.png';
	}
});

module.exports = router;
