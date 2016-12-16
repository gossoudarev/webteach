/*jshint esversion: 6 */

const PORT = 5555,
      express = require('express'),
      path = require('path'),
      app = express();

module.exports = new Promise( resolve=>{      

		  app
		     .use(express.static(path.join(__dirname, 'public')))
		     .use((req, res, next) => next())  
   		  .get('/', (req, res) => {
   			  res
   			     .send('<h1>Welcome to Express!</h1>');
   			     //res.sendFile(__dirname + '/index.html');  or res.redirect('/index.html');
   		  }) 
   		  .get('/api', (req, res) => {
			     res
			        .set({'Access-Control-Allow-Origin': '*', 'elias': 'goss'})
   			     .json({'gossApi':'started ok!'});
   		  }) 
		  
		     .set('port',  process.env.port||PORT )		  
		     .listen( app.get('port') ,()=>resolve(`--> Port ${ app.get('port') } listening!!!`));
       
});
 
// http://kodaktor.ru/api/req - demo client, test CORS
// process.env.port  - for cloud9 or ... port=8765 npm start