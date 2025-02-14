import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userId: {
      type: String,
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    accessToken: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "users",
  }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
