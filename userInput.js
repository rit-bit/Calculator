const readline = require('readline-sync');

function getStringInput(prompt) {
    console.log(prompt);
    return readline.prompt();
}

exports.getStringInput = getStringInput;

exports.getNumberInput = function(prompt, errorPrompt, condition) {
    let input = getStringInput(prompt);
    while (isNaN(input) || !condition(+input)) {
        input = getStringInput(errorPrompt);
    }
    return +input;
}