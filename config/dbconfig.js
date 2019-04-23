const mysql = require('mysql'); 
const conn = mysql.createConnection({
    host:'localhost', 
    user:'root', 
    password:'',
    database:'ecommerce'
    }); 
    conn.connect(()=>{

        console.log("connected to database "); 
    }); 
module.exports=conn ; 