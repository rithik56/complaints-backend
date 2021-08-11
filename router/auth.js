const mongoose= require('mongoose')
const express = require('express')
const mdata = require('../model/schema')
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
 const{name,email,message}=req.body;
if(!name||!email||!message){
return res.status(401).json({error:"fill all details properly"})   
}

const username = await mdata.findOne({email:email});
if(username){
await username.addmessage({name,email,message});
return res.status(201).json({message:"message added sucessfully"})
}

}
catch(err){
console.log(err);
}
})









module.exports= router