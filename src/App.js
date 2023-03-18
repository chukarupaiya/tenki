import logo from './logo.svg';
import './App.css';
import {React,useState} from 'react';
import './App.css';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateContract from './components/CreateContract';

function App() {

  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/create" element={<CreateContract/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
