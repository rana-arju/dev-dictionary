import mongoose from "mongoose";
let isConnected: boolean = false;
export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("Missing mongoDB url");
  }
  if (isConnected) {
    return ;
  }
  try {
    const options = {
      dbName: "devFlow",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(process.env.MONGODB_URL, options);
    isConnected = true;
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
