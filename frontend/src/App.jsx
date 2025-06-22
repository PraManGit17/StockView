import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Post from './components/Post';
import View from './components/View';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Post />} />
          <Route path="/viewitems" element={<View />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
