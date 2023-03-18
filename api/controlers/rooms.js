const Room = require("../models/rooms")
const hotel = require("../models/hotels")
const errorHandle = require("../utils/errorHandeler")

const addRoom = (req, res, next) => {
    const hotelId = req.params.hotelid
    const newRoom = new Room(req.body)
    newRoom.save((err, result) => {
        if (err) {

            next(errorHandle(401, "eslam not found"))
            return
        }
        hotel.findByIdAndUpdate(hotelId, { $push: { rooms: result._id } }, { new: true }, (err, rsesult) => {
            if (err) {
                next(errorHandle(401, "eslam not found"))
                return
            }
            console.log(rsesult);
        })
        res.status(200).send(result)

    })
}

const updateRoom = (req, res, next) => {
    Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, result) => {
        if (err) {
            next(errorHandle(401, "eslam not found"))
            return
        }
        res.status(200).send(result)
    })
}
const updateRoomAvilabile = async(req, res, next) => {
    try {
        let result = await Room.updateOne({"roomNumbers._id": req.params.id}, {
            $push: {"roomNumbers.$.unavailableDates": req.body.dates}
        })
        res.status(200).send(result)
    }catch(err) {
       next(errorHandle(401, "eslam not found"))

   }
}
const deleteRoom = (req, res, next) => {
    const hotelId = req.params.hotelid

    Room.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            next(errorHandle(401, "eslam not found"))
            return
        }
        hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } }, (err) => {
            if (err) {
                next(errorHandle(401, "eslam not found"))
                return
            }
            console.log("deleted");
        })
        res.status(200).send("deleted")
    })
}
const getRoom = (req, res, next) => {
    Room.findById(req.params.id, (err, result) => {
        if (err) {

            next(errorHandle(401, "eslam not found"))
            return
        }
        res.status(200).send(result)
    })
}
const getRooms = (req, res, next) => {
    Room.find((err, result) => {
        if (err) {
            next(errorHandle(401, "eslam not found"))
            return
        }
        res.status(200).send(result)
    })
}

module.exports = { addRoom,updateRoomAvilabile, updateRoom, getRoom, getRooms, deleteRoom }