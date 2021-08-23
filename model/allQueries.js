var connection=require("../config/connection");
module.exports.signup=function(table_name,obj,cb){
    connection.getConnection(function(err){
        if(err){
        console.log("unstable connection..",err)
        }
        var query="INSERT INTO "+table_name+"(name,address,contact,email,password) VALUES('"+obj.name+"','"+obj.address+"','"+obj.contact+"','"+obj.unm+"','"+obj.cupass+"')";
        connection.query(query,cb);
    })
}
module.exports.signin=function(table_name,obj,cb){
    connection.getConnection(function(err){
        if(err){
        console.log("unstable connection..",err)
        }
        var query="SELECT * FROM "+table_name+" where email='"+obj.unm+"'";
        //console.log("query:",query);
        connection.query(query,cb);
    })
}
module.exports.addCar=function(table_name,obj,cb){
    connection.getConnection(function(err){
        if(err){
        console.log("unstable connection..",err);
        }
        var query="INSERT INTO "+table_name+"(vehicle_no,vehicle_model,seating_capacity,rent,agency_id,status) VALUES("+obj.vehicle_no+",'"+obj.vehicle_model+"',"+obj.seating_capacity+","+obj.rent+","+obj.agency_id+",'"+obj.status+"')";
        //console.log("query: ***",query);
        connection.query(query,cb);
    })
}
module.exports.getProfile=function(table_name,obj,cb){
    connection.getConnection(function(err){
        if(err){
        console.log("unstable connection..",err)
        }
        var query="SELECT * FROM "+table_name+" where id="+obj.id+"";
        //console.log("query:",query);
        connection.query(query,cb);
    })
}
module.exports.viewAllCars=function(table_name,obj,cb){
    connection.getConnection(function(err){
        if(err){
        console.log("unstable connection..",err)
        }
        var query="SELECT * FROM "+table_name+" where agency_id="+obj.agency_id+" and status='Available'";
        //console.log("query:",query);
        connection.query(query,cb);
    })
}
module.exports.viewCustomerInfoByAgency=function(obj,cb){
    connection.getConnection(function(err){
        if(err){
        console.log("unstable connection..",err)
        }
        var query="SELECT customers.name,customers.address,customers.contact,customers.email FROM customers,booked_cars where customers.id=booked_cars.user_id and booked_cars.vehicle_no="+obj.vehicle_no+"";
        console.log("query here:",query);
        connection.query(query,cb);
    })
}
module.exports.viewBookedCars=function(table_name,obj,cb){
    connection.getConnection(function(err){
        if(err){
        console.log("unstable connection..",err)
        }
        var query="SELECT * FROM "+table_name+" where agency_id="+obj.agency_id+" and status='Booked'";
        //console.log("query:",query);
        connection.query(query,cb);
    })
}
module.exports.getCar=function(table_name,obj,cb){
    connection.getConnection(function(err){
        if(err){
        console.log("unstable connection..",err)
        }
        var query="SELECT * FROM "+table_name+" where vehicle_no="+obj.vehicle_no+"";
        //console.log("query:",query);
        connection.query(query,cb);
    })
}
module.exports.editCar=function(table_name,obj,where,cb){
    connection.getConnection(function(err){
        if(err){
            console.log("unstable connection..",err)
            }
            var query="UPDATE "+table_name+" SET vehicle_no="+obj.vehicle_no+",vehicle_model='"+obj.vehicle_model+"',seating_capacity="+obj.seating_capacity+",rent="+obj.rent+" where vehicle_no="+where.vehicle_no+"";
            //console.log("query:",query);
            connection.query(query,cb);
    })
}
module.exports.deleteCar=function(table_name,obj,cb){
    connection.getConnection(function(err){
        if(err){
            console.log("unstable connection..",err)
            }
            var query="DELETE FROM "+table_name+" where vehicle_no="+obj.vehicle_no+"";
            console.log("query:",query);
            connection.query(query,cb);
    })
}
module.exports.viewAll=function(table_name,cb){
    connection.getConnection(function(err){
        if(err){
        console.log("unstable connection..",err)
        }
        var query="SELECT * FROM "+table_name+" where status='Available'";
        //console.log("query:",query);
        connection.query(query,cb);
    })
}
module.exports.bookCar=function(table_name,obj,cb){
    connection.getConnection(function(err){
        if(err){
        console.log("unstable connection..",err);
        }
        var query="INSERT INTO "+table_name+"(vehicle_no,user_id,no_of_days,start_date) VALUES("+obj.vehicle_no+","+obj.user_id+","+obj.no_of_days+",'"+obj.start_date+"')";
        console.log("query: ***",query);
        connection.query(query,cb);
    })
}
module.exports.updateStatus=function(table_name,where,cb){
    connection.getConnection(function(err){
        if(err){
            console.log("unstable connection..",err)
            }
            var query="UPDATE "+table_name+" SET status='Booked' where vehicle_no="+where.vehicle_no+"";
            //console.log("query:",query);
            connection.query(query,cb);
    })
}
module.exports.viewBookedCarsByUser=function(table_name,obj,cb){
    connection.getConnection(function(err){
        if(err){
        console.log("unstable connection..",err)
        }
        var query="SELECT * FROM "+table_name+" where user_id="+obj.user_id+"";
        //console.log("query:",query);
        connection.query(query,cb);
    })
}