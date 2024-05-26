const Task = require('../models/task.model');
const User = require('../models/user.model');

async function getUserData(userId) {
  try {
    // First, check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Fetch tasks related to the user and populate list and board
    const tasks = await Task.find({ user: userId }).populate({
      path: 'list',  // Ensuring the Task model has a 'list' field that references List
      populate: {
        path: 'board',  // Ensuring the List model has a 'board' field that references Board
        model: 'Board'  // Specifying the model to populate from
      }
    });

    return {
      _id: user._id,
      fullName: user.fullName,
      tasks: tasks.map(task => ({
        _id: task._id,
        title: task.title,
        description: task.description,
        due_date: task.due_date,
        list: {
          _id: task.list._id,
          name: task.list.name,
          board: task.list.board ? {
            _id: task.list.board._id,
            title: task.list.board.title,
            color: task.list.board.color
          } : {}
        }
      }))
    };
  } catch (error) {
    throw new Error('Error fetching user data: ' + error.message);
  }
}

module.exports = {
  getUserData,
};
