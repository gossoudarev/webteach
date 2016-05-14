module.exports = (()=>{ 
	function inner(){
		this.time = function (){
	        var today = new Date(),
	            MM = today.getMinutes(), SS = today.getSeconds(), HH = today.getHours(); 
	        if(MM<10)  MM='0'+MM;  if(SS<10)  SS='0'+SS;   
	        return   HH+':'+MM+':'+SS;
		};
		this.date = function (){
	        var today = new Date(),
	            dd = today.getDate();
	        var mm = today.getMonth()+1, /*January is 0!*/
	            yyyy = today.getFullYear(); 
	        if(dd<10)  dd='0'+dd;  if(mm<10)  mm='0'+mm;    
	        return     dd+'.'+mm+'.'+yyyy;
		}; 
	}
return new inner; })();

/*
usage
var Cur = require('./time');
console.log(Cur.time());

kodaktor.ru/time
*/