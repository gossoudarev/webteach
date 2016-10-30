/*jshint esversion: 6 */
/*jshint -W058 */

const PORT = 4444;
let   http = require('http'),
      fs = require('fs'),

      mimetypes = {
		  'html': 'text/html',
		  'js': 'text/javascript',
		  'css': 'text/css',	
		  	  		  
		  'png' : 'image/png',
		  'jpg' : 'image/jpeg',		  
		  'gif' : 'image/gif',	
		  
		  'pdf' : 'application/pdf'		  
	
      };


let serveStaticFile = (res, path, responseCode)=>{
  let ext = path.substr(path.lastIndexOf('.')+1);

  if(!responseCode) responseCode = 200;
  fs.readFile(__dirname + path, function(err,data) {
      if(err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
	      res.end('500 - Internal Error');
	  } else {
	      res.writeHead(responseCode, { 'Content-Type': mimetypes[ext] });
	      res.end(data);
	  }
	  }); 
};				  
				  
				 

http.createServer((req, res)=>{
		  	  let needle = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
			  switch (  needle ) {
			      case ''  :
			  	  case '/' :
			       		res.writeHead(200, {'Content-Type': 'text/html'});
			       	 	res.end( '<h1>Type file names!</h1>' );   
			       	 	break;				  
				  
				  case '/about' :
				       res.writeHead(200, {'Content-Type': 'text/html'});
				       res.end( '<h1>File server!</h1>' );   
				       break;

				  default:
				       res.writeHead(200, {'Content-Type': 'text/html'});
				       serveStaticFile(res, needle ,''); 
			 }
			
		  }).listen(process.env.PORT || PORT,()=>
		  	        console.log(`--> Port ${  process.env.PORT || PORT  } listening!`)
);
