var myServer = require('./server');
myServer.start(function(result){
	if (result) console.log(result);
});