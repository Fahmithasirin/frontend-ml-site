import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/homepage/homepage";
import PreviewPage from "./components/previewpage/previewpage";
import Clean from "./components/cleaning/datacleaning";

function App() { 
  return (
    <Router> 
      <Routes> 
        <Route path="/" element={<Homepage />} /> 
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/cleaning/:filename" element={<Clean />}
        /> 
      </Routes> 
    </Router> 
  ); 
} 

export default App;
