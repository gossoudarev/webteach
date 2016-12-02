/*jshint esversion: 6 */

require('./server')
  .then(result=>
	   result?console.log(result):console.log('started')
  );