var express = require('express'), 
	app = express(),
	http = require('http'),
	socketIO = require('socket.io'),
	fs = require('fs'),
	path = require('path'),
	server, io;
	
app.get('/', function(req, res){
		res.sendFile(__dirname + '/index.html');
	});

server = http.Server(app);
server.listen(5000);

io = socketIO(server);
io.on("connection", function(socket){	
	socket.on('voice', function(blob) {
    // can choose to broadcast it to whoever you want
    socket.broadcast.emit('voice', blob);
});
});