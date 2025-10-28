import express from "express";
import axios from "axios";
import { protect } from "../middleware/authMiddleware.js";
import Property from "../models/Property.js";

const router = express.Router();

// Initialize Paystack Payment
router.post("/init", protect, async (req, res) => {
  const { amount, email, propertyId } = req.body;
    const reference = `homdira_${Date.now()}`;

      try {
          const response = await axios.post(
                "https://api.paystack.co/transaction/initialize",
                      {
                              email,
                                      amount: Number(amount) * 100,
                                              reference,
                                                      metadata: { propertyId, userId: req.user.id },
                                                            },
                                                                  { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
                                                                      );
                                                                          res.json(response.data);
                                                                            } catch (err) {
                                                                                res.status(500).json({ message: "Error initializing payment" });
                                                                                  }
                                                                                  });

                                                                                  // Webhook
                                                                                  router.post("/webhook", express.json({ type: "*/*" }), async (req, res) => {
                                                                                    const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
                                                                                      const crypto = await import("crypto");

                                                                                        const hash = crypto.createHmac("sha512", PAYSTACK_SECRET).update(JSON.stringify(req.body)).digest("hex");
                                                                                          if (hash !== req.headers["x-paystack-signature"]) return res.status(400).send("Invalid signature");

                                                                                            const event = req.body;
                                                                                              if (event.event === "charge.success") {
                                                                                                  const ref = event.data.reference;
                                                                                                      const propertyId = event.data.metadata.propertyId;

                                                                                                          const property = await Property.findById(propertyId);
                                                                                                              if (property) {
                                                                                                                    property.isPremium = true;
                                                                                                                          property.premiumExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                                                                                                                                await property.save();
                                                                                                                                    }
                                                                                                                                      }
                                                                                                                                        res.sendStatus(200);
                                                                                                                                        });

                                                                                                                                        export default router;