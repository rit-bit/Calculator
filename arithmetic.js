const userInput = require('./userInput');

exports.performOneArithmeticOperation = function() {
    const operator = chooseValidOperator();
    const numberOfOperands = chooseNumberOfOperands(operator);
    const operands = chooseOperands(numberOfOperands);
    try {
        const answer = operate(operands, operator);
        console.log(`The answer is: ${answer}\n`);
    } catch (e) {
        console.log(e.message + '\n');
    }
}

function chooseValidOperator() {
    let operator, operatorValid;
    operator = userInput.getStringInput('Please enter the operator:');
    operatorValid = isOperatorValid(operator);

    while (!operatorValid) {
        operator = userInput.getStringInput('Please enter a valid operator (+ or - or * or /):');
        operatorValid = isOperatorValid(operator);
    }
    return operator;
}

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

function chooseNumberOfOperands(operator) {
    let numberOfOperands;
    const prompt = `How many numbers do you want to ${operator}? (must be at least 2)`;
    const errorPrompt = `Please enter a valid number of operands to ${operator} (must be at least 2):`;

    numberOfOperands = userInput.getNumberInput(prompt, errorPrompt, (number => number >= 2));
    return numberOfOperands;
}

function chooseOperands(numberOfOperands) {
    const operandsArray = [];

    for (let operandIx = 0; operandIx < numberOfOperands; operandIx++) {
        const prompt = `Please enter number ${operandIx + 1}:`;
        const errorPrompt = `Please enter a valid number for operand number ${operandIx + 1}:`;
        operandsArray[operandIx] = userInput.getNumberInput(prompt, errorPrompt, function(number) {return true});
    }
    return operandsArray;
}

function removeAnyZeros(operands) {
    operands = operands.filter(number => number != 0);
    if (operands.length === 0) {
        throw new DivisionException(`Unable to divide - you did not specify enough non-zero divisors`);
    }
    return operands;
}

function DivisionException(message) {
    this.message = message;
    this.name = 'DivisionException';
}

DivisionException.prototype.toString = function() {
    return `${this.name}: "${this.message}"`;
}

function operate(operands, operator) {
    let accumulator;

    switch (operator) {
        case '*':
            accumulator = function(accumulator, currentValue) {
                return accumulator * currentValue;
            };
            break;
        case '/':
            operands = removeAnyZeros(operands);
            accumulator = function(accumulator, currentValue) {
                return accumulator / currentValue;
            };
            break;
        case '+':
            accumulator = function(accumulator, currentValue) {
                return accumulator + currentValue;
            };
            break;
        case '-':
            accumulator = function(accumulator, currentValue) {
                return accumulator - currentValue;
            };
            break;
    }
    return operands.reduce(accumulator);
}