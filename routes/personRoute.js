const express=require("express")
const { getAllPersons,createPerson, updatePerson, deletePerson,giveCart,checkout, giveOrders, deleteOrders, getPrice, updateOrders, getallOrders } = require("../controllers/personController.js")
const router=express.Router()


router.route("/persons").get(getAllPersons)
router.route("/persons/new").post(createPerson)
router.route("/persons").put(updatePerson)
router.route("/persons/getcart").get(giveCart)
router.route("/persons/getorders").get(giveOrders)
router.route("/persons/deleteorders").delete(deleteOrders)
router.route("/persons/getPrice").get(getPrice)
router.route("/persons/updateOrders").put(updateOrders)
router.route("/persons/getallOrders").get(getallOrders)




router.route("/persons/checkout").put(checkout)


module.exports=router