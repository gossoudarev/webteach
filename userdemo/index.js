var U = require('./user');

var Nick = new U.createUser("Nicholas");
var Alex = new U.createUser("Alexander");

Nick.hello(Alex);
