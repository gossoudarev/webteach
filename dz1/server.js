/*jshint esversion: 6 */

const PORT = 4444,

      http = require('http'),
      fs = require('fs'),
      md5 = require('md5'),
      sha1 = require('sha1'),
      url =  require('url'),
 	  
      qParse = requrl => url.parse(requrl, true).query;

	  module.exports = new Promise( resolve=>{     
	  		  http.createServer((req, res)=>{
		  	
			  switch ( req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()  ) {
				  case '/display' :
				  	
					   var src = qParse(req.url).src;
					   //for elegancy lovers
					   //src = (src == undefined ) ? (new Date()).toString() : src;
					   //for simple people
					   if (src == undefined ) src= (new Date()).toString();
					  
				  	   var type = qParse(req.url).type,
				  	       hash = qParse(req.url).hash,
				  	       
				  	       resps = {'md5' : md5(src), 'sha1': sha1(src)}; // !!!
				  	       
				  	   if (!resps.hasOwnProperty(hash)) {
				  	   	   res.writeHead(500, {'Content-Type': 'text/html'});
				  	   	   res.end('<h1>Illegal hash request attempt!</h1>');
				  	   } else {
				  	   	
		 				  if (!resps.hasOwnProperty(hash)) {
		 				  		res.send('<h1>Illegal hash request attempt!</h1>');
		 				  } else {
		 						var resp = {};
		 		  				resp[hash] = resps[hash]; 
		 				  		if (type==='json') {
					  	   	   	 	res.writeHead(200, {'Content-Type': 'application/json'});
					  	   	   	    res.end( JSON.stringify (    resp   )  );
		 				  		} else {
	 					  	   	    res.writeHead(200, {'Content-Type': 'text/plain'});
	 					  	   	    res.end( hash + '=' + resp[hash]   );
		 				  		} 
		 				  }
				  	   
				  	   }

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