const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

let now = new Date();

yargs(hideBin(process.argv))
  .usage('Usage: $0 <command> [options]')
  .command(
    'current',
    'Текущая дата и время в формате ISO',
    () => {},
    (argv) => {
      if (argv.y) {
        console.log(new Date().getFullYear());
        return;
      }
      if (argv.m) {
        console.log(new Date().getMonth());
        return;
      }
      if (argv.d) {
        console.log(new Date().getDate());
        return;
      }
      console.log(new Date());
    }
  )
  .command(
    'add',
    'Дата и время в формате ISO в будущем',
    () => {},
    (argv) => {
      if (argv.y) {
        let nowWithAddYear = now.setFullYear(now.getFullYear() + argv.y);
        console.log(new Date(nowWithAddYear));
        return;
      }
      if (argv.m) {
        let nowWithAddMonth = now.setMonth(now.getMonth() + argv.m);
        console.log(new Date(nowWithAddMonth));
        return;
      }
      if (argv.d) {
        let nowWithAddDate = now.setDate(now.getDate() + argv.d);
        console.log(new Date(nowWithAddDate));
        return;
      }
      console.log('Для комманды add необходимо указать опцию')
    }
  )
  .command('sub', 'Дата и время в формате ISO в прошлом',
  () => {},
  (argv) => {
    if (argv.y) {
      let nowWithSubYear = now.setFullYear(now.getFullYear() - argv.y);
      console.log(new Date(nowWithSubYear));
      return;
    }
    if (argv.m) {
      let nowWithSubMonth = now.setMonth(now.getMonth() - argv.m);
      console.log(new Date(nowWithSubMonth));
      return;
    }
    if (argv.d) {
      let nowWithSubDate = now.setDate(now.getDate() - argv.d);
      console.log(new Date(nowWithSubDate));
      return;
    }
    console.log('Для комманды sub необходимо указать опцию')
  }
  )
  .demandCommand(1)
  .option('year', {
    alias: 'y',
    type: 'boolean || number',
    description: 'Текущий год',
  })
  .option('month', {
    alias: 'm',
    type: 'boolean || number',
    description: 'Текущий месяц',
  })
  .option('date', {
    alias: 'd',
    type: 'boolean || number',
    description: 'Дата в календарном месяце',
  }).argv;

// console.log(argv);
