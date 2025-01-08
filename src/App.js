import React, { useState } from "react";
import FileUpload from "./components/fileupload";
import DataPreview from "./components/datapreview";
import DataCleaning from "./components/datacleaning";

function App() {
  const [uploadedFilename, setUploadedFilename] = useState("");
  const [showCleaning, setShowCleaning] = useState(false);

  const handleFileUploadSuccess = (filename) => {
    setUploadedFilename(filename); // Set the uploaded file name for preview
    setShowCleaning(false); // Reset to preview mode
    console.log("Uploaded file:", filename);
  };

  const handleCancelSuccess = () => {
    setUploadedFilename("");  // Reset the uploaded filename to hide the preview
    setShowCleaning(false); // Reset to preview mode
  };

  const handleCleanData = () => {
    setShowCleaning(true); // Show the data cleaning screen
  };

  const handleBackToPreview = () => {
    setShowCleaning(false); // Go back to the preview screen
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Automated Machine Learning Site</h1>
      <FileUpload onUploadSuccess={handleFileUploadSuccess} onCancelSuccess={handleCancelSuccess} />

      {uploadedFilename && !showCleaning && (
        <div>
          <h2>Preview of: {uploadedFilename}</h2>
          <DataPreview filename={uploadedFilename} onCleanData={handleCleanData} />
        </div>
      )}

      {uploadedFilename && showCleaning && (
        <DataCleaning filename={uploadedFilename} onBack={handleBackToPreview} />
      )}
    </div>
  );
}

export default App;
