const axios = require('axios');

const habrApi = {
	getNews() {
		return axios.get('https://habr.com/ru/flows/develop/news/');
	}
};

module.exports = habrApi;