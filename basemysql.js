const mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Rulm@n94312426",
    database: "smart",
    port:"3306",
    multipleStatemensts:true
});

exports.con=con;