const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const {Users} = require("../models");

const protect = asyncHandler(async(req,res,next)=>{
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
         token = req.headers.authorization.split(' ')[1];
         //verify token
         const decode = jwt.verify(token,`${process.env.JWT_SECRET}`);
         //Get user from the token
         req.user = await Users.findAll({where:{id:decode.id}});
         next();
    } catch (error) {
      console.log(error);
      // Use json() method here
      res.status(401).json({
        path: req.path,
        error: "Unauthorized",
        message: "Full authentication is required to access this resource",
        status: 401,
      });
    }
  }
  if(!token){
     // Use json() method here
    res.status(401).json({
      path: req.path,
      error: "Unauthorized",
      message: "Not authorized, no token",
      status: 401,
    });
  }
})


module.exports = {protect};



