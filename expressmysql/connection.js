 // XAMPP
 const mysql  = require("mysql2");
 const db = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: '',      // this also could be root
     database: 'webdev',
     port: '3306' 
 });
 
 db.connect( (err)=> {
     if(err) throw err;
 });
 
 module.exports = db;
 