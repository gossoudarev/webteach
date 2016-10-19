/*jshint esversion: 6 */
/*jshint -W058 */
const TEMPLATEJSON = './kramer_tests_set_new';

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
 
         (()=> goURL(jsncnt.url+jsncnt.data[0].input, jsncnt.data[0].output))(
    )
	.then(doClick)
	.then(passage)
	.then(()=> goURL(jsncnt.url+jsncnt.data[1].input, jsncnt.data[1].output)
	)
	.then(doClick)
	.then(passage)	
	.then(()=> goURL(jsncnt.url+jsncnt.data[2].input, jsncnt.data[2].output)
	)
	.then(doClick)
	.then(passage);		

// здесь я попытался максимально сделать регулярный паттерн повторения вызовов
	// для этого в строке 42 обернул вызов в лямбдасамовызов
	// важно что перед вызовом goURL поставлен => (или return)
	// без этого дальше промисная кухня не передаст результат в doClick
// что такое генератор, у которого каждый next - это промис?
// т.е. например перебор each значений массива, каждое из которых обрабатывается отложенно?	
 

 
 


