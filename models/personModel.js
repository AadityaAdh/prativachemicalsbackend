const mongoose=require('mongoose')

const personSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please give your name"]
        
    },
    phone:{
        type:String,
        required:[true,"Phone no required"],
        maxLength:[10,"only 10 digits accepted"],
        
        
    },
    cartproducts:[{
        productname:{type:String},

    
    
        productquantity:{type:Number},
        price:{type:Number},
        image:{type:String}
    }
    ],
    orderedproducts:[
        [{
            productname:{type:String},
            productquantity:{type:Number},
            
            
        }]
        

    ],
    price:{type:Number}
    
    
    

})

module.exports=mongoose.model("persons",personSchema)