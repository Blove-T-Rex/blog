var express = require('express');
var router = express.Router();
var blogModel =require("../model/blogModel");

//动态路由
router.get("/:id",function(req,res){

	console.log(req.params.id)
	
	blogModel.find({_id:req.params.id},function(error,info){	
		console.log(info);

		res.render("detail",{title:"detail",info:info[0]})
	})
})

module.exports = router;