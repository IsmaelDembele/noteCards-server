import mongoose, { Types, Schema } from "mongoose";

export interface ITopics {
  _id?: string;
  name: string;
  userID: Types.ObjectId;
}

const topicsSchema = new Schema<ITopics>({
  name: { type: String, required: true, sparse: true },
  userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

topicsSchema.path("name").index({ sparse: true });

export const topicsModel = mongoose.model("Topic", topicsSchema);
