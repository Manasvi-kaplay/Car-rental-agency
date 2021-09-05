var express=require("express")
var router=express.Router()
var allQueries=require("../model/allQueries");
//get API to call Home page
router.get('/page',function(req,res){
    //req.session.destroy();
    if(req.session.email){
        console.log("yuyu",req.session);
    }
    var pagedata={"title":"Home page","pagename":"home"};
    res.render("layout",pagedata);
})
//get API to show list of cars available to the everyone(without login/signup)
router.get('/view',function(req,res){
    allQueries.viewAll("cars",function(err,result){
        if(err){
            var pagedata={"title":"Home page","pagename":"home"};
            res.render("layout",pagedata);
        }
        if(result){
            var pagedata={"title":"view available cars","pagename":"view_available",result:result}
            res.render("layout",pagedata);
        }
    })
})
//post API to retrieve agency details (agency which posted the car)
router.post('/viewAgencyDetails',function(req,res){
    console.log("req.body: ",req.body);
    allQueries.getProfile("rental_agencies",{id:req.body.agency_id},function(err,result){
        if(err){
            res.send("Agency details not available");
        }
        if(result){
            //console.log("result[0]...",result[0])
            var pagedata={"title":"Home page","pagename":"agency_details",result:result[0],car:req.body}
            res.render("layout",pagedata);
        }
    })
})
module.exports=router;