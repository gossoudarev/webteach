/*jshint esversion: 6 */
/*jshint -W058 */

const     PORT = 5555;
let	   express = require('express'),
          app = express(),
          path = require('path'),

          http = require('http').Server(app),
          io   = require('socket.io')(http), 
         
		  routers = {
		  		"/other": "./routes/other/", 
		  		"/users": "./routes/users/"
		  		},
          
	      handlebars = require('express-handlebars')
	       .create({ defaultLayout: 'main',
		      helpers: {
		  	section:function(name,options){
	  		    if(!this._sections) this._sections = {};
	  		    this._sections[name] = options.fn(this);
	  		    return null;
	 		}
		    }
	      });	
	    	    

     
module.exports = (()=>{
   function inner(){
      this.start = whatToDo=>{
		  app
		     .engine('handlebars', handlebars.engine)
		     .set('view engine', 'handlebars')    
			 .use(require('body-parser').urlencoded({extended: true}))
			 .use(require('morgan')('combined'))
		     .use(express.static(path.join(__dirname, 'public')))
		     .use((req, res, next)=>next());


		  for( let router in routers) {
		     /* attention: we pass to the wrapped module the entire luggage throuh 'options'  */
		  	app
		  		.use(router,   require( routers[router] )( {app, io, router: require('express').Router()} ) );
		  }    

          app
		     .get('/', (req,res)=>{
		    	 res.render('root', {text: 'WELCOME HOME!!!'});
		  })

   		  .get('/api', (req, res) => {
			     res
			       .set({'Access-Control-Allow-Origin': '*', 'elias': 'goss'}) 
   			    .json({'gossApi':'started ok!'});
   	   }) 
   		  
   		   .get('/:smth/', (req, res) => {
   			  res.render('root', {text: `You attempted route ${req.params.smth}`});
   			 
   	   }) 


		     .use((req, res, next) => {
			    res.status(404).render('404',{text: req.url});
		  })
		     .use((err, req, res, next) => {
			    res.status(500).send(`<h1 style="color:orange">Something went wrong ${err}</h1>`);
		  }) 
		  
		     .set('port',  process.env.port||PORT );
		     
		  /* this thing is socket.io specific  */   		  
		     http.listen( app.get('port') ,()=>console.log(`--> Port ${ app.get('port') } listening!!!`));
      };   
    }
  return new inner;
})();