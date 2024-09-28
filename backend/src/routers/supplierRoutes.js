import express from "express";
import {
  addSupplier,
  getAllSuppliers,
} from "../controllers/supplierController.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

router.post("/", asyncHandler(addSupplier));
router.get("/", asyncHandler(getAllSuppliers));

export default router;
