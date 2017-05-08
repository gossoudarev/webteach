/*jshint esversion: 6 */
/*jshint laxcomma: true */

//import https from 'https';
const
     https = require('https')
   , url1a = `https://kodaktor.ru/g/35437a9`
   , url1b = `https://kodaktor.ru/g/35437a9_32beb`
   , url2 = `https://kodaktor.ru/api/md5/`
   ;
   
const req1 = (value,url) => new Promise( (resolve, reject)=>{
   	 	 let data=[];
   		 https.get(url, res=>{
       		 res.on(`data`, d=>data.push(d));
        	 res.on(`end`, ()=>{
           		 resolve(value+Number(data.join('')));
        	 });
   		 });
})

    , req2 = (value,url) => new Promise( (resolve, reject)=>{
    	 let data=[];
   		 https.get(url+value, res=>{
        	res.on(`data`, d=>data.push(d));
        	res.on(`end`, ()=>{
           		 resolve(JSON.parse(data.join('')));
       		 });
         });
})

    , req3 = (value,url) => new Promise( (resolve, reject)=>{
    	 let data=[]
    	   , postData = require('querystring').stringify(value)
    	   , options = {
    	       hostname: "kodaktor.ru",
    	       path: "/api/md5/",
    	       method: "POST",
    	       headers: {
    	        	     'Content-Type': 'application/x-www-form-urlencoded',
    	        	     'Content-Length': Buffer.byteLength(postData),
    	        	     'Ilya' : 'Goss'
    	            	 } 	
    	   }
   		   , req = https.request(options, res=>{
          		res.on(`data`, d=>data.push(d));
        		res.on(`end`, ()=>{
           			 resolve(JSON.parse(data.join('')));
       		 	});
   		   });
   		   req.write(postData);
   		   req.end();
});


/*
req1(0, url1a)
  .then( x=>req(x, url1b)  )
  .then( x=> console.log(x) )
  ;
*/
  
(async ()=>{
    console.log('***');
    const first = await req1(0, url1a);
    console.log( await req1(first, url1b) );  //30

    console.log('************* GET  ***************');
    // %20  should give 7215ee9c7d9dc229d2921a40e899ec5f
    const res2 = await req2('%20',url2) ;
    console.log(res2.md5);

    console.log('************* POST ***************');
    const res3 = await req3({src:' '},url2) ;
    console.log(res3.md5);
})();












