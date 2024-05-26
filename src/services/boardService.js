const Board = require('../models/board.model');

const createBoard = async (boardData) => {
  const board = new Board(boardData);
  return await board.save();
};

const getBoardById = async (boardId, userId) => {
  return await Board.findOne({ _id: boardId, user: userId }).populate('lists');
};

const getBoards = async (userId) => {
  return await Board.find({ user: userId }).populate('lists');
};

const updateBoard = async (boardId, updatedData) => {
  return await Board.findByIdAndUpdate(boardId, updatedData, { new: true });
};

const deleteBoard = async (boardId) => {
  return await Board.findOneAndDelete({ _id: boardId });
};

module.exports = {
    createBoard,
    getBoards,
    updateBoard,
    deleteBoard,
    getBoardById
}