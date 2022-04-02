import { Request, Response } from "express";
import { cardsModel } from "../db/schemas/cards";
import { subTopicsModel } from "../db/schemas/subTopics";
import { topicsModel } from "../db/schemas/topicsSchema";
import { IToken, verifyJwtToken } from "./authControllers";

const errorLineSeparator = "####################################\n";

export const getTopic = async (req: any, res: Response) => {
  try {
    const topics = await topicsModel.find({ userID: req.user.userID });
    res.send(topics);
  } catch (error) {
    console.log(errorLineSeparator, "getTopic :", error);
    res.send(error);
  }
};

export const postTopic = async (req: any, res: Response) => {
  const { topic } = req.body;

  try {
    await topicsModel.insertMany([{ name: topic, userID: req.user.userID }]);
    res.send("ok");
  } catch (error) {
    console.log(errorLineSeparator, "postTipic :", error);
    res.send("error");
  }
};

export const postSubTopic = async (req: any, res: Response) => {
  const { subtopic, topic } = req.body;
  try {
    const topicdata = await topicsModel.findOne({ name: topic });
    if (topicdata?._id) {
      await subTopicsModel.insertMany([
        { name: subtopic, topicID: topicdata?._id, userID: req.user.userID },
      ]);
    } else {
      res.send("error");
    }
    res.send("ok");
  } catch (error) {
    console.log(errorLineSeparator, "subtopic", error);

    res.send("error");
  }
};

export const getSubTopic = async (req: any, res: Response) => {
  const { topic: topicName } = req.query;

  try {
    const topic = await topicsModel.findOne({ name: topicName, userID: req.user.userID });
    if (topic) {
      const subtopic = await subTopicsModel.find({
        topicID: topic?._id,
        userID: req.user.userID,
      });
      res.send(subtopic);
    }
  } catch (error) {
    console.log(errorLineSeparator, "getSubTopic", error);

    res.send("error");
  }
};

export const getCards = async (req: any, res: Response) => {
  const { topic, subTopic } = req.query;

  try {
    const cards = await cardsModel.find({
      topic: topic,
      subTopic: subTopic,
      userID: req.user.userID,
    });
    res.send(cards);
  } catch (error) {
    console.log(errorLineSeparator, "getCards", error);

    res.send("error");
  }
};

export const addCard = async (req: any, res: Response) => {
  const { topic, subTopic, front, back, note } = req.body;

  try {
    cardsModel.insertMany(
      [{ front, back, note, topic: topic, subTopic: subTopic, userID: req.user.userID }],
      {},
      (error, doc) => {
        if (error) {
          console.error("error while inserting cards", error);
        } else {
          res.send("ok");
        }
      }
    );
  } catch (error) {
    console.log(errorLineSeparator, "addCard", error);

    res.send("error");
  }
};

export const getCard = async (req: any, res: Response) => {
  const { cardid } = req.query;
  try {
    const card = await cardsModel.findOne({ _id: cardid, userID: req.user.userID });
    res.send(card);
  } catch (error) {
    console.log(errorLineSeparator, "getCard", error);
    res.send("error");
  }
};
