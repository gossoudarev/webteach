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

 
//генератор: делает итератор из промисов по массиву входных/выходных данных
function*visits(){
 	for (let query of   jsncnt.data  ){
			yield startTest(jsncnt.url, query.input , query.output)
			   .then(expected => { 
			   	    let got = page.body.textContent;
			    	   return {got, expected };
			    	})
			   .then (passage );
 	}
 }
 
 let  visitor = async function(){
     for (let query of  visits( jsncnt ) ){
   	  await  query;
     }
 };
 
visitor(); 










/*
или можно было обойтись без генератора, собирающего вызовы в итератор
и просто циклом асинхронно вызывать промисы

 let  visitor2 = async function(){
     for (let query of   jsncnt.data  ){
			await startTest(jsncnt.url, query.input , query.output)
			 .then(
			 	expected => { 
				    let got = page.body.textContent;
			 	   return {got, expected };
			 	}
			 )
			 .then (
			 	passage
			 );
     }
 };
*/ 