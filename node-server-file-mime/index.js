/*jshint esversion: 6 */
/*jshint laxcomma: true */

const  PORT = 4444
   ,   http = require('http')
   ,   fs = require('fs')
   ,   mime = require('mime')
   ,   path = require('path')
   ,   cache = {}


   , send404 = res=> {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('Error 404: resource not found.');
      res.end();
   }

   , sendFile = (res, filePath, fileContents)=> {
      res.writeHead(
        200, 
       {"content-type": mime.lookup(path.basename(filePath))}
     );
     res.end(fileContents);
   }

   , serveStaticFile = (res, cache, absPath)=>{
     if (cache[absPath]) {
       sendFile(res, absPath, cache[absPath]);
     } else {
       fs.exists(absPath, exists=> {
         if (exists) {
           fs.readFile(absPath, (err, data)=> {
             if (err) {
               send404(res);
             } else {
               cache[absPath] = data;
               sendFile(res, absPath, data);
             }
           });
         } else {
           send404(res);
         }
       });
     }
};				  
				  
http.createServer((req, res)=>{
			  const filePath = (req.url === '/') ? `./index.html` : `./${req.url}`;
		  	  // needle = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
			  serveStaticFile(res, cache ,filePath); 
		  }).listen(process.env.PORT || PORT,()=>
		  	  console.log(`--> Port ${  process.env.PORT || PORT  } listening!`)
);