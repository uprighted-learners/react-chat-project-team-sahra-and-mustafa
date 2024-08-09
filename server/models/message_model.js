const mongoose = require("mongoose");
//! Message Schema
const MessageSchema = new mongoose.Schema({
  when: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("message", MessageSchema);
