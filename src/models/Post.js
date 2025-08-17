import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    category: { type: String, required: true },
    comments: [
      {
        userId: { type: String, required: true },
        userName: { type: String, required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    author: { type: String, required: true },
    authorName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
