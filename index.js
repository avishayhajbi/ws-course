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
  	info: ['GET getAllShoes',
    'GET getShoeById',
    'GET insertNewShoe',
    'GET deleteShoeById',
    'GET findShow',
    'GET updateShoe'],
  	desc: ['example: /getAllShoes',
    'example: /getShoeById/?id=123',
    'example: /insertNewShoe/?id=123&size=42&company=nike&useFor=running',
  	'example: /deleteShoeById/?id=123',
    'example: /findShoe/?id=123&size=42&company=nike&useFor=running',
    'example: /updateShoe/?id=123&size=42&company=nike&useFor=running']
  });
});

app.get('/getAllShoes', function(req, res){
  res.json(shoes.getAllShoes());
});

app.get('/getShoeById/:id?', function(req, res){
  var id= req.query.id || 0;
  console.log("search shoe id",id)
  var temp = shoes.getShoeById(id);
  res.json(temp);
});

app.get('/insertNewShoe/:id?:size?:company?:useFor?', function(req, res){
  var data = {
    id: req.query.id || new Date().getTime(),
    size: req.query.size || 1,
    company: req.query.company || '',
    useFor: req.query.useFor || ''
  }
  console.log("insert new shoe",data)
  var temp = shoes.insertShoe(data);
  res.json(temp);
});


app.get('/deleteShoeById/:id?', function(req, res){
  var id= req.query.id || 0;
  console.log("delete shoe id",id)
  var temp = shoes.deleteShoe(id);
  res.json(temp);
});

app.get('/updateShoe/:id?:size?:company?:useFor?', function(req, res){
  var data = {
    id: req.query.id,
    size: req.query.size,
    company: req.query.company,
    useFor: req.query.useFor
  };
  if (!data.id) {
    console.log("update shoe - id is missing")
    res.json({status:0,desc:"parameter id is missing"});
    return;
  }
  console.log("update shoe",data);
  var temp = shoes.updateShoe(data);
  res.json(temp);
});

app.get('/findShoe/:id?:size?:company?:useFor?', function(req, res){
  var data = {
    id: req.query.id,
    size: req.query.size,
    company: req.query.company,
    useFor: req.query.useFor
  };
  if (!data.id && !data.size && !data.company && !data.useFor ) {
    console.log("findShoe shoe - id is missing")
    res.json({status:0,desc:"no parameters found"});
    return;
  }
  console.log("findShoe shoe",data);
  var temp = shoes.findShoe(data);
  res.json(temp);
});

app.listen(app.get('port'), function() {
  console.log('Server running...' + app.get('port'));
});


app.get('/*', function(req, res) {
  res.send(405, 'WS can not find page');
});

