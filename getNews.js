const axios = require('axios');
const cheerio = require('cheerio');

axios.get('https://habrsdf.com/ru/flows/develop')
	.then(res => {
		const $ = cheerio.load(res.data);
		$('.news-topic__title').each(( i, element ) => {
			console.log($(element).text());
		})
	})
	.catch((err) => {
		console.log(err);
	});