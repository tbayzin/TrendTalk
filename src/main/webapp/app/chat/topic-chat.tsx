import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

interface ChatMessage {
  username: string;
  message: string;
  timestamp: string;
}

export default function TopicChat() {
  const { id } = useParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const name = prompt('Enter your name') || 'Guest';
    setUsername(name);

    socket.emit('join-topic', { topicId: id, username: name });

    socket.on('previous-messages', (prev: ChatMessage[]) => {
      setMessages(prev);
    });

    socket.on('new-message', (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('previous-messages');
      socket.off('new-message');
    };
  }, [id]);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('send-message', {
        topicId: id,
        username,
        message: input,
      });
      setInput('');
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20, fontFamily: 'Arial' }}>
      <h2>Chat for Topic ID: {id}</h2>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: 8,
          padding: 10,
          height: 400,
          overflowY: 'auto',
          backgroundColor: '#f8f9fa',
          marginBottom: 10,
        }}
      >
        {messages.map((msg, i) => {
          const isOwn = msg.username === username;
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: isOwn ? 'flex-end' : 'flex-start',
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  backgroundColor: isOwn ? '#007bff' : '#e4e6eb',
                  color: isOwn ? 'white' : 'black',
                  padding: '8px 12px',
                  borderRadius: 16,
                  maxWidth: '70%',
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>{msg.username}</div>
                <div>{msg.message}</div>
                <div style={{ fontSize: 10, textAlign: 'right', marginTop: 4 }}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Mesajınızı yazın..."
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: 8,
            border: '1px solid #ccc',
            marginRight: 8,
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '10px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
