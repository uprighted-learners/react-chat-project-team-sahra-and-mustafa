//!Router variable calling our express library
const router = require("express").Router();
//! User variable holding our User model
const User = require("../models/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//creating new user/hashing password

// Creating a new user and hashing the password
router.post("/create", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user instance with the hashed password
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      //password: req.body.password,
      password: hashedPassword,
    });

    //saving the user to database
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
});

//user log in auth
router.post("/login", async (req, res) => {
  try {
    //find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // validate password

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).json({ message: "Invalid email or password" });

    // JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({ Msg: "USer signed In!", User: user[0], Token: token });
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
});

// updating user info
router.put("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.findOneIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
});

// delete a user which admin can do
router.delete("/:userId", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);

    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({
      Errror: err.message,
    });
  }
});

module.exports = router;
