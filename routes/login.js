var express = require('express');
var router = express.Router();
var userModel = require("../model/userModel");
router.get("/",function(req,res){


	res.render("login",{isShow:false});
}) 


router.post("/validate",function(req,res){

	// req.body
	// 
	userModel.find({
		email:req.body.email,
		password:req.body.password
	},function(error, result){
		//result 数组长度  0？用户或密码  1
		if(result.length==0){
			res.render("login",{isShow:true});
		}else{

			//登录成功的时候
			
			req.session.userInfo = result[0]; //用户信息
			res.redirect("/") 
		}
 	})
})


module.exports = router;