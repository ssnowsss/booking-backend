const express = require("express")


const router = express.Router()
const {getRoom, getRooms, addRoom, updateRoom, deleteRoom, updateRoomAvilabile} = require("../controlers/rooms")
const { CheckAdmin } = require("../utils/cookieCheck")
// insert
router.post("/:hotelid", addRoom)
// router.post("/:hotelid",CheckAdmin, addRoom)
// update
router.put("/:id", updateRoom)
// router.put("/:id",CheckAdmin, updateRoom)
router.put("/avilable/:id", updateRoomAvilabile)


// router.delete("/:id/:hotelid",CheckAdmin, deleteRoom)
router.delete("/:id/:hotelid", deleteRoom)
// get
router.get("/:id", getRoom)
// getAll
router.get("/", getRooms)



module.exports = router