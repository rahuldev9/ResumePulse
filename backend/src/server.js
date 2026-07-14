import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
