const boardService = require('../services/boardService');

const createBoard = async (req, res) => {
  try {
    console.log(req.body);
    const board = await boardService.createBoard({...req.body, user: req.user.id});
    res.status(201).json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBoardById = async (req, res) => {
  try {
    const boardId = req.params.id;
    const board = await boardService.getBoardById(boardId, req.user.id);
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }
    res.status(200).json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBoards = async (req, res) => {
  try {
    const boards = await boardService.getBoards(req.user.id);
    res.status(200).json(boards);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBoard = async (req, res) => {
  try {
    const boardId = req.params.id;
    const updatedData = req.body;
    const board = await boardService.updateBoard(boardId, updatedData);
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }
    res.status(200).json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBoard = async (req, res) => {
  try {
    const boardId = req.params.id;
    const board = await boardService.deleteBoard(boardId);
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }
    res.status(200).json({ message: 'Board deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    createBoard,
    getBoardById,
    getBoards,
    updateBoard,
    deleteBoard
}