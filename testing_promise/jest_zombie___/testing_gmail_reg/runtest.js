const res = console;
res.send = console.log;

//require('./urlcrawler')(res);
//require('./urlcrawler')(res, 'https://kodaktor.ru/g/testing_a3ead');

import go from './urlcrawler';

import goh4 from './urlcrawler_h4';

//go(res, 'https://kodaktor.ru/g/testing_a40e4', 'https://kodaktor.ru/j/yandexclick_values_1');

goh4(res, 'https://kodaktor.ru/g/testing_84669', 'https://kodaktor.ru/j/gmail_values_1', 'h4#author');
