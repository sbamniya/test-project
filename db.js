var mySQL = require('mysql');
var pool  = mySQL.createPool({
    host:  '127.0.0.1',//Your Host
    user:'root',//your database username
    password:'root',// database password
    database:'test_ng'// database name
});
module.exports = pool;