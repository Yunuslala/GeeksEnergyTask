const express=require("express");
require('dotenv').config();
const jwt=require("jsonwebtoken");
const { ErrorHandler } = require("../utils/Error.Handler");
const AsyncErrorHandler = require("./AsyncErrorHandler");

exports.Authentication=AsyncErrorHandler(
    async(req,res,next)=>{

    const token=req.headers.authorization;
    if(token){
        const decoded=jwt.verify(token,process.env.secret);
        
        if(decoded){
             req.body.UserId=decoded.UserId;
   
             next()
        }else{
            return next(new ErrorHandler(400,"Invalid token"))
        }
    }else{
        return next(new ErrorHandler(400,"Token is  required to use this resources"))
    }

}
)