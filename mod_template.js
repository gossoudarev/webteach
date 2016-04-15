//var X      = require('X');

module.exports = (function(){
   function inner(){
      this.start = function (whatToDo){
           //...
		   
      };   
    }
  return new inner;
})();

/*
usage:

var myMod = require('./mod_template');
myMod.start(function(){
  //...
});

*/
