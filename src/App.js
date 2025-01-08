import React, { useState } from "react";
import FileUpload from "./components/fileupload";
import DataPreview from "./components/datapreview";

function App() {
  const [uploadedFilename, setUploadedFilename] = useState("");

  const handleFileUploadSuccess = (filename) => {
    setUploadedFilename(filename); // Set the uploaded file name for preview
    console.log("Uploaded file:", filename);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Automated Machine Learning Site</h1>

      {/* File Upload Component */}
      <FileUpload onUploadSuccess={handleFileUploadSuccess} />

      {/* Display Data Preview only if a file has been uploaded */}
      {uploadedFilename && (
        <div>
          <h2>Preview of: {uploadedFilename}</h2>
          <DataPreview filename={uploadedFilename} />
        </div>
      )}
    </div>
  );
}

export default App;
