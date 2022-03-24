import mongoose from "mongoose";

export interface IUser {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const userSchama = new mongoose.Schema<IUser>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model("User", userSchama);
