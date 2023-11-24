import mongoose from "mongoose";
let isConnected: boolean = false;
export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("Missing mongoDB url");
  }
  if (isConnected) {
    return console.log("MongoDB already connected!");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "emaJohn",
    });
    isConnected = true;
    console.log("MongoDb is Connected!");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
