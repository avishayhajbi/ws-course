var http = require ('http');
var request = require('request');
events = require('events');
util = require('util');
var global_func = require('./game/global.js');
var ping_pong_game =require('./game');

util.inherits(ping_pong_game, events.EventEmitter);

var pingPong = new ping_pong_game();

pingPong.on("hitsChanged",global_func.goodHit);
pingPong.on("hitsNotChanged",global_func.badHit);
pingPong.on("gameEnd",global_func.glorifyTheWinner);




var server = http.createServer(function (req, res){
	if (req.url === '/') {
		console.log("server runing")
		res.writeHead(200,{"contant-Type":"text/plain"})
		res.write("welcome to the ping pong game -- have fun");
		
		pingPong.init("avishay","haim",8);
		pingPong.play();
		res.write(pingPong.results[pingPong.results.length-1])
		pingPong.init("peleg","natalie",10);
		pingPong.play();
		res.write(pingPong.results[pingPong.results.length-1])
		pingPong.init("ofir","vidran",20);
		pingPong.play();
		res.write(pingPong.results[pingPong.results.length-1])
		res.end()
	}
	else {
		res.writeHead(404,{"contant-Type":"text/plain"})
		res.write("unknown path");
		res.end()
	} 
}).listen(process.env.PORT || 8080 ,"localhost");
