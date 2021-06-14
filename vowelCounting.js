const userInput = require('./userInput');

exports.performOneVowelCountingOperation = function() {
    const inputString = userInput.getStringInput("Please enter a string:")
    const upperInputString = inputString.toUpperCase();
    countVowelsInString(upperInputString);
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
    const vowelCount = new VowelCounter(inputString);
    vowelCount.printResults();
    console.log(); // Leave new line for clarity
}

function VowelCounter(string) {
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