const readline = require('readline-sync');

console.log('Please enter first input:');
const response1 = readline.prompt();

console.log('Please enter second input:');
const response2 = readline.prompt();

const answer = response1 * response2;
console.log(`${response1} * ${response2} = ${answer}`);
