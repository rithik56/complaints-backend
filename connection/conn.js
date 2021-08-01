const mongoose = require('mongoose');
const db = process.env.DATASTRING;
mongoose.connect(db,{
 useCreateIndex:true,
 useFindAndModify:true,
 useNewUrlParser:true,
 useUnifiedTopology:true   
}).then(()=>{
 console.log('conenction with atlas sucessful')   
}).catch((err)=>{
   console.log(err) 
})