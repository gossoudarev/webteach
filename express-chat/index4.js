var myServer = require('./server4.js');
myServer.start(function(result){
	if (result) console.log(result);
});