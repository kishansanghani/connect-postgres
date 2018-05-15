'use strict';
var express = require('express');
var Users = require('../models/user_model');
var upload = require('./shared/single_upload');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var router = express.Router();

router.post('/registration', upload.single("profileimg"), function (req, res) {

	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(req.body.password, salt);

	var userAdd = {
		profile_image: req.file.filename,
		username: req.body.username,
		password: hash,
	};

	new Users(userAdd)
		.save()
		.then(saved => {
			let content = {
				data: saved,
				success: true,
				message: 'User Registration Successfully.',
			};
			return res.send(content);
		})
		.catch(error => {
			console.log(error);
			let content = {
				data: error,
				success: false,
				message: 'Error While Users Registration.',
			};
			return res.send(content);
		});
});

router.post('/login', function (req, res) {

	var username = req.body.username;
	var password = req.body.password;
	Users
		.where('username', username)
		.fetch(
			{ withRelated: ['userRoles'] } // userRoles relations
		)
		.then(function (user, error) {
			if (username == 0 || password.length == 0) {
				let content = {
					success: false,
					message: 'Username or password required'
				};
				res.send(content);
			};
			if (user == null) {
				let content = {
					success: false,
					message: 'Username not found'
				};
				res.send(content);
			} else {
				var hash = user.attributes['password'];
				bcrypt.compare(password, hash, function (err, result) {
					if (err) {
						let content = {
							success: false,
							message: 'Invalid username or password'
						};
						res.send(content);
					};

					let user_data_string = JSON.stringify(user);
					let user_data_parse = JSON.parse(user_data_string);

					if (result === true) {

							var backend = jwt.sign(user_data_parse, 'backend', {
								expiresIn: 60 * 60 * 24
							});

							let content = {
								data: backend,
								success: true,
								message: 'You logged in',
							};
							res.send(content);
					} else {
						let content = {
							success: false,
							message: 'Wrong password'
						};
						res.send(content);
					};
				});
			};
		});
});

module.exports = router;