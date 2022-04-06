import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { subTopicsModel } from "../db/schemas/subTopicsSchema";
import { topicsModel } from "../db/schemas/topicsSchema";
import { UserModel } from "../db/schemas/userSchema";
import { errorLineSeparator } from "./constantes";

// const userExist = async (id: string): Promise<boolean> => {
//   try {
//     const user = await UserModel.findOne({ _id: id });
//     if (user) {
//       return true;
//     }

//     return false;
//   } catch (error) {
//     return false;
//   }
// };

//middleware
export const decodeToken = async (req: any, res: Response, next: NextFunction) => {
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

export const getTopicID = async (req: any, res: Response, next: NextFunction) => {
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

export const getTopicAndSubTopicID = async (req: any, res: Response, next: NextFunction) => {
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
    console.log(errorLineSeparator, "gettopicID :", error);
    res.send(null);
  }
};
