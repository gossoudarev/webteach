var PORT = 8888;
var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

module.exports = (function(){
   function inner(){
      this.start = function (whatToDo){
		  
		  
	      app.get('/chat/', function(req, res){
	            res.sendFile(__dirname + '/chat.html');
	      });

		   io.on('connection', function(socket){
		      console.log('a user connected!');
		      socket.broadcast.emit('chat message push', '>> a user connected '); //для всех кроме подключившегося
		      socket.emit('chat message push', 'Welcome to Ilia Goss chat!'); //только подключившемуся

		      //обработчик события, посланного клиентом
		      socket.on('chat message', function(msg){
		            console.log('message: ' + msg);
		            //отправка уведомления клиентам
		            socket.broadcast.emit('chat message push', msg);
		            socket.emit('chat message push', '<strong>me:</strong> ' + msg );

		      });


		      socket.on('disconnect', function(){
		         console.log('a user disconnected!');
		         socket.broadcast.emit('chat message push', '>> a user disconnected ');

		      })
		   })




		   app.get('/aboutchat/', function(req, res){
		     res.send('<h1 style=\'color:blue\'>&copy;2014 Goss</h1>');
		   });

		   http.listen(PORT, function(){
		     console.log('listening on *:' + PORT);
		   });

      };   
    }
  return new inner;
})();