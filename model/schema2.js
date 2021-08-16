const express= require('express');
const mongoose= require('mongoose');
const issueschema = new mongoose.Schema({
name:{
    type:String,
    required:true
} ,
email:{
    type:String,
    required:true}
,
issue:{
    type:String,
    required:true
}
})


 
const usdata= new mongoose.model("usdata",issueschema);
module.exports = usdata;

