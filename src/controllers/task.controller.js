const taskService = require('../services/taskService');

const createTask = async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      user: req.user.id,
    };
    const task = await taskService.createTask(taskData);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks(req.user.id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await taskService.getTaskById(taskId, req.user.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedData = req.body;
    const task = await taskService.updateTask(taskId, updatedData);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await taskService.deleteTask(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
}