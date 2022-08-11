import express, { Request, Response } from "express";
import cors from "cors";
import authRoute from "./routes/authRoutes";
import route from "./routes/routes";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import "dotenv/config";
export const app = express();

const main = async () => {
  // await mongoose.connect("mongodb://localhost:27017/notecard");
  await mongoose.connect(process.env.MONGO_URI as string);

  const port = process.env.PORT || 5000;

  const corsOptions = {
    origin: [process.env.ORIGIN as string],
    method: ["GET", "POST"],
    // credentials: app.get("env") !== "development",
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.get("/", (req: Request, res: Response) => {

    res.send("Server working...");
  });

  app.use(authRoute);
  app.use(route);

  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
};

main().catch(err => console.log(err));
