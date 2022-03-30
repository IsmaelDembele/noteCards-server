import { Request, Response } from "express";
import { cardsModel } from "../db/schemas/cards";
import { subTopicsModel } from "../db/schemas/subTopics";
import { topicsModel } from "../db/schemas/topicsSchema";

export const getTopic = async (req: Request, res: Response) => {
  try {
    const topics = await topicsModel.find({});
    res.send(topics);
  } catch (error) {
    console.log("get topic :", error);
    res.send(error);
  }
};

export const postTopic = async (req: Request, res: Response) => {
  const { topic } = req.body;

  try {
    const result = await topicsModel.insertMany([{ name: topic }]);
    res.send("ok");
  } catch (error) {
    console.log("post tipic :", error);
    res.send("error");
  }
};

export const postSubTopic = async (req: Request, res: Response) => {
  const { subtopic, topic } = req.body;
  try {
    const topicdata = await topicsModel.findOne({ name: topic });
    if (topicdata?._id) {
      await subTopicsModel.insertMany([{ name: subtopic, topicID: topicdata?._id }]);
    } else {
      res.send("error");
    }
    res.send("ok");
  } catch (error) {
    res.send("error");
  }
};

export const getSubTopic = async (req: Request, res: Response) => {
  try {
    const topic = await topicsModel.findOne({ name: req.query?.topic });
    if (topic) {
      const subtopic = await subTopicsModel.find({ topicID: topic?._id });
      res.send(subtopic);
    }
  } catch (error) {
    res.send("error");
  }
};

export const getCards = async (req: Request, res: Response) => {
  const { topic, subTopic } = req.query;

  try {
    const cards = await cardsModel.find({ topic: topic, subTopic: subTopic });
    res.send(cards);
  } catch (error) {
    console.error(error);
    res.send("error");
  }
};

export const addCards = async (req: Request, res: Response) => {
  const { topic, subTopic, front, back, note } = req.body;

  try {
    cardsModel.insertMany(
      [{ front, back, note, topic: topic, subTopic: subTopic }],
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
    res.send("error");
  }
};
