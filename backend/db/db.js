import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://lay:l3a7y2!@todo.u49pznh.mongodb.net/todo",
    );
    console.log("Connect to the database");
  } catch (error) {
    console.error("Connection failed");
  }
};
export default connectDB;
