const readline = require('readline-sync');

exports.getStringInput = function(prompt) {
    console.log(prompt);
    return readline.prompt();
}

exports.getNumberInput = function(prompt) {
    let input;
    do {
        input = getStringInput(prompt);
    } while (isNaN(input));
    return input;
}