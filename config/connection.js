var mysql=require("mysql");
//establishing a connection with mysql
module.exports=mysql.createPool({
    host: 'db4free.net',
        port:3306,
        user: 'manasvi123',
        password: '0e06bbf0',
        database: 'car_rental_sys'
})
//module.exports=options;