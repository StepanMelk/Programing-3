var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var messages = [];

app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000);

io.on('connection', function (socket) {
    socket.on("send static", function (data) {
        io.sockets.emit("display message", data);
        console.log(data)
        main(data)
    });
 });

 var fs = require('fs');

 function main(statistic) {
     const object = JSON.stringify(statistic)
    fs.writeFileSync("index.json", object)     
 }
 
