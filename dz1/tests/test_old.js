/*jshint esversion: 6 */
/*jshint -W058 */
/*jshint -W083 */
const TEMPLATEJSON = './test';

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
 
let goURL = (url, what) =>  new Promise(function(resolve){
		page.visit(url, resolve.bind(null, {what:JSON.stringify(what)}  ));
	});


function passage(expected){ 
		  let got = JSON.stringify(JSON.parse(page.querySelector('body').textContent));
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
	for (let query of json.data){
		 yield goURL(jsncnt.url+query.input, query.output).then(passage) ;
	}
}

let  visitor = async function(){
    for (let query of  visits( jsncnt ) ){
  	  let result = await  query;
    }
};

visitor();