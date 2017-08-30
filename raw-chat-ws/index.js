const s = require('ws').Server;
const clients = [];
(new s({
  port: 2222
}))
 .on('connection', ws=> {
   let id = Math.random();
   clients[id] = ws;
   console.log("новое соединение " + id);
   ws
    .on('message', message=> {
      console.log('получено сообщение ' + message);
      Object.values(clients).forEach(client => client.send(message));
	  if (message=='quit') {
	  	process.nextTick( ()=>{throw new Error('Quitting!');} );
	  }
   })
    .on('close', ()=>{
      console.log('соединение закрыто ' + id);
      delete clients[id];
   });
});
