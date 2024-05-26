const mongoose = require('mongoose');
const List = require('./list.model');
const Task = require('./task.model');

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    default: '#FFFFFF',
  },
  lists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

boardSchema.pre('findOneAndDelete', async function(next) {
  try {
    const boardId = this.getQuery()["_id"];

    // Find lists related to the board
    const lists = await List.find({ board: boardId });

    // Delete related tasks
    for (const list of lists) {
      await Task.deleteMany({ list: list._id });
    }

    // Delete related lists
    await List.deleteMany({ board: boardId });

    next();
  } catch (err) {
    next(err);
  }
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
