import { Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
import connection from "./database/connect";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Test connection
connection.promise().query("Select * from users");

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Máy chủ đang hoạt động tại http://localhost:${port}`);
});
