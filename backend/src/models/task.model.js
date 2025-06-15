import { model, Schema } from "mongoose";

const taskSchema = new Schema({
  adminId: {
    type: Schema.Types.ObjectId,
    ref:'User',
    // required: true,
  },
  userEmail: {
    type:String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "on-progress", "complete"],
    default: "pending",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  dueDate:{
    type: Date,
    // required:true
  }
});

const Task = model("Task", taskSchema);

export default Task;
