const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = express.Router();
var db = require('./basemysql');
const app = express();
//Conecion ala Base de Datos
/*Aqui usaremos de frende el con si importamos sera db.con
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "solera",
    port:"3306",
    multipleStatemensts:true
});*/

//Confuguracion de los Metotos aceptador y origenes desconosidos
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

//Configuracion de Rutas.
router.get('/index',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

//configuracion para que sea accedido desde cualquier dominio.
app.use(allowCrossDomain);

//configuracion del Puerto
app.set('port',process.env.PORT || 3000);
app.use('/public', router);
//Ruta sera http://localhost:3000/public/index
// Middlewares
app.use(morgan('dev'));
app.use(express.json());
//Levanta el servidor en el puerto 3000
const server=app.listen(app.get('port'),()=>{
	console.log("Server Puerto",app.get('port'));
});

/*
http://localhost:3000/personas
*/
app.get('/personas', function (req, res) { 
    let sql="SELECT * FROM  personas";	
    db.con.query(sql, function (err, result) {
        console.log(result)
      if (err) throw err;    
      res.send(JSON.stringify(result));
    });
});
/*GET CON ID
http://localhost:3000/personas/1
*/
app.get('/personas/:id', function (req, res) { 
    let sql="SELECT * FROM  personas WHERE id=?";	
    id=req.params.id;    
    db.con.query(sql,[id], function (err, result) {        
      if (err) throw err;
      res.send(JSON.stringify(result));
    });
});
/*POST
http://localhost:3000/personas
{
	"nombre":"Sherly",
	"apellidos":"Cerro"
}
*/
app.post('/personas', function (req, res) {     
    let dataUser=req.body;   	
	let sql="INSERT INTO personas values(default,?,?)";
	let data=[dataUser.nombre,dataUser.apellidos];
	db.con.query(sql,data,function (err, result) {			        
        var mensaje={};
        if (!err){
            mensaje['status']=true;				
            mensaje['mgs']="Persona registrada Correctamente";
            res.send(JSON.stringify(mensaje));
        }else{            
            mensaje['status']=false;				
            mensaje['mgs']=err.sqlMessage;
            res.send(JSON.stringify(mensaje));
        }
	});
});
/*PUT
http://localhost:3000/personas
{
	"id":1,
	"nombre":"Sherly",
	"apellidos":"Cerro"
}
*/
app.put('/personas', function (req, res) {     
    let dataUser=req.body;
	let sql="UPDATE personas SET nombres=?,apellidos=? WHERE ID=?";
	let data=[dataUser.nombre,dataUser.apellidos,dataUser.id];
	db.con.query(sql,data,function (err, result) {			        
        var mensaje={};
        if (!err){
            mensaje['status']=true;				
            mensaje['mgs']="Persona Actualizado Correctamente";
            res.send(JSON.stringify(mensaje));
        }else{            
            mensaje['status']=false;				
            mensaje['mgs']=err.sqlMessage;
            res.send(JSON.stringify(mensaje));
        }
	});
});
/*DELETE
http://localhost:3000/personas
{
	"id":1
}
*/
app.delete('/personas', function (req, res) {     
    let dataUser=req.body;   	
	let sql="DELETE from personas WHERE ID=?";
	let data=[dataUser.id];
	db.con.query(sql,data,function (err, result) {			        
        var mensaje={};
        if (!err){
            mensaje['status']=true;				
            mensaje['mgs']="Persona Eliminada Correctamente";
            res.send(JSON.stringify(mensaje));
        }else{            
            mensaje['status']=false;				
            mensaje['mgs']=err.sqlMessage;
            res.send(JSON.stringify(mensaje));
        }
	});
});