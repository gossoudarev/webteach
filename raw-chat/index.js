var http = require('http');
var url = require('url');
var fs = require('fs');
var PORT = 5555;
var chat = "chat.txt";

var qry = function(requrl){
 return url.parse(requrl, true).query.what;
};

var serv = function (req, res){
  console.log("Request!");
  switch (req.url.substring(1,4)) {
   case "add" :
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write("<h2>Добавляем "+ what + "</h2>");
        var what = qry(req.url);
        if (what) {
          fs.appendFile(chat, "\n"+what, function(err){
            if (err) throw err;
            res.write("<h2><i>Добавлено</i> "+ what + "</h2>");
            res.end();
          });
        } else {
          res.write("<h1><i>Нечего добавлять</i></h1>");
          res.end();         
        }
        
        break;
   case "get" :
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write("<h1>Читаем...</h1>");
        fs.readFile(chat, function(err, what){
          if (err) throw err;
          res.write("<pre>"+ what + "</pre>");
          res.end();
        });
        
        break; 
   default:
        res.writeHead(200, {"Content-Type": "text/html"});
        fs.readFile("./public/form.html", function(err, what){
          if (err) throw err;
          res.write(what);
          res.end();
        });
  }
};

http.createServer(serv).listen(PORT, function(){console.log(PORT)});
