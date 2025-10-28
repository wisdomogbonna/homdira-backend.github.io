import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
        role: { type: String, enum: ["landlord", "tenant"], required: true },
          phone: String,
            createdAt: { type: Date, default: Date.now },
            });

            export default mongoose.model("User", userSchema);