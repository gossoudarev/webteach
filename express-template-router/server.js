/*jshint esversion: 6 */
/*jshint -W058 */

const PORT = 5555;
var	  express = require('express'),
	  my_routes = require('./routes/my/'),
	  morgan = require('morgan'),
      app = express();
     
module.exports = (()=>{
   function inner(){
      this.start = whatToDo=>{
		 app
		  
		  .use(express.static(__dirname + '/public'))
		  .use(morgan('combined'))
		  .use((req, res, next)=>next())
		  .use('/my', my_routes)
			 
   		  .get('/', (req, res) => {
   			  res.send('<h1>Welcome to Express!</h1>');  /* localhost */
   		  })
   		  .get('/api', (req, res) => {
			  res.set({'Access-Control-Allow-Origin': '*', 'elias': 'goss'}); //CORS - outer reqs
   			  res.json({'gossApi':'started ok!'});
   		  })
		  
	      .use((req, res, next) => {
	   	      res.status(404).send(`<h1 style="color:color">Not yet here! ${req.url}</h1>`);
	      })
	      .use((err, req, res, next) => {
	   	      res.status(500).send(`<h1 style="color:orange">Something went wrong ${err}</h1>`);
	      }) 		  
		  
		  .set('port',  process.env.port||PORT )		  
		     .listen( app.get('port') ,()=>console.log(`--> Port ${ app.get('port') } listening!!!`));
      };   
    }
  return new inner;
})();

// http://kodaktor.ru/api/req - demo client, test CORS
// process.env.port  - for cloud9 or ... port=8765 npm start



