//! Router variable calling our express library
const router = require("express").Router();
//! Message variable holding our Message model
const Message = require("../models/message_model");
//! Room variable holding our Room model
const Room = require("../models/room_model");
//! User variable holding our User model
const User = require("../models/user_model");

// Get all messages in a room
router.get("/rooms/:roomId/messages", async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.roomId });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
});

// Create a new message in a room
router.post("/rooms/:roomId/messages", async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const message = new Message({
      when: new Date(),
      user: req.body.userId,
      room: req.params.roomId,
      body: req.body.body,
    });

    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
});

// Update a message in a room
router.put("/rooms/:roomId/messages/:messageId", async (req, res) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.messageId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedMessage)
      return res.status(404).json({ message: "Message not found" });

    res.status(200).json(updatedMessage);
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
});

// Delete a message in a room
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