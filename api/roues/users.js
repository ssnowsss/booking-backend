const express = require("express")

const router = express.Router()
const {getUser, getUsers, updateUser, deleteUser} = require("../controlers/users")
const {  CheckUser, CheckAdmin, cookieCheck } = require("../utils/cookieCheck")


// router.get("/ccheck", cookieCheck, (req, res,next) => {

//     res.send("you are authrized")
// })
// router.get("/cuser/:id", CheckUser, (req, res,next) => {

//     res.send("you are allowed")
// })
// router.get("/admin/:id", CheckAdmin, (req, res,next) => {

//     res.send("you are admin")
// })
// update
router.put("/:id", updateUser)
// router.put("/:id", CheckUser,updateUser)

// delete
router.delete("/:id", deleteUser)
// router.delete("/:id", CheckUser,deleteUser)
// get
router.get("/:id", getUser)
// router.get("/:id",CheckUser, getUser)
// getAll
router.get("/", getUsers)
// router.get("/",cookieCheck,CheckAdmin, getUsers)



module.exports = router