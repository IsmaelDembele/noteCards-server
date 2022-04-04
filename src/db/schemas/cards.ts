import mongoose, { Schema, Types } from "mongoose";

interface ICards {
  _id?: string;
  // name: string;
  front: string;
  back: string;
  note: string;
  topic: string;
  subTopic: string;
  userID: Types.ObjectId;
  // subTopicsID: Types.ObjectId;
  // topicsID: Types.ObjectId;
}

const cardsSchema = new Schema<ICards>({
  front: String,
  back: String,
  note: String,
  topic: {type: String, required: true},
  subTopic: {type: String, required: true},
  // topicsID: { type: Schema.Types.ObjectId, ref: "Topic" },
  // subTopicsID: { type: Schema.Types.ObjectId, ref: "SubTopic" },
  userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const cardsModel = mongoose.model("Card", cardsSchema);
