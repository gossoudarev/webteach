// localhost:9999/sleep/?n=5 - сделать задержку в 5 секунд и послать
// JSON с двумя временными стампами

var http = require('http');
var url = require('url');
var cur = require('./time').Cur;

function qry(requrl){
	 
	 
	return   url.parse(requrl, true).query.n 
}

var serv = function (req, res){	
   if (req.url == '/sleep/error' || req.url == '/sleep/?error') {
	        res.writeHead(404, {"Content-Type": "text/html", 
	   							"By": "Ilya Goss", 
	   							"Access-Control-Allow-Origin": "*"});
	        res.write('<h1>404 Not found</h1>');
	        res.end();   
			return null; 	
   };
   	
   switch ( req.url.substring(0,7)  ) {
   case "/sleep/" :
 
		
		var n = qry(req.url);
		var t =  '{"date1":"' +  cur.time() + '",' ;    
		 
	    setTimeout(function(){
		   res.writeHead(200, { "Content-Type": "application/json",
								"By": "Ilya Goss",
								"Access-Control-Allow-Origin": "*"
							  });	
	       res.write( t + '"date2":"'  +  cur.time() + '"}' );
	       res.end();
	    }, 1000*n);		 
		 
        break;

   default:
        res.writeHead(301, {"Content-Type": "text/html"});
        res.write('Look it up somewhere else!');
        res.end();
  }
};

http.createServer(serv).listen(9999);
