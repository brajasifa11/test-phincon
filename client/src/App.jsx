import React from 'react';
import './App.module.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Home, Detail,
  MyPage
} from './pages';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/pokemon/:id' element={<Detail />} />
          <Route exact path='/mypage' element={<MyPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
