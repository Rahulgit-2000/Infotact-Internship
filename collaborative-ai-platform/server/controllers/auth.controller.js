const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// UPDATED: include name + email in token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: "User already registered" });

    user = await User.create({ name, email, password, role });

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user), // FIXED
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const match = await user.comparePassword(password);
    if (!match)
      return res.status(400).json({ message: "Invalid email or password" });

    res.json({
      message: "Login successful",
      token: generateToken(user), // FIXED
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
