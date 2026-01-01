import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/userrouters.js";
import cors from 'cors'
import taskrouter from "./routes/Tasksroutes.js";
dotenv.config();

const app = express();
app.use(express.json()); 
app.use(cors());
app.use('/api/users' , router);
app.use('/api/tasks' , taskrouter)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
app.get("/", (req, res) => {
  res.send("Server is running");
});

 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
