var events = require('events');
var util = require('util');
var global_func = require('./global.js');

util.inherits(PingPong, events.EventEmitter);

var exit =false;

function PingPong () {
	this.hits = 0;
	this.goal = 10;
	this.turn =0;
	this.players = []; 
	this.results = [];
	events.EventEmitter.call(this);
	
	this.init = function (p1,p2, goal){
		this.hits = goal/2;
		this.goal = goal;
		this.turn =0;
		exit=false;
		this.players = [];
		this.results = [];
		this.players.push(p1,p2);
	};

	this.play = function (){
		while (true){
			if (exit) return;
			var hit=0;
			if (this.turn) hit = parseInt(Math.random()*10);
			else hit = parseInt(Math.random()*10)*-1;
			/* TODO check if thats the way to call the inner methods */
			console.log("HIT: "+hit)
			this.addHit(hit);
			this.turn = (this.turn)? 0: 1;
			
		}
	};

	this.addHit = function (num){
		if ((this.hits+num) >= 0 && (this.hits+num) <= this.goal)
		{
			this.hits +=num;
			this.emit('hitsChanged');
			this.checkGoal();
		}
		else this.emit('hitsNotChanged');
	};

	this.checkGoal = function(){
		if (this.hits == 0 || this.hits == this.goal) 
			exit = this.emit('gameEnd');
		else console.log("still on game")
	};

	this.on("hitsChanged",global_func.goodHit);
	this.on("hitsNotChanged",global_func.badHit);
	this.on("gameEnd",global_func.glorifyTheWinner);

};



module.exports = PingPong;