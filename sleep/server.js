/*
 9999.kodaktor.ru
 localhost:9999/sleep/?n=5 - сделать задержку в 5 секунд и послать
 JSON с двумя временными стампами

*/

const PORT = 9999;
var   http = require('http'),
      fs = require('fs'),
      url = require('url'),
      Cur = require('./time');
     
module.exports = (()=>{
   function inner(){
	  this.qry = requrl=>url.parse(requrl, true).query.n;
      this.start = whatToDo=>{
		  http.createServer((req, res)=>{
		      if (req.url == '/sleep/error' || req.url == '/sleep/?error') {
		   	        res.writeHead(404, {'Content-Type': 'text/html', 
		   	   							'By': 'Ilya Goss', 
		   	   							'Access-Control-Allow-Origin': '*'});
		   	        res.write('<h1>404 Not found</h1>');
		   	        res.end();   
		   			return null; 	
		      };
			  switch ( req.url.substring(0,7)  ) {
				  case '/about' :
				       res.writeHead(200, {'Content-Type': 'text/html'});
				       res.write( '<h1>Hello world!</h1>' );   
				       res.end();
					   whatToDo('about called!');
				       break;
				  case "/sleep/" :
					   let n = this.qry(req.url),
						   t =  '{"date1":"' +  Cur.time() + '",' ;    
		 
					   setTimeout(()=>{
						   res.writeHead(200, { 'Content-Type': 'application/json',
												'By': 'Ilya Goss',
												'Access-Control-Allow-Origin': '*'
											  });	
					       res.write( t + '"date2":"'  +  Cur.time() + '"}' );
					       res.end();
					   }, 1000*n);		 
		 
				       break;
						
				  default:
				       res.writeHead(200, {'Content-Type': 'text/html'});
				       fs.readFile('public/page.html', (err, what)=>{
				          if (err) throw err;
				          res.write(what);
				          res.end();
				       });
			 }
			
		  }).listen(process.env.port||PORT,()=>
		  	        console.log('--> Port %d listening!',PORT)
	         );
      };   
    }
  return new inner;
})();



