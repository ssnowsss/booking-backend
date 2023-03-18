const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cookieparser = require("cookie-parser")
const cors = require('cors')
const dotenv = require("dotenv") 

dotenv.config()



const authRouter = require("./api/roues/auth")
const usersRouter = require("./api/roues/users")
const roomsRouter = require("./api/roues/rooms")
const hotelsRouter = require("./api/roues/hotels")


mongoose.connect(process.env.MONGO, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to mongodb");
  }
});
// app.use(cors({
//   origin: ["http://eslamsamy:4000/"],
//   credentials: true,
//   sameSite: 'none'
// }))
app.use(cors())
app.use(cookieparser())
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/users", usersRouter)
app.use("/api/hotels", hotelsRouter)
app.use("/api/rooms", roomsRouter)
app.use("/", (req, res) => {
  res.send("hello")
})

app.use((err, req, res, next) => {
  const errStatus = err.status || 500
  const errMessage = err.message || "something went wrong"
  return res.status(errStatus).json(err.stack)
})

app.listen(8800, () => {
  console.log("connected to backend.");
})
