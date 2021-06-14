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
    do {
        operator = userInput.getStringInput('Please enter the operator:');
        operatorValid = isOperatorValid(operator);
    } while (!operatorValid);
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
    do {
        numberOfOperands = userInput.getNumberInput(`How many numbers do you want to ${operator}? (must be at least 2)`);
    } while (numberOfOperands < 2);
    return numberOfOperands;
}

function chooseOperands(numberOfOperands) {
    const operandsArray = [];
    for (let operandIx = 0; operandIx < numberOfOperands; operandIx++) {
        operandsArray[operandIx] = userInput.getNumberInput(`Please enter number ${operandIx + 1}:`);
    }
    return operandsArray;
}

function removeAnyZeros(operands) {
    operands = operands.filter(number => number != 0); // TODO Handle case where operands is reduced to size 0;
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
            accumulator = function(accumulator, currentValue) {
                return accumulator / currentValue;
            };
            operands = removeAnyZeros(operands);
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