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

function chooseNumberOfArguments(operator) {
    let numberOfArguments = "not a number";
    while (isNaN(numberOfArguments) || numberOfArguments < 2) {
        console.log(`How many numbers do you want to ${operator}?`);
        let input = readline.prompt();
        numberOfArguments = +input;
    }
    return numberOfArguments;
}

function chooseArgument(argNumber) {
    let argument = "not a number";
    while (isNaN(argument)) {
        console.log(`Please enter number ${argNumber + 1}:`);
        let input = readline.prompt();
        argument = +input;
    }
    return argument;
}

console.log('Welcome to the calculator!');
console.log('==========================');

const operator = chooseOperator();

const numberOfArguments = chooseNumberOfArguments(operator);

const arguments = [];
for (let argNumber = 0; argNumber < numberOfArguments; argNumber++) {
    arguments[argNumber] = chooseArgument(argNumber);
}

let answer;

switch (operator) {
    case '*':
        answer = 1;
        for (let arg of arguments) {
            answer *= arg;
        }
        break;
    case '/':
        answer = arguments[0];
        for (let argIx = 1; argIx < arguments.length; argIx++) {
            answer /= arguments[argIx];
        }
        break;
    case '+':
        answer = 0;
        for (let arg of arguments) {
            answer += arg;
        }
        break;
    case '-':
        answer = arguments[0];
        for (let argIx = 1; argIx < arguments.length; argIx++) {
            answer -= arguments[argIx];
        }
        break;
    default:
        answer = '(invalid operator)';
}

console.log(`The answer is: ${answer}`);
