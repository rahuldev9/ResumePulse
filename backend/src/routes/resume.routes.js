import express from "express";

import {
  compareResumes,
  getHistory,
} from "../controllers/resume.controller.js";

const router = express.Router();

router.post("/compare", compareResumes);

router.get("/history", getHistory);

export default router;
