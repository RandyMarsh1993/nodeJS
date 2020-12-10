require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const yandexAPI = require('./yandexAPI.js');

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + '/'));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
	res.render('layout', {

	});
})

app.post('/translate', urlencodedParser, (req, responce) => {
	const request = req.body;

	yandexAPI.translate(request.texts, request.sourceLanguageCode, request.targetLanguageCode)
	.then(res => {
		console.log(res.data);
		responce.render('layout', {
			result: res.data.translations[0].text
		});
	})
	.catch(err => {
		console.log(err);
		responce.render('layout', {
			error: err.message
		});
	})
});

app.listen(3000, () => console.log('Listening on port 3000'));