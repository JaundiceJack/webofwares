const trycatch = require('express-async-handler');
const genToken = require('../../jwt/generateToken.js');
const jwt = require('jsonwebtoken');

// Create models
const User = require('../../models/User.js');

// POST: api/user/login | authorize user & get token | public
const loginUser = trycatch( async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await user.matchPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id)
    }); }
  else { res.status(401); throw new Error("User not found."); };
});

// POST api/user/ | create a new user | public
const registerUser = trycatch( async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    const newUser = await User.create({ name, email, password });
    if (newUser) {
      res.status(201);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: genToken(user._id)
      })
    }
    else { res.status(400); throw new Error("Invalid name, email, or password."); }
  }
  else { res.status(400); throw new Error("A user with that email already exists."); }
});

// GET: api/user/profile | get the user's information | private
const getProfile = trycatch( async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  }
  else { res.status(404); throw new Error("User not found.")}
});

// PUT: api/user/profile | update the user's information | private
const updateProfile = trycatch( async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: genToken(updatedUser._id)
    });
  }
  else { res.status(404); throw new Error("User not found.")}
});

const validateToken = trycatch( async (req, res) => {
  const valid = await jwt.verify(req.body.token, process.env.JWT_SECRET);
  if (valid) res.json(valid)
  else { res.status(400); throw new Error("Invalid token."); }
})

module.exports = { loginUser, getProfile, registerUser, updateProfile, validateToken };
