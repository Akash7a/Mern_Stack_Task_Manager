const express = require("express");
const { createTask, getTasks, updateTask, deleteTask, toggleTask } = require("../controllers/TaskController"); // Import toggleTask

const router = express.Router();

router.post("/tasks", createTask);
router.get("/tasks", getTasks);
router.put("/tasks/:id", updateTask);
router.put("/tasks/:id/toggle", toggleTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;