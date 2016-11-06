/*jshint esversion: 6 */
let Router = require('express').Router();

Router
	.get('/', (req,res)=>{
		res.send(`Welcome to route ${req.url}!`);
	})   /*  localhost/my/ */
	.route('/:param')
	  .all((req,res,next)=>{
		  console.log(`LOG: You sent ${req.method} with parameter ${req.params.param}!`);
		  next();
	  })
	  .get((req,res)=>{
		  res.send(`<h1>You sent GET with parameter ${req.params.param}!</h1>`); 
	  })  /*  GET localhost/my/ilya */
	  .post((req,res)=>{
	  	  res.send(`<h1>You sent POST with parameter ${req.params.param}!</h1>`);
	  });


module.exports = Router;