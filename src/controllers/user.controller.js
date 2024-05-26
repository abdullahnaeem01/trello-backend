
const userService = require('../services/userService');

const getUserData = async (req, res) => {
    try {
      const userData = await userService.getUserData(req.user.id);
      res.status(200).json(userData);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  module.exports = {
    getUserData,
  }