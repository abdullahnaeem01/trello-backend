const express = require('express');
const listController = require('../controllers/list.controller');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate, listController.createList);
router.get('/', authenticate, listController.getLists);
router.get('/:id', authenticate, listController.getListById); 
router.put('/:id', authenticate, listController.updateList);
router.post('/updateTaskList', authenticate, listController.updateTaskList);
  
router.delete('/:id', authenticate, listController.deleteList); 

module.exports = router;
