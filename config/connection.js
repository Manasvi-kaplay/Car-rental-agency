var mysql=require("mysql");
//establishing a connection with mysql
module.exports=mysql.createPool({
    host: 'sql6.freesqldatabase.com',
        port:3306,
        user: 'sql6431778',
        password: 'r3rJeLmJ8D',
        database: 'sql6431778'
})
//module.exports=options;