const arithmetic = require('./arithmetic');
const letterCounter = require('./letterCounting');
const userInput = require('./userInput');

const ARITHMETIC_MODE = '1';
const LETTER_COUNTING_MODE = '2';



letterCounter.initialiseLetterArrays();
printWelcomeMessage();
while (true) {
    const calculationMode = userInput.getStringInput(`Which calculator mode do you want?
    1. Arithmetic mode
    2. Letter counting modes`);

    switch (calculationMode) {
        case ARITHMETIC_MODE:
            arithmetic.performOneArithmeticOperation();
            break;
        case LETTER_COUNTING_MODE:
            letterCounter.decideWhichLetterCountingMode();
            break;
        default:
            console.log(`${calculationMode} is not a valid mode, please choose a valid mode number.\n`);
    }
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