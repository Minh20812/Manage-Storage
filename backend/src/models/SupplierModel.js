import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    product: { type: String, required: true },
    category: { type: String, required: true },
    buyingPrice: { type: Number, required: true },
    contactNumber: { type: String, required: true },
  },
  { timestamps: true }
);

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;
