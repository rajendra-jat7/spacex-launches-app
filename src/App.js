// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Launches from './pages/Launches';

function App() {
  return (
    <Router>
      <div className="bg-gray-800 p-4">
        <nav className="container mx-auto flex justify-between">
          <Link to="/" className="text-white"><h1>Home</h1></Link>
          <div>
            <Link to="/login" className="text-white mr-4">Login</Link>
            <Link to="/signup" className="text-white">Signup</Link>
          </div>
        </nav>
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Launches />} />
      </Routes>
    </Router>
  );
}

export default App;
