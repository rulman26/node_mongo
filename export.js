var http = require('http');
var dt = require('./modulo');
var fs = require('fs');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("Suma Flecha ::> "+dt.sumaFecla(5,5))
  res.write("Suman ::>"+dt.suma(5,5))
  res.end('Hello World!');
  console.log(req.url)
}).listen(8080);