var U = require('./user'),
    version = require('./version')(),

    Nick = new U.createUser('Nicholas'),
    Alex = new U.createUser('Alexander');

Nick.hello(Alex);

console.log(version.current);
