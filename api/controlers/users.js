const User = require("../models/users")

const errorHandle = require("../utils/errorHandeler")


const updateUser = (req,res,next) => {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true},(err, result) => {
        if (err) {
            next(errorHandle(401, "eslam not found"))
            return
        }
        res.status(200).send(result)
    })
}
const deleteUser = (req,res,next) => {
    User.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            next(errorHandle(401, "eslam not found"))
            return
        }
        res.status(200).send("deleted")
    })
}
const getUser = (req,res,next) => {
    User.findById(req.params.id,(err, result) => {
        if (err) {
            
            next(errorHandle(401, "eslam not found"))
            return
        }
        res.status(200).send(result)
    })
}
const getUsers = (req,res,next) => {
    User.find((err, result) => {
        if (err) {
            next(errorHandle(401, "eslam not found"))
            return
        }
        res.status(200).send(result)
    })
}
module.exports = {getUser, getUsers, updateUser, deleteUser}