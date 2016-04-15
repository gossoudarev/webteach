var PORT = 8888;
var app = require('express').createServer();
var io = require('socket.io')(app);

module.exports = (function(){
   function inner(){
      this.start = function (whatToDo){
           
		   
		  app.get('/page', function(req, res){
			  res.send('<h1>Привет оно работает!</h1>');
		  });
		   
		   
		   
		   
		  // подводит итог всему запуск слушания цикла запросов
		  app.listen(process.env.port || PORT, function(){
		  	console.log(PORT)
		  });  
      };   
    }
  return new inner;
})();