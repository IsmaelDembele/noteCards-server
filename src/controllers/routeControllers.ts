import { Request, Response } from "express";
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
    // console.log(result);
    res.send("ok");
  } catch (error) {
    console.log("post tipic :", error);
    res.send("error");
  }
};

export const postSubTopic = async (req: Request, res: Response) => {
  const { subtopic, topic } = req.body;

  console.log(subtopic, topic);

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
  console.log(req.query);

  try {
    const topic = await topicsModel.findOne({ name: req.query?.topic });
    console.log(topic);
    if (topic) {
      const subtopic = await subTopicsModel.find({ topicID: topic?._id });
      console.log("subtopic", subtopic);
      res.send(subtopic);
    }
  } catch (error) {
    res.send("error");
  }
};

export const getCards = (req: Request, res: Response) => {
  console.log(req.query);
};
