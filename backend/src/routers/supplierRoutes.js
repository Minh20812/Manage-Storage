import express from "express";
import {
  addSupplier,
  getAllSuppliers,
  updateSupplierById,
  deleteSupplierById,
} from "../controllers/supplierController.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

router.post("/", asyncHandler(addSupplier));
router.get("/", asyncHandler(getAllSuppliers));
router
  .route("/:id")
  .put(asyncHandler(updateSupplierById))
  .delete(asyncHandler(deleteSupplierById));

export default router;
