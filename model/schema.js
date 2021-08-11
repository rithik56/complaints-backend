const express = require('express');
const mongoose = require('mongoose');
const bcrypt= require('bcrypt');

const  clientSchema = new mongoose.Schema({
name:{
   type:String,
   required:true 
},
email:{
    type:String,
    required:true
},
password:{
   type:String,      
   required:true 
} ,
confirmpassword:{
  type:String,      
  required:true 
}  
})  
  //////////////////hashing a password/////////////////////
clientSchema.pre('save',async function(next){
if(this.isModified('password')){
 this.password=await bcrypt.hash('password',10)   
}
next();
})

/////////////////??................................./////


const mdata = new mongoose.model('mdata',clientSchema)

module.exports  = mdata;
