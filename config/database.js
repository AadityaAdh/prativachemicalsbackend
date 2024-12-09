const mongoose=require("mongoose")
const dotenv=require("dotenv")

dotenv.config({path:"./config/config.env"})


const connectdatabase=()=>{
    mongoose.connect(process.env.DB_URL,{
        
        
        
    }).then(()=>{
        console.log("hello connected sucessfully")
    }).catch((error)=>{
        console.log(error)
    })
}
module.exports=connectdatabase