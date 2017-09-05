import Zombie from 'zombie';
import should from 'should';
import testValues from './testValues';
((URL = 'https://kodaktor.ru/g/testing_f38ac')=>{
    const page = new Zombie();
    const goURL = url=> new Promise(resolve=>page.visit(url, resolve));
    const getResult = ()=>({response:page.document.querySelector('h3#response').textContent});

    testValues.forEach (
			o=>it('returns no or yes from URL', ()=>
		  			goURL(URL+'?test='+o.value).then(getResult).should.eventually.have
     	  		.property('response', o.expected)
			))
})();
