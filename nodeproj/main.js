var fs = require("fs");
var contents = fs.readFileSync("./Settings/settings.json");
var settings = JSON.parse(contents);

var express = require('express'),
	io = require('socket.io'),
	http = require('http'),
	app = express(),
	server = http.createServer(app),
	io = io.listen(server);

	
var siloState = {
	siloGroup : [
		{
			groupID : "1",
			currWeight : 213,
			silos : [
				{siloID : 0, currLevel : 95, percentage : "75%"},
				{siloID : 1, currLevel : 85, percentage : "76%"}
			]                                
		},                                   
		{                                    
			groupID : "2",                   
			currWeight : 123,                
			silos : [                        
				{siloID : 0, currLevel : 95, percentage : "77%"},
				{siloID : 1, currLevel : 85, percentage : "78%"},
				{siloID : 2, currLevel : 95, percentage : "79%"},
				{siloID : 3, currLevel : 85, percentage : "80%"}
			]
		},
		{
			groupID : "3",
			currWeight : 321,
			silos : [
				{siloID : 0, currLevel : 95 ,percentage : "81%"},
				{siloID : 1, currLevel : 85 ,percentage : "82%"}
			]
		},
		{
			groupID : "4",
			currWeight : 432,
			silos : [
				{siloID : 0, currLevel : 95 ,percentage : "83%"},
				{siloID : 1, currLevel : 85 ,percentage : "84%"},
				{siloID : 3, currLevel : 85 ,percentage : "85%"}
			]
		}
	]
};	
	
	

server.listen(settings.port,settings.host, function () {
  console.log("Example app listening at http://%s:%s",settings.host, settings.port);
});



io.sockets.on('connection', function(socket) {
  console.log("connection");
  
	app.get('/info', function (req, res) {
		console.log("request:" + req.url);
		socket.broadcast.emit('notification', JSON.parse('{"data" : "'+req.url+'"}'));
		res.end("test");
	});
	
	app.get('/addInfo', function (req, res) {
		console.log("request:" + req.url);
		var data = '{"time": "12:34", "note":"Niet te warm in de oven" }';
		socket.broadcast.emit('addNotification', data);
		res.end(data);
	});
	
	app.get('/addInfoRow', function (req, res) {
		console.log("request:" + req.url);
		var data = '{"no": "123", "time":"12:34","customer":"constar","recept":"testreceptstuffjeweetlangestring" }';
		socket.broadcast.emit('addInfoRow', data);
		res.end(data);
	});
	
	app.get('/updateSiloState', function (req, res) {
		console.log("request:" + req.url);
		var data = JSON.stringify(siloState);
		socket.broadcast.emit('updateSiloInfo', data);
		res.end(data);
	});
});

app.get('/getSiloConfiguration', function (req, res) {
	var settings = fs.readFileSync("./Settings/site.settings.json");
	res.writeHead(200,{"Content-type":"application/json",'Access-Control-Allow-Origin': "*"});
	res.end(JSON.stringify(JSON.parse(settings)));
});

