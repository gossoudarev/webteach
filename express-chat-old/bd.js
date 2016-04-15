var sql = require('mssql');

var config = {
    user: 'gossouda_html',
    password: 'gosshtml',
    server: 'localhost',
    database: 'html'

}



var connection = new sql.Connection(config, function(err) {

    var request = new sql.Request(connection);;
    request.query(       "SELECT `key` FROM `html1` WHERE `id`='1762'"         , function(err, recordset) {
        // ... error checks

        //console.dir(recordset);
    });



});

