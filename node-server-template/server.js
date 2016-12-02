/*jshint esversion: 6 */

const PORT = 4444,
      http = require('http'),
      fs = require('fs');

module.exports = new Promise( resolve=>{     
		  http.createServer((req, res)=>{
		  	
			  switch ( req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase() ) {
				  case '/about' :
				       res.writeHead(200, {'Content-Type': 'text/html'});
				       res.end( '<h1>Hello world!</h1>' );   
				       break;

				  default:
				       res.writeHead(200, {'Content-Type': 'text/html'});
				       fs.readFile('public/page.html', (err, what)=>{
				          if (err) throw err;
				          res.end(what);
				       });
			 }
		  })
		     .listen(process.env.PORT || PORT,()=>
		  	        resolve(`--> Port ${process.env.PORT || PORT} listening!`)
	         );
 });   