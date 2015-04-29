var http = require ('http');
var request = require('request');
var os = require('os');
var ping_pong_game =require('./game');



var pingPong = new ping_pong_game();


var server = http.createServer(function (req, res){
	console.log("server runing please see the website.."+ os.EOL)
	if (req.url === '/') {
		
		res.writeHead(200,{"contant-Type":"text/plain"})
		res.write("welcome to the ping pong game -- have fun (refresh the page !)"+ os.EOL);
		
		pingPong.init("avishay","haim",8);
		pingPong.play();
		res.write(pingPong.results[pingPong.results.length-1]+ os.EOL)

		pingPong.init("peleg","natalie",10);
		pingPong.play();
		res.write(pingPong.results[pingPong.results.length-1]+ os.EOL)
		
		pingPong.init("ofir","vidran",20);
		pingPong.play();
		res.write(pingPong.results[pingPong.results.length-1]+ os.EOL)
		
		res.end()
	}
	else {
		res.writeHead(404,{"contant-Type":"text/plain"})
		res.write("unknown path");
		res.end()
	} 
}).listen(process.env.PORT || 8080 );
