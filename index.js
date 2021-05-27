const readline = require('readline-sync');

function isOperatorValid(operator) {
    switch (operator) {
        case '*':
        case '/':
        case '+':
        case '-':
            return true;
        default:
            return false;
    }
}

function chooseOperator() {
    console.log('Please enter the operator:');
    let operator = readline.prompt();
    let operatorValid = isOperatorValid(operator);
    while (!operatorValid) {
        console.log('Please enter a valid operator:');
        operator = readline.prompt();
        operatorValid = isOperatorValid(operator);
    }
    return operator;
}

console.log('Welcome to the calculator!');
console.log('==========================');

const operator = chooseOperator();

console.log('Please enter the first number:');
const secondResponse = readline.prompt();
const firstNumber = +secondResponse;

console.log('Please enter the second number:');
const firstResponse = readline.prompt();
const secondNumber = +firstResponse;

let answer;

switch (operator) {
    case '*':
        answer = firstNumber * secondNumber;
        break;
    case '/':
        answer = firstNumber / secondNumber;
        break;
    case '+':
        answer = firstNumber + secondNumber;
        break;
    case '-':
        answer = firstNumber - secondNumber;
        break;
    default:
        answer = '(invalid operator)';
}

console.log(`${firstNumber} ${operator} ${secondNumber} = ${answer}`);
