const mongoose=require("mongoose")
const worker=new mongoose.Schema({
  
    name:String,
   
    skills:String,
    mobile:String,
    email:String,
    availability:String,
    experience:String,
    address:String,

    image:String
})
module.exports=mongoose.model("wrk",worker);