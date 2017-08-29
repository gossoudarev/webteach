import Zombie from 'zombie';
import testValues from './testValues';
export default function (URL = 'https://kodaktor.ru/g/testing_f38ac?gmail=') {
	const page = new Zombie();
	const goURL = url=> new Promise(resolve=>page.visit(url, resolve));

	//this is nice
	(async()=>{
		for (const o of testValues) {
		    await goURL(URL + o.value);
			try {
	        	console.log(  `${URL + o.value}:  got  ${ page.document.querySelector('#response').textContent } expected ${o.expected} `   );
	        } catch (e) {
	        	console.log('Could NOT retrieve the wanted value!');
	        }
	    }    
	})();
};
