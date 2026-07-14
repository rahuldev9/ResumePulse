import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    candidateName: {
      type: String,
    },

    version: {
      type: Number,
    },

    extractedText: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Resume", ResumeSchema);
