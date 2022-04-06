import mongoose, { Schema, Types } from "mongoose";

interface ICards {
  _id?: string;
  front: string;
  back: string;
  note: string;
  topic: string;
  subTopic: string;
  topicID: Types.ObjectId;
  subTopicID: Types.ObjectId;
  userID: Types.ObjectId;
}

const cardsSchema = new Schema<ICards>({
  front: { type: String, required: true, },
  back: String,
  note: String,
  topic: { type: String, required: true },
  subTopic: { type: String, required: true },
  topicID: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
  subTopicID: { type: Schema.Types.ObjectId, ref: "SubTopic", required: true },
  userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const cardsModel = mongoose.model("Card", cardsSchema);
