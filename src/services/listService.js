const Board = require('../models/board.model');
const List = require('../models/list.model');
const Task = require('../models/task.model');

const createList = async (listData) => {
  const board = await Board.findById(listData.board);
  let list = new List(listData);
  list = await list.save();
  board.lists.push(list._id);
  await board.save();
  return list;
};

const getLists = async (userId) => {
  return await List.find({ user: userId }).populate('tasks');
};

const getListById = async (listId, userId) => {
  return await List.findOne({ _id: listId, user: userId }).populate('tasks');
};

const updateList = async (listId, updatedData, userId) => {
  const list = await List.findOne({ _id: listId, user: userId });
  if (!list) return null;

  // Update list fields
  if (updatedData.title) list.title = updatedData.title;

  // Add tasks
  if (updatedData.addTasks) {
    for (const taskId of updatedData.addTasks) {
      const task = await Task.findById(taskId);
      if (task && !list.tasks.includes(taskId)) {
        list.tasks.push(taskId);
        task.list = listId;
        await task.save();
      }
    }
  }

  // Remove tasks
  if (updatedData.removeTasks) {
    list.tasks = list.tasks.filter(taskId => !updatedData.removeTasks.includes(taskId));
    await Task.updateMany({ _id: { $in: updatedData.removeTasks } }, { $unset: { list: "" } });
  }

  return await list.save();
};

const updateTaskList = async (updateData) => {
    try {
      // Remove task from source list
      await List.findByIdAndUpdate(updateData.sourceListId, { $pull: { tasks: updateData.taskId } });
  
      // Add task to destination list
      await List.findByIdAndUpdate(updateData.destListId, { $push: { tasks: { $each: [updateData.taskId], $position: updateData.newIndex } } });
  
      // Update task's list field
      await Task.findByIdAndUpdate(updateData.taskId, { list: updateData.destListId });
  
      return 'Task moved successfully'
      
    } catch (error) {
      res.status(500).send({ message: 'Failed to move task', error: error.message });
    }
}

const deleteList = async (listId) => {
  return await List.findOneAndDelete({ _id: listId });
};

module.exports = {
    createList,
    getLists,
    getListById,
    updateList,
    deleteList,
    updateTaskList

}