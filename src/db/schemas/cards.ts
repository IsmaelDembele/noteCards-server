import mongoose, { Schema, Types } from "mongoose";

interface ICards {
  _id?: string;
  name: string;
  front: string;
  back: string;
  note: string;
  topic: string;
  subTopic: string;
  SubTopicsID: Types.ObjectId;
  TopicsID: Types.ObjectId;
}

const cardsSchema = new Schema({
  front: String,
  back: String,
  note: String,
  topic: String,
  subTopic: String,
  topicsID: { type: Schema.Types.ObjectId, ref: "Topics" },
  subTopicsID: { type: Schema.Types.ObjectId, ref: "SubTopics" },
});

export const cardsModel = mongoose.model("Card", cardsSchema);
