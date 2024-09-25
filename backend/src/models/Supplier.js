import mongoose from "mongoose";

const supplierSchema = mongoose.Schema(
  {
    supplierName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    product: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      unique: true,
    },
    buyingPrice: {
      type: Number,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Supplier = mongoose.model("Supplier", supplierSchema);
export default Supplier;
