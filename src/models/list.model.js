const mongoose = require('mongoose');
const Task = require('./task.model');

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  }],
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
  }
});

listSchema.pre('findOneAndDelete', async function(next) {
  try {
    const listId = this.getQuery()["_id"];

    await Task.deleteMany({ list: listId });

    next();
  } catch (err) {
    next(err);
  }
});

const List = mongoose.model('List', listSchema);

module.exports = List;
