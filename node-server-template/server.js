var PORT = 4444;
var http = require('http'),
    fs = require('fs');
     

module.exports = (function(){
   function inner(){
      this.start = function (whatToDo){
           	  
		  http.createServer(function(req, res){
		  	
		      res.writeHead(200, {"Content-Type": "text/html"});
		      res.write( '<h1>Hello world!</h1>' );
			
			
		  }).listen(process.env.port || PORT, function(){
		  	  console.log(PORT)
		  });
      };   
    }
  return new inner;
})();



