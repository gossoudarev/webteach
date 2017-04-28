/*jshint esversion: 6 */
      /**
     * Функция создания целого случайного числа от a до b
     * @param a {number} Левая граница отрезка, по умолчанию 0
     * @param b {number} Правая граница отрезка, по умолчанию 100

	 * @returns {number} Целое случайное число от a до b
     */

module.exports = (()=>{ 
   function inner(){
      const formInterval=(a=0,b=100)=>{
			// при получении от jQuery $('input').val() у нас typeof a === 'string'
			if ( !a ) a = 0;   else a = Number(a);  // это покрывает пустые строки, не-переданность аргумента в параметр, null...
			if ( !b ) b = 100; else b = Number(b);  // но случай не-числа-в-кавычках этим не исчерпывается
			// если в параметр a будет передана строка типа 'rrrr'
			// то она ....  typeof NaN === 'number'
			if (isNaN(a)) a = 0;
			if (isNaN(b)) b = 100;
            if (b < a) {
            	a = a + b;
				b = a - b;
				a = a - b;
            }
			return Math.floor( a +  Math.random() * (b - a + 1)  );
      };   
      this.interval = formInterval;  
    }
  return new inner;})(); 
                    
                    
                    
/*
                    
    Usage:
  
const Rand = require('./random');
console.log(Rand.interval(a,b));

kodaktor.ru/random
                    
*/
/*

			a = Number(a);  // это позволяет получить либо число, либо NaN
			b = Number(b);  // во всех случаях
			if (!a) a = 0;  // а дальше NaN в этом сравнении будет рассмотрен как false
			if (!b) b = 100;
*/