const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

const validateFile = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    console.log("Current header provided with request:", auth);
    if (!auth) throw new Error("Unauthorized");

    const token = auth.split(" ")[1];

    if (!token) throw new Error("Unauthoized");
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    //verify (string, secret)

    console.log("Decrypted payload:", decoded);

    const user = await User.findById(decoded.id);

    if (!user) throw new Error("User not found");

    console.log("User making request:", user);

    req.user = user;

    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    } else {
      return res.status(500).json({ error: err.message });
    }
  }
};

module.exports = validateFile;

/* console.log(err);
  res.status(400).json({
    Error: err.message, */
