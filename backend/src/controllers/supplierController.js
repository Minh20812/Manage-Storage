import Supplier from "../models/SupplierModel.js";

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

const updateSupplierById = async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);

  if (supplier) {
    supplier.name = req.body.name || supplier.name;
    supplier.email = req.body.email || supplier.email;
    supplier.buyingPrice = req.body.buyingPrice || supplier.buyingPrice;
    supplier.category = req.body.category || supplier.category;
    supplier.contactNumber = req.body.contactNumber || supplier.contactNumber;
    supplier.product = req.body.product || supplier.product;

    const updatedSupplier = await supplier.save();

    res.json({
      _id: updatedSupplier._id,
      name: updatedSupplier.name,
      email: updatedSupplier.email,
      buyingPrice: updatedSupplier.buyingPrice,
      category: updatedSupplier.category,
      contactNumber: updatedSupplier.contactNumber,
      product: updatedSupplier.product,
    });
  } else {
    res.status(404);
    throw new Error("Supplier not found");
  }
};

const deleteSupplierById = async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);

  if (supplier) {
    await supplier.deleteOne({ _id: supplier._id });
    res.json({ message: "Supplier deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Supplier not found");
  }
};

export { addSupplier, getAllSuppliers, updateSupplierById, deleteSupplierById };
