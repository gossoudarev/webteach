const PORT = 8887;
var   express = require('express'),
      app = express(),
      md5 = require('md5');   
module.exports=(()=>{
   function inner(){
      this.start=whatToDo=>
          app.use((req, res, next)=>{console.log('universal!');})
             .get('/',(req,res)=>res.send('<h1>Hey my dear world!</h1>'))
             .get('/md5/:what',(req,res)=>res.json({'md5':md5(req.params.what)}))
             .listen(process.env.port||PORT,()=>console.log('--> Port %d listening!',PORT));  
   }
   return new inner;
})();
