import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Home from './components/pages/Home'
import Navbar from './components/layout/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
