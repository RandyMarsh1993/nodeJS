const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const passport = require('passport');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
require('./config/passport')(passport);

mongoose.connect('mongodb://localhost:27017/todolist', {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('mongodb connected'))
	.catch(e => console.log(e));

const app = express();

app.use(session({
	secret: 'some-super-secret-signs',
	store: new FileStore(),
	cookie: {
		path: '/',
		httpOnly: true,
		maxAge: 600000
	},
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const indexRouter = require('./routes/router');
app.use('todoList', indexRouter);
const authRouter = require('./routes/auth');
app.use('/', authRouter);

app.listen(3000, () => {
	console.log('server listening on 3000 port');
});