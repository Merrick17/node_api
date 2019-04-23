const express = require('express'); 
const conn = require('../config/dbconfig'); 
const jwt = require('jsonwebtoken'); 
const verifToken = require('./veriftoken'); 
const bcrypt = require('bcrypt'); 
const router = express.Router(); 
router.get('/',(req,res)=>{

    /* const users = ["user1","user2","user3"] ; 
     res.json({ "names" :users}); */
     conn.query('SELECT * FROM users ',(err,result)=>{
 
 
         res.json({ 
             "users":result 
         }); 
     }) 
 }); 
 
 
 router.get('/:id',(req,res)=>{
     const id = req.params.id ; 
     const users = ["user1","user2","user3"] ; 
     res.json({ "names" :users[id]});  
 }); 
 
 router.post('/signup',(req,res)=>{
     const nom = req.body.nom ; 
     const prenom= req.body.prenom ; 
     const adresse = req.body.adresse ; 
     const email = req.body.email ; 
     const tel = req.body.tel ; 
     const role = req.body.role ;
     const psw = req.body.password ;  
 bcrypt.hash(psw,10,(err,hash)=>{
     const requete = "INSERT INTO `users`( `nom`, `prenom`, `adresse`, `email`, `tel`, `role`, `password`) VALUES (?,?,?,?,?,?,?)"
     conn.query(requete,[nom,prenom,adresse,email,tel,role,hash],(err,result)=>{
         if(err) {
             console.log(err); 
         }else
         {
             res.json({"result":result});
         }
          
     })
     
 })
 
 }); 
 
 router.post('/login',(req,res)=>{
 const email = req.body.email ; 
 const psw = req.body.psw ; 
 const requete =" SELECT * FROM users WHERE email = ? " ; 
 conn.query(requete,[email],(err,result)=>{
 
     if(err){
         console.log(err); 
     }else 
 
     {
         if(result.length==0)
         {
             res.json({"err":"email inexistant"}); 
         }else
         {
             bcrypt.compare(psw,result[0].password ,(err,same)=>{
                 if(same==true){
                     const token = jwt.sign(result[0].id,"mysecretKey"); 
                     res.json({"auth":"success" , 
                     "id":result[0].id , 
                 "token":token}); 
                 }else
                 {
                     res.json({"auth":"failed"}); 
                 }
             })
         }
     }
 })
 
 }); 

 module.exports = router ; 