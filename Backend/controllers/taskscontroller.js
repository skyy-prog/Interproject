import Task from "../Models/TaskSchema.js";

export const addTask = async (req, res) => {
  try {
    const task = await Task.create({
      user: req.userId,
      title: req.body.title,
    });

    res.json({ success: true, task });
  } catch {
    res.status(500).json({ success: false });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.json({ success: true, tasks });
  } catch {
    res.status(500).json({ success: false });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { completed: req.body.completed },
      { new: true }
    );

    res.json({ success: true, task });
  } catch {
    res.status(500).json({ success: false });
  }
};
export const Deletethetasks =async(req,res)=>{
    try {
        const {id} = req.body;
        await Task.findByIdAndDelete(id);
        res.json({success:true, message:'Task Deleted'})
    } catch (error) {
        res.json({success:false , message:'error in deletions'})
    }
}