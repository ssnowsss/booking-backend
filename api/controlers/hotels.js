const hotel = require("../models/hotels")
const Room = require("../models/rooms")

const errorHandle = require("../utils/errorHandeler")



const addHotel = (req,res,next) => {
    const newHotel = new hotel(req.body)
    newHotel.save((err, result) => {
        if (err) {
              
            next(err)
            return
        }
        res.status(200).send(result)
        
    })
}
const updateHotel = (req,res,next) => {
    hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true},(err, result) => {
        if (err) {
            next(errorHandle(401, "eslam not found"))
            return
        }
        res.status(200).send(result)
    })
}
const deleteHotel = (req,res,next) => {
    hotel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            next(errorHandle(401, "eslam not found"))
            return
        }
        res.status(200).send("deleted")
    })
}
const getHotel = (req,res,next) => {
    hotel.findById(req.params.id,(err, result) => {
        if (err) {
            
            next(errorHandle(401, "eslam not found"))
            return
        }
        res.status(200).send(result)
    })
}
const getHotels = async(req,res,next) => {
    // hotel.find({features: true}, (err, result) => {
    //     if (err) {
    //         return
    //     }
    // })
    const {min, max, limit, ...other} = req.query
    try {
        let result = await hotel.find({...other, cheapestPrice: {$gt: +min || 1, $lt: +max || 999}}).limit(+limit)
        res.status(200).send(result)
    }catch(err) {
        next(err)
    }
}

const countByCity = async(req,res,next) => {
    const cities = req.query.cities.split(",")  
    try {
        let list = await Promise.all(cities.map((city) => {
           return hotel.countDocuments({city})
        }))
        res.status(200).send(list)
    } catch (err) {
        next(errorHandle(401, "eslam not found"))
    }
}
const countByType = async(req,res,next) => {
    try {
        let hotelsCount = await hotel.countDocuments({type: "hotels"})
        let apartmentsCount = await hotel.countDocuments({type: "apartments"})
        let resortsCount = await hotel.countDocuments({type: "resorts"})
        let villasCount = await hotel.countDocuments({type: "villas"})
        let cabinsCount = await hotel.countDocuments({type: "cabins"})
 
        res.status(200).send([
            {type: "hotels", count: hotelsCount},
            {type: "apartments", count: apartmentsCount},
            {type: "resorts", count: resortsCount},
            {type: "villas", count: villasCount},
            {type: "cabins", count: cabinsCount},
        ])
    } catch (err) {
        next(errorHandle(401, "eslam not found"))
    }
}
const getHotelRooms = async(req,res,next) => {
    const hotelId = req.params.id 
    try {
        let result = await hotel.findById(hotelId) 
        let list = await Promise.all(result.rooms.map(async(room) =>{
           return Room.findById(room)
        }))
        res.status(200).send(list)
    }catch(err) {
       next(errorHandle(401, "eslam not found"))
   }
}
module.exports = {getHotel, getHotelRooms, countByType, countByCity, getHotels, addHotel, updateHotel, deleteHotel}