const bcrypt = require('bcryptjs');
const User = require("../models/User");
const jwt = require("jsonwebtoken");


const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
   
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

   
    const hashedPassword = await hashPassword(password);

    
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

   
    const savedUser = await user.save();

    
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  
    return res.status(201).json({
      user: {
        username: savedUser.username,
        email: savedUser.email,
        id: savedUser._id
      },
      token
    });

  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const comparePasswords = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
    console.log("Stored Password Hash:", user.password);

 
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch); 

  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });


    if (!token) {
      return res.status(500).json({ message: "Error generating token" });
    }
   req.user ={
      username: user.username,
      email: user.email,
      id: user._id
    }
    
    return res.status(200).json({
      user: {
        username: user.username,
        email: user.email,
        id: user._id
      },
      token
    });

  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = { registerUser, loginUser };














