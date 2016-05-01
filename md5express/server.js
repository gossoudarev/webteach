const PORT = 5555;
var	  express = require('express'),
	  app = express(),
	  md5 = require('md5'),
      bodyParser = require('body-parser');
     
module.exports = (()=>{
   function inner(){
      this.start = whatToDo=>{
		  app.use ( bodyParser.json() )
		     .use ( bodyParser.urlencoded({ extended: true}) );

		  var info = {};

		  //функция-слушатель для универсального middleware
		  function all(req, res, next){
	
			  	var start = +new Date();
	
			  	res.on('finish', function(){
			  		info.url = req.url;
			  		info.method = req.method;
			  		info.duration = +new Date() - start;
			  	})
	
			  	next();
		  }
		  //универсальный middleware
		  app.use('/*', all);  // или просто app.use(all)

		  //endpoint - когда есть send, прекращается цепочка middleware
		  app.get('/', (req, res) => {
		  	/*
		  	   res.set({'Access-Control-Allow-Origin': '*', 'elias': 'goss'});
		  	*/
		  	res.sendFile(__dirname +'/public/page.html');
		  });


		  app.use(express.static(__dirname + '/public'));

		  //middleware
		  app.use('/md5/', (req, res, next)=>{
		        //в зависимости от того, каким методом посылалось..
				//если GET, то используется query, а не params
				//при желании можно добавить посылку /md5/:what    
			  	req.what = req.method=='POST' ? req.body : req.query;
	
			  	if (!req.what.src) {
			  		req.emptySrc=true; 
			  	} else {
			  		req.emptySrc=false;
			  	}
			  	next();	
		  });

		  app.all('/md5/', (req, res)=>{
	
			  	console.log(info);
	
			  	if (req.emptySrc) {				
			  		res.json(     {'md5':'I don\'t  like empty strings!',
			  					   'info' : info,
			  					   'by' : 'goss'
			  	    } );
			  	} else {
			  		res.json(     {'md5':md5(req.what.src),
			  					   'info' : info,
			  					   'by' : 'goss'	 				  
			  	    } );
			  	}
	
	
    
		  });

		  app.listen(process.env.port||PORT,()=>console.log('--> Port %d listening!',PORT));
      };   
    }
  return new inner;
})();









 