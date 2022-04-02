import {  Request, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel, IUser } from "../db/schemas/userSchema";
import { errorLineSeparator } from "./constantes";

export interface IToken {
  userID: string;
  email: string;
  fisrtname: string;
  lastname: string;
}

export const getIsLogged = (req: any, res: Response) => {
  try {
    res.send({ email: req.user.email, firstname: req.user.firstname, lastname: req.user.lastname }); //send true
  } catch (error) {
    console.log("my error", error);
    res.send(null);
  }
};

export const postSignIn = async (req: Request, res: Response) => {
  const {
    logginInfo: { email, password },
  } = req.body;

  try {
    const user = await UserModel.findOne<IUser>({ email: email }).exec();
    const hash = user?.password as string;
    const verify = await bcrypt.compare(password, hash);
    if (!verify) {
      let msg = "error password";
      console.log(msg);
      res.send(msg);
    } else {
      const token = jwt.sign(
        {
          userID: user?._id,
          email: user?.email,
          firstname: user?.firstname,
          lastname: user?.lastname,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: 60 * 60 * 24 } //1d
      );

      res.send({
        token: token,
        msg: "ok",
        email,
        firstname: user?.firstname,
        lastname: user?.lastname,
      });
    }
  } catch (error) {
    console.log(errorLineSeparator, "postSignin :", error);
    res.send("error");
  }
};

export const postCreateAccount = async (req: Request, res: Response) => {
  const {
    signupInfo: { firstname, lastname, email, password, passwordConfirm },
  } = req.body;

  let hash: string;

  try {
    hash = await bcrypt.hash(password, 12);
    UserModel.insertMany([{ firstname, lastname, email, password: hash }], {}, (err, data) => {
      if (err) {
        console.log("error insert user in the db  error ", err);
        res.send("error");
      } else {
        console.log("new  account created");
        res.send("ok");
      }
    });
  } catch (error) {
    console.log(errorLineSeparator, "postCreateAccount :", error);
    res.send("error");
  }
};
