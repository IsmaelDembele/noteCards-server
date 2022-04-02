import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { errorLineSeparator } from "./constantes";

//middleware
export const decodeToken = (req: any, res: Response, next: NextFunction) => {
  let { token } = req.query;

  if (!token) token = req.body.token;

  try {
    const decoded = <jwt.JwtPayload>jwt.verify(token as string, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(errorLineSeparator, "decodeToken :", error);

    res.send(null);
  }
};
