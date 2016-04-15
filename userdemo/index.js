var U = require('./user');
var version = require('./version')();

var Nick = new U.createUser('Nicholas');
var Alex = new U.createUser('Alexander');

Nick.hello(Alex);

console.log(version.current);
