const readline = require('readline-sync');

function getStringInput(prompt) {
    console.log(prompt);
    return readline.prompt();
}

exports.getStringInput = getStringInput;

exports.getNumberInput = function(prompt) {
    let input;
    do {
        input = getStringInput(prompt);
    } while (isNaN(input));
    return +input;
}