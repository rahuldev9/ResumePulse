import express from "express";

import upload from "../middleware/upload.middleware.js";

import {
  compareResumes,
  getHistory,
  deleteComparison,
} from "../controllers/resume.controller.js";

const router = express.Router();

router.post(
  "/compare",
  upload.fields([
    {
      name: "oldResume",
      maxCount: 1,
    },
    {
      name: "newResume",
      maxCount: 1,
    },
  ]),
  compareResumes,
);

router.get("/history", getHistory);
router.delete("/history/:id", deleteComparison);

export default router;
