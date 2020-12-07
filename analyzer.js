const fs = require('fs');

fs.readFile('logs.txt', (err, data) => {
	if (err) throw err;

	const resultsArr = data.toString().split('\n');

	// вычитаю один, так как отдельным элементом массива получается последний перенос строки
	let totalTryCount = resultsArr.length - 1;

	//один из вариантов решения
	// let winsCount = resultsArr.filter(result => result === 'win').length;
	// let lossesCount = resultsArr.filter(result => result === 'loss').length

	let winsCount = 0;
	let lossesCount = 0;

	resultsArr.map(result => {
		switch (result) {
			case 'win':
				winsCount++;
				return;
			case 'loss':
				lossesCount++;
				return;
		}
	});

	let winsSequence = 0;
	let maxWinsSequence = 0;

	let lossesSequence = 0;
	let maxLossesSequence = 0;

	for (let i = 0; i < resultsArr.length - 1; i++) {
		if (resultsArr[i] === 'win') {
			winsSequence = 0;
			while (resultsArr[i] === 'win' && i < resultsArr.length - 1) {
				i++;
				winsSequence++;
			}
		}
		if (winsSequence > maxWinsSequence) {
			maxWinsSequence = winsSequence;
		}
	}

	for (let i = 0; i < resultsArr.length - 1; i++) {
		if (resultsArr[i] === 'loss') {
			lossesSequence = 0;
			while (resultsArr[i] === 'loss' && i < resultsArr.length - 1) {
				i++;
				lossesSequence++;
			}
		}
		if (lossesSequence > maxLossesSequence) {
			maxLossesSequence = lossesSequence;
		}
	}

	let winsPercents = (winsCount / totalTryCount * 100).toFixed(2);
	let lossesPercents = (lossesCount / totalTryCount * 100).toFixed(2);

	console.log(`Total games count: ${totalTryCount}`);
	console.log(`wins: ${winsCount} (${winsPercents}%)`);
	console.log(`losses: ${lossesCount} (${lossesPercents}%)`);
	console.log(`max wins sequence: ${maxWinsSequence}`);
	console.log(`max losses sequence: ${maxLossesSequence}`);
});