const mongoose= require('mongoose')
const express = require('express')
const mdata = require('../model/schema')
const router = express.Router()
/////////////////registering user////////////
router.post('/register',async(req,res)=>{
<<<<<<< HEAD
console.log(req.body)
   const{name,email,password}=req.body;
   if(!name||!email||!password){
      res.status(601).json({error:"fill all the forms correctly"}) 
      return 
=======

   const { name, email, password } = req.body;
   if(!name || !email || !password){
      return res.status(400).json({error:"fill all the forms correctly"}) 
>>>>>>> 517bc7815a05d1e98853fa0c68a4a80d848f470b
   } 
   
   try {
    const data= await mdata.findOne({email:email})

    if(data){
      console.log("user registered already") 
<<<<<<< HEAD
       return alert("user already registered")
   // return res.status(401).json({error:"user already registered"})  
=======
   return res.status(400).json({error:"user already registered"})  
>>>>>>> 517bc7815a05d1e98853fa0c68a4a80d848f470b
  
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
