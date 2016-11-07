/*    в самом низу  
app                  */
   .use((req, res, next) => {
	   res.status(404).send(`<h1 style="color:red">Not yet here! ${req.url}</h1>`); //res.render('404',...)
})
   .use((err, req, res, next) => {
	   res.status(500).send(`<h1 style="color:orange">Something went wrong ${err}</h1>`); //res.render('500',...)
}) 