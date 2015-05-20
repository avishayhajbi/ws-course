var express = require('express')
  , bodyParser = require("body-parser")
  , fs = require("fs-extra")
  , Shoes = require('./shoes')
  , os = require('os');

var app = express();
var port = process.env.PORT || 8080;
var shoes = new Shoes();
shoes.init();
// configure Express
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('port', port);
app.use(bodyParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
  res.render('index', { 
  	title: "Shoes store",
  	structure: 'id, size, company, useFor',
  	info: ['GET getShoeById',
    'GET insertNewShoe',
    'GET deleteShoeById',
    'GET findShow'],
  	desc: ['example: /getShoeById/id = 123 ',
    'example: /insertNewShoe/id = 123 & size = 42 & company = nike & useFor = running',
  	'example: /deleteShoeById/id = 123 ',
    'example: findShow/id = 123 & size = 42 & useFor = walking & company = nike']
  });
});

app.get('/getShoeById/:id?', function(req, res){
  var temp = shoes.getShoeById("123");
  res.josn(temp);
});


app.listen(app.get('port'), function() {
  console.log('Server running...' + app.get('port'));
});

app.get('/*', function(req, res) {
  res.send(405, 'WS can not find page');
});

