var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer();

var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register', {
  	'title': 'Register'
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', {
  	'title': 'Login'
  });
});

router.post('/register', upload.single('profileimage'), function(req, res, next) {
	// Get form values
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

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

	// form validation (express validator)
	req.checkBody('name', 'Name field is required').notEmpty();
	req.checkBody('email', 'Email field is required').notEmpty();
	req.checkBody('email', 'Email not valid').isEmail();
	req.checkBody('password', 'Password field is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	// check for errors
	var errors =  req.validationErrors();

	if (errors) {
		res.render('register', {
			errors: errors,
			name: name,
			email: email,
			username: username,
			password: password,
			password2: password2
		});
	}
	else {
		var newUser = new User({
			name: name,
			email: email,
			username: username,
			password: password,
			profileimage: profileImageName
		});

		// Create user
		User.createUser(newUser, function(err, user){
			if (err) throw err;
			console.log(user);
		});

		// Success Message
		req.flash('success', 'You are now registered and may login');

		res.location('/');
		res.redirect('/');
	}
});

router.post('/login', passport.authenticate('local', {failureRedirect:'users/login', failureFlash:'Invalid username or password'}), function(req, res){
	console.log('Authentication Successful');
	req.flash('success', 'You are logged in');
	req.redirect('/');
});

module.exports = router;






