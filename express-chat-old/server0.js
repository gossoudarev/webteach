var PORT = 3333;
var app = require('express')();
var http = require('http').Server(app);

app.get('/chat/', function(req, res){
  res.send('<h1 style=\'color:red\'>Hello world</h1>');
});

app.get('/aboutchat/', function(req, res){
  res.send('<h1 style=\'color:blue\'>&copy;2014 Goss</h1>');
});


http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});
