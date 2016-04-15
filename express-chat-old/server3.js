var PORT = 3333;
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

function start(){
   app.get('/chat/', function(req, res){
     res.sendfile('chat.html');
   });

   io.on('connection', function(socket){
      console.log('a user connected!');

      //обработчик события, посланного клиентом
      socket.on('chat message', function(msg){
            console.log('message: ' + msg);
            //отправка уведомления клиентам
            io.emit('chat message push', msg);
      });


      socket.on('disconnect', function(){
         console.log('a user disconnected!');
      })
   })




   app.get('/aboutchat/', function(req, res){
     res.send('<h1 style=\'color:blue\'>&copy;2014 Goss</h1>');
   });

   http.listen(PORT, function(){
     console.log('listening on *:' + PORT);
   });

}

exports.start = start;