import { useState } from 'react'
import React from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Home from "./components/Home"
import ShortDescriptionGenerator from "./components/ShortDescriptionGenerator"


const App = () => {
  const padding = {
    padding: 5
  }
  
  return (
  <Router>
    <div>
      <Link style={padding} to="/">home</Link>
      <Link style={padding} to="/short-description-generator">Short Description Generator</Link>
    </div>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/short-description-generator" element={<ShortDescriptionGenerator/>
      } />
    </Routes>
    
  </Router>

  )
}



export default App