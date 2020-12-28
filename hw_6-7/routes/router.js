const express = require('express');
const router = express.Router();

const Todo = require('../models/TodoList');
const createTodoAndRedirect = require('../controllers/addTodo');

const { ensureAuthenticated } = require('../middlewares/isAuth');

router.get('/', ensureAuthenticated, async (req, res) => {
	let todos = await Todo.find().sort('-date');
	res.render('todolist', {todos: todos});
});

router.get('/newTodo', (req, res) => {
	res.render('createTodo', {
		todo: new Todo()
	});
});

router.post('/newTodo', async (req, res, next) => {
	req.todo = new Todo();
	next();
}, createTodoAndRedirect('createTodo'));

router.delete('/:id', async (req, res) => {
	await Todo.findByIdAndDelete(req.params.id);
	res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);
	res.render('editTodo', {todo: todo})
});

router.put('/edit/:id', async (req, res, next) => {
	req.todo = await Todo.findById(req.params.id);
	next();
}, createTodoAndRedirect('/'));

module.exports = router;