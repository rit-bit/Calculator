const userInput = require('./userInput');

const SINGLE_OPERATOR_MODE = '1';
const EQUATION_MODE = '2';

const VALID_OPERATORS = ['*', '/', '+', '-', '^', '!'];


// TODO Tidy up code, refactor for clarity, break it down into more functions if necessary


exports.performOneArithmeticOperation = function() {
    const operator = chooseValidOperator();
    const numberOfOperands = chooseNumberOfOperands(operator);
    const operands = chooseOperands(numberOfOperands);
    try {
        const answer = operate(operands, operator);
        console.log(`The answer is: ${answer}\n`); // TODO Write out the sum equals answer (e.g. 1 + 2 + 3 + 4 = 10)
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

function removeAnyZeros(operands) {  // "Introduction to JavaScript" guide said to "just skip" any dividing-by-zero operations.
    console.log(`pre-filter ops: ${operands}`);
    operands = operands.filter(number => number != 0);
    console.log(`post-filter ops: ${operands}`);
    if (operands.length === 0) {
        throw new ArithmeticException(`Unable to perform "/" operation - you did not specify enough non-zero divisors`);
    }
    return operands;
}

function ArithmeticException(message) {
    this.message = message;
    this.name = 'ArithmeticException';
}

exports.ArithmeticException = ArithmeticException;

ArithmeticException.prototype.toString = function() {
    return `${this.name}: "${this.message}"`;
}

function operate(operands, operator) {
    let accumulator;
    for (let operand of operands) {
        console.log(`operand ${operand}`);
        if (isNaN(operand)) {
            throw new ArithmeticException(`"${operand}" is not a valid operand.`);
        }
    }

    switch (operator) {
        case '*':
            accumulator = function(accumulator, currentValue) {
                const percent = isValidPercentage(currentValue);
                if (percent !== false) {
                    return accumulator * percent;
                } else {
                    return accumulator * currentValue;
                }
            };
            break;
        case '/':
            operands = removeAnyZeros(operands); // "Introduction to JavaScript" guide said to "just skip" any dividing-by-zero operations.
            console.log(`operands are now: ${operands}`);
            accumulator = function(accumulator, currentValue) {
                const percent = isValidPercentage(currentValue);
                if (percent !== false) {
                    return accumulator / percent;
                } else {
                    return accumulator / currentValue;
                }
            };
            break;
        case '+':
            accumulator = function(accumulator, currentValue) {
                const percent = isValidPercentage(currentValue);
                if (percent !== false) {
                    return accumulator + (percent * accumulator);
                } else {
                    return accumulator + currentValue;
                }
            };
            break;
        case '-':
            accumulator = function(accumulator, currentValue) {
                const percent = isValidPercentage(currentValue);
                if (percent !== false) {
                    return accumulator - (percent * accumulator);
                } else {
                    return accumulator - currentValue;
                }
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
        throw new ArithmeticException(`Unable to perform "${operator}" operation - result was too large to calculate`); // Instead of printing that the answer is Infinity.
    }
}

exports.operate = operate;

function factorial(number) {
    if (number < 0) {
        throw new ArithmeticException(`Unable to perform "!" operation on ${number} because factorial cannot be performed on a negative number`);
    }
    if (!Number.isInteger(number)) {
        throw new ArithmeticException(`Unable to perform "!" operation on ${number} because factorial can only be performed on an integer.`);
    }
    if (number > 200) { // This is to catch the case where you input a very large number and the program appears to freeze as it tries to calculate the answer.
        throw new ArithmeticException(`Unable to perform "!" operation on ${number} because the result was too large to calculate`);
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
        throw new ArithmeticException(`Unable to perform "!" operation on ${number} because the result was too large to calculate`); // Instead of stating that the answer is Infinity.
    }
}

function isValidPercentage(string) {
    // console.log(`Is valid percentage?: "${string}"`);
    if (typeof string === "string") {
        if (userInput.countCharacterInString(string, "%") === 1) {
                if (string.charAt(string.length - 1) === "%") {
                    const res = (+string.substring(0, string.length - 1)) / 100;
                    // console.log(`iVP returning "${res}"`);
                    return res;
                } else {
                    // console.log("last character not '%'");
                }
        } else {
            // console.log("count character in string !== 1")
        }
    } else {
        // console.log("not instanceof String, instanceof " + string.constructor.name);
    }
    // console.log(`iVP returning "false"`);
    return false;
}

exports.isValidPercentage = isValidPercentage;