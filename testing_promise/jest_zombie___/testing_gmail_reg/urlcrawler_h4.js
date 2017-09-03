import Zombie from 'zombie';
import 'isomorphic-fetch';
export default function (res,SCRIPT_URL = 'https://kodaktor.ru/g/testing_f38ac', DATA_URL='https://kodaktor.ru/j/gmail_values_1', SEL='h3#response') {
	const page = new Zombie();
	const goURL = url=> new Promise(resolve=>page.visit(url, resolve));

	let result = '';
	const outlog = x=>{
		result += x + '\n';
	}
	(async()=>{
		const data = await fetch(DATA_URL).then(x=>x.json());
		if (!Object.keys(data).length) return res.send('Could NOT fetch values!');
		for (const o of data) {
				await goURL(SCRIPT_URL + '?test=' + o.value)
        ;
				try {
							const got = page.document.querySelector(SEL).textContent,
									  exp = o.value,
									  sign = (got==exp) ? '\u2714' : '-';
							outlog(  `${ sign }   got |${ got.padEnd(22) }|,  expected |${exp.padEnd(22)}| `   );
						} catch (e) {
							return res.send('Could NOT retrieve the wanted value!');
						}
				}
		res.send(result);
	})();
};
