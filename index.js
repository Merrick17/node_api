const express = require('express'); 
const bodyparser = require('body-parser'); 
const userRoute = require('./routes/userroutes'); 






const app = express(); 
app.use(bodyparser.urlencoded({extended:false})) ; 

app.use('/users',userRoute); 
app.listen(3000,()=>{

    console.log("running on port 3000"); 
}); 



