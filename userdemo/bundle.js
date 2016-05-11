(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var U = require('./user'),
    version = require('./version')(),
    Cur = require('./time'),
    Nick = new U.createUser('Nicholas'),
    Alex = new U.createUser('Alexander');

Nick.hello(Alex);
console.log('It is %s now', Cur.time());
console.log('The version is %s', version.current);

},{"./time":2,"./user":3,"./version":4}],2:[function(require,module,exports){
'use strict';

module.exports = function () {
	function inner() {
		this.time = function () {
			var today = new Date(),
			    MM = today.getMinutes(),
			    SS = today.getSeconds(),
			    HH = today.getHours();
			if (MM < 10) MM = '0' + MM;if (SS < 10) SS = '0' + SS;
			return HH + ':' + MM + ':' + SS;
		};
		this.date = function () {
			var today = new Date(),
			    dd = today.getDate();
			var mm = today.getMonth() + 1,
			    /*January is 0!*/
			yyyy = today.getFullYear();
			if (dd < 10) dd = '0' + dd;if (mm < 10) mm = '0' + mm;
			return dd + '.' + mm + '.' + yyyy;
		};
	}
	return new inner();
}();

/*
usage
var Cur = require('./time');
console.log(Cur.time());

kodaktor.ru/time
*/

},{}],3:[function(require,module,exports){
'use strict';

function User(name) {
  this.name = name;
}
User.prototype.hello = function (usr) {
  return console.log('Hello, %s!', usr.name);
};

module.exports.createUser = User;

},{}],4:[function(require,module,exports){
'use strict';

module.exports = function () {
  return { 'current': '1.0.0' };
};

},{}]},{},[1]);
