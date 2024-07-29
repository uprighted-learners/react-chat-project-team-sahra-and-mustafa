//!Router variable calling our express library
const router = require("express").Router();
//! User variable holding our User model
const User = require("../models/user_model");

router.post("create", (req, res) => {
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.email,
    });
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
});

module.exports = router;
