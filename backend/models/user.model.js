const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  username: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
});
const Users = mongoose.model("Users", UserSchema);
module.exports = Users;
