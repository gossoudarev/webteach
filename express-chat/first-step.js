			io.on('connection', socket =>  console.log('a user connected!') );

			let  client = `<script src="/socket.io/socket.io.js"></script><h1>Chat web-client!</h1>
						   <script>var socket = io();</script>`;

			app.get('/chat', (req, res) => {
					res.set({'Access-Control-Allow-Origin': '*', 'elias': 'goss'}); 
					res.send(client);
			}); 