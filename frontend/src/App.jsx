import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Post from './components/Post';
import View from './components/View';
import Singleitem from './components/Singleitem';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Post />} />
          <Route path="/viewitems" element={<View />} />
          <Route path="/singleitem/:id" element={<Singleitem />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
