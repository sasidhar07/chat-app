import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./index.css"
import MessageByMe from '../messageSentByMe';
import MessageByOthers from '../messageSentByOthers';


const ChatRoom = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  const location = useLocation();
  const { roomName: room, username } = location.state;

  useEffect(() => {
    socket.emit('join_room', room);

    socket.on("receive_message", (data) => {
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket, room]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      socket.emit('sendMessage', { from:false,message:newMessage, room, username }); 
      setMessages((messages) => [...messages, { from:true,message:newMessage, room, username}]);
      setNewMessage('');
      
    }
  };



  return (
    <div className='container'>
      
    <div className="chat-room">
      <div className="message">
  {messages.map((msg, index) => (
    <div key={index}>
      {msg.from ? <MessageByMe messageData={msg}/> : <MessageByOthers messageData={msg}/>}
    </div>
  ))}
</div>
    </div>
    <div className="user-input">
    <input
      type="text"
      value={newMessage}
      
      className='message-input'
      onChange={(e) => setNewMessage(e.target.value)}
      placeholder="Type your message..."
    />
    <button className='send-button ' onClick={handleSendMessage}>Send</button>
  </div>
  </div>
  );
};

export default ChatRoom;