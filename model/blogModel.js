var mongoose =require("mongoose");

var Schema= mongoose.Schema; //概要，计划



var  obj = {
	author:String,
	title:String,
	content:String,
	createTime:Date,
	filepath:String
}


var model = mongoose.model("article" ,new Schema(obj));

// article模型的名字 ==> articles 集合

module.exports = model;