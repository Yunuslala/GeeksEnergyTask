
const  {RegisterUser,loginUser, GetAllUser, UpdateUser, GetProfile}=require("../controllers/User.Controller");
const express=require("express");
const { Authentication } = require("../middlewares/Authenitcation");
const UserRouter=express.Router();



UserRouter.route("/auth/register").post(RegisterUser);
UserRouter.route("/auth/login").post(loginUser);
UserRouter.route("/user").get(Authentication,GetAllUser);
UserRouter.route("/Profile").get(Authentication,GetProfile);
UserRouter.route("/auth/user-update/:id").patch(Authentication,UpdateUser);



module.exports={
    UserRouter
}