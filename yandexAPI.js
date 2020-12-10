const axios = require('axios');

// const FOLDER_ID = 'b1gubh2sgrpc17b5hh6j';
// const IAM_TOKEN = 't1.9euelZrIysmbmZzPmMiRmY6TiYmbjO3rnpWajcaLzsuZj5ybm5KQyY2Tmsfl8_c9DjoB-u9XCi5H_N3z9308NwH671cKLkf8.74EmlzgLnt5XLbUCzhJFHYBAtFyf0BAs9iTd5ybm7xN0d4P1UZLL__XoywisFfOKexSJojdCbp1DCkJuroAgCQ';

const instance = axios.create({
	baseURL: 'https://translate.api.cloud.yandex.net/',
    headers: {
		'Content-Type': 'aaplication/json',
		'Authorization': 'Bearer ' + process.env.IAM_TOKEN
	}
});

const yandexAPI = {
	translate(texts, sourceLanguageCode, targetLanguageCode) {
		return instance.post('translate/v2/translate', {"folder_id": process.env.FOLDER_ID,
			"texts": texts,
			"sourceLanguageCode": sourceLanguageCode,
			"targetLanguageCode": targetLanguageCode})
	}
};

module.exports = yandexAPI;