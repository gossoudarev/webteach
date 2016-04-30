var PORT = 8887,
    express = require('express'),
    app = express(),
    md5 = require('md5');   
module.exports = (()=>{
   function inner(){
      this.start = (whatToDo)=>{
          app.use('/*', (req, res, next)=>{console.log('universal!');});
          app.get('/',(req,res)=>res.send('<h1>Hello dear world!</h1>'));
          app.get('/md5/:what',(req,res)=>res.json({'md5':md5(req.params.what)}));
          app.listen(process.env.port||PORT,()=>console.log(PORT));
      };   
    }
  return new inner;
})();
