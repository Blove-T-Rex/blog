var express = require('express');
var router = express.Router();
var userModel = require("../model/userModel");
router.get("/",function(req,res){


	res.render("register",{isShow:false});
}) 


router.post("/validate",function(req,res){
	//req.body //获取post
	console.log(req.body);

	//先检查 同名？ 没有同名 跳转页面。
	//操作模型 -->操作数据库
	userModel.find({
		email:req.body.email
	},function(error,info){
		//info 是一个数组， 数组长度大于0 ， ==0
		
		if(info.length==0){
			userModel.create({
				username:req.body.username,
				password:req.body.password,
				email:req.body.email
			},function(error,info){
				if(!error){
					// console.log("success");
					res.redirect("/");
				}
			})
		}else{
			res.render("register",{isShow:true});
		}
	})
})
 
module.exports = router;