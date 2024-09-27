import express from "express";
import { addSupplier } from "../controllers/supplierController.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

router.post("/", asyncHandler(addSupplier));

export default router;
