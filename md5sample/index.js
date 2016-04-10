var http = require('http');
var url = require('url');
var fs = require('fs');
var md5 = require('md5');

function qry(requrl){
	return url.parse(requrl, true).query.src;
}

var serv = function (req, res){	
   switch ( req.url.substring(0,5)  ) {
   case "/stas" :
        res.writeHead(200, {"Content-Type": "application/json"});
        
		var src = qry(req.url);
		res.write( JSON.stringify ( {'md5':md5(src) } ) );   
		 
        res.end();
        break;

   default:
        res.writeHead(200, {"Content-Type": "text/html"});
        fs.readFile("page.html", function(err, what){
          if (err) throw err;
          res.write(what);
          res.end();
        });
  }
};

http.createServer(serv).listen(1111);
