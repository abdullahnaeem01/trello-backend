const List = require('../models/list.model');
const Task = require('../models/task.model');

const createTask = async (taskData) => {
  let task = new Task(taskData);
  const list = await List.findById(taskData.list);
  task = await task.save();
  list.tasks.push(task._id);
  await list.save();
  return task;
};

const getTasks = async (userId) => {
  return await Task.find({ user: userId }).populate('list');
};

const getTaskById = async (taskId, userId) => {
  return await Task.findOne({ _id: taskId, user: userId }).populate('list');
};

const updateTask = async (taskId, updatedData) => {
  return await Task.findByIdAndUpdate(taskId, updatedData, { new: true });
};

const deleteTask = async (taskId) => {
  return await Task.findOneAndDelete({ _id: taskId });
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
}