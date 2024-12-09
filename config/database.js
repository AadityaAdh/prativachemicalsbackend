const dotenv=require("dotenv")
const mongoose=require("mongoose")


dotenv.config({path:"./.env"})


const connectdatabase=()=>{
    
    mongoose.connect(process.env.DB_URL,{
        
        
        
    }).then(()=>{
        console.log("hello connected sucessfully")
    }).catch((error)=>{
        console.log(error)
    })
}
module.exports=connectdatabase