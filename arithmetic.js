const userInput = require('./userInput');

exports.performOneArithmeticOperation = function() {
    const operator = chooseValidOperator();
    const numberOfOperands = chooseNumberOfOperands(operator);
    const operands = chooseOperands(numberOfOperands);
    const answer = operate(operands, operator);
    console.log(`The answer is: ${answer}\n`);
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

function operate(operands, operator) {
    let answer = operands[0];

    for (let ix = 1; ix < operands.length; ix++) {
        switch (operator) {
            case '*':
                answer *= operands[ix];
                break;
            case '/':
                answer /= operands[ix]; // TODO Handle 0 division e.g. 2 / 0 = Infinity
                break;
            case '+':
                answer += operands[ix];
                break;
            case '-':
                answer -= operands[ix];
                break;
        }
    }
    return answer;
}