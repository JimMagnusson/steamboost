import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./components/Home";
import StorePageComparison from "./components/StorePageComparison";
import ShortDescriptionGenerator from "./components/ShortDescriptionGenerator";

const App = () => {
  const navbarStyle = {
    display: "flex",
    alignItems: "center",
    height: "60px",
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #ddd",
    padding: "0 20px",
  };

  const linkStyle = {
    padding: "0 10px",
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
  };

  return (
    <Router>
      <div>
        <nav style={navbarStyle}>
          <Link style={linkStyle} to="/">Home</Link>
          <Link style={linkStyle} to="/store-page-comparison">Store Page Comparison</Link>
          <Link style={linkStyle} to="/short-description-generator">Short Description Generator</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store-page-comparison" element={<StorePageComparison />} />
          <Route path="/short-description-generator" element={<ShortDescriptionGenerator />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;