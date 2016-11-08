**********     npm i -S express-handlebars    ****** 
server.js
=========
var	  ...
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
	    	    
   ...
   ...
		  app
		     .engine('handlebars', handlebars.engine)
		     .set('view engine', 'handlebars')    
   ...	

  		     .get('/:smth/', (req, res) => {
   			  res.render('root', {text: req.params.smth});
   			 
   		  }) 
   ...

	
/views/layouts/main.handlebars
==========  (см. create, defaultLayout)

		<!DOCTYPE html>
		<html>
		 <head>
		  {{{_sections.head}}}
		 </head>
		 <body>
		  {{{body}}}
		 </body>
		</html>
		  
/views/root.handlebars
==========  (см. render ('root') )		  
		  {{#section 'head'}}
		       <title>Root view for  {{text}}</title>
		       <meta charset="utf-8">
		  {{/section}}

		  <h1>Welcome!</h1>
		  <p>You are at {{text}} route</p>		  
		  