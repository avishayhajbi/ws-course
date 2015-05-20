//var express = require('express');
//var router = express.Router();

function Shoe (data){
  return {
    id:data.id || new Date().getTime(),
    size:data.size || '',
    company:data.company || '',
    useFor:data.useFor || ''
  }
}

function Shoes (){
  this.shoes = [];
  this.index = [];
}

Shoes.prototype.init = function (){
  var temp = { id: "123" , size: "42"};
  this.shoes.push(new Shoe(temp));
  this.index.push(temp.id);
  temp = { id: "1234" , company : "nike"};
  this.shoes.push(new Shoe(temp));
  this.index.push(temp.id);
  temp = { id: "1235" , company: "adidas"};
  this.shoes.push(new Shoe(temp));
  this.index.push(temp.id);
  temp = { id: "12356", useFor: "walking"};
  this.shoes.push(new Shoe(temp));
  this.index.push(temp.id);
  console.log(this.shoes);

}

Shoes.prototype.insertShoe = function (data){
  if (data.id && this.index.indexOf(data.id) != -1)
    data.id = new Date().getTime();
  var shoe = new Shoe(data);
  this.shoes.push(shoe);
  this.index.push(shoe.id);
  console.log("new shoe created", shoe)
}

Shoes.prototype.updateShoe = function (data){
  var index = this.index.indexOf(data.id);
  if (index == -1) return;
  var shoe = new Shoe(data)
  this.shoes[index] = shoe;
  console.log("shoe "+data.id+" updated")
}

Shoes.prototype.deleteShoe = function (data){
  var index = this.index.indexOf(data.id);
  if (index == -1) return;
  this.shoes.slice(index,1);
  this.index.slice(index,1);
  console.log("shoe "+data.id+" deleted")
}

Shoes.prototype.getShoeById = function (id){
  var index = this.index.indexOf(id);
  if (index == -1) return;
  console.log("shoe "+id+" found",this.shoes[index] );
  return this.shoes[index];
}

Shoes.prototype.findShoe = function (id){
  
}

module.exports = Shoes;