import React, { useState } from "react";
import FileUpload from "./fileupload";
import DataPreview from "./datapreview";
import "./previewpage.css";

function PreviewPage() {
  const [filename, setFilename] = useState(null);

  const handleUploadSuccess = (filename) => {
    setFilename(filename);
  };

  const handleCancelSuccess = () => {
    setFilename(null);
  };

  const handleCleanData = () => {
    alert("Data cleaning initiated!");
  };

  return (
    <div className="preview-page" style={{ background: "url('/assets/previewpage/bg1.png') no-repeat right ", backgroundSize: "contain", backgroundColor: "#03001B"  }} >
      <div className="preview-header" style={{ background: "url('/assets/previewpage/bg2.png') no-repeat center ", backgroundSize: "contain", }}>
      <img src="/assets/homepage/Logo.png" alt="AlgoStudio Logo" className="logo" />
        PREVIEW THE DATA
      </div>
      <div className="preview-content">
        <div className="left-box">
          {filename ? (
            <DataPreview filename={filename} onCleanData={handleCleanData} />
          ) : (
            <div className="empty-message">
              No data available for preview.
            </div>
          )}
        </div>
        <div className="right-box" >
          <FileUpload onUploadSuccess={handleUploadSuccess} onCancelSuccess={handleCancelSuccess} />
        </div>

      </div>
    </div>
  );
}

export default PreviewPage;
