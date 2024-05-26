const listService = require('../services/listService');

const createList = async (req, res) => {
  try {
    const listData = {
      ...req.body,
      user: req.user.id
    };
    const list = await listService.createList(listData);
    res.status(201).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getLists = async (req, res) => {
  try {
    const lists = await listService.getLists(req.user.id);
    res.status(200).json(lists);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// New controller method to get a list by ID
const getListById = async (req, res) => {
  try {
    const listId = req.params.id;
    const list = await listService.getListById(listId, req.user._id);
    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// New controller method to update a list
const updateList = async (req, res) => {
  try {
    const listId = req.params.id;
    const updatedData = req.body;

    if (updatedData.board) {
      return res.status(400).json({ error: 'Updating the board of a list is not allowed' });
    }

    const list = await listService.updateList(listId, updatedData, req.user.id);

    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTaskList = async (req, res) => {
  try {
    const updatedData = req.body;

    const list = await listService.updateTaskList(updatedData);
    res.status(200).json({ message: 'Task moved successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// New controller method to delete a list
const deleteList = async (req, res) => {
  try {
    const listId = req.params.id;
    const list = await listService.deleteList(listId);
    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }
    res.status(200).json({ message: 'List deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    createList,
    getLists,
    getListById,
    updateList,
    deleteList,
    updateTaskList
}