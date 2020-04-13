import { Router } from "express";
import User from "../models/User";
import md5 from "md5";
import jwt from "jsonwebtoken";

const router = Router();

const secret = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (user) throw Error("User already exists");

    const newUser = new User({
      name,
      email,
      passwordHash: md5(password),
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error("Something went wrong saving the user");

    const token = jwt.sign({ id: savedUser._id }, secret, { expiresIn: 3600 });

    res.status(200).json({
      token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
