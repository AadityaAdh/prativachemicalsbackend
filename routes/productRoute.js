const express=require("express")
const { getAllproducts,createProduct, updateProduct, deleteProduct, getPrice } = require("../controllers/productController")
const router=express.Router()


router.route("/products").get(getAllproducts)
router.route("/products/getPrice").get(getPrice)
router.route("/products/new").post(createProduct)
router.route("/products/:id").put(updateProduct)
router.route("/products/deleteProducts").delete(deleteProduct)

module.exports=router