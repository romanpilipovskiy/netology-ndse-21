const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 [options]')
  .option('logname', {
    alias: 'l',
    type: 'string',
    description: 'Имя лог-файла',
    require: true,
  }).argv;

fs.readFile(argv.l, 'utf8', function (err, data) {
  if (err) throw console.log(err);
  log = JSON.parse(data);

  let winCount = 0;
  let loseCount = 0;

  for (let item in log) {
    if (log[item]['hit']) {
      winCount++;
    } else {
      loseCount++;
    }
  }

  console.log('Количество сыгранных партий:', log.length);
  console.log('Выигрышные партии:', winCount);
  console.log('Проигрышные партии:', loseCount);
  console.log(
    'Cоотношение выигранных партий:',
    ((winCount / log.length) * 100).toFixed(2) + '%'
  );
});
