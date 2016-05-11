var U = require('./user'),
    version = require('./version')(),
    Cur = require('./time'),

    Nick = new U.createUser('Nicholas'),
    Alex = new U.createUser('Alexander');

Nick.hello(Alex);
console.log('It is %s now', Cur.time());
console.log('The version is %s', version.current);
