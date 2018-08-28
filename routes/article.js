var express = require('express');
var router = express.Router();
var blogModel =require("../model/blogModel");


var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  }, //存放文件的目录
  filename: function (req, file, cb) {
    cb(null, "yune-"+file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })


/* GET home page. */
router.get('/', function(req, res, next) {
	// session["sessionID"]
	if(req.session.userInfo){

		res.render('article',{isnew:true});
	}else{
		res.redirect("/login");
	}
  
});


router.post("/",upload.single('myphoto'),function(req,res){
	// req.file 获取上传文件的详细信息（名字）
	console.log(req.file);
	blogModel.create({
		author:req.session.userInfo.username,
		title:req.body.title,
		content:req.body.content,
		createTime:new Date(),
		filepath:req.file? "/uploads/"+req.file.filename:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIuanMvNjR4NjQKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNjQxNTgzNDcyZiB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE2NDE1ODM0NzJmIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSIxMy4xNzk2ODc1IiB5PSIzNi41Ij42NHg2NDwvdGV4dD48L2c+PC9nPjwvc3ZnPg==" //图片在文件中的路径(是否有文件)
	},function(error,info){
		if(!error){
			res.redirect("/");
		}
	})
	//用一个blogModel 存储数据 到 articles 
})


router.get("/delete/:id",function(req,res){

	//删除   findByIdAndRemove(req.params.id,function(){})
	//req.params为参数容器对象类似于req.query
	blogModel.remove({
		_id:req.params.id
	},function(error,result){

		if(!error){
			//
			// res.render("/"); 
			res.redirect("/")//重新跳转首页
		}
	})
})


router.get("/update/:id",function(req,res){
	//根据id 获取详细信息
	blogModel.find({
		_id:req.params.id
	},function(error,result){
		res.render('article',{isnew:false,info:result[0]});
	})
	
})


// router.post("/update/:id",function(req,res){
// 	//获取前端post 请求数据
// 	console.log(req.body,req.params.id);
// })
router.post("/update",upload.single('myphoto'),function(req,res){
	//获取前端post 请求数据
	// console.log(req.body);

	// blogModel.update({
	// 	_id:req.body.id
	// },{$set:{title:req.body.title,content:req.body.content}})
	

	blogModel.findByIdAndUpdate(req.body.id,{$set:{
		title:req.body.title,
		content:req.body.content,
		filepath:req.file? "/uploads/"+req.file.filename:''
	}},function(error,result){
		if(!error){
			res.redirect("/"); //重定向
		}
	})
})

module.exports = router;
