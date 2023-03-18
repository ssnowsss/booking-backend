const jwt = require("jsonwebtoken")
const errorHandle = require("./errorHandeler")


const cookieCheck = (req, res, next) => {
    const token = req.cookies.access_token
    if(!token) {
        return next(errorHandle(401, "you are unAuthrized"))  
    }
    
    jwt.verify(token, "Q94ppfMdo9F7BpAiZeVRpNm1DAMZtLqdBZ277t6A+wg=", (err, user) => {
        if(err) {
            return next(errorHandle(402, "invalid cookies"))  
        } else {
            req.user = user
            console.log(req.user);
            next()
        }
    })
}

const CheckUser = (req, res, next) => {
    cookieCheck(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
           return next(errorHandle(402, "your are not allowed"))  

       }
   })
}
const CheckAdmin = (req, res, next) => {
    // cookieCheck(req, res, () => {
        if(req.user.isAdmin) {
            next()
        } else {
           return next(errorHandle(402, "your are not Admin"))  

       }
//    })
}



module.exports = {cookieCheck, CheckUser, CheckAdmin}