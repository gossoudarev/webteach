require('./server').start(result=>
	result?console.log(result):console.log('started')
);