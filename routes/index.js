var express = require('express');
var router = express.Router();
var blogModel =require("../model/blogModel");

/* GET home page. */
router.get('/', function(req, res, next) {
	// session["sessionID"]
	if(req.session.userInfo){

		blogModel.find({author:req.session.userInfo.username},function(error,result){
			console.log(result);
			res.render('index', { title: 'Express' ,welcome:req.session.userInfo.username,
				list:result,
				isSearch:true
			});
		})

		
	}else{
		res.redirect("/login");
	}
  
});
//销毁路由
router.get("/logout",function(req,res){
	req.session.destroy(function(error){
		if(!error){
			res.redirect('/login');
		}
	})
})

module.exports = router;
