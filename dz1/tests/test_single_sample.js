/*jshint esversion: 6 */
/*jshint -W058 */
/*jshint -W083 */
const TEMPLATEJSON = './tests';

let Zombie = require('zombie'),
    assert = require('assert'),
    page = new Zombie(),
	jsncn;     

if (!process.argv[2]) {
   jsncnt = require(TEMPLATEJSON);
} else {
   jsncnt = require(`./${process.argv[2]}`);
}
	
page.silent = true; // чтобы не было лишнего вывода
 
let startTest = (url, what, exp) =>  new Promise(function(resolve){
		page.visit(url+what, resolve.bind(null, exp  ));
	});


function passage(options){
          //  options = {"got": "..", "expected":"..."}    
		  try {
			  assert.equal(
				  options.expected, 
				  options.got	
			  );
			  console.log ('Passed!\n');		  	
		  } catch (e) {
		        console.log ( `\nExpected: |${options.expected}|` ) ;
		        console.log ( `Got:      |${options.got}|` ) ;
		  	  console.log (`\nNOT passed \n`);
		  }		
}

let i = 0;

startTest('http://localhost:4444/display', jsncnt.data[i].input , jsncnt.data[i].output)
 .then(
 	expected => { 
	    let got = page.body.textContent;
 	   return {got, expected };
 	}
 )
 .then (
 	passage
 );


/*
чтобы запустить ещё один тест
нужно в строке 50 убрать точку с запятой
ниже поставить .then( ()=>{........}) )
   и в тело этой функции весь кусок от строки 41 до строки 50

   чтобы после него запустить ещё один тест
   нужно будет сделать то же самое уже для этого 
      получается АД промисов
         решение - асинк/авайт

*/


 