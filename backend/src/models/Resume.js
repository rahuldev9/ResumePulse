import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    candidateName: {
      type: String,
    },

    version: {
      type: Number,
    },
    extractedRaw: {
      type: String,
    },

    extractedText: {
      type: String,
      trim: true,
    },
    originalName: {
      type: String,
    },
    filePath: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Resume", ResumeSchema);
