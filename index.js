const fs = require("fs");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const readline = require("readline");

const argv = yargs(hideBin(process.argv))
  .usage("Usage: $0 [options]")
  .option("logname", {
    alias: "l",
    type: "string",
    description: "Имя лог-файла",
    require: true,
  }).argv;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const headsOrTails = Math.floor(Math.random() * 2) + 1;
console.log("Загадано орел(1) или решка(2), Ваш ответ? ");

rl.on("line", function (answer) {
  let result;
  if (answer == headsOrTails) {
    console.log("Вы угадали!");
    result = {
      date: new Date(),
      guessed: headsOrTails,
      answer: answer,
      hit: true,
    };
  } else {
    console.log("Вы не угадали, попробуйте ещё раз.");
    result = {
      date: new Date(),
      guessed: headsOrTails,
      answer: answer,
      hit: false,
    };
  }
  rl.close();

  if (fs.existsSync(argv.l)) {
    fs.readFile(argv.l, function (err, data) {
      if (err) throw console.log(err);
      let existsData = JSON.parse(data);
      existsData.push(result);

      fs.writeFile(argv.l, JSON.stringify(existsData), "utf8", function (err) {
        if (err) throw console.log(err);
        console.log("Лог Сохранён!");
      });
    });
  } else {
    fs.writeFile(argv.l, JSON.stringify([result]), "utf8", function (err) {
      if (err) throw console.log(err);
      console.log("Лог Сохранён!");
    });
  }
});
