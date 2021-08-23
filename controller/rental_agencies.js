var express=require("express");
var router=express.Router();
var allQueries=require("../model/allQueries");
router.post('/signup',function(req,res){
    //console.log("req.body",req.body);
    allQueries.signup("rental_agencies",req.body,function(err,result){
        if(err){
            if(err.code=="ER_DUP_ENTRY"){
                var pagedata={"title":"Login","pagename":"agency_login","msg":"Email Id already exists! Please sign in"}
                res.render("layout",pagedata);
            }
            else{
                res.send(err)
            }
        }
        if(result){
            var pagedata={"title":"Login","pagename":"agency_login","msg":"Successfully registered! Please sign in"}
            res.render("layout",pagedata);
        }
    })
})
router.post('/signin',function(req,res){
    //console.log("req.body signin",req.body)
    allQueries.signin("rental_agencies",req.body,function(err,result){
        if(err){
            res.send(err)
        }
        console.log("result from db..",result);
        if(result.length>0){
            if(result[0].password==req.body.upass){
                req.session.email=result[0].email;
                req.session.agencyid=result[0].id;
               // console.log("req.session here",req.session);
                //console.log("data retrieved ",result[0].id)
                allQueries.getProfile("rental_agencies",{id:result[0].id},function(err2,result2){
                    if(err2){
                        res.send("Please try again later!")
                        console.log(err2)
                    }
                    if(result2.length>0){
                        var pagedata={"title":"Agency Profile","pagename":"agency_profile",result2:result2[0]}
                        res.render("layout",pagedata);
                    }
                })
            }
            else{
                var pagedata={"title":"Agency Login","pagename":"agency_login","msg":"Incorrect password!"}
                res.render("layout",pagedata);
            }
        }
        else{
            var pagedata={"title":"Agency Login","pagename":"agency_login","msg":"Username does not exists!"}
            res.render("layout",pagedata);
        }
    })
})
router.get('/signout', function(req, res){
    allQueries.viewAll("cars",function(err,result){
        if(err){
            var pagedata={"title":"Home page","pagename":"home"};
            res.render("layout",pagedata);
            req.session.destroy();
        }
        if(result){
            var pagedata={"title":"Home page","pagename":"home",result:result}
            res.render("layout",pagedata);
            req.session.destroy();	
        }
    })
});
router.post('/addCar',function(req,res){
    obj=req.body
    obj.agency_id=req.session.agencyid;
    //console.log("obj",obj);
    allQueries.addCar("cars",obj,function(err,result){
        if(err){
            res.send(err)
        }
        if(result){
            res.send("Car added successfully!");
        }
    })
})
router.get('/viewAvailable',function(req,res){
    obj={agency_id:req.session.agencyid}
    //console.log("obj%%",obj);
    allQueries.viewAllCars("cars",obj,function(err,result){
        if(err){
            res.send(err)
        }
        if(result){
            var pagedata={"pagename":"cars_of_agency","title":"Available cars of agency",result:result}
            res.render("layout",pagedata);
        }
    })
})
router.get('/viewBooked',function(req,res){
    obj={agency_id:req.session.agencyid}
    //console.log("obj%%%%%%",obj);
    allQueries.viewBookedCars("cars",obj,function(err,result){
        if(err){
            res.send(err)
        }
        if(result){
            var pagedata={"pagename":"bookedcars_of_agency","title":"Booked cars of agency",result:result}
            res.render("layout",pagedata);
        }
    })
})
router.post('/edit',function(req,res){
    //console.log("hellooo",req.session);
    req.session.vehicle_no=req.body.vehicle_no;
    allQueries.getCar("cars",{vehicle_no:req.body.vehicle_no},function(err,result){
        if(err){
            res.send(err)
        }
        if(result){
            var pagedata={"pagename":"edit_car","title":"Edit car info",result:result[0]}
            res.render("layout",pagedata);
        }
    })
})
router.post('/editInfo',function(req,res){
    var where={"vehicle_no":req.body.vehicle_no};
    console.log("hellooo",req.body);
    allQueries.editCar("cars",req.body,where,function(err,result){
        if(err){
            res.send(err);
        }
        if(result){
            res.send("Car info updated successfully!");
        }
    })
})
router.post('/delete',function(req,res){
    //console.log("hiiii",req.body);
    allQueries.deleteCar("cars",{vehicle_no:req.body.vehicle_no},function(err,result){
        if(err){
            res.send(err)
        }
        if(result){
            res.send("Car info deleted successfully!");
        }
    })
})
router.post('/viewCustomerInfo',function(req,res){
    allQueries.viewCustomerInfoByAgency({vehicle_no:req.body.vehicle_no},function(err,result){
        if(err){
            res.send("Cannot provide customer details at the moment");
        }
        if(result){
            var pagedata={"pagename":"view_customer_info","title":"Customer info",result:result[0]}
            res.render("layout",pagedata);
        }
    })
})
module.exports=router;