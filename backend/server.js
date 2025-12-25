const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import Models
const User = require('./models/user');
const Task = require('./models/task'); // ✅ Task model

// Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ GET Users (Day 1 Task)
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'Harsh' },
    { id: 2, name: 'Student' },
    { id: 3, name: 'Developer' }
  ]);
});

// ✅ POST Users (Day 2 Task)
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = new User({ name, email, password, role });
    await newUser.save();
    console.log("POST /api/users -> New user added:", newUser);
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(400).json({ message: error.message });
  }
});

// ✅ GET Tasks (MongoDB)
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find(); // DB से सारे tasks लाओ
    console.log("GET /api/tasks -> Tasks fetched:", tasks.length);
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ POST Tasks (MongoDB)
app.post('/api/tasks', async (req, res) => {
  try {
    const { title, category, description } = req.body;
    const newTask = new Task({ title, category, description });
    await newTask.save(); // DB में save करो
    console.log("POST /api/tasks -> New task added:", newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error.message);
    res.status(400).json({ message: error.message });
  }
});

// ✅ UPDATE Task (PUT)
app.put('/api/tasks/:id', async (req, res) => {
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
});

// ✅ DELETE single Task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    console.log("DELETE /api/tasks/:id -> Task deleted:", req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error.message);
    res.status(500).json({ message: "Error deleting task" });
  }
});

// ✅ DELETE all Tasks
app.delete('/api/tasks', async (req, res) => {
  try {
    await Task.deleteMany({});
    console.log("DELETE /api/tasks -> All tasks cleared");
    res.json({ message: "All tasks cleared successfully" });
  } catch (error) {
    console.error("Error clearing tasks:", error.message);
    res.status(500).json({ message: "Error clearing tasks" });
  }
});

// Auth Routes Import
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Mongo URI
process.env.MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/";

// Debug line
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ DB Connection Error:', err));

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
