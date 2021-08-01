const mongoose= require('mongoose')
const express = require('express')
const mdata = require('../model/schema')
const router = express.Router()

router.post('/register',async(req,res)=>{

   const{name,email,phoneno,password}=req.body;
   if(!name||!email||!phoneno||!password){
      res.status(601).json({error:"fill all the forms correctly"}) 
   } 
   
   try {
    const data= await mdata.findOne({phoneno:phoneno})

    if(data){
    return res.status(401).json({error:"user already registered"}) 
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