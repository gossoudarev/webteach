//19-03-2016 11:30 - 13:05 II курс
var express = require('express');
var app = express();
var md5 = require('md5');

var bodyParser = require('body-parser');
app.use ( bodyParser.json()   );
app.use ( bodyParser.urlencoded({
	extended: true
}));

var info = {};

//можно посылать заголовка res.set('Access-Control-Allow-Origin', '*');

//функция-слушатель для универсального middleware
function all(req, res, next){
	
	var start = +new Date();
	
	res.on('finish', function(){
		info.url = req.url;
		info.method = req.method;
		info.duration = +new Date() - start;
	})
	

	
	next();
}
//универсальный middleware
app.use('/*', all);


//endpoint - когда есть send, прекращается цепочка middleware
app.get('/', function(req, res) {
	/*
	res.writeHead(200, { 
					"Access-Control-Allow-Origin": "*"});
	*/
	res.sendFile(__dirname +'/public/page.html');
});


app.use(express.static(__dirname + '/public'));

//middleware
app.use('/stas/', function(req, res, next) {
	
	req.what = req.method=='POST' ? req.body : req.query;
	
	if (!req.what.src) {
		req.emptySrc=true; 
	} else {
		req.emptySrc=false;
	}
	next();	
  
});

app.all('/stas/', function(req, res) {
	
	console.log(info);
	
	if (req.emptySrc) {
		/*
		res.writeHead(200, {"Content-Type": "application/json", 
					"By": "Ilya Goss", 
					"Access-Control-Allow-Origin": "*"});
		*/					
		res.json(     {'md5':'I don\'t  like empty strings!',
					   'info' : info,
					   'by' : 'goss'
	    } );
	} else {
		res.json(     {'md5':md5(req.what.src),
					   'info' : info,
					   'by' : 'goss'	 				  
	    } );
	}
	
	
    
});

app.listen(8888);




 