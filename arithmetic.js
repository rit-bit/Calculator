const userInput = require('./userInput');

const VALID_OPERATORS = ['*', '/', '+', '-', '^', '!'];

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
    const operatorsHint = VALID_OPERATORS.join(" or ");
    operator = userInput.getStringInput(`Please enter an operator (${operatorsHint}):`);
    operatorValid = VALID_OPERATORS.includes(operator);

    while (!operatorValid) {
        operator = userInput.getStringInput(`Please enter a valid operator (${operatorsHint}):`);
        operatorValid = VALID_OPERATORS.includes(operator);
    }
    return operator;
}

function chooseNumberOfOperands(operator) {
    if (operator === '!') {
        return 1;
    }
    let numberOfOperands;
    const prompt = `How many numbers do you want to "${operator}"? (must be at least 2)`;
    const errorPrompt = `Please enter a valid number of operands to "${operator}" (must be at least 2):`;

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
        throw new ArithmeticException(`Unable to perform "/" operation - you did not specify enough non-zero divisors`);
    }
    return operands;
}

function ArithmeticException(message) {
    this.message = message;
    this.name = 'ArithmeticException';
}

ArithmeticException.prototype.toString = function() {
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
        case '^':
            accumulator = function(accumulator, currentValue) {
                return Math.pow(accumulator, currentValue);
            };
            break;
        case '!':
            return factorial(operands[0]);
    }
    const answer = operands.reduce(accumulator);
    if (isFinite(answer)) {
        return answer;
    } else {
        throw new ArithmeticException(`Unable to perform "${operator}" operation - result was too large to calculate`); // Instead of stating that the answer is Infinity.
    }
}

function factorial(number) {
    if (number < 0) {
        throw new ArithmeticException('Unable to perform "!" operation - factorial cannot be performed on a negative number');
    }
    if (number > 200) { // This is to catch the case where you input a very large number and the program appears to freeze as it tries to calculate the answer.
        throw new ArithmeticException('Unable to perform "!" operation - result was too large to calculate');
    }
    if (number === 0) {
        return 1;
    }
    let answer = number;
    while (number > 1) {
        answer *= --number;
    }
    if (isFinite(answer)) {
        return answer;
    } else {
        throw new ArithmeticException(`Unable to perform "!" operation - result was too large to calculate`); // Instead of stating that the answer is Infinity.
    }
}