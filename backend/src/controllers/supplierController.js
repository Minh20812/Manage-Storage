import Supplier from "../models/supplierModel.js";

const addSupplier = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the request body

    const { name, email, product, category, buyingPrice, contactNumber } =
      req.body;

    // Ensure all fields are coming in correctly
    if (
      !name ||
      !email ||
      !product ||
      !category ||
      !buyingPrice ||
      !contactNumber
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSupplier = new Supplier({
      name,
      email,
      product,
      category,
      buyingPrice,
      contactNumber,
    });

    const savedSupplier = await newSupplier.save();
    res.status(201).json(savedSupplier);
  } catch (error) {
    console.error("Error:", error.message); // Log the full error message
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Supplier with this email already exists" });
    }
    res.status(500).json({ message: "Server error" }); // Return a more specific error message
  }
};

const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching suppliers", error });
  }
};

export { addSupplier, getAllSuppliers };
