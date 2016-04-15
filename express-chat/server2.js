var PORT = 8888;
var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

module.exports = (function(){
   function inner(){
      this.start = function (whatToDo){
           
		   
		  app.get('/page', function(req, res){
			  res.send('<h1>Привет оно работает!</h1>');
		  });
		   
		  io.on('connection', function(socket){
		      console.log('a user connected!');
		      socket.on('disconnect', function(){
		         	console.log('a user disconnected!');
		      });
		   });
		   
		   
		   
		   
		  // подводит итог всему запуск слушания цикла запросов
		  app.listen(process.env.port || PORT, function(){
		  	console.log(PORT)
		  });  
      };   
    }
  return new inner;
})();