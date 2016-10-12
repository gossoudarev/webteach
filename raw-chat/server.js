/*jshint esversion: 6 */
/*jshint -W058 */

const PORT = 7654;
var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    chat = 'chat.txt',
    
	qParse = requrl => url.parse(requrl, true).query;

module.exports = (()=>{
   function inner(){
      this.start = whatToDo=>{
		  http.createServer((req, res)=>{
		  	
			  switch ( req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()  ) {
			   case '/add' :
			        res.writeHead(200, {'Content-Type': 'text/html'});
			        res.write('<h2>Добавляем '+ what + '</h2>');
			        var what = qParse(req.url).what;
			        if (what) {
			          fs.appendFile(chat, '\n'+what, function(err){
			            if (err) throw err;
			            res.write('<h2><i>Добавлено</i> '+ what + '</h2>');
			            res.end();
			          });
			        } else {
			          res.write('<h1><i>Нечего добавлять</i></h1>');
			          res.end();         
			        }
        
			        break;
			   case '/get' :
			        res.writeHead(200, {'Content-Type': 'text/html'});
			        res.write('<h1>Читаем...</h1>');
			        fs.readFile(chat, function(err, what){
			          if (err) throw err;
			          res.write('<pre>'+ what + '</pre>');
			          res.end();
			        });
        
			        break; 
			   default:
			        res.writeHead(200, {'Content-Type': 'text/html'});
			        fs.readFile('./public/form.html', function(err, what){
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