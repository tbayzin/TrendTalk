const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const Chat = require('./models/Chat');
const chatRoutes = require('./routes/chat');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' }
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/trendtalk', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(console.error);

app.use(express.json());
app.use('/api/chat', chatRoutes);

const activeUsers = {};

io.on('connection', socket => {
  console.log('User connected:', socket.id);

  socket.on('join-topic', ({ topicId, username }) => {
    socket.join(`topic-${topicId}`);
    if (!activeUsers[topicId]) activeUsers[topicId] = new Set();
    activeUsers[topicId].add(username);
    io.to(`topic-${topicId}`).emit('update-online-count', activeUsers[topicId].size);

    Chat.find({ topicId }).sort({ timestamp: 1 }).limit(50).then(messages => {
      socket.emit('previous-messages', messages);
    });
  });

  socket.on('send-message', async ({ topicId, username, message }) => {
    const chatMessage = new Chat({ topicId, username, message });
    await chatMessage.save();
    io.to(`topic-${topicId}`).emit('new-message', {
      username, message, timestamp: chatMessage.timestamp
    });
  });

  socket.on('typing', ({ topicId, username }) => {
    socket.to(`topic-${topicId}`).emit('user-typing', username);
  });

  socket.on('stop-typing', ({ topicId, username }) => {
    socket.to(`topic-${topicId}`).emit('user-stop-typing', username);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(5000, () => console.log('Socket.IO server running on port 5000'));
