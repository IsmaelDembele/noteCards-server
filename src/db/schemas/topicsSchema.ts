import mongoose from "mongoose";

export interface ITopics {
  _id?: string;
  name: string;
}

const topicsSchema = new mongoose.Schema<ITopics>({
  name: { type: String, required: true },
});

export const topicsModel = mongoose.model("Topic", topicsSchema);
