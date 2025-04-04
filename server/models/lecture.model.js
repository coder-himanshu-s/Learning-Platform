import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    lectureTitle: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      set: (url) => url.replace("http://", "https://"),
    },
    publicId: {
      type: String,
    },
    isPreviewFree: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Lecture = mongoose.model("Lecture", lectureSchema);
