const AsyncErrorHandler = require("../middlewares/AsyncErrorHandler");
const { ErrorHandler } = require("../utils/Error.Handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserModel } = require("../models/User.model");


exports.RegisterUser = AsyncErrorHandler(async (req, res, next) => {
  try {
    const {
      email,username,password,phoneNumber,profession
    } = req.body;
    if(phoneNumber.length!=10){
      return   res
      .status(200)
      .send({ success: false, msg: "Phone Number should be 10 digit" });
    }
    const findExisting = await UserModel.findOne({ email });
    if (findExisting) {
      return   res
      .status(200)
      .send({ success: false, msg: "user is already registered go for login" });
    }
    const hash = await bcrypt.hash(password, 10);
  
    const saveUser = new UserModel({
    email,username,password:hash,phoneNumber,profession
    });
    
    await saveUser.save();
    return res.status(201).send({
      success: true,
      msg: "User has been registered sucessfully",
    });
  } catch (error) {
    console.log("error",error);
    return next(new ErrorHandler(error))
  }
 
});

exports.loginUser = AsyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(200)
      .send({ success: false, msg: "email and password required" });
  }
  let finduser = await UserModel.findOne({ email }).select("+password");
  if (!finduser) {
    return   res
    .status(200)
    .send({ success: false, msg: "email is not registered go for login" });
  }
  let compare = await bcrypt.compare(password, finduser.password);
  if (compare) {
    const token = await jwt.sign(
      { UserId: finduser._id },
      process.env.secret
    );
    return res.status(200).send({
      success: true,
      msg: "User has been login sucessfully",
      token,
      data: finduser,
    });
  } else {
    return   res
    .status(200)
    .send({ success: false, msg: "password is not correct" });
  }
});

exports.GetAllUser= AsyncErrorHandler(async (req, res, next) => {
 const data=await UserModel.find();
 if(!data.length){
  return res.status(200).send({success:false,msg:"Any User does not exist"})
 }
 return res.status(200).send({success:true,msg:"All User Dispersed",data})

});
exports.GetProfile= AsyncErrorHandler(async (req, res, next) => {
  const {UserId}=req.body;
  console.log("body",UserId,"reqbody",req.body);
  const data=await UserModel.findOne({_id:UserId});
  if(!data){
   return res.status(200).send({success:false,msg:"Any User does not exist"})
  }
  return res.status(200).send({success:true,msg:"User Updated",data})
 
 });
exports.UpdateUser= AsyncErrorHandler(async (req, res, next) => {
  const { email, name,phoneNumber,profession,UserId } = req.body;
  let finduser = await UserModel.findOne({ _id:UserId });
  if (!finduser) {
    return   res
    .status(200)
    .send({ success: false, msg: "email is not registered go for login" });
  }
  const Update=await UserModel.findOneAndUpdate({_id:UserId},{
    email:email?email:finduser.email,
    name:name?name:finduser.name,
    phoneNumber:phoneNumber?phoneNumber:finduser.phoneNumber,
    profession:profession?profession:finduser.profession,
  },{new:true})
    return res.status(200).send({
      success: true,
      msg: "User has been updated sucessfully",
      data: Update,
    });
});