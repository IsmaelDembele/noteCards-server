import { Response } from "express";
import { cardsModel } from "../db/schemas/cardsSchema";
import { subTopicsModel } from "../db/schemas/subTopicsSchema";
import { topicsModel } from "../db/schemas/topicsSchema";
import { UserModel } from "../db/schemas/userSchema";
import { errorLineSeparator } from "./constantes";

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
    const exist = await topicsModel.find({ userID: req.user.userID, name: topic });
    if (exist && exist.length > 0) {
      throw new Error("The topic already exits");
    }
    await topicsModel.insertMany([{ userID: req.user.userID, name: topic }]);
    res.send("ok");
  } catch (error) {
    console.log(errorLineSeparator, "postTopic :", error);
    res.send("error");
  }
};

export const postSubTopic = async (req: any, res: Response) => {
  const { subtopic, topic } = req.body;
  try {
    const subT = await subTopicsModel.insertMany([
      { name: subtopic, topic: topic, topicID: req.topicID, userID: req.user.userID },
    ]);
    res.send("ok");
  } catch (error) {
    console.log(errorLineSeparator, "subtopic", error);

    res.send("error");
  }
};

export const getSubTopic = async (req: any, res: Response) => {
  const { topic } = req.query;
  const { userID } = req.user;

  try {
    const subtopics = await subTopicsModel.find({ topic, topicID: req.topicID, userID });
    res.send(subtopics);
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
      topicID: req.topicID,
      subTopicID: req.subTopicID,
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
  const { userID } = req.user;
  try {
    cardsModel.insertMany(
      [
        {
          front,
          back,
          note,
          topic,
          subTopic,
          topicID: req.topicID,
          subTopicID: req.subTopicID,
          userID,
        },
      ],
      {},
      (error, doc) => {
        if (error) {
          console.error("error while inserting cards\n", error);
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
  const { topic, subTopic } = req.query;
  const { userID } = req.user;
  try {
    const card = await cardsModel.find({
      topic,
      subTopic,
      topicID: req.topicID,
      subTopicID: req.subTopicID,
      userID,
    });
    res.send(card);
  } catch (error) {
    console.log(errorLineSeparator, "getCard", error);
    res.send("error");
  }
};

export const postUpdateCard = async (req: any, res: Response) => {
  const { topic, subTopic, front, back, note, cardID } = req.body;
  const { userID } = req.user;
  try {
    const result = await cardsModel.findByIdAndUpdate(
      { _id: cardID, userID },
      { front, back, note }
    );
    res.send("ok");
  } catch (error) {
    console.log(errorLineSeparator, "postUpdateCard", error);
    res.send("error");
  }
};

export const postDeleteCard = (req: any, res: Response) => {
  const { userID } = req.user;
  const { cardID } = req.body;

  cardsModel.findOneAndDelete({ _id: cardID, userID }, {}, err => {
    if (err) {
      console.log(errorLineSeparator, "postDeleteCard", err);
      res.send("error");
    } else {
      res.send("ok");
    }
  });
};

export const postDeleteTopics = async (req: any, res: Response) => {
  const { userID } = req.user;
  try {
    const cards = await cardsModel.deleteMany({ userID });
    const subtopic = await subTopicsModel.deleteMany({ userID });
    const topics = await topicsModel.deleteMany({ userID });
    res.send("ok");
  } catch (error) {
    console.log(errorLineSeparator, "postDeleteTopics", error);
    res.send("error");
  }
};

export const postDeleteSubTopics = async (req: any, res: Response) => {
  const { userID } = req.user;

  try {
    const cards = await cardsModel.deleteMany({
      userID,
      topicID: req.topicID,
    });
    const subtopic = await subTopicsModel.deleteMany({ userID, topicID: req.topicID });
    res.send("ok");
  } catch (error) {
    console.log(errorLineSeparator, "postDeleteSubTopics", error);
    res.send("error");
  }
};

export const postDeleteCards = async (req: any, res: Response) => {
  const { userID } = req.user;
  const { topic, subTopic } = req.body;
  try {
    const cards = await cardsModel.deleteMany({
      userID,
      topic,
      subTopic,
      topicID: req.topicID,
      subTopicID: req.subTopicID,
    });
    res.send("ok");
  } catch (error) {
    console.log(errorLineSeparator, "postDeleteCards", error);
    res.send("error");
  }
};

export const postDeleteTopic = async (req: any, res: Response) => {
  const { userID } = req.user;
  const { topic } = req.body;

  console.log("userID", userID);
  console.log("req.topicID ", req.topicID);

  try {
    await cardsModel.deleteMany({ userID, topicID: req.topicID });
    await subTopicsModel.deleteMany({ userID, topicID: req.topicID, topic });
    await topicsModel.findOneAndDelete({ userID, name: topic });
    res.send("ok");
  } catch (error) {
    console.log(errorLineSeparator, "postDeleteTopic", error);
    res.send("error");
  }
};

export const postRenameTopic = async (req: any, res: Response) => {
  const { userID } = req.user;
  const { topic, newTopic } = req.body;

  console.log(userID, topic, newTopic);

  try {
    await cardsModel.updateMany({ userID, topicID: req.topicID, topic }, { topic: newTopic });
    await subTopicsModel.updateMany({ userID, topic, topicID: req.topicID }, { topic: newTopic });
    await topicsModel.findOneAndUpdate({ userID, name: topic }, { name: newTopic });
    res.send("ok");
  } catch (error) {
    console.log(errorLineSeparator, "postRenameTopic", error);
    res.send("error");
  }
};

export const postDeleteSubTopic = async (req: any, res: Response) => {
  const { userID } = req.user;
  const { topic, subTopic } = req.body;
  try {
    await cardsModel.deleteMany({ userID, subTopicID: req.subTopicID, topicID: req.topicID });
    await subTopicsModel.findByIdAndDelete({
      userID,
      topicID: req.topicID,
      _id: req.subTopicID,
    });
    res.send("ok");
  } catch (error) {
    console.log(errorLineSeparator, "postDeleteSubTopic", error);
    res.send("error");
  }
};

export const postRenameSubTopic = async (req: any, res: Response) => {
  const { userID } = req.user;
  const { topic, subTopic, newSubTopic } = req.body;
  try {
    await cardsModel.findOneAndUpdate(
      { userID, topicID: req.topicID, subTopicID: req.subTopicID },
      { subTopic: newSubTopic }
    );

    await subTopicsModel.findByIdAndUpdate(
      { userID, topicID: req.topicID, _id: req.subTopicID },
      { name: newSubTopic }
    );
    res.send("ok");
  } catch (error) {
    console.log(errorLineSeparator, "postRenameSubTopic", error);
    res.send("error");
  }
};

export const getAllCards = async (req: any, res: Response) => {
  const { userID } = req.user;
  try {
    const result = await cardsModel.find({ userID });
    res.send(result);
  } catch (error) {
    console.log(errorLineSeparator, "getAllCards", error);
    res.send("error");
  }
};

export const getAllCardsOfTopic = async (req: any, res: Response) => {
  const { userID } = req.user;
  const { topic } = req.query;
  try {
    const result = await cardsModel.find({ userID, topic });
    res.send(result);
  } catch (error) {
    console.log(errorLineSeparator, "getAllCardsOfTopic", error);
    res.send("error");
  }
};

export const deleteAccount = async (req: any, res: Response) => {
  const { userID } = req.user;

  try {
    await cardsModel.deleteMany({ userID });
    await subTopicsModel.deleteMany({ userID });
    await topicsModel.deleteMany({ userID });
    await UserModel.findByIdAndDelete({ _id: userID });
    res.send("ok");
  } catch (error) {
    console.log(errorLineSeparator, "deleteAccount", error);
    res.send("error");
  }
};
