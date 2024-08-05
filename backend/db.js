const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/details", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db=mongoose.connection;

db.on("connected",()=>{
    console.log("Database connected");
})

db.on("disconnected",()=>{
    console.log("Database disconnected");
})

db.on("error",(err)=>{
    console.log(err);
})

module.exports=db;