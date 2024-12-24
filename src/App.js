import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../src/Component/Dashboard';
import Navbar from '../src/Component/Navbar';
import Login from '../src/Component/Login';
import Books from '../src/Component/Books';
import './App.css';

function App() {

  return (
    <Router>
      <div className="App">
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Navbar" element={<Navbar />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Books" element={<Books />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
