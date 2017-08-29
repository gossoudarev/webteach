import Zombie from 'zombie';
export default function (URL = 'https://kodaktor.ru/g/testing_f38ac?gmail=') {
//this constant is the only parameter of this code

	const testValues = [
		{value: 'il@gmail.com', expected: 'no'},
		{value: 'ilya@gmail.com', expected: 'yes'},
		{value: 'ilya@gmail.ru', expected: 'no'},
		{value: 'il-ya@gmail.com', expected: 'no'},
		{value: 'hahaha@gmail.com', expected: 'yes'}
	];

	const page = new Zombie();
	const goURL = url=> new Promise(resolve=>page.visit(url, resolve));

	//single case
	/*
	goURL(URL + testValues[1].value)
	  .then (()=>{
	  	console.log(page.document.querySelector('#response').textContent)
	  });
	*/

	/*
	always yes - why?
	testValues.forEach(o => {
		goURL(URL + o.value)
		  .then (()=>{
		    console.log(  `${URL + o.value}:  got  ${ page.document.querySelector('#response').textContent } expected ${o.expected} `   )
		  });
	})


	for (const o of testValues) {
	   (async(o)=>{
	   		await goURL(URL + o.value);
	   		console.log(  `${URL + o.value}:  got  ${ page.document.querySelector('#response').textContent } expected ${o.expected} `   );
	   })(o)
	}
	*/

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
