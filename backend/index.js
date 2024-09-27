import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import userRoutes from "./src/routers/userRoutes.js";
import supplierRoutes from "./src/routers/supplierRoutes.js";

dotenv.config();
const port = process.env.PORT || 5001;

connectDB(); //kết nối đến cơ sở dữ liệu

const app = express(); //khởi tạo express app

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/suppliers", supplierRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
