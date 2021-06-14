const readline = require('readline-sync');

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
        ({operator, operatorValid} = getOperatorInput('Please enter the operator:'));
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

function getOperatorInput(message) {
    console.log(message);
    let operator = readline.prompt();
    let operatorValid = isOperatorValid(operator);
    return ({operator, operatorValid});
}

function getNumberInput(message) {
    console.log(message);
    let input = readline.prompt();
    return +input;
}

function chooseNumberOfOperands(operator) {
    let numberOfOperands = "not a number";
    while (isNaN(numberOfOperands) || numberOfOperands < 2) {
        numberOfOperands = getNumberInput(`How many numbers do you want to ${operator}? (must be at least 2)`);
    }
    return numberOfOperands;
}

function chooseOperands(numberOfOperands) {
    const operandsArray = [];
    for (let operandIx = 0; operandIx < numberOfOperands; operandIx++) {
        operandsArray[operandIx] = chooseOperand(operandIx);
    }
    return operandsArray;
}

function chooseOperand(operandNum) {
    let operand = "not a number";
    while (isNaN(operand)) {
        operand = getNumberInput(`Please enter number ${operandNum + 1}:`);
    }
    return operand;
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