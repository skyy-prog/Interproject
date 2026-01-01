import express from "express";
import authMiddleware from "../middlerware.js/Auth.js";
import { addTask , Deletethetasks, getTasks , updateTask } from "../controllers/taskscontroller.js";

const taskrouter = express.Router();

taskrouter.post("/add", authMiddleware, addTask);
taskrouter.get("/list", authMiddleware, getTasks);
taskrouter.put("/update/:id", authMiddleware, updateTask);
taskrouter.post('/delete' , authMiddleware, Deletethetasks);
export default taskrouter;
