const express = require('express');
const Chat = require('../models/Chat');
const router = express.Router();

router.get('/:topicId', async (req, res) => {
  try {
    const messages = await Chat.find({ topicId: req.params.topicId })
      .sort({ timestamp: -1 }).limit(100);
    res.json(messages.reverse());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/stats/:topicId', async (req, res) => {
  try {
    const count = await Chat.countDocuments({ topicId: req.params.topicId });
    const users = await Chat.distinct('username', { topicId: req.params.topicId });
    res.json({ messageCount: count, activeUsers: users.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
