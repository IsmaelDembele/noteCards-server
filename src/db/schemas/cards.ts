import mongoose, { Schema, Types } from "mongoose";

interface ICards {
  _id?: string;
  name: string;
  front: string;
  back: string;
  note: string;
  SubTopicsID: Types.ObjectId;
  TopicsID: Types.ObjectId;
}

const cardsSchema = new Schema({
  front: String,
  back: String,
  note: String,
  topicsID: { type: Schema.Types.ObjectId, ref: "Topics" },
  SubTopicsID: { type: Schema.Types.ObjectId, ref: "SubTopics" },
});

export const cardsModel = mongoose.model("Card", cardsSchema);
