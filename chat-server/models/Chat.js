const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  topicId: { type: Number, required: true, index: true },
  username: { type: String, required: true },
  message: { type: String, required: true, maxlength: 1000 },
  timestamp: { type: Date, default: Date.now }
});

chatSchema.index({ topicId: 1, timestamp: 1 });
module.exports = mongoose.model('Chat', chatSchema);
