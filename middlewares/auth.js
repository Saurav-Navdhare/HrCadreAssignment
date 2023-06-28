const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {     // This middleware will be used to check if the user is logged in or not, need to apply before each login essential route
    const token = req.cookies.token;
    // Above line === if we had an authHeader then return authHeader.split(' ')[1] i.e token else return undefined
    if(!token)  // If token is not present in cookies, redirect to login page
        return res.status(401).redirect(`/login?message=${encodeURIComponent("Please login to continue")}`)

    jwt.verify(token, process.env.JWT_SECRET, (err,user)=>{
        if(err){ // If token is invalid, redirect to login page
            res.clearCookie("token");   // Clear the cookie
            return res.redirect(`/login?message=${encodeURIComponent("Please login to continue")}`)
        }
        req.name = user.name;
        req.username = user.username
        next();
    })
}

module.exports = {authenticateToken}