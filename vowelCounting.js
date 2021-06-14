const readline = require('readline-sync');

exports.performOneVowelCountingOperation = function() {
    const inputString = getInputString().toUpperCase();
    countVowelsInString(inputString);
}

function getInputString() {
    console.log("Please enter a string:");
    return readline.prompt();
}

function countCharacterInString(character, string) {
    let count = 0;
    for (let i = 0; i < string.length; i++) {
        if (string.charAt(i) === character) {
            count++;
        }
    }
    return count;
}

function countVowelsInString(inputString) {
    const vowelCount = new vowelCounter(inputString);
    vowelCount.printResults();
    console.log(); // Leave new line for clarity
}

function vowelCounter(string) {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    for (let vowel of vowels) {
        this[vowel] = countCharacterInString(vowel, string);
    }

    this.printResults = function() {
        console.log(`The vowel counts are:`);
        for (let vowel of vowels) {
            console.log(`${vowel}: ${this[vowel]}`);
        }
    }
}