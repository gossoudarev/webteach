const BD = './bd';
var   mysql = require('mysql'),
	  conn = mysql.createConnection( require(BD) );
module.exports = (()=>{ 
	function inner(){
		this.querySelect =  (myQuery, whatToDo)=>{
	    	var     resArr,
		            key = 'jq',
		  			myQuery1 = "SELECT `key` FROM  `html1` WHERE `key` LIKE  '%" + key + "%'";
			myQuery = myQuery || myQuery1; //запрос по умолчанию

			conn.query(myQuery, (err,rows)=>{
				try {
					if (err) throw err;
					resArr = Object.keys(rows).map(i=>rows[i].key);	
					whatToDo(null, resArr);	
					//это вызов функции, к-рая будет передана в querySelect из server.js
					//она должна иметь форм. парам., куда попадёт рез-т из БД - resArr	     
				} 
				catch (e) {
					//это например если сервер БД отключён
					//это точно работает, а conn.connect(...) - не работает
					conn 	   = mysql.createConnection(  require(BD)   );
					whatToDo(e, null);
				}
			}); 
		}; 
	}
return new inner; })();