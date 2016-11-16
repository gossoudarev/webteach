/*jshint esversion: 6 */
/*jshint -W058 */

const PORT = 5555;
var	  express = require('express'),
      app = express(),

      http = require('http').Server(app),
          io = require('socket.io')(http);
          
     
module.exports = (()=>{
   function inner(){
      this.start = whatToDo=>{
		  app
		     .use(express.static(__dirname + '/public'))
		     .use((req, res, next)=>next())
   		  .get('/', (req, res) => {
   			  res.send('<h1>Welcome to Express!</h1>');
   		  }); 


             io.on('connection', socket=>{
                  console.log('a user connected!');
                      
                      socket.broadcast.emit('chat message push', '>> a user connected '); 
//everyone except the new one
                      socket.emit('chat message push', 'Welcome to Ilia Goss chat!'); 
//only the newcomer

                  //message from client - recast to others
                 socket.on('chat message', msg=>{
                     console.log(`message: ${msg}`);
                     socket.broadcast.emit('chat message push', msg);
                     socket.emit('chat message push', `<strong>me:</strong>  ${msg}` );
                 });
                 socket.on('disconnect', ()=>{
                   console.log('a user disconnected!');
                   socket.broadcast.emit('chat message push', '>> a user disconnected ');
                 });                      
          });


          app

            .get('/chat', (req, res)=>{
          	res.redirect('/page.html');
          	
      	  }) 
		  
		     .set('port',  process.env.port||PORT );
		     		  
		  http.listen( app.get('port') ,()=>console.log(`--> Port ${ app.get('port') } listening!!!`));
      };   
    }
  return new inner;
})();




