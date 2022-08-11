import { Request, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel, IUser } from "../db/schemas/userSchema";
import { errorLineSeparator, nbdays, saltOrRounds } from "./constantes";
import { app } from "..";

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
    console.log(errorLineSeparator, "getIsLogged", error);
    res.status(500).send(null);
  }
};

export const postSignIn = async (req: Request, res: Response) => {
  const {
    logginInfo: { email, password },
  } = req.body;

  try {
    const user = await UserModel.findOne<IUser>({ email: email }).exec();
    const hash = user?.password as string;
    let verify = false;
    if (password && hash) verify = await bcrypt.compare(password, hash);
    if (!verify) {
      let msg = "Error email/password";
      console.log(msg);
      res.status(403).send(msg);
    } else {
      const token = jwt.sign(
        {
          userID: user?._id,
          email: user?.email,
          firstname: user?.firstname,
          lastname: user?.lastname,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: 60 * 60 * 24 * nbdays }
      );

      // res.cookie("token", token, {
      //   maxAge: 1000 * 60 * 60 * 24, //1d
      //   httpOnly: true,
      //   secure: app.get("env") !== "development",
      // });
      res.cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24, //1d
        httpOnly: true,
        secure: app.get("env") !== "development",
        sameSite: app.get("env") !== "development" ? "none" : "lax",
      });

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
    res.status(500).send("internal error");
  }
};

export const postCreateAccount = async (req: Request, res: Response) => {
  const {
    signupInfo: { firstname, lastname, email, password, passwordConfirm },
  } = req.body;

  let hash: string;

  try {
    hash = await bcrypt.hash(password, saltOrRounds);
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

export const changePassword = async (req: Request, res: Response) => {
  const { userID } = req.user;
  const { newPassword } = req.body;

  try {
    const hash = await bcrypt.hash(newPassword, saltOrRounds);
    await UserModel.findByIdAndUpdate({ _id: userID }, { password: hash });
    res.send("ok");
  } catch (error) {
    console.log(errorLineSeparator, "changePassword", error);
    res.send("error");
  }
};

export const signOut = async (req: Request, res: Response) => {
  //some browser do not clear the cookie for some reason
  //we will set a wrong token for those one in order to signout
  res.cookie("token", "token", {
    maxAge: 1000 * 60 * 60 * 24, //1d
    httpOnly: true,
    secure: app.get("env") !== "development",
    sameSite: app.get("env") !== "development" ? "none" : "lax",
  });

  res.clearCookie("token");

  res.send("ok");
};
