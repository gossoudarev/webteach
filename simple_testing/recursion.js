/*jshint esversion: 6 */
/*jshint -W058 */
const TEMPLATEJSON = './kramer_tests_set';

let Zombie = require('zombie'),
    assert = require('assert'),
    page = new Zombie(),
	jsncnt;
     
if (!process.argv[2]) {
   jsncnt = require(TEMPLATEJSON);
} else {
   jsncnt = require(`./${process.argv[2]}`);
}
	
page.silent = true; // чтобы не было лишнего вывода
 
process.on('exit', code=>console.log(`Exiting ${code}`));
	 
function p(where, how, what){
	var num;
    //where = basic testing url
    //how = inputs 1d array
    //what = outputs 1d array of json ojects needing to be stringified

    //изначально функция описана с сигнатурой из трех аргументов
    //если функция вызывается без четвертого аргумента, это значит, что она вызывается впервые
    //договоримся, что в массивах how-what минимум два члена, т.е. делается минимум два тестовых запроса
    if (arguments.length == 3) {
        num = 0; //при первом вызове берется крайний левый входной тестирующий набор
    } else {
        num = arguments[3]; //далее берется тот, который рекурсивно передан (*)
    }
    var finalurl = where + how[num]; //адрес для вызова: базовый плюс перебираемый входной набор
	
	page.visit(finalurl, function(){
      page.pressButton('#button', function(){
		  let expected = JSON.stringify(what[num]),
		      got = JSON.stringify(JSON.parse(page.querySelector('#button').textContent));
		  try {
			  assert.equal(
				  expected, 
			  	  got	
			  );
			  console.log ('Passed!\n');		  	
		  } catch (e) {
		  	  console.log (`${expected}\n${got}\n NOT passed test ${num}\n`);
		  }

          if (num == how.length-1) { //если только что поработали с последним из входных тестирующих наборов 
            process.exit();
          } else {
            p(where, how, what,   num+1); // (*) рекурсивная часть: вызов по второму разу уже с индексом
          }		  
	  });
	});
}

 
//вызываем функцию впервые с тремя аргументами
p(jsncnt.url, jsncnt.urlinputs, jsncnt.outputs);
 