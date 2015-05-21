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

Shoes.prototype.getAllShoes = function (){
  return this.shoes;
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
  console.log("new shoe created", shoe);
  return ({status:1,desc:"success shoe "+shoe.id+" created"});
}

Shoes.prototype.updateShoe = function (data){
  var index = this.index.indexOf(data.id);
  if (index == -1) return ({status:0,desc:"shoe "+data.id+" not found"});
  this.shoes[index].size=(data.size) ? data.size : this.shoes[index].size;
  this.shoes[index].company=(data.company) ? data.company : this.shoes[index].company;
  this.shoes[index].useFor=(data.useFor) ? data.useFor : this.shoes[index].useFor;
  console.log("shoe "+data.id+" updated")
  return ({status:1,desc:"shoe "+data.id+" was updated",res:this.shoes[index]});
}

Shoes.prototype.deleteShoe = function (id){
  var index = this.index.indexOf(id);
  if (index == -1) return ({status:0,desc:"shoe "+id+" not found"});
  this.shoes.splice(index,1);
  this.index.splice(index,1);
  console.log("shoe "+id+" deleted");
  return ({status:1,desc:"success shoe "+id+" deleted"});
}

Shoes.prototype.getShoeById = function (id){
  var index = this.index.indexOf(id);
  if (index == -1) return ({status:0,desc:"shoe "+id+" not found"});
  console.log("shoe "+id+" found",this.shoes[index] );
  return ({status:1,desc:"shoe "+id+" found",res:this.shoes[index]});
}

Shoes.prototype.findShoe = function (data){
  var temp = [];
  temp=this.shoes.filter(function(v){
    return data.id ||v.id == v.id && 
    data.size ||v.size== v.size && 
    data.company ||v.company== v.company && 
    data.useFor ||v.useFor== v.useFor    
  });
  /*
  var temp=this.shoes.filter(function(v){
    return data.id == v.id && 
    data.size == v.size && 
    data.company == v.company && 
    data.useFor == v.useFor;   
  });
    data.id == v.id && 
    data.size == v.size && 
    data.company == v.company && 
    data.useFor == v.useFor;
  */
  return ({status:1,desc:temp.length+" shoes found",res:temp});
}

module.exports = Shoes;