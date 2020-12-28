let Todo = require('../models/TodoList');

function createTodoAndRedirect(path) {
	return async (req, res) => {
		let todo = req.todo;
		todo.text = req.body.text;
		try {
			todo = await todo.save();
			res.redirect('/');
		} catch (e) {
			res.render(`${path}`, {todo: todo});
		}
	}
}

module.exports = createTodoAndRedirect;