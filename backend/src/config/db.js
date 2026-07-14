import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error(
      "MONGO_URI is not set. Create a .env file with MONGO_URI=<your connection string>",
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);

    process.exit(1);
  }
};

export default connectDB;
