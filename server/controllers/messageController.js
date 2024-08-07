//! Router variable calling our express library
const router = require("express").Router();
//! Message variable holding our Message model
const Message = require("../models/message_model");
//! Room variable holding our Room model
const Room = require("../models/room_model");
//! User variable holding our User model
const User = require("../models/user_model");
//!file validation
const validateFile = require("../middleware/validate");

//create a new message in a room
router.post("/create", async (req, res) => {
  try {
    const room = await Room.findById(req.body.room);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const user = await User.findById(req.body.user);
    if (!user) return res.status(404).json({ message: "User not found!" });

    const message = new Message({
      when: new Date(),
      user: req.body.user,
      room: req.body.room,
      body: req.body.body,
    });

    const savedMessage = await message.save();
    res.status(201).json({ savedMessage });
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
});
// get all messages in a room
router.get("/display/:id", async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
});

// update a message in a room

router.put("/update/:id", async (req, res) => {
  try {
    const original = await Message.findOne({ _id: req.params.id });

    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedMessage)
      return res.status(404).json({ message: "Message not found" });

    res.status(200).json({
      Updated: updatedMessage,
      Original: original,
    });
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
});

// delete a message in a room
router.delete("/rooms/:roomId/messages/:messageId", async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(
      req.params.messageId
    );
    if (!deletedMessage)
      return res.status(404).json({ message: "Message not found" });

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
});

module.exports = router;
