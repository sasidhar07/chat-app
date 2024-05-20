import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ChatRoom from './components/Chat';
import Register from './components/Register';
import Room from './components/Join_Room';
import './App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); 

const App = () => {
  const [token, setToken] = useState("");

  const handleLogin = (token) => {
    setToken(token);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login onLogin={handleLogin} />} />  
        <Route path="/register" element={<Register />} />
        <Route path="/room" element={<Room socket={socket}/>} /> 
        <Route path="/chat" element={<ChatRoom socket={socket} />} /> 
      </Routes>
    </Router>
  );
};

export default App;
