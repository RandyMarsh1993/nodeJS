const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User');

module.exports.login = (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/todolist',
		failureRedirect: '/login',
		failureFlash: false
	})(req, res, next);
}

module.exports.register = (req, res) => {
	const { email, pass, pass2 } = req.body;
	let errors = [];

	if (!email || !pass || !pass2) {
		errors.push({ msg: 'Please fill all fields' });
	}
	if (pass !== pass2) {
		errors.push({ msg: 're-entering the password does not match' });
	}
	if (pass.length < 5) {
		errors.push({ msg: 'Passwords length should be 5 or more signs' });
	}

	if (errors.length > 0) {
		res.render('register', {
			errors
		});
	} else {
		User.findOne({ email: email })
			.then(user => {
				if (user) {
					res.status(409).json({ message: 'такой email занят' });
				} else {
					//нужно создать пользователя
					const newUser = new User({
						email,
						pass
					});

					bcrypt.genSalt(10, (err, salt) =>
						bcrypt.hash(newUser.pass, salt, (err, hash) => {
							if (err) throw err;

							newUser.pass = hash;

							newUser.save()
								.then(user => {
									res.redirect('/login');
								})
								.catch(err => console.log(err));
						}))
				}
			})
	}
}