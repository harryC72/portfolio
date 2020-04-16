import { Router } from "express";
import User from "../models/User";
import md5 from "md5";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth";

const router = Router();

const secret = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("USER", req.body);
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (user) res.status(400).json({ msg: "User already exists" });

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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) throw Error("User Does not exist");

    let hashedPassword = md5(password);

    let passwordCorrect = hashedPassword === user.passwordHash;

    if (!passwordCorrect) throw Error("Password incorrect!");

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: 3600 });
    if (!token) throw Error("Couldnt sign the token");

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-passwordHash")
    .then((user) => res.json(user));
});

export default router;
