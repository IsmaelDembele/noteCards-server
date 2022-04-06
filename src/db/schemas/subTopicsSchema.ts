import mongoose, { Schema, Types } from "mongoose";
import { topicsModel } from "./topicsSchema";

export interface ISubTopics {
  _id?: string;
  name: string;
  topic: string;
  topicID: Types.ObjectId;
  userID: Types.ObjectId;
}

const subTopicsSchema = new Schema<ISubTopics>({
  name: { type: String, required: true },
  topic: { type: String, required: true },
  topicID: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
  userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const subTopicsModel = mongoose.model("SubTopic", subTopicsSchema);
