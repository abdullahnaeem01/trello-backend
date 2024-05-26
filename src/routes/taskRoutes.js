const express = require('express');
const taskController = require('../controllers/task.controller');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate, taskController.createTask);
router.get('/', authenticate, taskController.getTasks);
router.get('/:id', authenticate, taskController.getTaskById);
router.put('/:id', authenticate, taskController.updateTask);
router.delete('/:id', authenticate, taskController.deleteTask);

module.exports = router;
