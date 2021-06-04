const readline = require('readline-sync');

printWelcomeMessage();
while (true) {
    const operator = chooseValidOperator();
    const numberOfOperands = chooseNumberOfOperands(operator);
    const operands = chooseOperands(numberOfOperands);
    const answer = operate(operands, operator);
    console.log(`The answer is: ${answer}\n`);
}




function printWelcomeMessage() {
    //console.log('Welcome to the calculator!');
    //console.log('==========================');
    console.log(`
     __    __     _                            _          _   _          
    / / /\\ \\ \\___| | ___ ___  _ __ ___   ___  | |_ ___   | |_| |__   ___ 
    \\ \\/  \\/ / _ \\ |/ __/ _ \\| '_ \` _ \\ / _ \\ | __/ _ \\  | __| '_ \\ / _ \\
     \\  /\\  /  __/ | (_| (_) | | | | | |  __/ | || (_) | | |_| | | |  __/
      \\/  \\/ \\___|_|\\___\\___/|_| |_| |_|\\___|  \\__\\___/   \\__|_| |_|\\___|`);
    console.log(`
     /$$$$$$            /$$                     /$$             /$$                                       /$$                     /$$
    /$$__  $$          | $$                    | $$            | $$                                      |__/                    | $$
   | $$  \\__/  /$$$$$$ | $$  /$$$$$$$ /$$   /$$| $$  /$$$$$$  /$$$$$$    /$$$$$$   /$$$$$$  /$$$$$$/$$$$  /$$ /$$$$$$$   /$$$$$$ | $$
   | $$       |____  $$| $$ /$$_____/| $$  | $$| $$ |____  $$|_  $$_/   /$$__  $$ /$$__  $$| $$_  $$_  $$| $$| $$__  $$ |____  $$| $$
   | $$        /$$$$$$$| $$| $$      | $$  | $$| $$  /$$$$$$$  | $$    | $$$$$$$$| $$  \\__/| $$ \\ $$ \\ $$| $$| $$  \\ $$  /$$$$$$$| $$
   | $$    $$ /$$__  $$| $$| $$      | $$  | $$| $$ /$$__  $$  | $$ /$$| $$_____/| $$      | $$ | $$ | $$| $$| $$  | $$ /$$__  $$| $$
   |  $$$$$$/|  $$$$$$$| $$|  $$$$$$$|  $$$$$$/| $$|  $$$$$$$  |  $$$$/|  $$$$$$$| $$      | $$ | $$ | $$| $$| $$  | $$|  $$$$$$$| $$
    \\______/  \\_______/|__/ \\_______/ \\______/ |__/ \\_______/   \\___/   \\_______/|__/      |__/ |__/ |__/|__/|__/  |__/ \\_______/|__/`);
}

function chooseValidOperator() {
    let operator, operatorValid;
    ({operator, operatorValid} = getOperatorInput('\nPlease enter the operator:'));
    while (!operatorValid) {
        ({operator, operatorValid} = getOperatorInput('\nPlease enter a valid operator:'));
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

function getOperatorInput(message) {
    console.log(message);
    let operator = readline.prompt();
    let operatorValid = isOperatorValid(operator);
    console.log(operatorValid);
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
        numberOfOperands = getNumberInput(`How many numbers do you want to ${operator}?`);
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
                answer /= operands[ix]; // TODO Handle errors e.g. 2 / 0 = ..?
                break;
            case '+':
                answer += operands[ix];
                break;
            case '-':
                answer -= operands[ix];
                break;
            default:
                answer = '(invalid operator)'; // TODO This should be different
                break;
        }
    }
    return answer;
}