const http = require('http');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

require('dotenv').config({ path: './config.js' });

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 [options]')
  .option('city', {
    alias: 'c',
    type: 'string',
    description: 'Город для которого требуется получить данные о погоде (по-умолчанию Москва)',
    default: process.env.CITY
  }).argv

  http.get(`http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=${argv.c}`, (res) => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;

  if (statusCode !== 200) {
    error = new Error('Неудачный запрос.\n' +
                      `Код ответа: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('Неверный тип содержимого.\n' +
                      `Ожидается application/json, а получено ${contentType}`);
  }
  if (error) {
    console.error(error.message);
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`Произошла ошибка: ${e.message}`);
});

