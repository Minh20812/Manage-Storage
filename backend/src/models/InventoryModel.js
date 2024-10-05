import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true, unique: true },
    threshholdValue: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    buyingPrice: { type: Number, required: true },
    availability: { type: String, required: true },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
