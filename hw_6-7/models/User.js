const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	pass: {
		type: String,
		required: true
	}
});

const User = mongoose.model('User', UsersSchema);

module.exports = User;