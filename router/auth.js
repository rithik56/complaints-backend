const mongoose= require('mongoose')
const express = require('express')
const mdata = require('../model/schema')
const usdata = require('../model/schema2');
const router = express.Router()
/////////////////registering user////////////
router.post('/register',async(req,res)=>{
console.log(req.body)
   const{name,email,password}=req.body;
   if(!name||!email||!password){
      res.status(601).json({error:"fill all the forms correctly"}) 
      return 
   } 
   
   try {
    const data= await mdata.findOne({email:email})

    if(data){
      console.log("user registered already") 
       return alert("user already registered")
   // return res.status(401).json({error:"user already registered"})  
  
}
const fdata = new mdata(req.body);
console.log(fdata);
await fdata.save();
res.status(201).send("registration sucessfully");
window.alert("registration sucessfully");
}
catch(err){
console.log(err);
}


})

/////////////// sending users message from the contact us to mongodb ///////////////// 
 router.post('/contactus',async(req,res)=>{

try{
const{name,email,issue}=req.body;
if(!name||!email||!issue){
return res.status(401).json({error:"fill all details properly"})   
}

const username = await usdata.findOne({email:email});

if(!username){
   const userdata= new usdata(req.body);
   console.log(userdata);
   await userdata.save();
   res.status(201).send("your message has been stored once")  
}
if(username){
   console.log('ur message has been sent once and message can be sent once only');
   res.status(400).send("ur message has been sent once and message can be sent once only"); 
}
}
catch(err){
console.log(err);
}
})

module.exports= router
