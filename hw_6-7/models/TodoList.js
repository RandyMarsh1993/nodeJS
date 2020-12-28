const mongoose = require('mongoose');

const todolistScheme = new mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Todo', todolistScheme);