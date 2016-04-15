// ~/Dropbox/docs1111111/node/mysql-3-sessions/mysql4.js

var mysql      = require('mysql'),
    conn 	   = mysql.createConnection(  require('./bd.json')   );

module.exports = (function(){
   function inner(){
      this.querySelect = function (myQuery, whatToDo){
		    //в переменную whatToDo должна быть передана функция
		    //которая сработает когда будет готов результат
		    //работы функции, зависящей от БД (см. строка 35)
		    var     resArr,
		            key = 'jq',
		  			myQuery1 = "SELECT `key` FROM  `html1` WHERE `key` LIKE  '%" + key + "%'";
			myQuery = myQuery || myQuery1; //запрос по умолчанию

			conn.query(myQuery, function(err,rows){
				 try {
					if (err) throw err;
					resArr = Object.keys(rows).map(function(i){
					  	  return rows[i].key;  //делаем массив  вида 											   											   //["jQuery","bubble_jq",...,"jqtoggle"]
					});	
					whatToDo(null, resArr);	
					//это вызов функция, к-рая будет передана в querySelect из index.js
					//она должна иметь форм. парам., куда попадёт рез-т из БД - resArr	     
				} 
				catch (e) {
					//это например если сервер БД отключён
					//это точно работает, а conn.connect(...) - не работает
					conn 	   = mysql.createConnection(  require('./bd.json')   );
					whatToDo(e, null);
				}
			}); 
      };   
 
	  this.version = function(what){
			return (what) ? 'latest' :  '2.0.0';
	  };
    }
  return new inner;
})();;