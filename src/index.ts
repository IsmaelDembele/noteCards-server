import express, { Request, Response } from "express";
import cors from "cors";
import authRoute from "./routes/authRoutes";
import route from "./routes/routes";
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

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(authRoute);
  app.use(route);

  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
};

main().catch(err => console.log(err));
