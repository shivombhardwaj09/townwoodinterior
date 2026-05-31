import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/townwood");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.log(`Warning: Failed to connect to primary MongoDB: ${error.message}`);
    console.log(`The API will run in mock mode for development.`);
    // Do not process.exit(1), let the app run without DB.
  }
};

export default connectDB;
