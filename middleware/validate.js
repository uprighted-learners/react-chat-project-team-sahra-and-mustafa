const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

const validateSession = async (req, res, next) => {
  const auth = req.headers.authorization;
  console.log("Current header provided with request:", auth);
  try {
    if (!auth) throw new Error("Unauthorized");

    const token = auth.split(" ")[1];

    if (!token) throw new Error("Unauthoized");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //verify (string, secret)

    console.log("Decrypted payload:", decoded);

    const user = await User.findById(decoded._id);

    if (!user) throw new Error("User not found");

    console.log("User making request:", user);

    req.user = user;

    return next();
  } catch (err) {
    console.log(err);
    res.status(400).json({
      Error: err.message,
    });
  }
};

module.exports = validateSession;
