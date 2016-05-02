const PORT = 5556;
var	  express = require('express'),
      app = express(),
	  q = require('./mysqlconn');
     
module.exports = (()=>{
   function inner(){
      this.start = whatToDo=>{
		  app.use(express.static(__dirname + '/public'))
		     .use((req, res, next)=>next()); //univers m/w
   		  app.get('/', (req, res) => {
   			    res.send('<h1>Welcome to Express!</h1>');
   			    //res.sendFile(__dirname + '/index.html');  or res.redirect('/index.html');
   		  }); 
		  		  
		  
		  app.get('/search/:key', (req, res) => {
			  	var key = req.params.key,	
			        myQuery1 = "SELECT `key` FROM  `html1` WHERE `key` LIKE  '%" + key + "%'";
			  	q.querySelect( myQuery1,   (err, x)=>{
			  			//эта коллбэк-функция вызывается там, в недрах q
			  			//когда готов результат из БД
			  		if (err === null) {
			  			res.json(x);		
			  		} else {
			  			res.json(err); 			
			  		}
			  	});			
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