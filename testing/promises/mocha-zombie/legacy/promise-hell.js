/*jshint esversion: 6 */
/*jshint -W058 */
/*jshint -W083 */
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
 
 
 
function*visits(json){
	for (let x of json.data){
		yield new Promise(function(resolve){
			page.visit(json.url+x.input, function(){
				resolve( {el:'#button',i:JSON.stringify(x.input), title:page.text('title')}  );				
			});
		});
	}
}

let visitor = visits( jsncnt );

/*
эти вызовы генератора сработают как бы одновременно - результат будет неверный

visitor.next().value
  .then( a => console.log( a.i + ' ' + a.title )  ) ;  
visitor.next().value
  .then( a => console.log( a.i + ' ' + a.title )  ) ;  
visitor.next().value
  .then( a => console.log( a.i + ' ' + a.title )  ) ; 
*/


//вот это промис хелл и это реально работает, но ХМ!
//каждый некст генератора выполняется не цепочкой then-ов
//а во вложенных then-ах, что рушит красоту промисов
visitor.next().value
  .then( a => console.log( a.i + ' ' + a.title )  )   
  .then(function(){
  	visitor.next().value
	  .then( a => console.log( a.i + ' ' + a.title )  ) 
	  .then(function(){
		visitor.next().value
		  .then( a => console.log( a.i + ' ' + a.title )  );
	  });
  });

  //таким образом проблема переформулируется так:
  //как запустить генератор таким образом, чтобы его нексты запускались асинхронно?
  
  
  
