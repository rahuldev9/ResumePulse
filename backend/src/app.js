import express from "express";
import cors from "cors";

import resumeRoutes from "./routes/resume.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use("/api/resumes", resumeRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Resume Pulse API Running",
  });
});

export default app;
