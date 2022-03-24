import { NextFunction, Request, Response, Router } from "express";
import "dotenv/config";
import jwt, { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel, IUser } from "../db/schemas/userSchema";

// console.log(process.env.JWT_SECRET, "my secret");

export const getIsLogged = (req: Request, res: Response, next: NextFunction) => {
  const { token, email } = req.query;

  try {
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    res.send(email === decoded?.email); //send true
  } catch (error) {
    console.log("my error ", error);
    res.send(false);
  }
};

export const postSignIn = async (req: Request, res: Response) => {
  const {
    logginInfo: { email, password },
  } = req.body;

  console.log(email, password);

  try {
    const user = await UserModel.findOne<IUser>({ email: email }).exec();

    const hash = user?.password as string;
    const verify = await bcrypt.compare(password, hash);
    if (!verify) {
      let msg = "error password";
      console.log(msg);
      res.send(msg);
    } else {
      console.log(user);

      const token = jwt.sign(
        { email: user?.email, fisrtname: user?.firstname, lastname: user?.lastname },
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
    console.log("sign in error ", error);
    res.send("error");
  }

  // res.send("ok1");
};

export const postCreateAccount = async (req: Request, res: Response) => {
  const {
    signupInfo: { firstname, lastname, email, password, passwordConfirm },
  } = req.body;

  let hash: string;

  console.log(firstname, lastname, email, password, passwordConfirm);

  try {
    hash = await bcrypt.hash(password, 12);
    UserModel.insertMany([{ firstname, lastname, email, password: hash }], {}, (err, data) => {
      if (err) {
        console.log("error insert user in the db  error ", err);
        res.send("error");
      }

      console.log("new  account created");
      console.log(data);
      console.log("   ---   ");

      res.send("ok");
    });
  } catch (error) {
    res.send(error);
  }

  // res.send("ok");
};
