/*jshint esversion: 6 */
const TEMPLATEJSON = './kramer_tests_set_client',
	  should = require('should'),
	  Zombie = require('zombie'),
      page  = new  Zombie(),
      jsncnt = (!process.argv[2]) ?  require(TEMPLATEJSON)  : require(`./${process.argv[2]}`),
      goURL = url=> new Promise(resolve=>page.visit(url, resolve.bind(null, {el:'#button'}))),
      doClick = options=> new Promise(resolve=>page.pressButton(options.el, resolve)),
      final = ()=>JSON.parse(page.document.title) 
	  ;
page.silent = true;
jsncnt.data.forEach( query=> describe('#solve system', ()=> {
  	    	    				it('respond with result', ()=>
  	    	      		  			goURL(jsncnt.url+query.input).then(doClick).then(final).should.eventually.have
  	    	           	  			.property('result', query.output.result)
  	    	    				);
  	   						 })
  	   			   );
