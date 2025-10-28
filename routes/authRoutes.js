import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
      const { name, email, password, role, phone } = req.body;
          const existing = await User.findOne({ email });
              if (existing) return res.status(400).json({ message: "User already exists" });

                  const hashed = await bcrypt.hash(password, 10);
                      const newUser = await User.create({ name, email, password: hashed, role, phone });

                          res.json({ message: "User registered", user: newUser });
                            } catch (err) {
                                console.error(err);
                                    res.status(500).json({ message: "Server error" });
                                      }
                                      });

                                      // Login
                                      router.post("/login", async (req, res) => {
                                        try {
                                            const { email, password } = req.body;
                                                const user = await User.findOne({ email });
                                                    if (!user) return res.status(400).json({ message: "User not found" });

                                                        const match = await bcrypt.compare(password, user.password);
                                                            if (!match) return res.status(400).json({ message: "Incorrect password" });

                                                                const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
                                                                    res.json({ token, user });
                                                                      } catch (err) {
                                                                          res.status(500).json({ message: "Server error" });
                                                                            }
                                                                            });

                                                                            export default router;