var express = require('express');
var app     = express();
var session = require('express-session');
var q       = require('./mysql4');
var u       = require('./users');
var morgan  = require("morgan");
var PORT 	= 3350;
//универсальный middleware
app.use('/*', function(req, res, next){
	next();
});
//обращение по умолчанию 
app.get('/', function(req, res) {
	res.redirect('/kodaktor/search/key');	
});

app.use(session({
	secret: 'mydirtysecret', 	resave: true, 	saveUninitialized: true
}));
app.use(morgan('common'));

app.get('/signin', function(req, res) {
	//в этом месте нужно сделать форму
	//хорошо бы передавать сюда обоснование, почему появляем - типа была попытка и нет такого юзера или пароль неверный
	res.send('heyß! тут будет форма для ввода пароля');	
});

function checkAuth(req, res, next){	
	//ещё нужно предусмотреть выход из сессии
	//для авторизации
	if (req.session.auth == 'ok') {
		next();  //переход к profile только когда проверили
	} else {
		console.log('Попытка несанкцион. доступа')
		res.redirect('/signin');
	}
}

//на страницу profile попадут только те, кто прошёл middleware checkAuth
app.get('/profile', checkAuth, function(req, res) {
	res.send('Welcome to your profile, ' + req.session.login);
});

// http://localhost:3337/auth/root/honeymilk

app.get('/auth/:login/:pass', function(req, res) {
	//здесь имитация
	//1. найти логин в БД
	if (req.params.login in u) {
		//2. проверить пароль
		if (u[req.params.login] == req.params.pass) {
			 
			req.session.auth = 'ok';
			req.session.login = req.params.login;
			res.redirect('/profile'); //авторизованы
		} else {
			console.log('wrong password');
			res.redirect('/signin');  //неверный пароль - снова в форму!
		};
	} else {
		console.log('no such user');
		res.redirect('/signin');  //нет такого пользователя - снова в форму!
	};		
});

app.get('/kodaktor/search/', function(req, res) {
	//пустой запрос
	res.json(     {'result':'I don\'t  like empty strings!',
				   'by' : 'goss'
	} );
});

app.get('/kodaktor/search/:key', function(req, res) {
	var key = req.params.key;
	res.set({
		'Access-Control-Allow-Origin': '*', 'By': 'Ilya Goss',
		'Content-Type': 'application/json'
	});
	
    var myQuery1 = "SELECT `key` FROM  `html1` WHERE `key` LIKE  '%" + key + "%'";
	q.querySelect( myQuery1,   function(err, x){
			//эта коллбэк-функция вызывается там, в недрах Коннектора
			//когда готов результат из БД
		if (err === null) {
			res.json(x);		
		} else {
			res.json(err); 			
		}
	});			
});

app.listen(process.env.port || PORT, function(){
	console.log(PORT)
}); 