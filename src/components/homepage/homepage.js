import React from "react";
import { Link } from "react-router-dom";
import "./homepage.css"; 

function Homepage() {
  return (
    <div className="homepage" style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: "url(/assets/homepage/bg.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}>
      <header className="homepage-header">
        <img src="/assets/homepage/Logo.png" alt="AlgoStudio Logo" className="homepage-logo" />
        <nav className="homepage-nav">
          <a href="#home">Home</a>
          <Link to="/preview">
            <a href="#preview">Preview</a>
          </Link>
          <a href="#cleaning">Cleaning</a>
          <a href="#visualization">Visualization</a>
          <a href="#ml-algorithms">ML Algorithms</a>
        </nav>
      </header>
      <main className="homepage-main">
        <div className="homepage-content">
          <h1>ALGOSTUDIO</h1>
          <p>Simplifying Machine Learning</p>
        </div>
        <div className="homepage-image">
          <img
            src="assets/homepage/image.png" 
            alt="Machine Learning"
          />
        </div>
      </main>
      <Link to="/preview">
      <button className="preview-button">Preview Data</button>
      </Link>
    </div>
  );
}

export default Homepage;

