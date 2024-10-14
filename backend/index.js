import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import userRoutes from "./src/routers/userRoutes.js";

dotenv.config();
const port = process.env.PORT || 5001;

connectDB(); //kết nối đến cơ sở dữ liệu

const app = express(); //khởi tạo express app

app.use(
  cors({
    origin: [
      "https://manage-storage.web.app",
      "https://client-manage-storage.vercel.app/",
      "http://localhost:3000",
    ], // thêm tất cả các origin hợp lệ
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Nếu bạn sử dụng cookie để xác thực
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
