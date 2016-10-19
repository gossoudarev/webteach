/*jshint esversion: 6 */
/*jshint -W058 */

const PORT = 5555;
var	  express = require('express'),
      app = express(),
	  crypto = require('crypto');
     
module.exports = (()=>{
   function inner(){
      this.start = whatToDo=>{
		  app.use(express.static(__dirname + '/public'))
		     .use((req, res, next)=>next()); //univers m/w
   		  app.get('/', (req, res) => {
   			  res.send('<h1>Welcome to Express!</h1>');
   			  //res.sendFile(__dirname + '/index.html');  or res.redirect('/index.html');
   		  }); 
   		  app.get('/display', (req, res) => {
			  let src = req.query.src || (new Date()).toString(),
			  	  hash = req.query.hash || 'md5',
			  	  type = req.query.type || 'json',
			      resps = {'md5' : crypto.createHash('md5').update(src).digest('hex'), 'sha1': crypto.createHash('sha1').update(src).digest('hex')};
				  if (!resps.hasOwnProperty(hash)) {
				  		res.send('<h1>Illegal hash request attempt!</h1>');
				  } else {
						var resp = {};
		  				resp[hash] = resps[hash]; 
				  		if (type==='json') {
				  			res.json(    resp    );
				  		} else {
				  		    res.send( hash + '=' + resps[hash]   );
				  		} 
				  }
   		  }); 
		  
		  app.set('port',  process.env.port||PORT )		  
		     .listen( app.get('port') ,()=>console.log(`--> Port ${ app.get('port') } listening!!!`));
      };   
    }
  return new inner;
})();

// http://kodaktor.ru/api/req - demo client, test CORS
// process.env.port  - for cloud9 or ... port=8765 npm start



