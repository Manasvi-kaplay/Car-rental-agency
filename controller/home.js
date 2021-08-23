var express=require("express")
var router=express.Router()
var allQueries=require("../model/allQueries");
router.get('/page',function(req,res){
    //req.session.destroy();
    allQueries.viewAll("cars",function(err,result){
        if(err){
            var pagedata={"title":"Home page","pagename":"home"};
            res.render("layout",pagedata);
        }
        if(result){
            var pagedata={"title":"Home page","pagename":"home",result:result}
            res.render("layout",pagedata);
        }
    })
})
router.post('/viewAgencyDetails',function(req,res){
    //console.log("req.body: ",req.body);
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