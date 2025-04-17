
import express from 'express';
import User from '../models/User.js';


const router = express.Router();

import bcrypt from 'bcryptjs';
import generateToken from '../utils/auth.js';



router.post('/register', async (req, res) => {
  const { firstName, lastName, email, address, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      address,
      password: hashed
    });

    const token = generateToken(user._id, "user");
    res.json({ token, user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});



// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }
  const token = generateToken(user._id, "user");
  res.json({ token, user });
});

export default router;