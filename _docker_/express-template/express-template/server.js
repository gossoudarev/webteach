/*jshint esversion: 6 */
module.exports = new Promise( resolve=>{ 
	const	PORT = 5555,
			express = require('express'), 
			path = require('path'),
			app = express();
	app
		.use(express.static(path.join(__dirname, 'public'))) .use((req, res, next) => next())
		.get('/', (req, res) => {
			res
        	     .send('<h1>Welcome to Goss Express Template!</h1>');
			})
		.get('/api', (req, res) => {
			res
            	 .set({'Access-Control-Allow-Origin': '*', 'elias': 'goss'}) 
             	.json({'gossApi':'started ok!'});
			})
		.get('/fail', (req,res)=>{throw new Error('Fail!');}) 
		.use((req,res)=>res.send('404'))
		.use((err,req,res,next)=>res.send(`500 ${err}` ))
		.set('port', process.env.port||PORT )
		.listen( app.get('port') ,()=>resolve(`--> Port ${ app.get('port') } listening!!!`) );
});		