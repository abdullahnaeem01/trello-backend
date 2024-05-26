const express = require('express');
const boardController = require('../controllers/board.controller');
const authenticate = require("../middleware/auth");

const router = express.Router();

router.post('/', authenticate, boardController.createBoard);
router.get('/', authenticate, boardController.getBoards);
router.get('/:id', authenticate, boardController.getBoardById);
router.put('/:id', authenticate, boardController.updateBoard);
router.delete('/:id', authenticate, boardController.deleteBoard);

module.exports = router;
