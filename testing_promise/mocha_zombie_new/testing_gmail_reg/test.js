import Zombie from 'zombie';
import should from 'should';
import testValues from './testValues';
((URL = 'https://kodaktor.ru/g/testing_f38ac?gmail=')=>{
    const page = new Zombie();
    const goURL = url=> new Promise(resolve=>page.visit(url, resolve));
    const getResult = ()=>({response:page.document.querySelector('#response').textContent});

    testValues.forEach (
			o=>it('returns no or yes from URL', ()=>
		  			goURL(URL+o.value).then(getResult).should.eventually.have
     	  		.property('response', o.expected)
			))
})();




/*

jsncnt.data.forEach( query=> describe('#solve system', ()=> {
  	    	    				it('respond with result', ()=>
  	    	      		  			goURL(jsncnt.url+query.input).then(doClick).then(final).should.eventually.have
  	    	           	  			.property('result', query.output.result)
  	    	    				);
  	   						 })
  	   			   );

*/
