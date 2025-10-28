import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  landlord: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: String,
      description: String,
        price: Number,
          location: String,
            imageUrl: String,
              contact: String,
                isPremium: { type: Boolean, default: false },
                  premiumExpires: { type: Date, default: null },
                    createdAt: { type: Date, default: Date.now },
                    });

                    export default mongoose.model("Property", propertySchema);