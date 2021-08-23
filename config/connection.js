var mysql=require("mysql");
/*var options = {
    client: 'mysql',
    connection: {
        host: 'db4free.net',
        port:3306,
        user: 'manasvi123',
        password: '0e06bbf0',
        database: 'car_rental_sys'
    }
}*/
module.exports=mysql.createPool({
    host: 'sql6.freesqldatabase.com',
        port:3306,
        user: 'sql6431778',
        password: 'r3rJeLmJ8D',
        database: 'sql6431778'
})
//module.exports=options;