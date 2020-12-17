const express = require('express');
const cheerio = require('cheerio');

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const templating = require('consolidate');
const handlebars = require('handlebars');
templating.requires.handlebars = handlebars;

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

const habr = require('./api/habrAPI');
const { response } = require('express');
const cons = require('consolidate');

app.get('/', (req, res) => {
	res.redirect('/news')
});

app.get('/news', async (req, res) => {
	let newsCount = req.cookies.newsCount;
	res.render('index', {
		newsCount: newsCount
	})
	// после перезагрузки страницы в поле воода остаётся последнее отправленное значение
});

app.post('/news', async (req, res) => {

	const newsArray = [];

	res.cookie('newsCount', +req.body.newsCount, {
		maxAge: 1000 * 100,
		httpOnly: true
	});

	await habr.getNews()
		.then(response => {
			const html = response.data;
			const $ = cheerio.load(html);
			$('.post__title_link').each((i, element) => {
				newsArray.push($(element).text());
			});

			let newsCount = +req.body.newsCount;

			let filteredNews = newsArray.filter((item, index, arr) => index < newsCount);

			res.render('index', {
				news: filteredNews
			})
		})
});

app.listen(3000, () => {
	console.log('Server listening on 3000 port');
});