const { connectRedis } = require("../config/redisconfig")
const Product=require("../models/productModel")
const dotenv=require("dotenv")

dotenv.config({path:"./.env"})







//create Product for admin only
exports.createProduct = async(req,res,next)=>{
    const product =await Product.create(req.body)
    res.status(201).json({message:"stored sucessfully"})

}


//get products
exports.getAllproducts = async(req,res)=>{
    let client = await connectRedis();
    const redisproduct= await client.get("allproducts")
    if(redisproduct){
        //console.log("from redis")
        //client.del("allproducts")
        
        //redis le data jailae ni string from mai store garxa so string lai json ma convert garna json.parse
        res.status(200).json(JSON.parse(redisproduct))

    }
    else{
        //console.log("from mongo")

    
    
        const product=await Product.find()
        await client.set("allproducts",JSON.stringify(product),"EX",100)
        res.status(200).json(product)
    }
}

//update product for admin
exports.updateProduct=async(req,res)=>{
    let product= await Product.findById(req.params.id)
    if(!product){
        res.status(500).json({
            message:"your product is not found"
        })
    }
    let updated_document=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json({
        message:"updated sucessfully"
    })
}
exports.deleteProduct=async(req,res)=>{
    let product= await Product.findById(req.query.id)
    
    if(!product){
        res.status(500).json({
            message:"your product is not found"
        })
    }
    await Product.findByIdAndDelete(req.query.id)
    res.status(200).json({
        message:"deleted sucessfully"
    })
}

exports.getPrice=async(req,res)=>{
    let product= await Product.findOne({name:req.query.name})
    
    if(product){
        
        res.status(200).json({price:product.price})
    }
}