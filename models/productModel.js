const mongoose=require('mongoose')

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please give your name"]
        
    },
    description:{
        type:String,
        required:[true,"Product description required"]
        
    },
    price:{
        type:Number,
        required:[true,"Product price required"],
        maxLength:[10,"price is too high"]
        
    },
    rating:{
        type:Number,
        default:0
    },
    images:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:[true,"Enter valid stock no"],
        maxLength:[4,"limit is of 4 digits"]
    },
    reviews:[
        {
            name:{
                type:String,
                
            }
        },
        {
            rating:{
                type:Number,
                
                default:0
            }
        },
        {
            comment:{
                type:String
            }
        }
    ]
    

})

module.exports=mongoose.model("products",productSchema)