var express = require('express');
var router = express.Router();
var blogModel =require("../model/blogModel");

/* GET home page. */
router.get('/', function(req, res, next) {
	// session["sessionID"]
	res.render("user");

});

module.exports = router;