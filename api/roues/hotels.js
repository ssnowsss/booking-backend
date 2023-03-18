const express = require("express")


const router = express.Router()
const {getHotel, getHotels, addHotel, updateHotel, deleteHotel, countByCity, countByType, getHotelRooms} = require("../controlers/hotels")
const { CheckAdmin } = require("../utils/cookieCheck")
// insert
router.post("/", addHotel)
// router.post("/",CheckAdmin, addHotel)
// update
router.put("/:id", updateHotel)


router.delete("/:id", deleteHotel)
// router.put("/:id",CheckAdmin, updateHotel)


// router.delete("/:id",CheckAdmin, deleteHotel)
// get
router.get("/find/:id", getHotel)
// getAll
router.get("/", getHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRooms)



module.exports = router