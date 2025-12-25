const Task = require("../models/task");

// ✅ Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log("GET /api/tasks ->", tasks.length, "tasks fetched");
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Create new task
exports.createTask = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    const newTask = new Task({ title, category, description });
    await newTask.save();
    console.log("POST /api/tasks -> New task added:", newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// ✅ Update existing task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    console.log("PUT /api/tasks/:id -> Task updated:", updatedTask);
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete single task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    console.log("DELETE /api/tasks/:id -> Task deleted:", id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error.message);
    res.status(500).json({ message: "Error deleting task" });
  }
};

// ✅ Delete all tasks
exports.clearTasks = async (req, res) => {
  try {
    await Task.deleteMany({});
    console.log("DELETE /api/tasks -> All tasks cleared");
    res.json({ message: "All tasks cleared successfully" });
  } catch (error) {
    console.error("Error clearing tasks:", error.message);
    res.status(500).json({ message: "Error clearing tasks" });
  }
};
