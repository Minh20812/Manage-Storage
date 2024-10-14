import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import userRoutes from "./src/routers/userRoutes.js";
import supplierRoutes from "./src/routers/supplierRoutes.js";
import inventoryRoutes from "./src/routers/inventoryRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB(); //kết nối đến cơ sở dữ liệu

const app = express(); //khởi tạo express app

// Cấu hình CORS
app.use(
  cors({
    origin: ["https://manage-storage.web.app", "http://localhost:3000"], // thêm tất cả các origin hợp lệ
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Nếu bạn sử dụng cookie để xác thực
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.send("API is working");
});

app.use("/api/users", userRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/products", inventoryRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
