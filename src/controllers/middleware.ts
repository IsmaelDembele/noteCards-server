import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { subTopicsModel } from "../db/schemas/subTopicsSchema";
import { topicsModel } from "../db/schemas/topicsSchema";
import { UserModel } from "../db/schemas/userSchema";
import { errorLineSeparator } from "./constantes";
import bcrypt from "bcrypt";

export const decodeToken = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  try {
    if (token) {
      req.user = <jwt.JwtPayload>jwt.verify(token as string, process.env.JWT_SECRET as string);
      next();
    } else {
      console.error(errorLineSeparator, "no valid token");
      res.send(null)
    }
  } catch (error) {
    console.error(errorLineSeparator, "decodeToken :", error);
    res.send(null);
  }
};

export const getTopicID = async (req: Request, res: Response, next: NextFunction) => {
  let { topic } = req.query;
  const { userID } = req.user;

  if (!topic && req.body.topic) topic = req.body.topic;

  try {
    const topicM = await topicsModel.findOne({ userID, name: topic });
    req.topicID = topicM?._id;

    next();
  } catch (error) {
    console.log(errorLineSeparator, "gettopicID :", error);
    res.send(null);
  }
};

export const getTopicAndSubTopicID = async (req: Request, res: Response, next: NextFunction) => {
  let { topic, subTopic } = req.query;
  const { userID } = req.user;

  if (!topic && req.body.topic) topic = req.body.topic;
  if (!subTopic && req.body.subTopic) subTopic = req.body.subTopic;

  try {
    const topicM = await topicsModel.findOne({ userID, name: topic });
    const subTopicM = await subTopicsModel.findOne({ userID, name: subTopic, topic: topic });
    req.topicID = topicM?._id;
    req.subTopicID = subTopicM?._id;
    next();
  } catch (error) {
    console.log(errorLineSeparator, "getTopicAndSubTopicID :", error);
    res.send(null);
  }
};

export const verifyPassword = async (req: Request, res: Response, next: NextFunction) => {
  let { password } = req.body;
  const { userID } = req.user;

  if (!password) password = req.query.password;

  try {
    const user = await UserModel.findOne({ id: userID });
    req.verify = await bcrypt.compare(password, user?.password as string);
    if (req.verify) {
      next();
    } else {
      console.log("wrong password");
      res.send("wrong password");
    }
  } catch (error) {
    console.log(errorLineSeparator, "verifyPassword :", error);
  }
};
