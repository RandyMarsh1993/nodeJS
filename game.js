const readline = require('readline');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

// let file = argv._[0];
// console.dir(argv);

console.log('Welcome to "Heads & Tails"!');
console.log('To choose "head" type 1, to choose "tail" type 2.');
console.log('To leave game type "stop"');
console.log('To clear games story type "clear".');

rl.question('Guess head or tail?', (userAnswer) => {

	let rightAnswer = Math.ceil(Math.random() * 2);

	// fs.writeFile('logs.txt', 'logs:\n', (err) => {
	// 	if (err) throw err;
	// })

	if (userAnswer === 'stop') {
		console.log('You closed the game');
		rl.close();
		return;
	} else if (userAnswer === 'clear') {
		fs.writeFile('logs.txt', '',(err) => {
			if (err) throw err;
		});
		console.log('Games story clear.');
		rl.close();
		return;
	} else if (userAnswer !== '1' && userAnswer !== '2') {
		console.log('Incorrect answer. Available answers: "1", "2", "stop".');
		rl.close();
		return;
	} else if (+userAnswer === rightAnswer) {
		console.log('You win!');
		fs.appendFile('logs.txt', 'win\n', (err) => {
			if (err) throw err;
		});
		rl.close();
		return;
	} else if (+userAnswer !== rightAnswer) {
		console.log('You lose');
		fs.appendFile('logs.txt', 'loss\n', (err) => {
			if (err) throw err;
		});
		rl.close();
		return;
	} else {
		console.log('Some error');
		rl.close();
		return;
	}
});