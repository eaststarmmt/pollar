import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './assets/styles/globalStyles';
import { Navbar, Footer } from './components';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Trending from './pages/Trending/Trending';
import Polls from './pages/Polls/Polls';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';



function App() {
  // const { user: currentUser } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
