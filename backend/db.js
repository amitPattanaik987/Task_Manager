const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://amitpattanaik987:oIzxX1j9pkiPZRKA@cluster0.zq9oa5e.mongodb.net/", {
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