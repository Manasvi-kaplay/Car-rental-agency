//This file contains the routes to all other files of controller
var express=require("express");
var router=express.Router();
router.use('/home',require("./home"));
router.use('/users',require("./users"));
router.use('/rental_agencies',require("./rental_agencies"));
module.exports=router;