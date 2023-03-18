const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
    title: {
        type: String,
        required: true, 
    },
    desc: {
        type: String,
        required: true, 
    },
    maxPeople: {
        type: Number,
        required: true, 
    },
    price: {
        type: Number,
        required: true
    },
    roomNumbers: [{number: Number, unavailableDates: {type: {Date}}}]

}, {timestamps: true}
)





module.exports = mongoose.model("Room", roomSchema)