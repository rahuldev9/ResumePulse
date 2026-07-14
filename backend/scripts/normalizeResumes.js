import dotenv from "dotenv";
import connectDB from "../src/config/db.js";
import Resume from "../src/models/Resume.js";
import mongoose from "mongoose";
import { normalizeExtractedText } from "../src/services/pdf.service.js";

dotenv.config();

const run = async () => {
  try {
    await connectDB();

    const resumes = await Resume.find({}).lean();
    console.log(`Found ${resumes.length} resumes`);

    let updated = 0;

    for (const r of resumes) {
      const id = r._id;
      const raw = r.extractedRaw || r.extractedText || "";
      const normalized = normalizeExtractedText(raw);

      const needsUpdate =
        r.extractedRaw !== raw || r.extractedText !== normalized;

      if (needsUpdate) {
        await Resume.findByIdAndUpdate(id, {
          extractedRaw: raw,
          extractedText: normalized,
        });
        updated++;
      }
    }

    console.log(`Updated ${updated} resumes`);
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
