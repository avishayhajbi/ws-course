exports.goodHit = function (){
	console.log(this.players[this.turn]+" has a GOOD hit -- score: "+this.hits);
	this.results.push(this.players[this.turn]+" has a GOOD hit -- score: "+this.hits)
};
exports.badHit = function (){
	console.log(this.players[this.turn]+" has a BAD hit");
	this.results.push(this.players[this.turn]+" has a BAD hit")
};
exports.glorifyTheWinner = function (){
	console.log("############ "+this.players[this.turn]+ " WON ############");
	this.results.push("############ "+this.players[this.turn]+ " WON ############")
	return true;
};