//крокфордовская функция
function eXtends(childO, parentO){		
	    //child0 и parent0 - это классы, т.е. функции, которые
		//после eXtends будут вызываться с new
		var inner = function(){};			 
		inner.prototype = parentO.prototype;     
		childO.prototype = new inner;	       
		childO.prototype.constructor = childO;
		childO.superclass = parentO.prototype;    
}
//класс, который станет родителем
function O1(){
	this.a = 'aaa'; this.b = 'bbb'
}
//назначаем его прототипу функцию, перечисляющую значения его собственных свойств
O1.prototype.x = function(){var t='';for(k in this){if(this.hasOwnProperty(k))t+=this[k]+' '};return t};

//класс, который станет потомком
function O2(){
	this.c = 'ccc'; this.d = 'ddd'; 
};
//назначаем
eXtends(O2, O1);
var o1 = new O1(), o2 = new O2();

//метод x виден у родителя и у потомка
console.log( o1.x() );
console.log( o2.x() );

//наследуется ТОЛЬКО то, что было определено в prototype у будущего родителя
 
















