var PORT = 4444;
var http = require('http'),
    fs = require('fs');
     

module.exports = (function(){
   function inner(){
      this.start = function (whatToDo){
           	  
		  http.createServer(function(req, res){
		  	
			  switch ( req.url.substring(0,6)  ) {
			  case "/about" :
			       res.writeHead(200, {"Content-Type": "text/html"});
			       res.write( '<h1>Hello world!</h1>' );   

			       res.end();
			       break;

			  default:
			       res.writeHead(200, {"Content-Type": "text/html"});
			       fs.readFile("public/page.html", function(err, what){
			          if (err) throw err;
			          res.write(what);
			          res.end();
			       });
			 }
			
			
		  }).listen(process.env.port || PORT, function(){
		  	  console.log(PORT)
		  });
      };   
    }
  return new inner;
})();



