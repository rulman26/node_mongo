var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rulm@n94312426",
  database: "mydb",
  "port":3306,
  multipleStatemensts:true
});

/*
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))", function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});
*/
/*
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("select *from customers", function (err, result,fields) {
        if (err) throw err;
            console.log(fields)
    });
});

*/

con.query("select *from customers where name=?",['Rulman'], function (err, result) {    
    if (!err){
        console.log(result)
    }else{
        console.log("err")        
        console.log(err.sqlMessage)
    }
});

