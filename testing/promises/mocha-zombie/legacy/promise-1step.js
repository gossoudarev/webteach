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


let index=2;
goURL(jsncnt.url+jsncnt.urlinputs[index], jsncnt.outputs[index])
	.then(doClick)
	.then(function(expected){ 
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
	});
