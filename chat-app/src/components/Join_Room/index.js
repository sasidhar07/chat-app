import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.css'; 

const Room = ({ socket }) => {
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};

  const handleJoinRoom = () => {
    navigate('/chat', { state: { roomName, username } }); 
  };

  return (
    <div className="room-container">
      <h2>Join a Room</h2>
      <input
        type="text"
        className="room-input"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button className="create-room-button" onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};

export default Room;
