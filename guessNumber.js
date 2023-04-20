const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const randomNumber = Math.floor(Math.random() * 100) + 1;

console.log(`Загадано число в диапазоне от 0 до 100`);

rl.on("line", function (answer) {
  if (answer == randomNumber) {
    console.log(`Отгадано число ${randomNumber}`);
    rl.close();
  } else if (answer < randomNumber) {
    console.log(`Больше`);
  } else {
    console.log(`Меньше`);
  }
});