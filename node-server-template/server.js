const PORT = 4444;
var   http = require('http'),
      fs = require('fs');
     
module.exports = (()=>{
   function inner(){
      this.start = whatToDo=>{
		  http.createServer((req, res)=>{
		  	
			  switch ( req.url.substring(0,6)  ) {
				  case '/about' :
				       res.writeHead(200, {'Content-Type': 'text/html'});
				       res.write( '<h1>Hello world!</h1>' );   
				       res.end();
					   whatToDo('about called!');
				       break;

				  default:
				       res.writeHead(200, {'Content-Type': 'text/html'});
				       fs.readFile('public/page.html', (err, what)=>{
				          if (err) throw err;
				          res.write(what);
				          res.end();
				       });
			 }
			
		  }).listen(process.env.PORT || PORT,()=>
		  	        console.log(`--> Port ${  process.env.PORT || PORT  } listening!`)
	         );
      };   
    }
  return new inner;
})();