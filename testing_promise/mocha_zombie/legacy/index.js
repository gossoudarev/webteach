/*jshint esversion: 6 */
/*jshint -W058 */
const TEMPLATEJSON = './kramer_tests_set_new';

let Zombie = require('zombie'),
    assert = require('assert'),
    page = new Zombie(),
	jsncnt,

    async = require('asyncawait/async'),
    await = require('asyncawait/await');
	
	
     
if (!process.argv[2]) {
   jsncnt = require(TEMPLATEJSON);
} else {
   jsncnt = require(`./${process.argv[2]}`);
}
	
page.silent = true; // чтобы не было лишнего вывода
 
function goURL(url, what){
	return new Promise(function(resolve){
		page.visit(url, resolve.bind(null, {el:'#button',what:JSON.stringify(what)}  ));
	});
}
function doClick(options){
	return new Promise(function(resolve){
		page.pressButton(options.el, resolve.bind(null, options.what));
	});
}

function passage(expected){ 
		  let got = JSON.stringify(JSON.parse(page.querySelector('#button').textContent));
		  try {
			  assert.equal(
				  expected, 
			  	  got	
			  );
			  console.log ('Passed!\n');		  	
		  } catch (e) {
		  	  console.log (`${expected}\n${got}\n NOT passed \n`);
		  }		
}
 
/*

    // это вот линейная последовательность
   
         (()=> goURL(jsncnt.url+jsncnt.data[0].input, jsncnt.data[0].output))(
    )
	.then(doClick)
	.then(passage)
	.then(()=> goURL(jsncnt.url+jsncnt.data[1].input, jsncnt.data[1].output)
	)
	.then(doClick)
	.then(passage)	
 
 */

/*
//упрощённо:  вывод заголовков
function go(url){
	return new Promise(function(resolve){
		page.visit(url, function(){
			let title =  page.text('title');
			resolve(title);  
		});
	});
}
let runAllStepByStep0 = async( function (){
   for (let query of jsncnt.data){
	    console.log (jsncnt.url + query.input);
		let k = await( go(  jsncnt.url + query.input ) );
   		console.log(k);   
   }
});
*/

// а это реальный вариант с тестированием
let runAllStepByStep = async( function (){
   for (let query of jsncnt.data){
		let k = await( goURL(jsncnt.url+query.input, query.output).then(doClick).then(passage) );  
   }
});

runAllStepByStep()
  .then(()=>console.log('end'));
console.log('start'); 