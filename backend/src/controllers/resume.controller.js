import Resume from "../models/Resume.js";
import Comparison from "../models/Comparison.js";
import {
  extractText,
  extractRawText,
  normalizeExtractedText,
} from "../services/pdf.service.js";
import {
  buildComparisonReport,
  normalizeComparisonPayload,
} from "../services/comparison.service.js";
import { getAIComparison } from "../services/groq.service.js";
import fs from "fs";

export const compareResumes = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({
        success: false,
        message: "Files not found",
      });
    }

    const oldResumeFile = req.files.oldResume?.[0];
    const newResumeFile = req.files.newResume?.[0];

    if (!oldResumeFile || !newResumeFile) {
      return res.status(400).json({
        success: false,
        message: "Both resumes are required",
      });
    }

    const oldRaw = await extractRawText(oldResumeFile.path);
    const newRaw = await extractRawText(newResumeFile.path);

    const oldText = normalizeExtractedText(oldRaw);
    const newText = normalizeExtractedText(newRaw);

    const previousResume = await Resume.create({
      candidateName: oldResumeFile.originalname.replace(/\.[^/.]+$/, ""),
      version: 1,
      originalName: oldResumeFile.originalname,
      filePath: oldResumeFile.path,
    });

    const updatedResume = await Resume.create({
      candidateName: newResumeFile.originalname.replace(/\.[^/.]+$/, ""),
      version: 2,
      originalName: newResumeFile.originalname,
      filePath: newResumeFile.path,
    });

    const fallbackComparison = buildComparisonReport(
      oldText,
      newText,
      oldResumeFile.originalname,
      newResumeFile.originalname,
    );

    const aiComparison = await getAIComparison(oldText, newText);

    const comparison =
      normalizeComparisonPayload(aiComparison) || fallbackComparison;

    if (!comparison.summary && fallbackComparison?.summary) {
      comparison.summary = fallbackComparison.summary;
    }

    if (
      !comparison.highlights?.length &&
      fallbackComparison?.highlights?.length
    ) {
      comparison.highlights = fallbackComparison.highlights;
    }

    if (!comparison.stats) {
      comparison.stats = fallbackComparison.stats;
    }

    const savedComparison = await Comparison.create({
      candidateName: previousResume.candidateName,
      oldResumeName: oldResumeFile.originalname,
      newResumeName: newResumeFile.originalname,
      previousResume: previousResume._id,
      updatedResume: updatedResume._id,
      comparison,
    });

    return res.json({
      success: true,
      message: "Resume comparison completed successfully",
      data: {
        comparisonId: savedComparison._id,
        oldResume: oldResumeFile.originalname,
        newResume: newResumeFile.originalname,
        aiUsed: !!aiComparison,
        comparison,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getHistory = async (req, res) => {
  try {
    const history = await Comparison.find({})
      .sort({ createdAt: -1 })
      .populate("previousResume updatedResume")
      .lean();

    return res.json({
      success: true,
      history,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteComparison = async (req, res) => {
  try {
    const { id } = req.params;

    const comp = await Comparison.findById(id).populate(
      "previousResume updatedResume",
    );

    if (!comp) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    // remove files associated with resumes (if present)
    const toRemoveResumes = [];

    if (comp.previousResume) toRemoveResumes.push(comp.previousResume);
    if (comp.updatedResume) toRemoveResumes.push(comp.updatedResume);

    for (const r of toRemoveResumes) {
      try {
        if (r.filePath) {
          fs.unlinkSync(r.filePath);
        }
      } catch (e) {
        // ignore file unlink errors
      }

      try {
        await Resume.findByIdAndDelete(r._id);
      } catch (e) {
        // ignore
      }
    }

    await Comparison.findByIdAndDelete(id);

    return res.json({ success: true, message: "Deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
