const Person=require("../models/personModel")
const mongoose = require('mongoose');
const dotenv=require("dotenv")

dotenv.config({path:"./.env"})


exports.createPerson = async(req,res,next)=>{
    try{
        phoneno=req.body.phone
        foundperson=await Person.findOne({"phone":phoneno})
        if(foundperson){
            await Person.findOneAndUpdate({"phone":phoneno},{"name":req.body.name,"phone":phoneno},{new:true})
        }
        else{
            const person =await Person.create(req.body)
        }
    res.status(201).json({message:"stored sucessfully"})
    }
    catch(e){
        console.log(e)
    }

}



exports.getAllPersons = async(req,res)=>{
    const person=await Person.find()
    res.status(200).json({message:"showed sucessfully",person})
}


exports.updatePerson=async(req,res)=>{
    
    let phoneno=req.body.phone
    let person= await Person.findOne({"phone":phoneno})
    if(!person){
        res.status(500).json({
            message:"your person is not found"
        })
    }
    const newCartProduct = {
        productname: req.body.cartproducts[0].productname,
        productquantity: req.body.cartproducts[0].productquantity,
        price: req.body.cartproducts[0].price,
        image: req.body.cartproducts[0].image
      };

    

    person.cartproducts.push(newCartProduct);
    await person.save();
    res.status(200).json({
        message:"updated sucessfully"
    })
}

exports.giveCart=async(req,res)=>{
    
    let person=await Person.findOne({phone:req.query.phone})
    
    if(person){
        //console.log("yes")
        let cartitems=person.cartproducts
        res.status(200).json({cartproducts:cartitems})
    }
}



exports.checkout=async(req,res)=>{
    
    let phoneno=req.body.phone
    let orderedproducts=req.body.cartitems
    let person=await Person.findOne({phone:phoneno})
    person.orderedproducts.push(...orderedproducts)
    person.price = isNaN(person.price) ? req.body.price : person.price + req.body.price;
    person.cartproducts=[]
    await person.save()



    
    //let person3=await Person.findOneAndUpdate({"phone":phoneno},{"orderedproducts":orderedproducts,"price":req.body.price},{new:true})
    //let person2=await Person.findOneAndUpdate({"phone":phoneno},{"cartproducts":[]},{new:true})
    res.status(200).json({"message":"sucessfully placed the order"})
}


exports.giveOrders=async(req,res)=>{
    let person=await Person.findOne({phone:req.query.phone})
    
    
    if(person){
        //console.log("yes")
        let ordereditems=person.orderedproducts
        res.status(200).json({orderedproducts:ordereditems})
    }

}

exports.deleteOrders=async(req,res)=>{
    let person=await Person.findOne({phone:req.query.phone})
    let elementid=req.query.id

    
    if(person){
        let ordereditems=person.orderedproducts
        
        for(let i=0;i<ordereditems.length;i++){
            if(ordereditems[i][0]._id==elementid){
                let name=ordereditems[i][0].productname
                let quantity=ordereditems[i][0].productquantity
                
                const response= await fetch(`${process.env.BASE_URL}/products/getPrice?name=${name}`,{
                    method:"GET"
                })
                if(response.ok){
                    let unitprice = await response.json();
                    let totalprice = unitprice.price * quantity;
                    person.price -= totalprice;
                    ordereditems.splice(i, 1);

                }

                
                
                break;
            }
        }

        await person.save();

        res.status(200).json({price:person.price})

        
    }

}

exports.getPrice=async(req,res)=>{
    phoneno=req.query.phone
    foundperson=await Person.findOne({"phone":phoneno})
    if(foundperson){
        res.status(200).json({price:foundperson.price})

    }
    

}


exports.updateOrders=async(req,res)=>{
    let person=await Person.findOne({phone:req.body.phone})
    let elementid=req.query.id
    
    
    if(person){
        let ordereditems=person.orderedproducts
        

        for(let j=0;j<ordereditems.length;j++){
            if(ordereditems[j][0]._id==elementid){
                const response= await fetch(`${process.env.BASE_URL}/products/getPrice?name=${ordereditems[j][0].productname}`,{
                    method:"GET"
                })
                if(response.ok){
                    let unitprice=await response.json()
                    let prevquantity=person.orderedproducts[j][0].productquantity
                    let newquantity=req.body.quantity
                    let quantitychange=newquantity-prevquantity
                    person.orderedproducts[j][0].productquantity=req.body.quantity;
                    person.price += (unitprice.price*quantitychange)


                }
                
                break;
            }
        
    }
    await person.save();

    res.status(200).json({"message":"sucessfull"})


}
else{
    res.status(400).json({"message":"unsucessfull"})
}
}


exports.getallOrders=async(req,res)=>{
    let persons=await Person.find() //array hudo raixa yo 
    let myallarray=[]
    for(let i=0;i<persons.length;i++){
        myallarray.push({name:persons[i].name,orderedproducts:persons[i].orderedproducts,price:persons[i].price})

    }
    res.status(200).json({result:myallarray})
}

