var express=require("express");
var router=express.Router();
var allQueries=require("../model/allQueries")
router.post('/signup',function(req,res){
    console.log("req.body",req.body);
    allQueries.signup("customers",req.body,function(err,result){
        if(err){
            if(err.code=="ER_DUP_ENTRY"){
                var pagedata={"title":"Login","pagename":"user_login","msg":"Email Id already exists! Please sign in"}
                res.render("layout",pagedata);
            }
            else{
                res.send(err)
            }
        }
        if(result){
            var pagedata={"title":"Login","pagename":"user_login","msg":"Successfully registered! Please sign in"}
            res.render("layout",pagedata);
        }
    })
})
router.post('/signin',function(req,res){
    console.log("req.body signin",req.body)
    allQueries.signin("customers",req.body,function(err,result){
        if(err){
            res.send(err)
        }
        console.log("result from db..",result);
        if(result.length>0){
            if(result[0].password==req.body.upass){
                req.session.email=result[0].email;
                req.session.userid=result[0].id;
                console.log("req.session here",req.session);
                console.log("data retrieved ",result[0])
                allQueries.getProfile("customers",{id:result[0].id},function(err2,result2){
                    if(err2){
                        res.send("Please try again later!")
                        console.log(err2)
                    }
                    if(result2.length>0){
                        var pagedata={"title":"Customer Profile","pagename":"user_profile",result2:result2[0]}
                        res.render("layout",pagedata);
                    }
                })
            }
            else{
                var pagedata={"title":"Customer Login","pagename":"user_login","msg":"Incorrect password!"}
                res.render("layout",pagedata);
            }
        }
        else{
            var pagedata={"title":"Customer Login","pagename":"user_login","msg":"Username does not exists!"}
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
router.get('/book',function(req,res){
    allQueries.viewAll("cars",function(err,result){
        if(err){
            res.send(err);
        }
        if(result){
            var pagedata={"title":"Book my car","pagename":"available_cars",result:result};
            res.render("layout",pagedata);
        }
    
})
})
router.get('/bookCar',function(req,res){
    if(req.query.vehicle_no){
       var pagedata={"title":"Book my car","pagename":"book",vehicle_no:req.query.vehicle_no};
       res.render("layout",pagedata);
    }
    else{
        res.send("Car cannot be booked at the moment!");
    }
})
router.post('/book',function(req,res){
    console.log("req.body    ",req.body);
    allQueries.bookCar("booked_cars",{vehicle_no:req.body.vehicle_no,user_id:req.session.userid,start_date:req.body.start_date,no_of_days:req.body.no_of_days},function(err,result){
        if(err){
            res.send("Car cannot be booked at the moment!")
        }
        if(result){
            allQueries.updateStatus("cars",{vehicle_no:req.body.vehicle_no},function(err2,result2){
                if(err2){
                    res.send("Car cannot be booked at the moment!")
                }
                if(result2){
                    res.send("Booking successful..!");
                }
            })
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
            var pagedata={"title":"Agency details","pagename":"agency_details_for_user",result:result[0],car:req.body}
            res.render("layout",pagedata);
        }
    })
})
router.get('/viewBookingHistory',function(req,res){
    allQueries.viewBookedCarsByUser("booked_cars",{user_id:req.session.userid},function(err,result){
        if(err){
            res.send("Try again later!");
        }
        if(result){
            var pagedata={"title":"Booking History","pagename":"booking_history",result:result};
            res.render("layout",pagedata);
        }
    })
})
router.get('/viewOtherInfo',function(req,res){
    allQueries.getCar("cars",{vehicle_no:req.query.vehicle_no},function(err,result){
        if(err){
            res.send("Try again later!");
        }
        if(result){
            allQueries.getProfile("rental_agencies",{id:result[0].agency_id},function(err2,result2){
                if(err2){
                    res.send("Try again later!");
                }
                if(result2){
                    var pagedata={"title":"View other details","pagename":"car+agency_info",car:result[0],agency:result2[0]};
                    res.render("layout",pagedata);
                }
        })
        }
    })
})
module.exports=router;