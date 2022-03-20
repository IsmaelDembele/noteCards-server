import express, { Request, Response } from "express";
import cors from "cors";
import authRoute from "./routes/authRoutes";
import mongoose from "mongoose";

const main = async () => {

  await mongoose.connect("mongodb://localhost:27017/notecard");

  const port = process.env.PORT || 5000;

  const corsOptions = {
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: false,
  };

  const app = express();

  const sign = {
    email: "a@a.com",
    password: "12345",
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  app.use(authRoute);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

main().catch(err => console.log(err));
