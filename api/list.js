var express =require("express");

var router = express.Router();
var blogModel = require("../model/blogModel");

router.get("/",function(req,res){

	//res.json  res.send()
	// find 查找数据

	// 获取前端的传来的参数
	// req.query(url)
	console.log(req.query.offset,req.query.limit);
	// 注意字符串解析
	blogModel.find({},{},{skip:parseInt(req.query.offset),limit:parseInt(req.query.limit)},function(error,result){
		if(!error){
			res.json(result);
		}
	})
	
})

router.get("/count",function(req,res){
	blogModel.find({},function(error,result){
		if(!error){
			res.json({length:result.length});
		}
	})
})


module.exports=  router;
