const PORT = 5544;
var	  express = require('express'),
      app = express(),
      request = require('request'),
      url = require('url'),
	  session = require('express-session'),
      bodyParser = require('body-parser'),
	  u = require('./users');
	  
// client form (NON-ajax) post http://kodaktor.ru/g/session_post	  
     
module.exports = (()=>{
   function inner(){
      this.start = whatToDo=>{
		  let checkAuth = (req, res, next)=>{
			 //for all the private routes 
		  	 if (req.session.auth) {
		  		next();  //go to profile only after check
		  	 } else {
		  		console.log('Unath. access attempt!')
		  		res.redirect('/login');
			 }
		  };
		  let logOut = x=> '<a href="/logout">' + x + '</a>';
		  
		  app.use(express.static(__dirname + '/public'))
		     .use((req, res, next)=>next())
		     .use ( bodyParser.json() )
		     .use ( bodyParser.urlencoded({ extended: true}) )
		     .use(session({ secret: 'mydirtysecret', 	resave: true, 	saveUninitialized: true }));
		  
   		  app.get('/', (req, res) => {
   			  res.redirect('/login');
   		  })
		     .get('/login', (req, res) => {  //form for post	 
   			  request(url.format({protocol:'http',host:'kodaktor.ru',pathname: '/g/session_post'})).pipe(res);
   		  }) 
		     .post('/login/check', (req, res)=>{
			 //1. find login in 'u' which represents DB through users.json
			 if (req.body.login in u) {
				//2. check password
				if (u[req.body.login] === req.body.pass) {
					req.session.auth = true;
					req.session.login = req.body.login;
					console.log('SUCCESS');
					res.redirect('/profile'); //do authorization
				} else {
					console.log('wrong password');
					res.redirect('/login');  //bad pass - back to form!
				};
			 } else {
				console.log('no such user');
				res.redirect('/login');  //no such user - back to form!
			 };		
		  })
	         .get('/logout', (req, res)=>{
			 req.session.auth = false;	 
	  	     res.send('<h1>You are logged out, ' + req.session.login + '</h1>');
	      })		  
		     .get('/profile', checkAuth, (req, res)=>{
		     console.log ('Private area... '   );	
			 res.send('<h1>Welcome to your profile, ' + req.session.login + '</h1>' + logOut('Log out now'));
			  
		  })
	        .use((req, res, next)=>{
	         res.status(404).send('<h2>Not yet here, pardon!</h2>');
	      });

		  		  
		  app.listen(process.env.port||PORT,()=>console.log('--> Port %d listening!',PORT));
      };   
    }
  return new inner;
})();



