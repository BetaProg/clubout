var express = require('express');
var app = express();
var http = require('http');
var formidable = require('formidable');
var fs  = require('fs');

http.createServer(function(req, res){
	if(req.url == "/fileupload"){
		var form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files){
			var oldpath = files.filetoupload.path;
			var newpath = './audio/musicfile.mp3';
			fs.readFile(oldpath, function(err, data){
				if(err) throw err;
				fs.writeFile(newpath, data, function(err){
					if(err) throw err;
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.write('<meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">');
					res.write('<center>File uplaoded and saved</center>');
					res.write('<button onclick=window.location.href="/emitdata" class="btn btn-outline-success btn-lg">BACK</button>');
					// res.write("<script>window.location.href='/emitdata.html'</script>");
					
					// app.get('/fileupload', function (req, res) {
					  // res.sendFile(__dirname + '/emitdata.html');
					// });
					
					res.end();
				});
				fs.unlink(oldpath, function(err){
					if(err) throw err;
				});
			});
		});
	}
	else{
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('<meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">');
		res.write('<div style="margin:5% 25% auto 25%;"><form action="fileupload" method="post" enctype="multipart/form-data">');
		res.write('<input type="file" name="filetoupload"><br>');
		res.write('<input type="submit" style="margin: 10%;" class="btn btn-info btn-lg">');
		res.write('</form></div>');
		return res.end();
	}
// }).listen(5001);
}).listen(4200);