const User = require("../models/users")
const errorHandle = require("../utils/errorHandeler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const addUser = new User({
        ...req.body,
        password: hash
    })
    addUser.save((err, result) => {
        if (err) {
            next(err)
            return
        }
        res.send(result)

    })
}
const login = (req, res, next) => {
    User.find({ username: req.body.username }, async (err, result) => {
        if (err) {
            next(errorHandle(500, "something went wrong"))
            return
        }
        if (result.length < 1) {
            res.status(404).send("not user found")
            return
        }
        const isCorrectPassword = await bcrypt.compare(req.body.password, result[0].password);
        if (!isCorrectPassword) {
            res.status(401).send("password wrong")

        } else {
            const token = jwt.sign({ id: result[0]._id, isAdmin: result[0].isAdmin }, "Q94ppfMdo9F7BpAiZeVRpNm1DAMZtLqdBZ277t6A+wg=")
            const { password, ...other } = result[0]._doc
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(other)
        }
    })
}



module.exports = { register, login }