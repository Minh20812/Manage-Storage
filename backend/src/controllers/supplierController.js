import Supplier from "../models/supplierModel.js";

export const addSupplier = async (req, res) => {
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

// import asyncHandler from "../middlewares/asyncHandler.js";
// import Supplier from "../models/SupplierModel.js";

// const addSupplier = asyncHandler(async (req, res) => {
//   console.log("Received request body:", req.body); // Debug log

//   const {
//     supplierName,
//     email,
//     product,
//     category,
//     buyingPrice,
//     contactNumber,
//     type,
//   } = req.body;

//   const requiredFields = [
//     "supplierName",
//     "email",
//     "product",
//     "category",
//     "buyingPrice",
//     "contactNumber",
//     "type",
//   ];
//   const missingFields = requiredFields.filter((field) => !req.body[field]);

//   if (missingFields.length > 0) {
//     console.log("Missing fields:", missingFields); // Debug log
//     return res.status(400).json({
//       message: `Missing required fields: ${missingFields.join(", ")}`,
//     });
//   }

//   // Kiểm tra định dạng email
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     console.log("Invalid email:", email); // Debug log
//     return res.status(400).json({ message: "Invalid email format" });
//   }

//   // Kiểm tra định dạng số điện thoại (giả sử là số 10 chữ số)
//   const phoneRegex = /^\d{10}$/;
//   if (!phoneRegex.test(contactNumber)) {
//     console.log("Invalid phone number:", contactNumber); // Debug log
//     return res.status(400).json({ message: "Invalid phone number format" });
//   }

//   const buyingPriceNumber = Number(buyingPrice);
//   if (isNaN(buyingPriceNumber) || buyingPriceNumber <= 0) {
//     console.log("Invalid buying price:", buyingPrice); // Debug log
//     return res.status(400).json({ message: "Invalid buying price" });
//   }

//   try {
//     const newSupplier = new Supplier({
//       supplierName,
//       email,
//       product,
//       category,
//       buyingPrice: buyingPriceNumber,
//       contactNumber,
//       type,
//     });

//     console.log("Attempting to save supplier:", newSupplier); // Debug log

//     const savedSupplier = await newSupplier.save();
//     console.log("Supplier saved successfully:", savedSupplier); // Debug log
//     res.status(201).json(savedSupplier.toJSON());
//   } catch (error) {
//     console.error("Error saving supplier:", error); // Error log
//     if (error.code === 11000) {
//       // Xử lý lỗi trùng lặp unique key (ví dụ: email)
//       res
//         .status(400)
//         .json({ message: "Supplier with this email already exists" });
//     } else {
//       // Xử lý các lỗi khác
//       res.status(500).json({
//         message: "Error saving supplier",
//         error: error.message,
//         stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
//       });
//     }
//   }
// });

// const updateSupplierById = asyncHandler(async (req, res) => {
//   // Code to update a supplier
// });

// const deleteSupplierById = asyncHandler(async (req, res) => {
//   // Code to delete a supplier
// });

// const getAllSuppliers = asyncHandler(async (req, res) => {
//   // Code to get all suppliers
// });

// const getSupplierById = asyncHandler(async (req, res) => {
//   // Code to get a supplier by ID
// });

// export {
//   addSupplier,
//   updateSupplierById,
//   deleteSupplierById,
//   getAllSuppliers,
//   getSupplierById,
// };
