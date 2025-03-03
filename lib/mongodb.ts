import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if(connectionState === 1 ) {
    console.log("Already connected to MongoDB");
    return;
  }

  if(connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  try{
    mongoose.connect(MONGODB_URI!, {
      dbName: "NextJS-mongodb",
      bufferCommands: true,
    })
    console.log("Connected");
  } catch (err: unknown) {
    console.error("Error connecting to MongoDB", err);
  }

}

export default connect; 