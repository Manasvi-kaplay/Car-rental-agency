//This file is the entry point of the project.
//Project is run using this file

var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var session=require("express-session");
//var cookie=require("cookie-parser");
var ejs=require("ejs");
var cookieParser = require("cookie-parser");
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
  extended:false,
  limit:'50mb'
}));
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(express.static(__dirname+"/public"));
app.use(cookieParser())
app.use(session({ secret : "TSS", saveUninitialized: true}));
app.use(require("./controller/default"));
app.listen(process.env.PORT || 1500,function(){
    console.log("server started at port 1500")
});
