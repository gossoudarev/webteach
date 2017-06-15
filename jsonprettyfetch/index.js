/* jshint esversion: 6 */
import prettyjson from 'prettyjson';
import 'isomorphic-fetch';
fetch('https://kodaktor.ru/json/package')
	 .then(x=>{
		if (!x.ok) throw Error(x.statusText);
	    return x.json();
	 })
	 .then(x=>{
	 	console.log(prettyjson.render(x));
	 })
	 .catch(x=>console.error(x))
	 ;