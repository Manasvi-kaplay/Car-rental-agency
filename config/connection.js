var mysql=require("mysql");
//establishing a connection with mysql
module.exports=mysql.createPool({
    /*host: 'db4free.net',
        port:3306,
        user: 'manasvi123',
        password: '0e06bbf0',*/
        host:'localhost',
        port:3306,
        user:'root',
        password:'',
        database: 'car_rental_agency'
})
//module.exports=options;