const PORT = 8886;
var	  express = require('express'),
	  app = express(),
      request = require('request'),
      url = require('url'),
	  multer  =   require('multer');
module.exports = (()=>{
   function inner(){
       this.start = whatToDo=>{
 		  app.use(express.static(__dirname + '/public'))
	         .use((req, res, next)=>next()); 
 		  app.get('/', (req, res) => {
		      //take client part from kodaktor
		      request(url.format({protocol:'http',host:'kodaktor.ru',pathname: '/g/upload_ajax'})).pipe(res);
	      });
  
		  var storage =   multer.diskStorage({
		    destination:  (req, file, callback) => callback(null, './uploads'),
		    filename:  (req, file, callback) => {
				console.log(file.originalname); 
				callback(null, file.fieldname + '-' + Date.now());   
		    }
		  });
		  var upload = multer({ storage : storage}).single('fileUploaded');   
          //<input type='file' name='fileUploaded'>  or  data.append('fileUploaded', file, file.name);
 
		  //route to accepting files
		  app.post('/api/fileupload',(req,res)=>{
			  res.set({'Access-Control-Allow-Origin': '*', 'elias': 'goss'});
			  //without the header we can upload, but cannot get response
			  
		      upload( req, res, err=>(err)?res.end('Error uploading file'):res.end('File well uploaded'));
		  });


		  app.listen(process.env.port||PORT,()=>console.log('--> Port %d listening!',PORT));
      };   
    }
  return new inner;
})();