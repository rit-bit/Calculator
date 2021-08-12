const userInput = require('./userInput');

const VOWEL_COUNTING_MODE = '1';
const CONSONANT_COUNTING_MODE = '2';
const ALL_LETTERS_COUNTING_MODE = '3';
const DIGIT_COUNTING_MODE = '4';
const CUSTOM_COUNTING_MODE = '5';

const ALPHABET = [];
const VOWELS = ['A', 'E', 'I', 'O', 'U'];
const CONSONANTS = [];
const DIGITS = [];

exports.initialiseLetterArrays = function() {
    for (let i = 0; i < 26; i++) {
        const letter = String.fromCharCode(65 + i);
        ALPHABET.push(letter);
        if (!VOWELS.includes(letter)) {
            CONSONANTS.push(letter);
        }
    }
    for (let i = 0; i < 10; i++) {
        DIGITS.push("" + i);
    }
}

exports.decideWhichLetterCountingMode = function() {
    const letterCountingMode = userInput.getStringInput(`Which letter counting mode do you want?
    1. Count vowels
    2. Count consonants
    3. Count all letters
    4. Count numerical digits
    5. Count custom letters/digits`);

    switch (letterCountingMode) {
        case VOWEL_COUNTING_MODE:
            performOneLetterCountingOperation(VOWELS);
            break;
        case CONSONANT_COUNTING_MODE:
            performOneLetterCountingOperation(CONSONANTS);
            break;
        case ALL_LETTERS_COUNTING_MODE:
            performOneLetterCountingOperation(ALPHABET);
            break;
        case DIGIT_COUNTING_MODE:
            performOneLetterCountingOperation(DIGITS);
            break;
        case CUSTOM_COUNTING_MODE:
            const letters = getCustomLetters();
            console.log(`Counting occurences of the following characters: ${letters}`);
            performOneLetterCountingOperation(letters);
            break;
        default:
            console.log(`${letterCountingMode} is not a valid mode, please choose a valid mode number.\n`);
    }
}

function getCustomLetters() {
    letterInput = userInput.getStringInput(`Please enter the letters/digits you would like to count, all on one line:`);
    letters = [];
    for (let i = 0; i < letterInput.length; i++) {
        const c = letterInput.charAt(i).toUpperCase();
        if ((ALPHABET.includes(c) || DIGITS.includes(c)) && !letters.includes(c)) {
            letters.push(c);
        }
    }
    letters.sort();
    return letters;
}

function performOneLetterCountingOperation (letters) {
    const inputString = userInput.getStringInput("Please enter a string:")
    const upperInputString = inputString.toUpperCase();
    countLettersInString(upperInputString, letters);
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

function countLettersInString(inputString, letters) {
    const letterCount = new LetterCounter(inputString, letters);
    letterCount.printResults();
    console.log(); // Leave new line for clarity
}

function LetterCounter(string, letters) {
    for (let letter of letters) {
        this[letter] = countCharacterInString(letter, string);
    }

    this.printResults = function() {
        console.log(`The character counts are:`);
        for (let letter of letters) {
            console.log(`${letter}: ${this[letter]}`);
        }
    }
}