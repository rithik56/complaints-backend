const mongoose= require('mongoose')
const express = require('express')
const mdata = require('../model/schema')
const router = express.Router()

router.post('/register',async(req,res)=>{

   const{name,email,createpassword,confirmpassword}=req.body;
   if(!name||!email||!createpassword||!confirmpassword){
      res.status(601).json({error:"fill all the forms correctly"}) 
   } 
   
   try {
    const data= await mdata.findOne({email:email})

    if(data){
      console.log("user registered already") 
   return res.status(400).json({error:"user already registered"})  
  
}
const fdata = new mdata(req.body);
res.status(201).send("registration sucessfully");
console .log(fdata);
await fdata.save();
}
catch(err){
console.log(err);
}


})




module.exports= router
