import Inventory from "../models/inventoryModel.js";

const addProduct = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the request body

    const {
      product,
      quantity,
      threshholdValue,
      expiryDate,
      buyingPrice,
      availability,
    } = req.body;

    // Ensure all fields are coming in correctly
    if (
      !product ||
      !quantity ||
      !threshholdValue ||
      !expiryDate ||
      !buyingPrice ||
      !availability
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Inventory({
      product,
      quantity,
      threshholdValue,
      expiryDate,
      buyingPrice,
      availability,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error:", error.message); // Log the full error message
    if (error.code === 11000) {
      return res.status(400).json({ message: "This product already exists" });
    }
    res.status(500).json({ message: "Server error" }); // Return a more specific error message
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Inventory.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

const updateProductById = async (req, res) => {
  const product = await Inventory.findById(req.params.id);

  if (product) {
    availability, (product.product = req.body.product || product.product);
    product.quantity = req.body.quantity || product.quantity;
    product.buyingPrice = req.body.buyingPrice || product.buyingPrice;
    product.threshholdValue =
      req.body.threshholdValue || product.threshholdValue;
    product.expiryDate = req.body.expiryDate || product.expiryDate;
    product.availability = req.body.availability || product.availability;

    const updatedProduct = await product.save();

    res.json({
      _id: updatedProduct._id,
      product: updatedProduct.product,
      category: updatedProduct.category,
      buyingPrice: updatedProduct.buyingPrice,
      quantity: updatedProduct.quantity,
      unit: updatedProduct.unit,
      expiryDate: updatedProduct.expiryDate,
      threshholdValue: updatedProduct.threshholdValue,
      availability: updatedProduct.availability,
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

const deleteProductById = async (req, res) => {
  const product = await Inventory.findById(req.params.id);

  if (product) {
    await product.deleteOne({ _id: product._id });
    res.json({ message: "Product deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

export { addProduct, getAllProducts, updateProductById, deleteProductById };
