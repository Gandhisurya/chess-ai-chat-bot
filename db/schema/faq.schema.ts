import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    embeddings: {
      type: [Number],
      required: true,
      validate: {
        validator: (v: number[]) => v.length === 768,
        message: "Embeddings must have 768 dimensions",
      },
    },
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
    status: {
      type: String,
      default: "ACTIVE",
    },
    userId: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "faqs",
  }
);

export const Faq = mongoose.models.Faq || mongoose.model("Faq", userSchema);
