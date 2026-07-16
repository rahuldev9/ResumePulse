import express from "express";
import cors from "cors";

import resumeRoutes from "./routes/resume.routes.js";

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

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
