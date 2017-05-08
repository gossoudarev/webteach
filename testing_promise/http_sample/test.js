/*jshint esversion: 6 */
/*jshint laxcomma: true */

//import https from 'https';
const
     https = require('https')
   , should = require('should')
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

  
describe('#get 1', ()=> {
  it('return 10', ()=>
     req1(0, url1a).should.eventually.be.exactly(10)
  );
});


describe('#get 2', ()=> {
  it('return 30', ()=>
     req1(10, url1b).should.eventually.be.exactly(30)
  );
});

//failure
describe('#get 3a', ()=> {
  it('return 7215ee9c7d9dc229d2921a40e899ec5f', ()=>
     req2( '%20', url2 ).should.eventually.be.exactly('7215ee9c7d9dc229d2921a40e899ec5f')
  );
});

//ok
describe('#get 3b', ()=> {
  it('return 7215ee9c7d9dc229d2921a40e899ec5f', ()=>
     req2('%20', url2 ).should.eventually.have
         .property('md5','7215ee9c7d9dc229d2921a40e899ec5f')
  );
});

describe('#post 4', ()=> {
  it('return 7215ee9c7d9dc229d2921a40e899ec5f', ()=>
     req3({src: ' '}, url2 ).should.eventually.have
         .property('md5','7215ee9c7d9dc229d2921a40e899ec5f')
  );
});

describe('#post 5', ()=> {
  it('return c65fd113c5b2977fe36bd41da8a9da67', ()=>
     req3({src: 'Elias'}, url2 ).should.eventually.have
         .property('md5','c65fd113c5b2977fe36bd41da8a9da67')
  );
});





