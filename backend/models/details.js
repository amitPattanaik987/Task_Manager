const mongoose=require("mongoose")

const details=mongoose.Schema({
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
})

const detailsmodel=mongoose.model("data",details);
module.exports=detailsmodel;