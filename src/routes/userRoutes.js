const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticate = require('../middleware/auth');
// Your route definitions go here
router.get('/userData', authenticate, userController.getUserData);

module.exports = router;
