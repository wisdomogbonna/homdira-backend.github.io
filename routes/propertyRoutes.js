import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Property from "../models/Property.js";
import cloudinary from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
    params: { folder: "homdira_properties", allowed_formats: ["jpg", "jpeg", "png"] },
    });
    const upload = multer({ storage });

    // Create property
    router.post("/", protect, upload.single("image"), async (req, res) => {
      try {
          const property = await Property.create({
                landlord: req.user.id,
                      title: req.body.title,
                            description: req.body.description,
                                  price: req.body.price,
                                        location: req.body.location,
                                              contact: req.body.contact,
                                                    imageUrl: req.file?.path,
                                                        });
                                                            res.json(property);
                                                              } catch (err) {
                                                                  res.status(500).json({ message: "Error creating property" });
                                                                    }
                                                                    });

                                                                    // Get all properties
                                                                    router.get("/", async (req, res) => {
                                                                      try {
                                                                          const properties = await Property.find().populate("landlord", "name email phone");
                                                                              res.json(properties);
                                                                                } catch (err) {
                                                                                    res.status(500).json({ message: "Error fetching properties" });
                                                                                      }
                                                                                      });

                                                                                      export default router;