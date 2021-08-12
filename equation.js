const userInput = require('./userInput');
const arithmetic = require('./arithmetic');

const OPERATORS_ONE_ARG = ['!'];
const OPERATORS_TWO_ARGS = ['^', '/', '*', '+', '-'];

const OPERATORS = OPERATORS_TWO_ARGS.concat(OPERATORS_ONE_ARG);
const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const LOGIC = ['.', ' ', '(', ')', '%'];


// TODO Tidy up code, refactor for clarity, break it down into more functions if necessary


function EquationException(message) {
    this.message = message;
    this.name = 'EquationException';
}

EquationException.prototype.toString = function() { // TODO This does not seem to do anything?!
    return this.message;
}

exports.performOneEquationOperation = function() {
    while (true) {
        try {
            let input = userInput.getStringInput(`Please enter your equation:`);
            input = validateInput(input);
            // console.log(`is input string? "${input}" is ${input.constructor.name}`);
            const answer = evaluateEquationBracketsFirst(input);
            console.log(`${input} = ${answer}`);
            break;
            
        } catch (e) {
            if (e instanceof EquationException || e instanceof arithmetic.ArithmeticException) {
            console.log(e.message);
            } else {
                throw e;
            }
        }
        
    }
}

function validateInput(input) {
    input = input.replace(/\s+/g, ''); // Strip out whitespace
    let openBracketsCount = 0;
    let closeBracketsCount = 0;
    let operatorFound = false;
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        if (!isValidCharacter(char)) {
            throw new EquationException(`Equation cannot contain "${char}", it can only contain digits, operators, spaces and brackets. Valid operators are: ${OPERATORS.join(" ")}`); // TODO Elaborate on valid chars? Create a "?" command that lists all valid operators?
        }
        if (char === `(`) {
            openBracketsCount++;
        } else if (char === `)`) {
            closeBracketsCount++;
        }
        if (!operatorFound && OPERATORS.includes(char)) {
            operatorFound = true;
        }
    }
    if (openBracketsCount != closeBracketsCount) {
        throw new EquationException(`Equation must contain equal number of "(" and ")" - it currently contains ${openBracketsCount} "(" and ${closeBracketsCount} ")".`);
    }
    if (!operatorFound) {
        throw new EquationException(`Equation must contain at least one operator. Valid operators are: ${OPERATORS.join(" ")}`);
    }
    return input;
}

function isValidCharacter(char) {
    return OPERATORS.includes(char) || DIGITS.includes(char) || LOGIC.includes(char);
}

function evaluateEquationBracketsFirst(equation) {
    if (equation.includes("(")) {
        // console.log(`Equation includes brackets`);
        const lastOpenBracket = equation.lastIndexOf("(");
        // console.log(`Last open bracket at ${lastOpenBracket}`);
        const correspondingCloseBracket = equation.indexOf(")", lastOpenBracket);
        // console.log(`Close bracket at ${correspondingCloseBracket}`);
        const prefix = equation.substring(0, lastOpenBracket); // TODO Check
        // console.log(`Prefix "${prefix}"`);
        const bracketSubString = equation.substring(lastOpenBracket + 1, correspondingCloseBracket);
        // console.log(`Substring "${bracketSubString}"`);
        const brackets = evaluateEquation(bracketSubString); // TODO Check
        // console.log(`Brackets "${brackets}"`);
        const suffix = equation.substring(correspondingCloseBracket + 1, equation.length); // TODO Check
        // console.log(`Suffix "${suffix}"`);
        return evaluateEquationBracketsFirst(prefix + brackets + suffix);
    } else {
        return evaluateEquation(equation);
    }

}

function evaluateEquation(equation) {
    /*
    Go through the parts and operate in order:
    
    Factorial (left to right) - Throw error if not performing factorial on an integer
    Percentage (left to right)
    
    Indices (left to right)
    Division (left to right)
    Multiplication (left to right)
    Addition (left to right)
    Subtraction (left to right)
    */
    let parts = splitInputIntoParts(equation);
    // console.log(`parts are ${parts}`);

    // parts = checkForPlusOrMinusXPercent(parts); // TODO Remove this (it does not abide by order of operations)

    for (let operator of OPERATORS_ONE_ARG) {
        parts = evaluateEquationForOperator(parts, operator, 1);
    }
    for (let operator of OPERATORS_TWO_ARGS) {
        parts = evaluateEquationForOperator(parts, operator, 2);
    }

    if (parts.length === 1) {
        return parts[0];
    }
    throw new EquationException(`An unknown error occurred and the equation could not be solved. Please try entering it again, and consider using more brackets to make it clearer.`);
}

function evaluateEquationForOperator(equationParts, operator, numberOfArgs) {
    // console.log(`evaluating equation "${equationParts}" for ${operator}:`);
    while (equationParts.includes(operator)) {
        const operatorIndex = equationParts.indexOf(operator);
        const arg1 = equationParts[operatorIndex - 1];
        const arg1AsNum = +arg1;
        const args = [];
        args.push(isNaN(arg1AsNum) ? arg1 : arg1AsNum);
        if (numberOfArgs === 2) {
            const arg2 = equationParts[operatorIndex + 1];
            const arg2AsNum = +arg2;
            // console.log(`arg is ${arg2}, argAsNum is ${arg2AsNum}`);
            args.push(isNaN(arg2AsNum) ? arg2 : arg2AsNum);
        }
        // console.log(`before adjusting for percentages, args: ${args}`);
        // let {newArgs, resultWillBePercent, newOperator} = adjustForPercentages(args, operator);
        // console.log(`after adjusting for percentages, newArgs: ${newArgs}`);
        // let result = arithmetic.operate(newArgs, newOperator); // TODO Remove, replaced by following line
        let result = operateIncludingPercentages(args, operator);
        /*
        if (resultWillBePercent) {
            result *= 100;
            result += "%";
        }
        */
        equationParts.splice(operatorIndex - 1, numberOfArgs + 1, result); // TODO This assumes operators have not been entered where numbers should be
    }
    // console.log(`equation parts are now: ${equationParts}`);
    return equationParts;
}

function operateIncludingPercentages(args, operator) {
    let arg1 = args[0];
    let arg1Value = arithmetic.isValidPercentage(arg1);
    const isArg1Percent = arg1Value !== false;
    let arg2, arg2Value, isArg2Percent, result;
    if (args.length === 2) {
        arg2 = args[1];
        arg2Value = arithmetic.isValidPercentage(arg2);
        isArg2Percent = arg2Value !== false;
    }

    if (operator === "+" || operator === "-") {
        if (isArg1Percent) {
            if (isArg2Percent) { // A% + B% = C%    e.g. 12% + 3% = 15%
                //result = arithmetic.operate([arg1Value, arg2Value], operator);
                result = addOrSubtractXPercent(arg1Value * 100, arg2Value, operator);
                return result + "%";
            } else { // A% + B = C      e.g. 12% + 1.2 = 1.32
                return arithmetic.operate([arg1Value, arg2], operator);
            }
        } else {
            if (isArg2Percent) { // A + B% = C    e.g. 16 + 25% = 20
                return addOrSubtractXPercent(arg1, arg2Value, operator); // TODODODODODODODODODODODODODODODODODODODODODODODODODODODODODODODODODODODO
            } else { // A + B = C    e.g. 16 + 25 = 41
                return arithmetic.operate(args, operator);
            }
        }

    } else if (operator === "*" || operator === "/" || operator === "^") {
        if (isArg1Percent) {
            if (isArg2Percent) { // A% * B% = C%    e.g. 20% * 20% = 4%
                result = arithmetic.operate([arg1Value, arg2Value], operator);
                return (result * 100) + "%";
            } else { // A% * B = C      e.g. 50% * 64 = 32
                return arithmetic.operate([arg1Value, arg2], operator);
            }
        } else {
            if (isArg2Percent) { // A * B% = C    e.g. 64 * 50% = 32
                return arithmetic.operate([arg1, arg2Value], operator);
            } else { // A * B = C    e.g. 9 * 3 = 21
                return arithmetic.operate(args, operator);
            }
        }

    } else {
        if (isArg1Percent || isArg2Percent) {
            throw new EquationException(`Percentages are not supported for the "${operator}" operator.`);
        } else {
            return arithmetic.operate(args, operator); 
        }
    }
}

function addOrSubtractXPercent(arg1, arg2Value, operator) {
    // A + B% = C    e.g. 16 + 25% = 20
    // A - B% = C    e.g. 16 - 25% = 12
    const newOperator = "*";;
    if (operator === "+") {
        arg2Value += 1;
    } else { // operator === "-"
        arg2Value = 1 - arg2Value;
    }
    return arithmetic.operate([arg1, arg2Value], newOperator);
}

function splitInputIntoParts(input) {
    const parts = [];
    let numberCount = 0;
    let operatorCount = 0;
    // console.log(`Splitting "${input}" in new way`);
    while (input.length > 0) {
        // First check for brackets
        if (input.charAt(0) ==="(") {
            // console.log(`Found "("`);
            parts.push("(");
            input = input.substring(1);
        } else if (input.charAt(0) ===")") {
            // console.log(`Found ")"`);
            parts.push(")");
            input = input.substring(1);

        } else {
            if (numberCount <= operatorCount) {
                // console.log(`Looking for a number...`);
                let {shortenedInput, number} = readNumberFromBeginningOfInput(input);
                input = shortenedInput;
                parts.push(number);
                numberCount++;
            } else {
                // console.log(`Looking for an operator...`);
                let {shortenedInput, operator} = readOperatorFromBeginningOfInput(input);
                input = shortenedInput;
                parts.push(operator);
                operatorCount++;
            }
        }
    }

    return parts;
}

function readNumberFromBeginningOfInput(input) {
    let number = input.charAt(0);
    if (isNaN(number) && number !== "-") {
        throw new EquationException(`"${number}" is an invalid character for a number.`); // TODO Improve this error message?
    }
    input = input.substring(1);

    while (input.length > 0) {
        const nextDigit = input.charAt(0);
        if (isNaN(nextDigit) && nextDigit !== "%" && nextDigit !== ".") {
            break;
        }
        number += nextDigit;
        input = input.substring(1);
    }
    let numberSansPercent = number;
    if (number.charAt(number.length - 1) === "%") {
        numberSansPercent = number.substring(0, number.length - 2);
    }
    if (isNaN(numberSansPercent)) { // TODO This does not allow for numbers ending in "%"
        throw new EquationException(`"${numberSansPercent}" is not a valid number.`); // TODO Improve this error message?
    }
    
    const shortenedInput = input; // Input has already been shortened before returning
    return {shortenedInput, number};
}

function readOperatorFromBeginningOfInput(input) {
    const operator = input.charAt(0);
    if (!OPERATORS.includes(operator)) {
        throw new EquationException(`"${operator}" is not a valid operator.`); // TODO Improve this error message?
    }
    const shortenedInput = input.substring(1);
    return {shortenedInput, operator};
}