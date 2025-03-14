import { Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
import connection from "./database/connect";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";

dotenv.config();

// Khởi tạo ứng dụng
const app = express();

// Cổng mặc định
const port = process.env.PORT || 3000;

// Xử lý dữ liệu dạng json
app.use(express.json());

// Xử lý dữ liệu dạng URL-encoded
app.use(express.urlencoded({ extended: true }));

// Kiểm tra kết nối tới database
connection.promise().query("Select * from users");

// Khởi tạo router
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Sử dụng router
app.use("/auth", authRouter);
app.use("/user", userRouter);

// Lắng nghe máy chủ
app.listen(port, () => {
  console.log(`Máy chủ đang hoạt động tại http://localhost:${port}`);
});
