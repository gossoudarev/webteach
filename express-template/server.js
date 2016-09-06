/*jshint esversion: 6 */
/*jshint -W058 */

const PORT = 5555;
var	  express = require('express'),
      app = express();
     
module.exports = (()=>{
   function inner(){
      this.start = whatToDo=>{
		  app.use(express.static(__dirname + '/public'))
		     .use((req, res, next)=>next()); //univers m/w
   		  app.get('/', (req, res) => {
   			  res.send('<h1>Welcome to Express!</h1>');
   			  //res.sendFile(__dirname + '/index.html');  or res.redirect('/index.html');
   		  }); 
   		  app.get('/api', (req, res) => {
			  res.set({'Access-Control-Allow-Origin': '*', 'elias': 'goss'}); //CORS - outer reqs
   			  res.json({'gossApi':'started ok!'});
   		  }); 
		  		  
		  app.listen(process.env.port||PORT,()=>console.log('--> Port %d listening!',PORT));
      };   
    }
  return new inner;
})();

// http://kodaktor.ru/api/req - demo client, test CORS



