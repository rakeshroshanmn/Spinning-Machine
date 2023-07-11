// 1. Get Deposit amount from user.
// 2. Get Number of Lines on which the User is going to bet on.
// 3. Get how much the User is going to bet.
// 4. Create the spinninng wheel.
// 5. Check if the user won.
// 6. Give the user the winnings.
// 7. Play again.

// Importing Packages
const prompt = require("prompt-sync")();

// GLOBAL DECLARATIONS
const ROWS = 3;
const COLUMNS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

// Required Functions
const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter the deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid input!, Try again");
    } else {
      return numberDepositAmount;
    }
  }
};

const getNumberOfLines = () => {
  while (true) {
    const numberOfLines = prompt(
      "Enter the number of lines that you are going to bet on: "
    );
    const lineNumber = parseInt(numberOfLines);

    if (isNaN(lineNumber) || lineNumber <= 0 || lineNumber > 3) {
      console.log("Invalid Input, Enter a number between 1-3");
    } else {
      return lineNumber;
    }
  }
};

const betAmount = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the bet amount per line: ");
    const amountOfBet = parseFloat(bet);

    if (
      isNaN(amountOfBet) ||
      amountOfBet <= 0 ||
      amountOfBet > balance / lines
    ) {
      console.log(
        `Invalid input, Enter a valid bet amount under what you deposited. Your current balance is ${balance}. Thank you!`
      );
    } else {
      return amountOfBet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];
  for (let i = 0; i < COLUMNS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

// Transpose of a matrix

const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLUMNS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }
  return winnings;
};

const game = () => {
  let balance = deposit();

  while (true) {
    // CALLING THE FUNCTONS
    console.log(`You have a balance of ${balance}$`);
    const lines = getNumberOfLines();
    const betting = betAmount(balance, lines);
    balance -= betting * lines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, betting, lines);
    balance += winnings;
    console.log(`You won ${winnings.toString()}$👌`);

    if (balance <= 0) {
      console.log("You ran out of money, Bye 👋");
      break;
    }
    const playAgain = prompt("Do you want to play again (YES/NO)?");
    if (playAgain != "YES") {
      console.log("Thank you have a nice day 🏃‍♂️");
      break;
    }
  }
};

game();
