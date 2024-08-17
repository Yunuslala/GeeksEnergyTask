const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  username: {
    type: String,
    required: true,
  },
  phoneNumber:{
    type:String,
    required:true
  },
  password: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model('User', UserSchema);

module.exports={
  UserModel
}
