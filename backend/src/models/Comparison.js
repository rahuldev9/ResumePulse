import mongoose from "mongoose";

const ComparisonSchema = new mongoose.Schema(
  {
    candidateName: {
      type: String,
    },
    oldResumeName: {
      type: String,
    },
    newResumeName: {
      type: String,
    },
    previousResume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },
    updatedResume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },
    comparison: {
      summary: {
        type: String,
      },
      highlights: [
        {
          category: String,
          title: String,
          detail: String,
          severity: {
            type: String,
            enum: ["Important", "Minor", "Needs Review"],
          },
          items: [String],
        },
      ],
      stats: {
        totalChanges: Number,
        importantChanges: Number,
        minorChanges: Number,
        reviewChanges: Number,
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Comparison", ComparisonSchema);
