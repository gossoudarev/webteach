/*jshint esversion: 6 */

/*
 POST /users/  {login, password} - add                 curl -X POST localhost/users/ -d 'login=mithrandir&password=gandalf'
 DELETE /users/:login - remove                         curl -X DELETE localhost/users/galadriellady
 GET /users/:login - find this user, otherwise 404
 GET /users/  - list all the users
 GET /users/raw - give us raw json
*/

let
    appDir = require('path').dirname(require.main.filename), 
    data = `${appDir}/data/users.json`,
    userData = require(data),
    
    j = require('jsonfile'),
    _ = require('lodash');

module.exports = options => {

    //this is called at the beginning, at adding and at removal!
    let updateList = ()=>{	
              options.io.on('connection', socket=>{	
	                     socket.broadcast.emit('users_modify', userData);
	                     socket.emit('users_modify', userData );
	          });	
    };

    //call first time - initialize. Instead of jQuery $(()=>{})
    updateList();

    options.router
      .route('/')
            .get( (req, res) => {
	            //res.render('userslist', {"text": "List of all users", "users": userData.users});
	            res.render('userlistclientsocket', {"text": "This is client-side socket-based rendering!"});
            })
            .post( (req, res) => {
				userData.users.push ( {"login":req.body.login, "password":req.body.password  }  );
				j.writeFile(data, userData, err=>{
					if (err) throw(err);
					res.send(`You added login ${req.body.login} and password ${req.body.password} `);
				});

                updateList();

						             	
            });

    options.router
	  .route('/raw')
			.get( (req,res) =>{
 			   res.json(userData);
			 });

    options.router
	  .route('/:login')
	  		.delete( (req, res ) => {
				  if (userData.users.length > 3 ) {
               
	   			 let removed = _.remove(userData.users, function(u){
	   	 			return u.login == req.params.login; 					
	    			});
	  			  j.writeFile(data, userData, err=>{
	    				if (err) throw(err);
	    		        res.send(`You removed login ${req.body.login} and password ${req.body.password} `);
	    		    });
	    		    updateList();
	    		   } else {
	    		   	res.send('<h1>You cannot remove users any more!</h1>');
	    		   } 		  	  			
	  		} )
 			 .get ( (req, res ) => {
				  let p = _.result(_.find( userData.users, { 'login': req.params.login }), 'password');
 			     if (p) {
 			     	res.render('root', {text: `User with login ${req.params.login} has password ${p}!` });
 			     } else {
 			     	res.render('404', { text: `User with login ${req.params.login} does not exist!`   } );
 			     }
 			 });
    return options.router;
};