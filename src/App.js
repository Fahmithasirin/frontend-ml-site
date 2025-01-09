import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/homepage/homepage";
import PreviewPage from "./components/previewpage/previewpage";

function App() { 
  return (
     <Router> 
      <Routes> 
        <Route path="/" element={<Homepage />} /> 
        <Route path="/preview" element={<PreviewPage />} 
        /> </Routes> 
        </Router> 
        ); 
      } 

export default App;
