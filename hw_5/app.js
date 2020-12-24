const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/todolist', {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('mongodb connected'))
	.catch(e => console.log(e));

const app = express();

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const router = require('./routes/router');
app.use('/', router);

app.listen(3000, () => {
	console.log('server listening on 3000 port');
});