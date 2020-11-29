const chalk = require('chalk');
const log = console.log;

const error = chalk.bold.red;
const warning = chalk.keyword('orange');
 
log(`
CPU: ${error('90%')}
RAM: ${chalk.green('40%')}
DISK: ${warning('70%')}
`);