import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function TopicChat() {
  const { id } = useParams();
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.emit('joinRoom', id);
    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [id]);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('sendMessage', { roomId: id, message: input });
      setMessages((prev) => [...prev, input]);
      setInput('');
    }
  };

  return (
    <div>
      <h2>Chat for Topic ID: {id}</h2>
      <div style={{ border: '1px solid gray', height: '300px', overflowY: 'scroll', marginBottom: 10 }}>
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message..."
        style={{ marginRight: '10px' }}
      />
      <button onClick={sendMessage}>Gönder</button>
    </div>
  );
}
