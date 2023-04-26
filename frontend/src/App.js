import { useState } from 'react'
import React from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Home from "./components/Home"
import StorePageComparison from "./components/StorePageComparison"
import ShortDescriptionGenerator from "./components/ShortDescriptionGenerator"

const App = () => {
  const padding = {
    padding: 5,
    display: "flex",
    alignItems: "center",
    height: "100%"
  }
  
  return (
  <Router>
    <div>
      <Link style={padding} to="/">Home</Link>
      <Link style={padding} to="/store-page-comparison">Store Page Comparison</Link>
      <Link style={padding} to="/short-description-generator">Short Description Generator</Link>
    </div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/store-page-comparison" element={<StorePageComparison/>} />
      <Route path="/short-description-generator" element={<ShortDescriptionGenerator />} />
    </Routes>


    
  </Router>

  )
}



export default App