//! Router variable calling our express library
const router = require("express").Router();
//! Message variable holding our Message model
const Message = require("../models/message_model");
//! Room variable holding our Room model
const Room = require("../models/room_model");
//! User variable holding our User model
const User = require("../models/user_model");

//create a room
router.post("/create-room", async (req, res) => {
  try {
    const room = new Room({
      name: req.body.name,
      description: req.body.description,
      addedUsers: req.body.addedUsers,
    });

    const createdRoom = await room.save();
    console.log(createdRoom);
    res.status(200).json({ Main: createdRoom });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: err.message,
    });
  }
});

//display all rooms
router.get("/all", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ rooms });
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
});

module.exports = router;
