var myServer = require('./server.js');
myServer.start(function(result){
	if (result) console.log(result);
});