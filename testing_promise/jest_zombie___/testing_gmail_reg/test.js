import Zombie from 'zombie';
import testValues from './testValues';
((URL = 'https://kodaktor.ru/g/testing_f38ac', SEL='h3#response')=>{
    const page = new Zombie();
    const goURL = url=> new Promise(resolve=>page.visit(url, resolve));

    testValues.forEach(o=>
			it('returns no or yes from URL', ()=>{
			  expect.assertions(1);
        return goURL(URL+'?test='+o.value)
               .then( ()=> expect( page.document.querySelector(SEL).textContent  ).toBe(o.expected))
      }
		))
})();

//  https://kodaktor.ru/g/testing_a3ead - 5 out of 6
