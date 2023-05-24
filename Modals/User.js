const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pendingFriends: {
    type: Array,
    required: true,
  },
  friends: {
    type: Array,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
