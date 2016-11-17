/*jshint esversion: 6 */

let  request = require('request'),

    resolveOuterRoute = (url) => new Promise(
	 (resolve, reject) => {
	    request(url, function (error, response, body) {
	  	if (!error && response.statusCode == 200) {
		      resolve(body); 
  		} else {
		      reject(error);
  		}
	    });
    });


module.exports = options => {

  options.router
      .get('/', (req, res) => {
          res.send('<h1>This is my root!</h1>');
  })
      .get('/about', (req, res) => {
          res.send('<h1>This is my about page!</h1>');
  })
      .route('/url/:url')
       /* http://localhost/other/url/http%3A%2F%2Fya.ru  */
          .get( (req,res)=>{             
	      	resolveOuterRoute(req.params.url)
		        .then( x=>res.set({'Content-Type': 'text/html; charset=utf-8'}).send( x )  )
		        .catch( e=> res.status(404).render('404', {text: 'Invalid URL'}) );
      });

  options.router
      .route('/pipe/:url')
          .get( (req,res)=>{
		      request(req.params.url).pipe(res);
      });



  return  options.router;
}; 
