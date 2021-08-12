const readline = require('readline-sync');
const arithmetic = require('./arithmetic');

function getStringInput(prompt) {
    console.log("\n" + prompt);
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

exports.countCharacterInString = function(string, character) {
    let count = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] === (character)) {
            count++;
        }
    }
    return count;
}