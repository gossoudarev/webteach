/*jshint esversion: 6 */
/*jshint -W058 */

const PORT = 4444;
var   http = require('http'),
      fs = require('fs'),
  	  url = require('url'),
	  CHAT = 'chat.txt',

	  qParse = requrl => url.parse(requrl, true).query;
     
module.exports = (()=>{
   function inner(){
      this.start = whatToDo=>{
		  http.createServer((req, res)=>{
		  	
			  switch (  req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()  ) {
				  case '/add' :
				       res.writeHead(200, {'Content-Type': 'text/html'});
					   var addedMessage = qParse(req.url).addedMessage;
					   if (addedMessage) {
				       		res.write( `<h2>Добавляем ${addedMessage}!</h2>` ); 
					   	    fs.appendFile(CHAT, '\n'+addedMessage, err=>{
					   	    	if (err) throw err;
								res.end( `<h2>Добавлено ${addedMessage}!</h2>` ); 
					   	    });
					   } else {
							res.end( `<h2>Нечего добавлять!</h2>` );
					   }  
				       
					   //whatToDo('about called!');
				       break;
				  case '/read' : 	   
					   res.writeHead(200, {'Content-Type': 'text/html'});
					   res.write('<h2>Читаем...</h2>');
					   fs.readFile(CHAT, (err, what)=>{
					   	   if (err) throw err;
						   res.end(`<pre>${what}</pre>`);
					   });
					   break;

				  default:
				       res.writeHead(200, {'Content-Type': 'text/html'});
				       fs.readFile('public/form.html', (err, what)=>{
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