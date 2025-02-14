import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    message: {
      type: Object,
      default: {},
    },
    isChessRelated: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    messageType: {
      type: String,
    },
    messageId: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "messages",
  }
);

export const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);
