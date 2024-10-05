import express from "express";
import {
  addProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
} from "../controllers/inventoryController.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

router.post("/", asyncHandler(addProduct));
router.get("/", asyncHandler(getAllProducts));
router
  .route("/:id")
  .put(asyncHandler(updateProductById))
  .delete(asyncHandler(deleteProductById));

export default router;
