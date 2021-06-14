const readline = require('readline-sync');
const arithmetic = require('./arithmetic');
const vowelCounter = require('./vowelCounting');

const ARITHMETIC_MODE = '1';
const VOWEL_COUNTING_MODE = '2';

printWelcomeMessage();
while (true) {
    const calcMode = getCalculationMode();
    switch (calcMode) {
        case ARITHMETIC_MODE:
            arithmetic.performOneArithmeticOperation();
            break;
        case VOWEL_COUNTING_MODE:
            vowelCounter.performOneVowelCountingOperation();
            break;
    }
}

function getCalculationMode() {
    console.log(`Which calculator mode do you want?
    1. Arithmetic mode
    2. Vowel counting mode`);
    return readline.prompt();
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
    \\______/  \\_______/|__/ \\_______/ \\______/ |__/ \\_______/   \\___/   \\_______/|__/      |__/ |__/ |__/|__/|__/  |__/ \\_______/|__/
    `);
}