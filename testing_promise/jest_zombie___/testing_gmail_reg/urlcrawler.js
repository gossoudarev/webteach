import Zombie from 'zombie';
import testValues from './testValues';
export default function (URL = 'https://kodaktor.ru/g/testing_f38ac?gmail=' , SEL='h3#response') {
	const page = new Zombie();
	const goURL = url=> new Promise(resolve=>page.visit(url, resolve));

	//this is nice
	(async()=>{
		for (const o of testValues) {
		    await goURL(URL + o.value);
			try {
						const got = page.document.querySelector(SEL).textContent,
						exp = o.expected,
						sign = (got==exp) ? '\u2714' : '-';
	        	console.log(   `${ sign }   got |${ got.padEnd(3) }|,  expected |${exp.padEnd(3)}| `   );
	        } catch (e) {
	        	return console.log('Could NOT retrieve the wanted value!');
	        }
	    }
	})();
};
