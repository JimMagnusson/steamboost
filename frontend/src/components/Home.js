import React from "react";

const Home = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "20px",
    textAlign: "center",
  };

  const titleWrapperStyle = {
    marginTop: "10vh",
    marginBottom: "20px",
  };

  const titleStyle = {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#333",
  };

  const subtitleStyle = {
    fontSize: "18px",
    color: "#777",
  };

  return (
    <div style={containerStyle}>
      <div style={titleWrapperStyle}>
        <h1 style={titleStyle}>Steam Boost</h1>
        <p style={subtitleStyle}>Home page</p>
      </div>
    </div>
  );
};

export default Home;