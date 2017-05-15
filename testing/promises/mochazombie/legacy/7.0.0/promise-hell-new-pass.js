/*jshint esversion: 6 */
/*jshint -W058 */
/*jshint -W083 */
const TEMPLATEJSON = './kramer_tests_set_client';

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
// решение с асинхронным генератором, он йилдит промисы в итератор
// дальше мы их собственно синхронно прогоняем один за другим 
 
function*visits(json){
	for (let query of json.data){
		 yield goURL(jsncnt.url+query.input, query.output).then(doClick).then(passage) ;
	}
}

let  visitor = async function(){
    for (let query of  visits( jsncnt ) ){
  	  let result = await  query;
    }
}

visitor();