https://kodaktor.ru/slidecaster

combin1-0.png

размещения-с-повт  - это слова в алфавите

или как мы помним отображения из пронумерованных кортежей в алфавит

их число = куда**откуда

т.е. мощность_алфавита**длина_кортежа

например 256 байтов - это слова длины 8 из двоичного алфавита, 2**8

и это размещения с повторениями из двух по 8


https://kodaktor.ru/sets1_70f34

сколько всего? 4**1 + 4*2 + … это как 111..11 в 4-ичной системе счисления


(n,l)=>Array.from({length:l}, (v, i) => ++i).map(i=>n**i).reduce((x,y)=>x+y)



===

генерация р-с-п примерно понятна - это рекурсия по приписыванию



//kodaktor.ru/js/randexp.min.js


генерация байтов регулярным выражением

https://kodaktor.ru/reggen

<script src='//kodaktor.ru/j/out'></script>

<script src='//kodaktor.ru/js/randexp.min.js'></script>

<script>{

 Out.log ( new RandExp(/^sho+t$/).gen() );
 
 Out.log ('---'); 
 
 const expr = new RegExp('^[01]{8}$');
 
 Out.log ( new RandExp(expr).gen() ); 
 
 Out.log ( expr.test('10100101'));

}</script>


чекинатор 8 (22-11-2017)

Определите число размещений-с-повторениями из двух по от 1 до {N}

pow(2,{N}+1)-2

