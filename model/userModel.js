var mongoose =require("mongoose");

var Schema= mongoose.Schema; //概要，计划



var  obj = {
	username:String,
	password:String,
	email:String
}


var model = mongoose.model("user" ,new Schema(obj));

// user模型的名字 ==> users 集合

module.exports = model;