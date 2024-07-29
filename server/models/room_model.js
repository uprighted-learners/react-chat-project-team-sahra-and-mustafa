const mongoose = require("mongoose");
//! New Room setup
const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: String,
  },
  addedUsers: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("room", RoomSchema);
