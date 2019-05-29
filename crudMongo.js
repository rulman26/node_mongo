const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = express.Router();
const app = express();
//Conecion ala Base de Datos

var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

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
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("smart");
        dbo.collection("personas").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});

/*GET CON ID
http://localhost:3000/personas/1
*/
app.get('/personas/:id', function (req, res) { 
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("smart");
        id=req.params.id; 
        dbo.collection("personas").find({id:id}).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});
/*POST
http://localhost:3000/personas
{
    "id":"230",
	"nombre":"Sherly",
	"apellidos":"Cerro"
}
*/
app.post('/personas', function (req, res) {          	
	MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("smart");
        var myobj = req.body;
        dbo.collection("personas").insertOne(myobj, function(err, result) {            
            var mensaje={};
            if (!err){
                mensaje['status']=true;				
                mensaje['mgs']="Persona registrada Correctamente";
                res.send(JSON.stringify(mensaje));
            }else{            
                mensaje['status']=false;				
                mensaje['mgs']="Se produjo un error";
                res.send(JSON.stringify(mensaje));
            }
            db.close();
        });
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
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dataUser=req.body;
        console.log(dataUser)
        var dbo = db.db("smart");
        var myquery = { id: dataUser.id };
        var newvalues = { $set: {nombre:  dataUser.nombre, apellidos:dataUser.apellidos  } };
        dbo.collection("personas").updateOne(myquery, newvalues, function(err, result) {            
            var mensaje={};
            if (!err){
                mensaje['status']=true;				
                mensaje['mgs']="Persona Actualizada Correctamente";
                res.send(JSON.stringify(mensaje));
            }else{            
                mensaje['status']=false;				
                mensaje['mgs']="Se produjo un error";
                res.send(JSON.stringify(mensaje));
            }
            db.close();          
        });
    });
});

/*DELETE
http://localhost:3000/personas
{
	"id":1
}
*/
app.delete('/personas', function (req, res) {     
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("smart");
        let dataUser=req.body;
        var myquery = { id:dataUser.id  };
        dbo.collection("personas").deleteOne(myquery, function(err, result) {
            var mensaje={};
            if (!err){
                mensaje['status']=true;				
                mensaje['mgs']="Persona Eliminada Correctamente";
                res.send(JSON.stringify(mensaje));
            }else{            
                mensaje['status']=false;				
                mensaje['mgs']="Se produjo un error";
                res.send(JSON.stringify(mensaje));
            }
            db.close();  
        });
    });
});