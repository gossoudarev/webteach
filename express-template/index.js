/*jshint esversion: 6 */
/*jshint -W058 */
require('./server').start(result=>
	result?console.log(result):console.log('started')
);