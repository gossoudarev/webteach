/*jshint esversion: 6 */
/*jshint -W058 */
const PORT = 4444;
var   http = require('http'),
      fs = require('fs'),
      md5 = require('md5'),
      sha1 = require('sha1'),
      url =  require('url'),
      
      qParse = requrl => url.parse(requrl, true).query;

module.exports = (()=>{
   function inner(){
      this.start = whatToDo=>{
		  http.createServer((req, res)=>{
		  	
			  switch ( req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()  ) {
				  case '/display' :
				  	
				  	   var src = qParse(req.url).src,
				  	       type = qParse(req.url).type,
				  	       hash = qParse(req.url).hash,
				  	       
				  	       resps = {'md5' : md5(src), 'sha1': sha1(src)}; // !!!
				  	       
				  	   if (!resps.hasOwnProperty(hash)) {
				  	   	   res.writeHead(500, {'Content-Type': 'text/html'});
				  	   	   res.end('<h1>Illegal hash request attempt!</h1>');
				  	   } else {
				  	   	
					  	   if (type==='json') {
					  	   	   res.writeHead(200, {'Content-Type': 'application/json'});
					  	   	   var resp = {};
					  	   	   resp[hash] = resps[hash]; // :-)))))))))))
					  	   	   res.end( JSON.stringify (    resp   )  );
					  	   } else {
					  	   	   res.writeHead(200, {'Content-Type': 'text/plain'});
					  	   	   res.end( hash + '=' + resps[hash]   );
					  	   } 
				  	   
				  	   }

					   whatToDo('API hash called!');
				       break;

				  default:
				       res.writeHead(200, {'Content-Type': 'text/html'});
				       fs.readFile('public/page.html', (err, what)=>{
				          if (err) throw err;
				          res.write(what);
				          res.end();
				       });
			 }
			
		  }).listen(process.env.PORT,()=>
		  	        console.log('--> Port %d listening!',PORT)
	         );
      };   
    }
  return new inner;
})();