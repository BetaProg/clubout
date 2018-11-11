var express = require('express');
var app = express();
var server = require('http').Server(app);
var fs = require('fs');
var io = require('socket.io')(server);
var ss = require('socket.io-stream');

app.use(express.static(`${__dirname}/html`));

server.listen('5001');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index2.html');
});
app.get('/emitdata', function (req, res) {
  res.sendFile(__dirname + '/emitdata.html');
});
data2 = '';
// socket.on("timevalue", function(data){
	// data2 = data;
	// console.log('1');
	//io.sockets.emit("timevalue", data2);
// })
	
io.on('connection', function (socket) {
		
	socket.on("timevalue", function(data){
		data2 = data;
		console.log(data2);
		// io.sockets.emit("timevalue", data2);
	});
	
	socket.emit('start', { hello: 'world' });
	socket.on('stream', function (data) {
		console.log(data2);
		var stream = ss.createStream();
		var filename = __dirname + '/audio/musicfile.mp3' ;
		ss(socket).emit('audio-stream', stream, { name: filename }, data2);
		// fs.createReadStream(filename).pipe(stream);
		fs.createReadStream(filename, {start: 120}).pipe(stream);
		// const data2 = new Date();
		io.sockets.emit("timevalue", data2);
	});
});